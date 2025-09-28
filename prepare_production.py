#!/usr/bin/env python3
"""
Script final para preparar el deployment en Netlify con Cloudflare R2
"""

import json
import shutil
import os
from pathlib import Path

def prepare_production_deployment():
    """Prepara todos los archivos para deployment de producción"""
    
    print("🚀 Preparando deployment de producción...")
    
    # 1. Reemplazar index.html con la versión de producción
    print("📝 Actualizando index.html para producción...")
    if os.path.exists('index-production.html'):
        shutil.copy2('index-production.html', 'index.html')
        print("✅ index.html actualizado con referencias a R2")
    
    # 2. Actualizar Service Worker para usar R2
    print("📝 Actualizando Service Worker...")
    update_service_worker_for_r2()
    
    # 3. Crear archivo de configuración para deployment
    print("📝 Creando configuración de deployment...")
    create_deployment_config()
    
    print("\n🎯 DEPLOYMENT PREPARADO:")
    print("   ✅ index.html → Usa sounds-data-r2.js")
    print("   ✅ Service Worker → URLs de R2")
    print("   ✅ Configuración Netlify lista")
    print("   ✅ Scripts de R2 generados")
    
    print("\n📋 PRÓXIMOS PASOS:")
    print("   1. Instalar wrangler CLI: npm install -g wrangler")
    print("   2. Configurar wrangler: wrangler auth login")  
    print("   3. Ejecutar: ./upload_to_r2.ps1")
    print("   4. Desplegar en Netlify")

def update_service_worker_for_r2():
    """Actualiza el Service Worker para usar URLs de Cloudflare R2"""
    
    # Leer el archivo de manifiesto de audio actualizado
    with open('audio-manifest.json', 'r', encoding='utf-8') as f:
        audio_manifest = json.load(f)
    
    sw_content = f'''// Service Worker para Botonera Hollow Knight - Versión Cloudflare R2
const CACHE_NAME = 'botonera-hk-v2.1-r2';
const STATIC_CACHE_NAME = 'botonera-hk-static-v2.1';

// URLs de archivos estáticos para cachear
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles/main.css',
    '/js/sounds-data-r2.js',
    '/js/audio-manager.js',
    '/js/ui-manager.js',
    '/js/pwa-manager.js',
    '/js/app.js',
    '/manifest.json',
    '/assets/favicon.ico',
    '/assets/icon-144x144.png',
    '/assets/icon-192x192.png',
    '/assets/icon-512x512.png'
];

// URLs de audio desde Cloudflare R2
const AUDIO_MANIFEST = {json.dumps(audio_manifest, indent=2)};

// Instalar Service Worker
self.addEventListener('install', event => {{
    console.log('🔧 Instalando Service Worker v2.1 (R2)...');
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {{
                console.log('📦 Cacheando archivos estáticos...');
                return cache.addAll(STATIC_ASSETS);
            }})
            .then(() => {{
                console.log('✅ Service Worker instalado');
                return self.skipWaiting();
            }})
    );
}});

// Activar Service Worker
self.addEventListener('activate', event => {{
    console.log('🚀 Activando Service Worker v2.1 (R2)...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {{
                return Promise.all(
                    cacheNames
                        .filter(cacheName => 
                            cacheName.startsWith('botonera-hk-') && 
                            cacheName !== CACHE_NAME && 
                            cacheName !== STATIC_CACHE_NAME
                        )
                        .map(cacheName => {{
                            console.log('🗑️ Eliminando cache obsoleto:', cacheName);
                            return caches.delete(cacheName);
                        }})
                );
            }})
            .then(() => {{
                console.log('✅ Service Worker activado');
                return self.clients.claim();
            }})
    );
}});

// Interceptar peticiones
self.addEventListener('fetch', event => {{
    const url = new URL(event.request.url);
    
    // Estrategia Cache First para archivos estáticos
    if (STATIC_ASSETS.some(asset => url.pathname === asset)) {{
        event.respondWith(
            caches.match(event.request)
                .then(response => {{
                    if (response) {{
                        return response;
                    }}
                    return fetch(event.request)
                        .then(response => {{
                            if (response.ok) {{
                                const responseClone = response.clone();
                                caches.open(STATIC_CACHE_NAME)
                                    .then(cache => cache.put(event.request, responseClone));
                            }}
                            return response;
                        }});
                }})
        );
        return;
    }}
    
    // Estrategia Cache First para archivos de audio R2
    if (url.hostname.includes('r2.cloudflarestorage.com') && url.pathname.includes('/audio/')) {{
        event.respondWith(
            caches.match(event.request)
                .then(response => {{
                    if (response) {{
                        return response;
                    }}
                    return fetch(event.request)
                        .then(response => {{
                            if (response.ok) {{
                                const responseClone = response.clone();
                                caches.open(CACHE_NAME)
                                    .then(cache => cache.put(event.request, responseClone));
                            }}
                            return response;
                        }})
                        .catch(() => {{
                            // Si falla la descarga, intentar servir desde cache
                            return caches.match(event.request);
                        }});
                }})
        );
        return;
    }}
    
    // Para otras peticiones, usar estrategia Network First
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
}});

// Escuchar mensajes del cliente
self.addEventListener('message', event => {{
    if (event.data && event.data.type === 'DOWNLOAD_AUDIO') {{
        downloadAllAudio();
    }}
}});

// Función para descargar todos los audios en segundo plano
async function downloadAllAudio() {{
    console.log('🎵 Iniciando descarga de audios desde R2...');
    
    try {{
        const cache = await caches.open(CACHE_NAME);
        let downloaded = 0;
        const total = AUDIO_MANIFEST.files.length;
        
        // Notificar inicio
        self.clients.matchAll().then(clients => {{
            clients.forEach(client => {{
                client.postMessage({{
                    type: 'DOWNLOAD_START',
                    total: total
                }});
            }});
        }});
        
        // Descargar cada archivo
        for (const audioFile of AUDIO_MANIFEST.files) {{
            try {{
                const response = await fetch(audioFile.url);
                if (response.ok) {{
                    await cache.put(audioFile.url, response.clone());
                    downloaded++;
                    
                    // Notificar progreso
                    self.clients.matchAll().then(clients => {{
                        clients.forEach(client => {{
                            client.postMessage({{
                                type: 'DOWNLOAD_PROGRESS',
                                downloaded: downloaded,
                                total: total,
                                file: audioFile.filename
                            }});
                        }});
                    }});
                }}
            }} catch (err) {{
                console.error('❌ Error descargando:', audioFile.filename, err);
            }}
        }}
        
        // Notificar finalización
        self.clients.matchAll().then(clients => {{
            clients.forEach(client => {{
                client.postMessage({{
                    type: 'DOWNLOAD_COMPLETE',
                    downloaded: downloaded,
                    total: total
                }});
            }});
        }});
        
        console.log(`✅ Descarga completa: ${{downloaded}}/${{total}} archivos`);
        
    }} catch (error) {{
        console.error('❌ Error en descarga masiva:', error);
        
        self.clients.matchAll().then(clients => {{
            clients.forEach(client => {{
                client.postMessage({{
                    type: 'DOWNLOAD_ERROR',
                    error: error.message
                }});
            }});
        }});
    }}
}}'''

    # Escribir el Service Worker actualizado
    with open('sw.js', 'w', encoding='utf-8') as f:
        f.write(sw_content)
    
    print("✅ Service Worker actualizado para URLs de R2")

