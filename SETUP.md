# Hollow Knight Soundboard

Una botonera de sonidos épicos del videojuego Hollow Knight, creada como Progressive Web App (PWA).

## Estructura de archivos creados:

### Archivos principales:
- `index.html` - Página principal de la aplicación
- `manifest.json` - Configuración PWA para instalación
- `sw.js` - Service Worker para funcionalidad offline
- `README.md` - Documentación completa

### Estilos:
- `styles/main.css` - CSS principal con tema oscuro y diseño moderno

### JavaScript:
- `js/sounds-data.js` - 46 sonidos extraídos de MyInstants con metadata
- `js/audio-manager.js` - Manejo de reproducción de audio
- `js/ui-manager.js` - Gestión de interfaz y filtros
- `js/pwa-manager.js` - Funcionalidad PWA (instalación, offline)
- `js/app.js` - Aplicación principal que coordina todo

## Características implementadas:

✅ **Extracción de sonidos** - 46 sonidos únicos de Hollow Knight desde MyInstants
✅ **Diseño moderno** - Interfaz dark theme atractiva para jóvenes 10-17 años
✅ **PWA completa** - Instalable, offline, service worker optimizado
✅ **Búsqueda y filtros** - Búsqueda por nombre, filtros por categorías
✅ **Audio optimizado** - Reproducción fluida, control de volumen, gestión de errores
✅ **Responsive design** - Funciona perfectamente en móviles y desktop
✅ **Atajos de teclado** - Control avanzado sin tocar pantalla
✅ **Animaciones** - Efectos visuales suaves y atractivos
✅ **Toast notifications** - Feedback visual para acciones del usuario

## Instrucciones para usar:

1. **Abrir en un servidor local**:
   - Usar Live Server en VS Code
   - O cualquier servidor HTTP local
   - No funciona abriendo el archivo directamente (CORS)

2. **Probar PWA**:
   - Chrome mostrará opción de instalar
   - Funciona offline después de la primera visita
   - Se puede añadir a pantalla de inicio en móviles

3. **Navegación**:
   - Hacer clic en botones para reproducir sonidos
   - Usar búsqueda para encontrar sonidos específicos  
   - Filtrar por categorías (Hornet, Grub, Grimm, etc.)
   - Atajos: Espacio (parar), M (mute), / (buscar)

## Sonidos incluidos:

- **Hornet**: "Git gud", "Edino", "Shaa", etc. (5 sonidos)
- **Grub**: Sonidos de criaturas (3 sonidos)  
- **Grimm**: Voces de boss (2 sonidos)
- **Dung Defender**: Múltiples voces (9 sonidos)
- **Otros**: Efectos del juego, personajes varios (27 sonidos)

¡La aplicación está lista para usar y es completamente funcional como PWA moderna!