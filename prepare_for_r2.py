#!/usr/bin/env python3
"""
Script para preparar los archivos de audio para Cloudflare R2
Genera el mapeo de URLs y estructura de datos optimizada
"""

import os
import json
import re
from pathlib import Path
import hashlib

def clean_filename(name):
    """Limpia el nombre del archivo para que sea válido en sistemas de archivos"""
    name = re.sub(r'[^\w\s-]', '', name)
    name = re.sub(r'[-\s]+', '_', name)
    return name[:50]

def generate_file_hash(filepath):
    """Genera un hash MD5 del archivo para verificación de integridad"""
    hash_md5 = hashlib.md5()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

def main():
    # URLs base para Cloudflare R2
    CLOUDFLARE_BASE_URL = "https://2308deada1ba23f4d42930692fe605d9.r2.cloudflarestorage.com/botonerahk/audio"
    
    # Leer datos originales
    with open('js/sounds-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraer el array SOUNDS_DATA
    match = re.search(r'const SOUNDS_DATA = (\[.*?\]);', content, re.DOTALL)
    if not match:
        print("❌ No se pudo extraer SOUNDS_DATA del archivo")
        return
    
    sounds_data_str = match.group(1)
    sounds_data_str = sounds_data_str.replace('true', 'True').replace('false', 'False').replace('null', 'None')
    sounds_data = eval(sounds_data_str)
    
    # Leer log de descargas para obtener el mapeo
    with open('download_log.json', 'r', encoding='utf-8') as f:
        download_log = json.load(f)
    
    # Crear mapeo de nombre original a archivo local
    name_to_file = {}
    for entry in download_log:
        if entry['status'] in ['downloaded', 'already_exists']:
            name_to_file[entry['name']] = entry['filename']
    
    # Generar nueva estructura de datos con URLs de Cloudflare R2
    updated_sounds = []
    audio_manifest = []
    
    print("🔄 Procesando archivos para Cloudflare R2...")
    
    for sound in sounds_data:
        name = sound['name']
        if name in name_to_file:
            local_file = Path(name_to_file[name])
            if local_file.exists():
                # Generar nombre de archivo para R2 (usando el nombre limpio)
                clean_name = clean_filename(name)
                r2_filename = f"{clean_name}.mp3"
                r2_url = f"{CLOUDFLARE_BASE_URL}/{r2_filename}"
                
                # Obtener información del archivo
                file_size = local_file.stat().st_size
                file_hash = generate_file_hash(local_file)
                
                # Actualizar datos del sonido
                updated_sound = sound.copy()
                updated_sound['url'] = r2_url
                updated_sound['localFile'] = str(local_file)
                updated_sound['r2Filename'] = r2_filename
                updated_sound['size'] = file_size
                updated_sound['hash'] = file_hash
                
                updated_sounds.append(updated_sound)
                
                # Agregar a manifest de audio para el service worker
                audio_manifest.append({
                    'id': sound['id'],
                    'name': name,
                    'url': r2_url,
                    'size': file_size,
                    'hash': file_hash,
                    'category': sound['category']
                })
                
                print(f"✅ {name} → {r2_filename} ({file_size} bytes)")
            else:
                print(f"❌ Archivo no encontrado: {local_file}")
        else:
            print(f"⚠️ No se descargó: {name}")
    
    # Generar nuevo archivo sounds-data.js
    js_content = f"""// Datos de sonidos optimizados para Cloudflare R2
const SOUNDS_DATA = {json.dumps(updated_sounds, indent=2, ensure_ascii=False)};

export {{ SOUNDS_DATA }};
"""
    
    with open('js/sounds-data-r2.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    # Generar manifest de audio para el service worker
    with open('audio-manifest.json', 'w', encoding='utf-8') as f:
        json.dump({
            'version': '1.0.0',
            'totalSize': sum(item['size'] for item in audio_manifest),
            'totalFiles': len(audio_manifest),
            'baseUrl': CLOUDFLARE_BASE_URL,
            'files': audio_manifest
        }, f, indent=2, ensure_ascii=False)
    
    # Generar script de subida para Cloudflare R2 (wrangler)
    upload_script = """#!/bin/bash
# Script para subir archivos a Cloudflare R2
# Requiere wrangler CLI configurado

echo "🚀 Subiendo archivos de audio a Cloudflare R2..."

"""
    
    for sound in updated_sounds:
        local_file = sound['localFile'].replace('\\', '/')
        r2_filename = sound['r2Filename']
        upload_script += f'echo "📤 Subiendo {r2_filename}..."\n'
        upload_script += f'wrangler r2 object put your-bucket/audio/{r2_filename} --file "{local_file}" --content-type "audio/mpeg"\n\n'
    
    upload_script += """
echo "✅ Todos los archivos subidos exitosamente!"
echo "📋 Actualiza la URL base en sounds-data-r2.js con tu dominio de Cloudflare R2"
"""
    
    with open('upload_to_r2.sh', 'w', encoding='utf-8') as f:
        f.write(upload_script)
    
    # Generar script de PowerShell para Windows
    ps_script = """# Script PowerShell para subir archivos a Cloudflare R2
# Requiere wrangler CLI configurado

Write-Host "🚀 Subiendo archivos de audio a Cloudflare R2..." -ForegroundColor Cyan

"""
    
    for sound in updated_sounds:
        local_file = sound['localFile']
        r2_filename = sound['r2Filename']
        ps_script += f'Write-Host "📤 Subiendo {r2_filename}..." -ForegroundColor Yellow\n'
        ps_script += f'wrangler r2 object put your-bucket/audio/{r2_filename} --file "{local_file}" --content-type "audio/mpeg"\n\n'
    
    ps_script += """
Write-Host "✅ Todos los archivos subidos exitosamente!" -ForegroundColor Green
Write-Host "📋 Actualiza la URL base en sounds-data-r2.js con tu dominio de Cloudflare R2" -ForegroundColor Yellow
"""
    
    with open('upload_to_r2.ps1', 'w', encoding='utf-8') as f:
        f.write(ps_script)
    
    # Resumen
    total_size = sum(sound['size'] for sound in updated_sounds)
    
    print(f"\n🎯 RESUMEN DE PREPARACIÓN:")
    print(f"   📁 Archivos procesados: {len(updated_sounds)}")
    print(f"   💾 Tamaño total: {total_size / (1024*1024):.2f} MB")
    print(f"   📄 Archivos generados:")
    print(f"      - js/sounds-data-r2.js (datos actualizados)")
    print(f"      - audio-manifest.json (manifest para SW)")
    print(f"      - upload_to_r2.sh (script Linux/Mac)")
    print(f"      - upload_to_r2.ps1 (script Windows)")
    
    print(f"\n📋 PRÓXIMOS PASOS:")
    print(f"   1. Configurar Cloudflare R2 bucket")
    print(f"   2. Instalar wrangler CLI: npm install -g wrangler")
    print(f"   3. Configurar wrangler: wrangler auth login")
    print(f"   4. Ejecutar: ./upload_to_r2.ps1")
    print(f"   5. Actualizar URL base en sounds-data-r2.js")

if __name__ == "__main__":
    main()