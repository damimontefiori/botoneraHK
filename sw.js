// Service Worker para Botonera Hollow Knight - Versión Cloudflare R2
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
const AUDIO_MANIFEST = {
  "version": "1.0.0",
  "totalSize": 2603953,
  "totalFiles": 46,
  "baseUrl": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio",
  "files": [
    {
      "id": 1,
      "name": "Hornet GIT GUD",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hornet_GIT_GUD.mp3",
      "size": 25231,
      "hash": "6c121f89887636dd56119c885e869831",
      "category": "hornet"
    },
    {
      "id": 2,
      "name": "Hornet EDINO",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hornet_EDINO.mp3",
      "size": 21775,
      "hash": "bddf26a44cb19d721f4c1b56768dfc8d",
      "category": "hornet"
    },
    {
      "id": 3,
      "name": "Hornet SHAA",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hornet_SHAA.mp3",
      "size": 16783,
      "hash": "98f8311659b9a65135b0a7a477ddf676",
      "category": "hornet"
    },
    {
      "id": 4,
      "name": "Hollow Knight - Bapanada",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hollow_Knight_Bapanada.mp3",
      "size": 114600,
      "hash": "cf8c2e134c074bbcd8c268d9ae6a1e3a",
      "category": "others"
    },
    {
      "id": 5,
      "name": "Hornet shhaa hollow knight",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hornet_shhaa_hollow_knight.mp3",
      "size": 16783,
      "hash": "98f8311659b9a65135b0a7a477ddf676",
      "category": "hornet"
    },
    {
      "id": 6,
      "name": "WAH (hollow knight)",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/WAH_hollow_knight.mp3",
      "size": 79665,
      "hash": "bac5d82f87c580fe427523973c4089b6",
      "category": "others"
    },
    {
      "id": 7,
      "name": "grub hollow knight",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/grub_hollow_knight.mp3",
      "size": 22981,
      "hash": "4965554fb6e5cc3f10b9a0db31206fb1",
      "category": "grub"
    },
    {
      "id": 8,
      "name": "GIT GUD hornet",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/GIT_GUD_hornet.mp3",
      "size": 13932,
      "hash": "e18d732c131e5cfd3f21e0354166fa49",
      "category": "hornet"
    },
    {
      "id": 9,
      "name": "Hollow Knight Scream",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hollow_Knight_Scream.mp3",
      "size": 61577,
      "hash": "09d9c9c636cc5062de3bd0ae1d4b75be",
      "category": "others"
    },
    {
      "id": 10,
      "name": "baitola Hollow Knight Silksong",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/baitola_Hollow_Knight_Silksong.mp3",
      "size": 15949,
      "hash": "6e227539669415a49427954c5e6cfdea",
      "category": "others"
    },
    {
      "id": 11,
      "name": "Dung Defender Voice 4",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_4.mp3",
      "size": 59190,
      "hash": "bfbd62b12a9d6874244e0a061fa87557",
      "category": "defender"
    },
    {
      "id": 12,
      "name": "Dung Defender Voice 8",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_8.mp3",
      "size": 126238,
      "hash": "ba9f9899a0a2b55e67fadd5e04994d96",
      "category": "defender"
    },
    {
      "id": 13,
      "name": "Silksong Flea Howl 03 [raw]",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Silksong_Flea_Howl_03_raw.mp3",
      "size": 33261,
      "hash": "a8469d1921cf6d9f9228072207c2dc13",
      "category": "others"
    },
    {
      "id": 14,
      "name": "caterpillar",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/caterpillar.mp3",
      "size": 33689,
      "hash": "17a85c9a658a190bac14da8f356bc9de",
      "category": "others"
    },
    {
      "id": 15,
      "name": "Silksong Flea Howl 02 [raw]",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Silksong_Flea_Howl_02_raw.mp3",
      "size": 30381,
      "hash": "9a8ccf359989110852118dc5f78df837",
      "category": "others"
    },
    {
      "id": 16,
      "name": "Dung Defender Voice 5",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_5.mp3",
      "size": 45208,
      "hash": "206e9d198e9db2f762895d8bdde4fd26",
      "category": "defender"
    },
    {
      "id": 17,
      "name": "Grub Sound 1 Hollow Knight",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Grub_Sound_1_Hollow_Knight.mp3",
      "size": 27722,
      "hash": "2e4b4b624306c2838f1419216ac56297",
      "category": "grub"
    },
    {
      "id": 18,
      "name": "Mantis lords be like",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Mantis_lords_be_like.mp3",
      "size": 32946,
      "hash": "9d6a22f635bccc5c396d3e0d9f091e84",
      "category": "others"
    },
    {
      "id": 19,
      "name": "Hornet how you doing",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hornet_how_you_doing.mp3",
      "size": 105837,
      "hash": "daf3413bfa6ed2a537d47b2b2095c4ed",
      "category": "hornet"
    },
    {
      "id": 20,
      "name": "Dung Defender Voice 7",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_7.mp3",
      "size": 45623,
      "hash": "7a643b30945499556445cdd5fee9ac2a",
      "category": "defender"
    },
    {
      "id": 21,
      "name": "Dung Defender Voice 2",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_2.mp3",
      "size": 58064,
      "hash": "e58c3b79fcfd705f33cd1778e0bbccf5",
      "category": "defender"
    },
    {
      "id": 22,
      "name": "Dung Defender Voice 1",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_1.mp3",
      "size": 34678,
      "hash": "a9210c14c9bd67b299c6fa4c782d09ba",
      "category": "defender"
    },
    {
      "id": 23,
      "name": "Hollow knight dead people",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hollow_knight_dead_people.mp3",
      "size": 54610,
      "hash": "9a4cad7ec27379938a3f957a9d71be88",
      "category": "others"
    },
    {
      "id": 24,
      "name": "Dung Defender Voice 6",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_6.mp3",
      "size": 38011,
      "hash": "6f228b89a366077ff7d06e5e0896890c",
      "category": "defender"
    },
    {
      "id": 25,
      "name": "You're such a traitor I'm sad...",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Youre_such_a_traitor_Im_sad.mp3",
      "size": 73813,
      "hash": "23771aeb8c719b57ff6a10f5112de588",
      "category": "others"
    },
    {
      "id": 26,
      "name": "Emilia Oh",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Emilia_Oh.mp3",
      "size": 7453,
      "hash": "601fdfffb2745b99f569efa04c97fc23",
      "category": "others"
    },
    {
      "id": 27,
      "name": "(Hollow Knight) Fluke Noises",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Hollow_Knight_Fluke_Noises.mp3",
      "size": 27219,
      "hash": "54a32d6454a2c7a3656cc98f2ffebaa4",
      "category": "others"
    },
    {
      "id": 28,
      "name": "zote bera bera",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/zote_bera_bera.mp3",
      "size": 33512,
      "hash": "eee477ae85fbb39f1983bad40b166489",
      "category": "others"
    },
    {
      "id": 29,
      "name": "BZZAHHHH (Hive Knight)",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/BZZAHHHH_Hive_Knight.mp3",
      "size": 52173,
      "hash": "545c1fcc10114e3f47ad887bc2ec9cdb",
      "category": "others"
    },
    {
      "id": 30,
      "name": "Grub Sound 2 Hollow Knight",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Grub_Sound_2_Hollow_Knight.mp3",
      "size": 52173,
      "hash": "d7d7982e645425f6ca6ff20fa8d3a12a",
      "category": "grub"
    },
    {
      "id": 31,
      "name": "Ghost pitter-patter",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Ghost_pitter_patter.mp3",
      "size": 33179,
      "hash": "d050686fe8c3ae04b71879e57cdef898",
      "category": "others"
    },
    {
      "id": 32,
      "name": "ceiling dropper form hk",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/ceiling_dropper_form_hk.mp3",
      "size": 13366,
      "hash": "1cc25b3e2cd11257598cd08eb83ecafa",
      "category": "others"
    },
    {
      "id": 33,
      "name": "Dung Defender Voice 3",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_3.mp3",
      "size": 78534,
      "hash": "e698a81e93b916aa0cc0eb6d6be025e7",
      "category": "defender"
    },
    {
      "id": 34,
      "name": "Dung Defender Voice 9",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Dung_Defender_Voice_9.mp3",
      "size": 113067,
      "hash": "90d061ecb46b4968bdc270fe9cf89477",
      "category": "defender"
    },
    {
      "id": 35,
      "name": "TEH! (Hollow Knight Grimm)",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/TEH_Hollow_Knight_Grimm.mp3",
      "size": 22707,
      "hash": "d8f4c0538dfd50fad82c2a31f6a4959c",
      "category": "grimm"
    },
    {
      "id": 36,
      "name": "Salenmah. (Tiso Hollow Knight)",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Salenmah_Tiso_Hollow_Knight.mp3",
      "size": 58442,
      "hash": "17f5cfeb0e36a2c85540f1250a9eb6d7",
      "category": "others"
    },
    {
      "id": 37,
      "name": "HOOSEH! (Hollow Knight Grimm)",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/HOOSEH_Hollow_Knight_Grimm.mp3",
      "size": 46530,
      "hash": "b8de809c94d22d252706050a3f7d6bfc",
      "category": "grimm"
    },
    {
      "id": 38,
      "name": "Watafah (Hollow Knight Old Stag)",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Watafah_Hollow_Knight_Old_Stag.mp3",
      "size": 32737,
      "hash": "0ba7ef9f4ca11fba36afbc072705c47c",
      "category": "others"
    },
    {
      "id": 39,
      "name": "ToastedMango-Yippee",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/ToastedMango_Yippee.mp3",
      "size": 13822,
      "hash": "a4c81b3b2eb3afecc9521ab42bb410df",
      "category": "others"
    },
    {
      "id": 40,
      "name": "\u0410\u0413\u0410, \u041d\u0410 \u0416\u0423\u041a\u041e\u0412 \u0414\u0420\u041e\u0427\u0418\u0428\u042c!!!",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/\u0410\u0413\u0410_\u041d\u0410_\u0416\u0423\u041a\u041e\u0412_\u0414\u0420\u041e\u0427\u0418\u0428\u042c.mp3",
      "size": 103064,
      "hash": "f07e490c06db9b4dc2f661debf5d9bcc",
      "category": "others"
    },
    {
      "id": 41,
      "name": "trobbio",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/trobbio.mp3",
      "size": 81718,
      "hash": "74b3542c743be5cae2cbeec5242e00ac",
      "category": "others"
    },
    {
      "id": 42,
      "name": "trobbio 2",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/trobbio_2.mp3",
      "size": 218998,
      "hash": "8d06960324cd3a49a8ef4c9b1da96f12",
      "category": "others"
    },
    {
      "id": 43,
      "name": "Trobbioo 5",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/Trobbioo_5.mp3",
      "size": 93238,
      "hash": "d569fb37397f77edb69f3d5479c47239",
      "category": "others"
    },
    {
      "id": 44,
      "name": "trobbio 3",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/trobbio_3.mp3",
      "size": 114358,
      "hash": "7c50c6e37e46150148e87cfc49b9c82e",
      "category": "others"
    },
    {
      "id": 45,
      "name": "trobbio 4",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/trobbio_4.mp3",
      "size": 109558,
      "hash": "49160e68f9f45971823a2015174fd641",
      "category": "others"
    },
    {
      "id": 46,
      "name": "trobbio 5",
      "url": "https://pub-c3a9e0bba47845faa667d8d09f551770.r2.dev/audio/trobbio_5.mp3",
      "size": 109558,
      "hash": "49160e68f9f45971823a2015174fd641",
      "category": "others"
    }
  ]
};

