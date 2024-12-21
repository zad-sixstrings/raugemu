// Constants
const CONFIG = {
    SUPPORTED_CORES: {
        snes: ['sfc', 'smc'],
        nes: ['nes'],
        gba: ['gba'],
        gb: ['gb', 'gbc'],
        n64: ['n64', 'z64', 'v64'],
        atari2600: ['a26'],
        psx: ['chd']
    },
    SELECTORS: {
        playButtons: '.play-button',
        popup: '#game-popup',
        closeButton: '#close-popup',
        gameContainer: '#game',
        body: 'body'
    },
    CLASSES: {
        hidden: 'hidden',
        popupActive: 'popup-active'
    },
    PATHS: {
        loader: 'data/loader.js'
    }
};

// EmulatorManager class to handle emulator lifecycle
class EmulatorManager {
    constructor() {
        this.popup = document.querySelector(CONFIG.SELECTORS.popup);
        this.gameContainer = document.querySelector(CONFIG.SELECTORS.gameContainer);
        this.body = document.querySelector(CONFIG.SELECTORS.body);
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Initialize play buttons
        document.querySelectorAll(CONFIG.SELECTORS.playButtons)
            .forEach(button => button.addEventListener('click', () => this.startGame(button)));

        // Initialize close button
        document.querySelector(CONFIG.SELECTORS.closeButton)
            .addEventListener('click', () => this.closeEmulator());
    }

    determineCore(gameUrl) {
        const extension = gameUrl.split('.').pop().toLowerCase();
        return Object.entries(CONFIG.SUPPORTED_CORES)
            .find(([core, extensions]) => extensions.includes(extension))?.[0] || null;
    }

    startGame(button) {
        const gameUrl = button.getAttribute('data-game');
        const core = this.determineCore(gameUrl);
        
        if (!core) {
            this.showError('Unsupported game type!');
            return;
        }

        this.setupEmulator(gameUrl, core);
        this.showEmulator();
    }

    setupEmulator(gameUrl, core) {
        // Clear previous instance
        this.cleanupEmulator();
        
        // Setup EJS properties BEFORE creating the script
        window.EJS_player = CONFIG.SELECTORS.gameContainer;
        window.EJS_gameUrl = gameUrl;
        window.EJS_core = core;
    
        // Small delay to ensure properties are set
        setTimeout(() => {
            // Load emulator script
            const script = document.createElement('script');
            script.src = CONFIG.PATHS.loader;
            document.body.appendChild(script);
        }, 0);
    }

    showEmulator() {
        this.popup.classList.remove(CONFIG.CLASSES.hidden);
        this.body.classList.add(CONFIG.CLASSES.popupActive);
    }

    async closeEmulator() {
        try {
            await this.cleanupEmulator();
            this.hideEmulator();
        } catch (error) {
            console.error('Error during emulator cleanup:', error);
            // Try to hide the UI even if cleanup fails
            this.hideEmulator();
        }
    }

    async cleanupEmulator() {
        if (window.EJS_emulator) {
            try {
                // Pause emulation
                await window.EJS_emulator.pause();
                
                // Remove event listeners
                window.EJS_emulator.removeAllEventListeners?.();
                
                // Clear emulator instance
                window.EJS_emulator = null;
            } catch (e) {
                console.warn('Emulator cleanup warning:', e);
            }
        }

        // Remove loader script
        const oldScript = document.querySelector(`script[src="${CONFIG.PATHS.loader}"]`);
        if (oldScript) oldScript.remove();

        // Clear EJS properties
        this.clearEJSProperties();
        
        // Clear game container
        if (this.gameContainer) this.gameContainer.innerHTML = '';
    }

    clearEJSProperties() {
        const ejsProperties = [
            'EJS_player', 'EJS_gameUrl', 'EJS_core', 'EJS_pathtodata',
            'EJS_ready', 'EJS_onGameStart', 'EJS_onLoadState', 'EJS_onSaveState',
            'EJS_onLoadSave', 'EJS_onSaveSave'
        ];
        
        ejsProperties.forEach(prop => {
            if (window[prop]) delete window[prop];
        });
    }

    hideEmulator() {
        this.popup.classList.add(CONFIG.CLASSES.hidden);
        this.body.classList.remove(CONFIG.CLASSES.popupActive);
    }

    showError(message) {
        alert(message);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EmulatorManager();
});