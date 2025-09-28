#!/usr/bin/env python3
"""
Script de verificación final para la PWA Botonera Hollow Knight
"""

import requests
import json
from pathlib import Path

def test_r2_connectivity():
    """Prueba conectividad con Cloudflare R2"""
    
    print("🧪 PRUEBAS DE CONECTIVIDAD R2")
    print("=" * 50)
    
    base_url = "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/"
    
    # Leer lista de sonidos
    with open('js/sounds-data-r2.js', 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extraer algunas URLs para probar
    test_files = [
        "Hornet_GIT_GUD.mp3",
        "grub_hollow_knight.mp3", 
        "trobbio.mp3",
        "Dung_Defender_Voice_1.mp3",
        "Hollow_Knight_Scream.mp3"
    ]
    
    success_count = 0
    total_tests = len(test_files)
    
    for filename in test_files:
        url = base_url + filename
        try:
            response = requests.head(url, timeout=10)
            if response.status_code == 200:
                print(f"✅ {filename} - Accesible ({response.headers.get('content-length', 'N/A')} bytes)")
                success_count += 1
            else:
                print(f"❌ {filename} - Status: {response.status_code}")
        except Exception as e:
            print(f"❌ {filename} - Error: {str(e)}")
    
    print(f"\n📊 RESULTADO: {success_count}/{total_tests} archivos accesibles")
    
    if success_count == total_tests:
        print("🎉 ¡TODOS LOS ARCHIVOS SON ACCESIBLES!")
        return True
    else:
        print("⚠️  Algunos archivos no están disponibles")
        return False

def verify_file_structure():
    """Verifica la estructura de archivos local"""
    
    print("\n📁 VERIFICACIÓN DE ESTRUCTURA LOCAL")
    print("=" * 50)
    
    required_files = [
        "index.html",
        "manifest.json", 
        "sw.js",
        "js/sounds-data-r2.js",
        "js/audio-manager.js",
        "js/ui-manager.js",
        "js/pwa-manager.js",
        "js/app.js",
        "styles/main.css",
        "assets/icon-144x144.png",
        "netlify.toml"
    ]
    
    all_good = True
    
    for file_path in required_files:
        path = Path(file_path)
        if path.exists():
            size = path.stat().st_size
            print(f"✅ {file_path} ({size} bytes)")
        else:
            print(f"❌ {file_path} - NO ENCONTRADO")
            all_good = False
    
    return all_good

def check_urls_in_files():
    """Verifica que las URLs en los archivos sean correctas"""
    
    print("\n🔍 VERIFICACIÓN DE URLs")
    print("=" * 50)
    
    correct_base = "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/"
    
    files_to_check = [
        "js/sounds-data-r2.js",
        "sw.js", 
        "audio-manifest.json"
    ]
    
    all_correct = True
    
    for file_path in files_to_check:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            if correct_base in content:
                print(f"✅ {file_path} - URLs correctas")
            else:
                print(f"❌ {file_path} - URLs incorrectas o no encontradas")
                all_correct = False
                
        except Exception as e:
            print(f"❌ {file_path} - Error leyendo archivo: {e}")
            all_correct = False
    
    return all_correct

def main():
    """Función principal"""
    
    print("🎮 VERIFICACIÓN FINAL - BOTONERA HOLLOW KNIGHT PWA")
    print("=" * 60)
    
    # Ejecutar pruebas
    r2_ok = test_r2_connectivity()
    structure_ok = verify_file_structure()  
    urls_ok = check_urls_in_files()
    
    print("\n" + "=" * 60)
    print("📋 RESUMEN FINAL")
    print("=" * 60)
    
    print(f"🌐 Conectividad R2: {'✅ OK' if r2_ok else '❌ FALLO'}")
    print(f"📁 Estructura archivos: {'✅ OK' if structure_ok else '❌ FALLO'}")
    print(f"🔗 URLs correctas: {'✅ OK' if urls_ok else '❌ FALLO'}")
    
    if r2_ok and structure_ok and urls_ok:
        print("\n🎉 ¡PWA LISTA PARA DEPLOYMENT!")
        print("📋 Próximos pasos:")
        print("   1. git add .")
        print("   2. git commit -m 'PWA Hollow Knight lista para producción'")
        print("   3. git push")
        print("   4. Conectar repositorio con Netlify")
        print("   5. ¡Deploy automático!")
        return True
    else:
        print("\n⚠️  Hay problemas que resolver antes del deployment")
        return False

if __name__ == "__main__":
    main()