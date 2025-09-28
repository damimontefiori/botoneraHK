// Main App - Inicializa y coordina todos los componentes
class HollowKnightSoundboardApp {
  constructor() {
    this.audioManager = null;
    this.uiManager = null;
    this.pwaManager = null;
    this.isInitialized = false;
    
    this.init();
  }
  
  async init() {
    try {
      console.log('🎵 Iniciando Hollow Knight Soundboard...');
      
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.startApp());
      } else {
        this.startApp();
      }
      
    } catch (error) {
      console.error('Error initializing app:', error);
      this.showErrorMessage('Error al inicializar la aplicación');
    }
  }
  
  async startApp() {
    try {
      // Show initial loading state
      this.showLoadingScreen();
      
      // Validate required data
      if (!window.SOUNDS_DATA || !window.CATEGORIES || !window.getRandomEmoji) {
        throw new Error('Datos de sonidos no disponibles. Verifique la conexión.');
      }
      
      console.log(`📊 ${window.SOUNDS_DATA.length} sonidos cargados`);
      
      // Initialize managers in sequence
      await this.initializeManagers();
      
      // Setup global event handlers
      this.setupGlobalHandlers();
      
      // Handle initial URL parameters
      this.handleInitialURL();
      
      // Mark as initialized
      this.isInitialized = true;
      
      // Hide loading screen
      this.hideLoadingScreen();
      
      console.log('✅ Hollow Knight Soundboard inicializada correctamente');
      
      // Show welcome message
      this.showWelcomeMessage();
      
    } catch (error) {
      console.error('Error starting app:', error);
      this.hideLoadingScreen();
      this.showErrorMessage('Error al cargar la aplicación');
    }
  }
  
  async initializeManagers() {
    // Initialize Audio Manager
    this.audioManager = new AudioManager();
    console.log('🔊 Audio Manager inicializado');
    
    // Wait a bit for audio setup
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Initialize UI Manager
    this.uiManager = new UIManager(this.audioManager);
    console.log('🎨 UI Manager inicializado');
    
    // Initialize PWA Manager
    this.pwaManager = new PWAManager();
    console.log('📱 PWA Manager inicializado');
    
    // Setup keyboard shortcuts
    this.setupKeyboardShortcuts();
  }
  
  setupGlobalHandlers() {
    // Handle visibility change for audio management
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.audioManager?.isPlaying) {
        // Optionally pause audio when tab is hidden
        // this.audioManager.stop();
      }
    });
    
    // Handle page unload
    window.addEventListener('beforeunload', () => {
      if (this.audioManager) {
        this.audioManager.stop();
      }
    });
    
    // Handle errors globally
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      this.showErrorToast('Se produjo un error inesperado');
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      e.preventDefault(); // Prevent default browser behavior
    });
  }
  
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't handle shortcuts if user is typing
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      
      switch (e.key.toLowerCase()) {
        case ' ': // Spacebar - Stop current sound
          e.preventDefault();
          if (this.audioManager?.isPlaying) {
            this.audioManager.stop();
          }
          break;
          
        case 'm': // M - Toggle mute
          e.preventDefault();
          this.audioManager?.toggleMute();
          break;
          
        case '/': // / - Focus search
          e.preventDefault();
          document.getElementById('search-input')?.focus();
          break;
          
        case 'escape': // Escape - Clear search/reset
          this.handleEscapeKey();
          break;
          
        case 'h': // H - Show help
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.showHelpDialog();
          }
          break;
          
        case 'i': // I - Install app (if available)
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.pwaManager?.promptInstall();
          }
          break;
      }
    });
  }
  
  handleInitialURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Handle direct sound links
    const soundId = params.get('sound');
    if (soundId) {
      const sound = SOUNDS_DATA.find(s => s.id === parseInt(soundId));
      if (sound) {
        // Wait a bit for everything to load, then play
        setTimeout(() => {
          this.audioManager?.playSound(sound);
        }, 1000);
      }
    }
    
    // Handle filter parameter
    const filter = params.get('filter');
    if (filter && this.uiManager) {
      this.uiManager.setActiveFilter(filter);
    }
  }
  
  handleEscapeKey() {
    const searchInput = document.getElementById('search-input');
    
    if (document.activeElement === searchInput) {
      searchInput.blur();
    } else if (this.uiManager?.searchTerm || this.uiManager?.currentFilter !== 'all') {
      // Clear search and reset filter
      if (searchInput) {
        searchInput.value = '';
      }
      this.uiManager?.setActiveFilter('all');
      this.uiManager.searchTerm = '';
      this.uiManager?.filterAndRenderSounds();
    }
  }
  
  showLoadingScreen() {
    const loadingHTML = `
      <div id="app-loading-screen" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: var(--text-primary);
      ">
        <div style="text-align: center;">
          <div style="font-size: 4rem; margin-bottom: 1rem; animation: float 2s ease-in-out infinite;">⚔️</div>
          <h2 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 0.5rem;">
            Hollow Knight Soundboard
          </h2>
          <p style="color: var(--text-secondary); margin-bottom: 2rem;">
            Cargando sonidos épicos...
          </p>
          <div style="
            width: 40px;
            height: 40px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--accent-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          "></div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
  }
  
  hideLoadingScreen() {
    const loadingScreen = document.getElementById('app-loading-screen');
    if (loadingScreen) {
      loadingScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
      setTimeout(() => {
        if (loadingScreen.parentElement) {
          loadingScreen.parentElement.removeChild(loadingScreen);
        }
      }, 500);
    }
  }
  
  showWelcomeMessage() {
    // Only show on first visit
    const hasVisited = localStorage.getItem('hk-soundboard-visited');
    
    if (!hasVisited) {
      setTimeout(() => {
        this.showToast('¡Bienvenido a la Botonera de Hollow Knight! 🎵⚔️', 'info');
        localStorage.setItem('hk-soundboard-visited', 'true');
      }, 1000);
    }
  }
  
  showErrorMessage(message) {
    const errorHTML = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-secondary);
        padding: 2rem;
        border-radius: 1rem;
        border: 2px solid var(--error);
        text-align: center;
        z-index: 9999;
        max-width: 400px;
      ">
        <div style="font-size: 2rem; margin-bottom: 1rem;">😞</div>
        <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Oops!</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${message}</p>
        <button onclick="window.location.reload()" style="
          background: var(--accent-primary);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
        ">
          Reintentar
        </button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorHTML);
  }
  
  showHelpDialog() {
    const helpHTML = `
      <div id="help-dialog" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      " onclick="this.remove()">
        <div style="
          background: var(--bg-secondary);
          padding: 2rem;
          border-radius: 1rem;
          border: 2px solid var(--border-color);
          max-width: 500px;
          max-height: 80vh;
          overflow-y: auto;
        " onclick="event.stopPropagation()">
          <h3 style="color: var(--text-primary); margin-bottom: 1rem;">
            ⌨️ Atajos de Teclado
          </h3>
          <ul style="color: var(--text-secondary); line-height: 2;">
            <li><strong>Espacio:</strong> Detener sonido actual</li>
            <li><strong>M:</strong> Silenciar/Activar sonido</li>
            <li><strong>/:</strong> Buscar sonidos</li>
            <li><strong>Escape:</strong> Limpiar búsqueda</li>
            <li><strong>Ctrl+H:</strong> Mostrar esta ayuda</li>
            <li><strong>Ctrl+I:</strong> Instalar aplicación</li>
          </ul>
          <button onclick="document.getElementById('help-dialog').remove()" style="
            background: var(--accent-primary);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            cursor: pointer;
            font-weight: 600;
            margin-top: 1rem;
            width: 100%;
          ">
            Cerrar
          </button>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', helpHTML);
  }
  
  showToast(message, type = 'info') {
    if (this.audioManager) {
      this.audioManager.showToast(message, type);
    }
  }
  
  showErrorToast(message) {
    this.showToast(message, 'error');
  }
  
  // Public API for external access
  getAPI() {
    return {
      playSound: (soundId) => {
        const sound = SOUNDS_DATA.find(s => s.id === soundId);
        if (sound && this.audioManager) {
          return this.audioManager.playSound(sound);
        }
      },
      stopSound: () => {
        if (this.audioManager) {
          this.audioManager.stop();
        }
      },
      setFilter: (filter) => {
        if (this.uiManager) {
          this.uiManager.setActiveFilter(filter);
        }
      },
      search: (term) => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.value = term;
          searchInput.dispatchEvent(new Event('input'));
        }
      },
      getStats: () => {
        return {
          totalSounds: SOUNDS_DATA.length,
          categories: Object.keys(CATEGORIES),
          currentFilter: this.uiManager?.currentFilter,
          isPlaying: this.audioManager?.isPlaying,
          currentSound: this.audioManager?.currentSound
        };
      }
    };
  }
}

// Global error handling styles
const errorStyles = document.createElement('style');
errorStyles.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;
document.head.appendChild(errorStyles);

// Initialize the app
const app = new HollowKnightSoundboardApp();

// Make app available globally for debugging
window.HollowKnightApp = app;