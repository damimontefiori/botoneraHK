# 🗡️ Hollow Knight Soundboard - Botonera de Sonidos Épicos

¡Bienvenido a la **Botonera de Hollow Knight**! Una aplicación web progresiva (PWA) que te permite reproducir todos los sonidos icónicos del legendario videojuego Hollow Knight.

![Hollow Knight Soundboard](https://img.shields.io/badge/PWA-Ready-brightgreen) ![Mobile Friendly](https://img.shields.io/badge/Mobile-Friendly-blue) ![Offline Support](https://img.shields.io/badge/Offline-Support-orange)

## 🎵 Características Principales

### ✨ **Sonidos Épicos**
- **46 sonidos únicos** extraídos directamente del juego
- Incluye voces de personajes icónicos:
  - 🕷️ **Hornet** - "Git gud!", "Edino!", "Shaa!"
  - 🐛 **Grub** - Sonidos adorables de las criaturas
  - 🦇 **Grimm** - Gritos escalofriantes del jefe
  - 💩 **Dung Defender** - 9 voces diferentes del defensor
  - ⚔️ **Y muchos más...**

### 🎨 **Diseño Moderno**
- **Interfaz dark theme** inspirada en la estética del juego
- **Animaciones fluidas** con efectos visuales atractivos
- **Diseño responsivo** optimizado para móviles y tablets
- **Efectos de gradiente** y hover interactivos

### 📱 **PWA Completa**
- **Instalable** - Añade la app a tu pantalla de inicio
- **Funciona offline** - Todos los sonidos se almacenan localmente
- **Carga rápida** - Service Worker optimizado para rendimiento
- **Notificaciones** - Toast messages para mejor UX

### 🔍 **Funcionalidades Avanzadas**
- **Búsqueda inteligente** - Encuentra sonidos por nombre o categoría
- **Filtros por categoría** - Organiza sonidos por personajes
- **Atajos de teclado** - Controla la app sin tocar la pantalla
- **Control de volumen** - Silencia o ajusta el audio
- **Historial de uso** - Rastrea tus sonidos favoritos

## 🚀 Instalación y Uso

### 💻 **Uso Web**
1. Visita la aplicación en tu navegador
2. ¡Empieza a hacer clic en los botones de sonidos!
3. Usa la búsqueda para encontrar sonidos específicos
4. Filtra por categorías usando las pestañas superiores

### 📲 **Instalación como PWA**
1. **Chrome/Edge**: Haz clic en el botón "Instalar" o el ícono en la barra de direcciones
2. **Safari**: Toca "Compartir" → "Añadir a pantalla de inicio"  
3. **Firefox**: Busca "Instalar" en el menú de opciones
4. ¡Disfruta la app como una aplicación nativa!

### ⌨️ **Atajos de Teclado**
- `Espacio` - Detener sonido actual
- `M` - Silenciar/Activar sonido
- `/` - Enfocar búsqueda
- `Escape` - Limpiar búsqueda y filtros
- `Ctrl+H` - Mostrar ayuda
- `Ctrl+I` - Instalar aplicación

## 🛠️ Tecnologías Utilizadas

### 🏗️ **Frontend**
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+** - Módulos, async/await, classes
- **Web APIs** - Audio API, Intersection Observer, Web Share

### 📱 **PWA Features**
- **Service Worker** - Caché inteligente y funcionalidad offline
- **Web App Manifest** - Configuración de instalación
- **Background Sync** - Sincronización en segundo plano
- **Push Notifications** - Notificaciones (preparado para futuro)

### 🎨 **Diseño**
- **Google Fonts** - Orbitron, Inter, Creepster
- **CSS Grid & Flexbox** - Layout responsivo
- **CSS Variables** - Theming dinámico
- **Animaciones CSS** - Transiciones suaves

## 📁 Estructura del Proyecto

```
hollow-knight-soundboard/
├── index.html              # Página principal
├── manifest.json           # Configuración PWA
├── sw.js                   # Service Worker
├── styles/
│   └── main.css            # Estilos principales
├── js/
│   ├── app.js              # Aplicación principal
│   ├── audio-manager.js    # Gestión de audio
│   ├── ui-manager.js       # Gestión de interfaz
│   ├── pwa-manager.js      # Gestión PWA
│   └── sounds-data.js      # Datos de sonidos
└── assets/
    └── icons/              # Iconos para PWA
```

## 🎯 Público Objetivo

Esta aplicación está **especialmente diseñada para jóvenes de 10-17 años** que:
- 🎮 Son fanáticos de Hollow Knight
- 📱 Usan principalmente dispositivos móviles
- 🎵 Disfrutan de soundboards y efectos de sonido
- 🌟 Buscan experiencias interactivas y modernas

## 🔧 Desarrollo Local

### Prerequisitos
- Navegador moderno (Chrome 90+, Firefox 88+, Safari 14+)
- Servidor local (Live Server, Python HTTP, Node.js, etc.)

### Instalación
1. **Clona o descarga** los archivos del proyecto
2. **Inicia un servidor local** en la carpeta del proyecto:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (http-server)
   npx http-server -p 8000
   
   # Con Live Server (VS Code)
   Extensión Live Server
   ```
3. **Visita** `http://localhost:8000`
4. ¡Empieza a desarrollar!

### 🧪 Testing
- **Responsive Design**: Usa DevTools para probar diferentes dispositivos
- **PWA Features**: Audita con Lighthouse en Chrome DevTools
- **Offline Mode**: Desconecta la red y prueba la funcionalidad
- **Performance**: Verifica tiempos de carga y animaciones

## 🌟 Características Futuras

### 🔄 **Próximas Actualizaciones**
- [ ] **Favoritos** - Marca sonidos como favoritos
- [ ] **Playlists** - Crea secuencias de sonidos
- [ ] **Compartir sonidos** - Comparte URLs directas
- [ ] **Modo oscuro/claro** - Toggle de tema
- [ ] **Efectos visuales** - Visualizador de audio
- [ ] **Más sonidos** - Expansión de la biblioteca

### 🎮 **Integraciones Posibles**
- [ ] **Discord Bot** - Reproduce sonidos en servidores
- [ ] **Twitch Integration** - Soundboard para streams
- [ ] **API REST** - Acceso programático a sonidos
- [ ] **Widget embebido** - Para páginas web

## 📊 Performance

### ⚡ **Métricas de Rendimiento**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### 💾 **Caché y Almacenamiento**
- **Archivos estáticos**: ~500KB
- **Audio caché**: Bajo demanda (até 50MB)
- **LocalStorage**: Preferencias y estadísticas
- **IndexedDB**: Preparado para datos complejos

## 🔒 Privacidad y Seguridad

### 🛡️ **Datos del Usuario**
- **No recopilamos datos personales**
- **Todo se almacena localmente** en el dispositivo
- **No hay tracking** o analíticas externas
- **HTTPS obligatorio** para PWA features

### 🎵 **Derechos de Audio**
- Todos los sonidos son extraídos de **MyInstants**
- **Uso educativo y recreativo** únicamente
- **Respeto a derechos de autor** de Team Cherry
- **No comercial** - proyecto de código abierto

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar la aplicación:

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### 💡 **Ideas para Contribuir**
- Nuevos sonidos de Hollow Knight
- Mejoras en la interfaz de usuario
- Optimizaciones de performance
- Funcionalidades adicionales
- Corrección de bugs
- Traduciones a otros idiomas

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** - ver el archivo `LICENSE` para más detalles.

### ⚠️ **Disclaimer**
- Hollow Knight es propiedad de **Team Cherry**
- Este proyecto es **no oficial** y con fines educativos
- Los sonidos utilizados son de dominio público via MyInstants
- No hay afiliación oficial con Team Cherry o Hollow Knight

## 🎉 Créditos

### 👨‍💻 **Desarrollado por**
- **GitHub Copilot** - Asistente de desarrollo
- **Análisis y extracción** desde MyInstants.com
- **Inspiración** en la increíble estética de Hollow Knight

### 🎮 **Agradecimientos**
- **Team Cherry** - Por crear Hollow Knight
- **MyInstants** - Por proveer la plataforma de sonidos
- **Comunidad de Hollow Knight** - Por mantener viva la pasión por el juego
- **Desarrolladores PWA** - Por las herramientas y tecnologías

---

## 📞 Soporte

¿Tienes preguntas o necesitas ayuda? 

- 🐛 **Reporta bugs** abriendo un issue
- 💡 **Sugiere features** en las discusiones  
- 📧 **Contacto directo** via GitHub profile
- 🌟 **¡Dale estrella al repo** si te gusta el proyecto!

---

**¡Disfruta explorando los sonidos épicos de Hollow Knight! ⚔️🎵**

*"No voice to cry suffering... but plenty of sounds to play!"*