// Instalar Service Worker
self.addEventListener('install', event => {
    console.log('🔧 Instalando Service Worker v2.1 (R2)...');
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('📦 Cacheando archivos estáticos...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('✅ Service Worker instalado');
                return self.skipWaiting();
            })
    );
});

// Activar Service Worker
self.addEventListener('activate', event => {
    console.log('🚀 Activando Service Worker v2.1 (R2)...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => 
                            cacheName.startsWith('botonera-hk-') && 
                            cacheName !== CACHE_NAME && 
                            cacheName !== STATIC_CACHE_NAME
                        )
                        .map(cacheName => {
                            console.log('🗑️ Eliminando cache obsoleto:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('✅ Service Worker activado');
                return self.clients.claim();
            })
    );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Estrategia Cache First para archivos estáticos
    if (STATIC_ASSETS.some(asset => url.pathname === asset)) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request)
                        .then(response => {
                            if (response.ok) {
                                const responseClone = response.clone();
                                caches.open(STATIC_CACHE_NAME)
                                    .then(cache => cache.put(event.request, responseClone));
                            }
                            return response;
                        });
                })
        );
        return;
    }
    
    // Estrategia Cache First para archivos de audio R2
    if (url.hostname.includes('r2.cloudflarestorage.com') && url.pathname.includes('/audio/')) {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request)
                        .then(response => {
                            if (response.ok) {
                                const responseClone = response.clone();
                                caches.open(CACHE_NAME)
                                    .then(cache => cache.put(event.request, responseClone));
                            }
                            return response;
                        })
                        .catch(() => {
                            // Si falla la descarga, intentar servir desde cache
                            return caches.match(event.request);
                        });
                })
        );
        return;
    }
    
    // Para otras peticiones, usar estrategia Network First
    event.respondWith(
        fetch(event.request)
            .catch(() => caches.match(event.request))
    );
});

