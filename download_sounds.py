#!/usr/bin/env python3
"""
Script para descargar los archivos de audio de MyInstants
y prepararlos para subir a Cloudflare R2
"""

import os
import json
import requests
import time
from urllib.parse import urljoin, urlparse
import hashlib
import re
from pathlib import Path

def clean_filename(name):
    """Limpia el nombre del archivo para que sea válido en sistemas de archivos"""
    # Remueve caracteres especiales y limita longitud
    name = re.sub(r'[^\w\s-]', '', name)
    name = re.sub(r'[-\s]+', '_', name)
    return name[:50]  # Limita a 50 caracteres

def download_audio(url, filename, max_retries=3):
    """Descarga un archivo de audio con reintentos"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://www.myinstants.com/',
        'Accept': 'audio/*,*/*;q=0.9',
        'Accept-Language': 'en-US,en;q=0.5',
    }
    
    for attempt in range(max_retries):
        try:
            print(f"📥 Descargando: {filename} (intento {attempt + 1}/{max_retries})")
            response = requests.get(url, headers=headers, timeout=30, stream=True)
            
            if response.status_code == 200:
                content_type = response.headers.get('content-type', '')
                if 'audio' in content_type or 'octet-stream' in content_type:
                    with open(filename, 'wb') as f:
                        for chunk in response.iter_content(chunk_size=8192):
                            if chunk:
                                f.write(chunk)
                    
                    # Verificar que el archivo se descargó correctamente
                    if os.path.getsize(filename) > 1000:  # Al menos 1KB
                        print(f"✅ Descargado exitosamente: {filename}")
                        return True
                    else:
                        print(f"❌ Archivo muy pequeño, probablemente corrupto: {filename}")
                        os.remove(filename)
                        
            else:
                print(f"❌ Error HTTP {response.status_code} para {url}")
                
        except Exception as e:
            print(f"❌ Error descargando {url}: {str(e)}")
            
        if attempt < max_retries - 1:
            print(f"⏳ Esperando 2 segundos antes del siguiente intento...")
            time.sleep(2)
    
    return False

def main():
    # Crear carpeta de audio si no existe
    audio_dir = Path("audio")
    audio_dir.mkdir(exist_ok=True)
    
    # Leer datos de sonidos
    with open('js/sounds-data.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraer el array SOUNDS_DATA usando regex
    match = re.search(r'const SOUNDS_DATA = (\[.*?\]);', content, re.DOTALL)
    if not match:
        print("❌ No se pudo extraer SOUNDS_DATA del archivo")
        return
    
    # Evaluar el JavaScript como Python (casi compatible)
    sounds_data_str = match.group(1)
    # Reemplazar 'true'/'false' por 'True'/'False' y 'null' por 'None'
    sounds_data_str = sounds_data_str.replace('true', 'True').replace('false', 'False').replace('null', 'None')
    
    try:
        sounds_data = eval(sounds_data_str)
    except Exception as e:
        print(f"❌ Error parseando datos de sonidos: {e}")
        return
    
    print(f"🎵 Encontrados {len(sounds_data)} sonidos para descargar")
    
    # Estadísticas
    downloaded = 0
    failed = 0
    skipped = 0
    
    # Crear registro de descargas
    download_log = []
    
    for i, sound in enumerate(sounds_data, 1):
        name = sound['name']
        url = sound['url']
        category = sound['category']
        
        print(f"\n[{i}/{len(sounds_data)}] Procesando: {name}")
        
        # Crear nombre de archivo limpio
        clean_name = clean_filename(name)
        filename = audio_dir / f"{clean_name}.mp3"
        
        # Saltar si ya existe
        if filename.exists() and os.path.getsize(filename) > 1000:
            print(f"⏭️ Ya existe: {filename}")
            skipped += 1
            download_log.append({
                'name': name,
                'filename': str(filename),
                'url': url,
                'category': category,
                'status': 'already_exists',
                'size': os.path.getsize(filename)
            })
            continue
        
        # Intentar descargar
        if download_audio(url, filename):
            downloaded += 1
            size = os.path.getsize(filename)
            download_log.append({
                'name': name,
                'filename': str(filename),
                'url': url,
                'category': category,
                'status': 'downloaded',
                'size': size
            })
        else:
            failed += 1
            download_log.append({
                'name': name,
                'filename': 'N/A',
                'url': url,
                'category': category,
                'status': 'failed',
                'size': 0
            })
        
        # Pausa entre descargas para no sobrecargar el servidor
        if i < len(sounds_data):
            time.sleep(1)
    
    # Guardar log de descargas
    with open('download_log.json', 'w', encoding='utf-8') as f:
        json.dump(download_log, f, indent=2, ensure_ascii=False)
    
    # Resumen final
    print(f"\n🎯 RESUMEN:")
    print(f"   ✅ Descargados: {downloaded}")
    print(f"   ⏭️ Ya existían: {skipped}")
    print(f"   ❌ Fallaron: {failed}")
    print(f"   📊 Total procesados: {len(sounds_data)}")
    
    # Calcular tamaño total
    total_size = 0
    audio_files = list(audio_dir.glob("*.mp3"))
    for file in audio_files:
        total_size += file.stat().st_size
    
    print(f"   💾 Tamaño total: {total_size / (1024*1024):.2f} MB")
    print(f"   📁 Archivos en carpeta audio: {len(audio_files)}")
    
    if downloaded > 0:
        print(f"\n🎉 ¡Descarga completada! Los archivos están en la carpeta 'audio/'")
        print(f"📋 Log detallado guardado en 'download_log.json'")

if __name__ == "__main__":
    main()