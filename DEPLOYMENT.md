# Botonera Hollow Knight - Deployment

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