// Escuchar mensajes del cliente
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'DOWNLOAD_AUDIO') {
        downloadAllAudio();
    }
});

// Función para descargar todos los audios en segundo plano
async function downloadAllAudio() {
    console.log('🎵 Iniciando descarga de audios desde R2...');
    
    try {
        const cache = await caches.open(CACHE_NAME);
        let downloaded = 0;
        const total = AUDIO_MANIFEST.files.length;
        
        // Notificar inicio
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'DOWNLOAD_START',
                    total: total
                });
            });
        });
        
        // Descargar cada archivo
        for (const audioFile of AUDIO_MANIFEST.files) {
            try {
                const response = await fetch(audioFile.url);
                if (response.ok) {
                    await cache.put(audioFile.url, response.clone());
                    downloaded++;
                    
                    // Notificar progreso
                    self.clients.matchAll().then(clients => {
                        clients.forEach(client => {
                            client.postMessage({
                                type: 'DOWNLOAD_PROGRESS',
                                downloaded: downloaded,
                                total: total,
                                file: audioFile.filename
                            });
                        });
                    });
                }
            } catch (err) {
                console.error('❌ Error descargando:', audioFile.filename, err);
            }
        }
        
        // Notificar finalización
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'DOWNLOAD_COMPLETE',
                    downloaded: downloaded,
                    total: total
                });
            });
        });
        
        console.log(`✅ Descarga completa: ${downloaded}/${total} archivos`);
        
    } catch (error) {
        console.error('❌ Error en descarga masiva:', error);
        
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'DOWNLOAD_ERROR',
                    error: error.message
                });
            });
        });
    }
}
