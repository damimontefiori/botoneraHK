// PWA Manager - Maneja la funcionalidad de Progressive Web App
class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    
    this.init();
  }
  
  init() {
    this.checkInstallStatus();
    this.setupInstallPrompt();
    this.registerServiceWorker();
    this.setupUpdateNotifications();
  }
  
  checkInstallStatus() {
    // Check if app is running as installed PWA
    this.isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                      window.navigator.standalone === true;
    
    if (this.isInstalled) {
      this.hideInstallButton();
    }
  }
  
  setupInstallPrompt() {
    const installButton = document.getElementById('install-btn');
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      
      // Show install button
      this.showInstallButton();
    });
    
    // Handle install button click
    if (installButton) {
      installButton.addEventListener('click', () => {
        this.promptInstall();
      });
    }
    
    // Listen for app installed event
    window.addEventListener('appinstalled', (e) => {
      console.log('PWA was installed');
      this.isInstalled = true;
      this.hideInstallButton();
      this.showToast('¡App instalada correctamente! 🎉', 'success');
      
      // Reset the deferred prompt
      this.deferredPrompt = null;
    });
  }
  
  async promptInstall() {
    if (!this.deferredPrompt) {
      this.showToast('La instalación no está disponible en este momento', 'warning');
      return;
    }
    
    try {
      // Show the install prompt
      this.deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        this.showToast('Instalando aplicación...', 'info');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      // Clear the deferred prompt
      this.deferredPrompt = null;
      
    } catch (error) {
      console.error('Error showing install prompt:', error);
      this.showToast('Error al mostrar la instalación', 'error');
    }
  }
  
  showInstallButton() {
    const installButton = document.getElementById('install-btn');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.style.opacity = '1';
      installButton.disabled = false;
    }
  }
  
  hideInstallButton() {
    const installButton = document.getElementById('install-btn');
    if (installButton) {
      installButton.style.display = 'none';
      installButton.disabled = true;
    }
  }
  
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./sw.js');
        console.log('ServiceWorker registration successful:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New update available
                  this.showUpdateNotification();
                } else {
                  // App is being cached for the first time
                  this.showToast('App lista para usar sin conexión! 📱', 'success');
                }
              }
            });
          }
        });
        
      } catch (error) {
        console.error('ServiceWorker registration failed:', error);
      }
    }
  }
  
  setupUpdateNotifications() {
    // Listen for service worker controller change
    navigator.serviceWorker?.addEventListener('controllerchange', () => {
      if (!this.refreshing) {
        window.location.reload();
      }
    });
  }
  
  showUpdateNotification() {
    const updateToast = document.createElement('div');
    updateToast.className = 'toast update-toast';
    updateToast.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 1rem;">
        <span>Nueva actualización disponible 🚀</span>
        <button id="update-btn" style="
          background: var(--accent-primary);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
        ">Actualizar</button>
      </div>
    `;
    
    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(updateToast);
      
      // Handle update button click
      const updateButton = updateToast.querySelector('#update-btn');
      updateButton?.addEventListener('click', () => {
        this.skipWaiting();
        container.removeChild(updateToast);
      });
      
      // Auto-remove after 10 seconds
      setTimeout(() => {
        if (updateToast.parentElement) {
          container.removeChild(updateToast);
        }
      }, 10000);
    }
  }
  
  async skipWaiting() {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      this.refreshing = true;
    }
  }
  
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(toast);
      
      setTimeout(() => {
        if (toast.parentElement) {
          toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
          setTimeout(() => {
            if (toast.parentElement) {
              container.removeChild(toast);
            }
          }, 300);
        }
      }, 3000);
    }
  }
  
  // Share functionality
  async shareSound(sound) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Hollow Knight Sound: ${sound.name}`,
          text: `Escucha este épico sonido de Hollow Knight: ${sound.name}`,
          url: `${window.location.origin}${window.location.pathname}?sound=${sound.id}`
        });
      } catch (error) {
        console.log('Error sharing:', error);
        this.fallbackShare(sound);
      }
    } else {
      this.fallbackShare(sound);
    }
  }
  
  fallbackShare(sound) {
    // Fallback: copy to clipboard
    const url = `${window.location.origin}${window.location.pathname}?sound=${sound.id}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('Enlace copiado al portapapeles! 📋', 'success');
      });
    } else {
      // Ultra fallback
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showToast('Enlace copiado! 📋', 'success');
    }
  }
  
  // Handle offline status
  setupOfflineHandler() {
    window.addEventListener('online', () => {
      this.showToast('¡Conexión restaurada! 🌐', 'success');
    });
    
    window.addEventListener('offline', () => {
      this.showToast('Sin conexión - Modo offline activo 📱', 'warning');
    });
  }
  
  // Get installation info
  getInstallInfo() {
    return {
      isInstallable: !!this.deferredPrompt,
      isInstalled: this.isInstalled,
      isServiceWorkerSupported: 'serviceWorker' in navigator,
      isOnline: navigator.onLine
    };
  }
}

// PWA utilities
const PWAUtils = {
  // Check if device supports PWA features
  checkPWASupport() {
    return {
      serviceWorker: 'serviceWorker' in navigator,
      pushNotifications: 'PushManager' in window,
      backgroundSync: 'serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype,
      webShare: 'share' in navigator,
      installPrompt: true, // Will be determined by beforeinstallprompt event
      fullscreen: 'requestFullscreen' in document.documentElement
    };
  },
  
  // Get device info for PWA optimization
  getDeviceInfo() {
    return {
      isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
      isAndroid: /Android/.test(navigator.userAgent),
      isStandalone: window.matchMedia('(display-mode: standalone)').matches,
      hasTouch: 'ontouchstart' in window
    };
  },
  
  // Optimize for mobile
  optimizeForMobile() {
    const deviceInfo = this.getDeviceInfo();
    
    if (deviceInfo.isMobile) {
      // Prevent zoom on input focus
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      }
      
      // Add mobile-specific classes
      document.body.classList.add('mobile-device');
      
      if (deviceInfo.isIOS) {
        document.body.classList.add('ios-device');
      }
      
      if (deviceInfo.isAndroid) {
        document.body.classList.add('android-device');
      }
    }
  }
};

// PWAManager disponible globalmente

// Initialize PWA utilities
PWAUtils.optimizeForMobile();