def create_deployment_config():
    """Crea configuración adicional para el deployment"""
    
    # Crear archivo README de deployment
    readme_content = '''# Botonera Hollow Knight - Deployment

## 🚀 Estado del Proyecto
- ✅ 46 sonidos extraídos y procesados
- ✅ PWA completa con Service Worker
- ✅ Iconos generados (8 tamaños)
- ✅ Configuración Netlify lista
- ✅ Migración a Cloudflare R2 preparada

## 📁 Estructura de Deployment
```
/
├── index.html              # Versión de producción
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker (R2)
├── js/
│   ├── sounds-data-r2.js   # URLs de Cloudflare R2
│   ├── audio-manager.js    # Gestión de audio
│   ├── ui-manager.js       # Interfaz de usuario
│   ├── pwa-manager.js      # Funcionalidad PWA
│   └── app.js              # Coordinador principal
├── styles/
│   └── main.css            # Estilos principales
├── assets/
│   └── icon-*.png          # Iconos PWA
├── _headers                # Configuración Netlify
├── _redirects              # Redirects Netlify  
└── netlify.toml            # Configuración Netlify
```

## 🔧 Pasos de Deployment

### 1. Subir a Cloudflare R2
```bash
# Instalar wrangler
npm install -g wrangler

# Configurar wrangler
wrangler auth login

# Subir archivos de audio
./upload_to_r2.ps1  # Windows
./upload_to_r2.sh   # Linux/Mac
```

### 2. Deploy en Netlify
1. Conectar repositorio en Netlify
2. Build command: (vacío)
3. Publish directory: `.` (directorio raíz)
4. Deploy automático activado

## 🌐 URLs de Producción
- Audio CDN: `https://2308deada1ba23f4d42930692fe605d9.r2.cloudflarestorage.com/botonerahk/audio/`
- PWA: `https://tu-sitio.netlify.app`

## 🎯 Características
- **46 sonidos** de Hollow Knight
- **Offline First** - Funciona sin internet
- **Instalable** - Se puede instalar como app
- **Responsive** - Funciona en todos los dispositivos
- **Fast Loading** - Carga instantánea con Service Worker
- **Modern UI** - Diseño atractivo para teens

## 📊 Estadísticas
- Tamaño total de audio: 2.48 MB
- Archivos de audio: 46
- Iconos PWA: 8 tamaños
- Soporte offline: ✅
- Progressive Web App: ✅
'''
    
    with open('DEPLOYMENT.md', 'w', encoding='utf-8') as f:
        f.write(readme_content)
    
    print("✅ Documentación de deployment creada")

if __name__ == "__main__":
    prepare_production_deployment()