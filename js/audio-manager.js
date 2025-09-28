// Audio Manager - Maneja la reproducción de sonidos
class AudioManager {
  constructor() {
    this.audioPlayer = document.getElementById('audio-player');
    this.currentSound = null;
    this.isPlaying = false;
    this.volume = 0.7;
    this.isMuted = false;
    this.audioDownloadProgress = { downloaded: 0, total: 0 };
    
    this.setupAudioPlayer();
    this.setupVolumeControl();
    this.setupServiceWorkerMessages();
  }
  
  setupAudioPlayer() {
    if (!this.audioPlayer) {
      console.error('Audio player element not found');
      return;
    }
    
    // Set initial volume
    this.audioPlayer.volume = this.volume;
    
    // Event listeners
    this.audioPlayer.addEventListener('loadstart', () => {
      this.showToast('Cargando sonido...', 'info');
    });
    
    this.audioPlayer.addEventListener('canplay', () => {
      console.log('Audio ready to play');
    });
    
    this.audioPlayer.addEventListener('play', () => {
      this.isPlaying = true;
      this.updatePlayingState();
    });
    
    this.audioPlayer.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updatePlayingState();
    });
    
    this.audioPlayer.addEventListener('ended', () => {
      this.isPlaying = false;
      this.currentSound = null;
      this.updatePlayingState();
      this.showToast('¡Sonido terminado! 🎵', 'success');
    });
    
    this.audioPlayer.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      this.isPlaying = false;
      this.currentSound = null;
      this.updatePlayingState();
      this.showToast('Error al reproducir el sonido 😞', 'error');
    });
    
    // Handle loading errors gracefully
    this.audioPlayer.addEventListener('loadstart', () => {
      // Clear any previous error states
      this.audioPlayer.removeAttribute('data-error');
    });
  }
  
  setupVolumeControl() {
    const volumeButton = document.getElementById('volume-toggle');
    if (volumeButton) {
      volumeButton.addEventListener('click', () => {
        this.toggleMute();
      });
    }
  }
  
  async playSound(soundData) {
    try {
      // Stop current sound if playing
      if (this.isPlaying) {
        this.stop();
      }
      
      // Update current sound
      this.currentSound = soundData;
      
      // Set audio source
      this.audioPlayer.src = soundData.url;
      
      // Add loading class to button
      const button = document.querySelector(`[data-sound-id="${soundData.id}"]`);
      if (button) {
        button.classList.add('loading');
      }
      
      // Attempt to play
      const playPromise = this.audioPlayer.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        this.showToast(`🎵 Reproduciendo: ${soundData.name}`, 'success');
      }
      
    } catch (error) {
      console.error('Error playing sound:', error);
      this.handlePlayError(error);
    } finally {
      // Remove loading class
      const button = document.querySelector(`[data-sound-id="${soundData.id}"]`);
      if (button) {
        button.classList.remove('loading');
      }
    }
  }
  
  stop() {
    if (this.audioPlayer) {
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
    }
    this.isPlaying = false;
    this.currentSound = null;
    this.updatePlayingState();
  }
  
  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audioPlayer.volume = this.isMuted ? 0 : this.volume;
    
    const volumeButton = document.getElementById('volume-toggle');
    if (volumeButton) {
      volumeButton.textContent = this.isMuted ? '🔇' : '🔊';
      volumeButton.setAttribute('aria-label', 
        this.isMuted ? 'Activar sonido' : 'Silenciar sonido');
    }
    
    this.showToast(
      this.isMuted ? 'Sonido silenciado 🔇' : 'Sonido activado 🔊',
      'info'
    );
  }
  
  setVolume(newVolume) {
    this.volume = Math.max(0, Math.min(1, newVolume));
    if (!this.isMuted) {
      this.audioPlayer.volume = this.volume;
    }
  }
  
  updatePlayingState() {
    // Remove playing class from all buttons
    document.querySelectorAll('.sound-button').forEach(button => {
      button.classList.remove('playing');
    });
    
    // Add playing class to current button
    if (this.currentSound && this.isPlaying) {
      const currentButton = document.querySelector(`[data-sound-id="${this.currentSound.id}"]`);
      if (currentButton) {
        currentButton.classList.add('playing');
      }
    }
  }
  
  handlePlayError(error) {
    let errorMessage = 'Error al reproducir el sonido';
    
    switch (error.name) {
      case 'NotAllowedError':
        errorMessage = 'Permiso denegado. Haz clic para activar el audio 🔊';
        break;
      case 'NotSupportedError':
        errorMessage = 'Formato de audio no compatible 😞';
        break;
      case 'AbortError':
        errorMessage = 'Reproducción cancelada';
        break;
      default:
        errorMessage = 'No se pudo cargar el archivo de audio 📡';
    }
    
    this.showToast(errorMessage, 'error');
  }
  
  showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add to container
    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(toast);
      
      // Auto remove after 3 seconds
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
  
  // Preload audio for better performance
  preloadAudio(url) {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = url;
    return audio;
  }
  
  // Get current playback info
  getCurrentInfo() {
    return {
      isPlaying: this.isPlaying,
      currentSound: this.currentSound,
      volume: this.volume,
      isMuted: this.isMuted,
      currentTime: this.audioPlayer?.currentTime || 0,
      duration: this.audioPlayer?.duration || 0
    };
  }
  
  // Configurar comunicación con Service Worker
  setupServiceWorkerMessages() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, progress } = event.data;
        
        switch (type) {
          case 'AUDIO_DOWNLOAD_PROGRESS':
            this.audioDownloadProgress = progress;
            this.updateDownloadProgress(progress);
            break;
            
          case 'AUDIO_DOWNLOAD_COMPLETED':
            this.showToast('🎵 Todos los sonidos descargados para uso offline!', 'success');
            this.audioDownloadProgress = progress;
            break;
        }
      });
    }
  }
  
  // Mostrar progreso de descarga
  updateDownloadProgress(progress) {
    if (progress.downloaded > 0 && progress.downloaded < progress.total) {
      const percentage = Math.round((progress.downloaded / progress.total) * 100);
      this.showToast(`📥 Descargando sonidos: ${percentage}%`, 'info', false);
    }
  }
}

// CSS animation for slide out
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .sound-button.loading {
    opacity: 0.7;
    pointer-events: none;
  }
  
  .sound-button.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top: 2px solid var(--accent-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);

// AudioManager disponible globalmente