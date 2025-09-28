// UI Manager - Maneja la interfaz de usuario y filtros
class UIManager {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.currentFilter = 'all';
    this.searchTerm = '';
    this.sounds = [...SOUNDS_DATA];
    this.filteredSounds = [...this.sounds];
    
    this.setupEventListeners();
    this.renderSounds();
  }
  
  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase().trim();
        this.filterAndRenderSounds();
        
        // Show/hide clear button
        clearButton.style.opacity = this.searchTerm ? '1' : '0';
        clearButton.style.visibility = this.searchTerm ? 'visible' : 'hidden';
      });
      
      // Handle search on Enter
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.focusFirstResult();
        }
      });
    }
    
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        this.searchTerm = '';
        this.filterAndRenderSounds();
        clearButton.style.opacity = '0';
        clearButton.style.visibility = 'hidden';
        searchInput.focus();
      });
    }
    
    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.setActiveFilter(tab.getAttribute('data-filter'));
      });
    });
    
    // Handle URL parameters for direct filtering
    this.handleURLParams();
  }
  
  handleURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    if (filterParam && CATEGORIES[filterParam]) {
      this.setActiveFilter(filterParam);
    }
  }
  
  setActiveFilter(filter) {
    this.currentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-filter') === filter);
    });
    
    // Update URL without reloading
    const newUrl = filter === 'all' 
      ? window.location.pathname 
      : `${window.location.pathname}?filter=${filter}`;
    window.history.replaceState({}, '', newUrl);
    
    this.filterAndRenderSounds();
  }
  
  filterAndRenderSounds() {
    // Apply category filter
    let filtered = this.currentFilter === 'all' 
      ? [...this.sounds]
      : this.sounds.filter(sound => sound.category === this.currentFilter);
    
    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(sound => 
        sound.name.toLowerCase().includes(this.searchTerm) ||
        sound.category.toLowerCase().includes(this.searchTerm) ||
        sound.tags.some(tag => tag.toLowerCase().includes(this.searchTerm))
      );
    }
    
    this.filteredSounds = filtered;
    this.renderSounds();
  }
  
  renderSounds() {
    const grid = document.getElementById('sounds-grid');
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    
    if (!grid) return;
    
    // Show loading briefly for smooth UX
    this.showLoading(true);
    
    setTimeout(() => {
      // Clear existing content
      grid.innerHTML = '';
      
      if (this.filteredSounds.length === 0) {
        this.showEmptyState(true);
        this.showLoading(false);
        return;
      }
      
      // Create sound buttons
      this.filteredSounds.forEach(sound => {
        const button = this.createSoundButton(sound);
        grid.appendChild(button);
      });
      
      // Add stagger animation
      this.animateButtons();
      
      this.showEmptyState(false);
      this.showLoading(false);
      
    }, 150); // Small delay for smooth transition
  }
  
  createSoundButton(sound) {
    const button = document.createElement('button');
    button.className = 'sound-button';
    button.setAttribute('data-sound-id', sound.id);
    button.setAttribute('aria-label', `Reproducir ${sound.name}`);
    
    // Get random emoji for the sound
    const emoji = getRandomEmoji();
    
    button.innerHTML = `
      <div class="sound-emoji">${emoji}</div>
      <div class="sound-name">${sound.name}</div>
      <div class="sound-category">${CATEGORIES[sound.category]?.name || sound.category}</div>
    `;
    
    // Add category color as custom property
    button.style.setProperty('--category-color', sound.color);
    
    // Add click event
    button.addEventListener('click', () => {
      this.handleSoundClick(sound);
    });
    
    // Add keyboard support
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.handleSoundClick(sound);
      }
    });
    
    return button;
  }
  
  async handleSoundClick(sound) {
    try {
      // Add haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      
      // Play sound
      await this.audioManager.playSound(sound);
      
      // Track usage for analytics (if needed)
      this.trackSoundUsage(sound);
      
    } catch (error) {
      console.error('Error handling sound click:', error);
    }
  }
  
  trackSoundUsage(sound) {
    // Store in localStorage for potential analytics
    const usage = JSON.parse(localStorage.getItem('hk-sound-usage') || '{}');
    usage[sound.id] = (usage[sound.id] || 0) + 1;
    localStorage.setItem('hk-sound-usage', JSON.stringify(usage));
  }
  
  animateButtons() {
    const buttons = document.querySelectorAll('.sound-button');
    buttons.forEach((button, index) => {
      button.style.animationDelay = `${index * 50}ms`;
      button.classList.add('animate-in');
    });
  }
  
  focusFirstResult() {
    const firstButton = document.querySelector('.sound-button');
    if (firstButton) {
      firstButton.focus();
    }
  }
  
  showLoading(show) {
    const loadingState = document.getElementById('loading-state');
    if (loadingState) {
      loadingState.style.display = show ? 'block' : 'none';
    }
  }
  
  showEmptyState(show) {
    const emptyState = document.getElementById('empty-state');
    if (emptyState) {
      emptyState.style.display = show ? 'block' : 'none';
    }
  }
  
  // Update search suggestions (future enhancement)
  updateSearchSuggestions(term) {
    const suggestions = this.sounds
      .filter(sound => 
        sound.name.toLowerCase().includes(term) ||
        sound.tags.some(tag => tag.toLowerCase().includes(term))
      )
      .slice(0, 5)
      .map(sound => sound.name);
    
    return suggestions;
  }
  
  // Get popular sounds based on usage
  getPopularSounds(limit = 10) {
    const usage = JSON.parse(localStorage.getItem('hk-sound-usage') || '{}');
    return this.sounds
      .map(sound => ({
        ...sound,
        playCount: usage[sound.id] || 0
      }))
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, limit);
  }
  
  // Keyboard shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Space bar to stop current sound
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        if (this.audioManager.isPlaying) {
          this.audioManager.stop();
        }
      }
      
      // Escape to clear search and reset filters
      if (e.key === 'Escape') {
        const searchInput = document.getElementById('search-input');
        if (searchInput && document.activeElement === searchInput) {
          searchInput.blur();
        } else if (this.searchTerm || this.currentFilter !== 'all') {
          searchInput.value = '';
          this.searchTerm = '';
          this.setActiveFilter('all');
        }
      }
      
      // Slash to focus search
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    });
  }
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
  .sound-button {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .sound-button.animate-in {
    animation: fadeInUp 0.5s ease forwards;
  }
  
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .sound-button:hover {
    border-color: var(--category-color, var(--accent-primary));
  }
  
  .sound-button.playing {
    border-color: var(--success);
    background: linear-gradient(135deg, 
      rgba(34, 197, 94, 0.1), 
      rgba(34, 197, 94, 0.05));
  }
`;
document.head.appendChild(animationStyles);

// UIManager disponible globalmente