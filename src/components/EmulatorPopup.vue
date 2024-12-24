<template>
  <div v-if="isVisible" id="game-popup" :class="{ hidden: !isVisible }">
    <div class="popup-content">
      <button id="close-popup" @click="closeEmulator">X</button>
      <div class="game-wrapper">
        <div id="game">
          <div id="emulator"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";

export default {
  name: "EmulatorPopup",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    gameUrl: {
      type: String,
      required: true,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const emulatorLoaded = ref(false);
    const currentGameUrl = ref(null);

    const SUPPORTED_CORES = {
      snes: ["sfc", "smc"],
      nes: ["nes"],
      gba: ["gba"],
      gb: ["gb", "gbc"],
      n64: ["n64", "z64", "v64"],
      atari2600: ["a26"],
      psx: ["chd"],
    };

    const determineCore = (url) => {
      const extension = url.split(".").pop().toLowerCase();
      return (
        Object.entries(SUPPORTED_CORES).find(([core, extensions]) =>
          extensions.includes(extension)
        )?.[0] || null
      );
    };

    const setupEmulator = async (gameUrl) => {
      if (currentGameUrl.value === gameUrl && emulatorLoaded.value) {
        return; // Prevent duplicate setup
      }

      const core = determineCore(gameUrl);
      if (!core) {
        console.error("Unsupported game type!");
        return;
      }

      // Clean up previous instance
      await cleanupEmulator();

      // Create a new container for the emulator
      const gameContainer = document.querySelector("#game");
      if (gameContainer) {
        gameContainer.innerHTML = '<div id="emulator"></div>';
      }

      // Setup EJS properties with correct paths
      window.EJS_player = "#emulator";
      window.EJS_gameUrl = gameUrl; // This should now be something like '/ROM/game.smc'
      window.EJS_core = core;
      window.EJS_pathtodata = "data/"; // Remove leading slash for relative path
      window.EJS_startOnLoad = true;

      // Create and load emulator script
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "data/loader.js"; // Remove leading slash for relative path
        script.async = true;

        script.onload = () => {
          emulatorLoaded.value = true;
          currentGameUrl.value = gameUrl;
          resolve();
        };

        script.onerror = (error) => {
          console.error("Failed to load EmulatorJS:", error);
          reject(error);
        };

        document.body.appendChild(script);
      });
    };

    const cleanupEmulator = async () => {
      if (window.EJS_emulator) {
        try {
          await window.EJS_emulator.pause();
          window.EJS_emulator.removeAllEventListeners?.();
          window.EJS_emulator = null;
        } catch (e) {
          console.warn("Emulator cleanup warning:", e);
        }
      }

      // Remove loader script with updated path
      const oldScript = document.querySelector('script[src="data/loader.js"]');
      if (oldScript) oldScript.remove();

      // Clear EJS properties
      const ejsProperties = [
        "EJS_player",
        "EJS_gameUrl",
        "EJS_core",
        "EJS_pathtodata",
        "EJS_ready",
        "EJS_startOnLoad",
        "EJS_onGameStart",
        "EJS_onLoadState",
        "EJS_onSaveState",
        "EJS_onLoadSave",
        "EJS_onSaveSave",
      ];

      ejsProperties.forEach((prop) => {
        if (window[prop]) delete window[prop];
      });

      emulatorLoaded.value = false;
      currentGameUrl.value = null;
    };

    const closeEmulator = async () => {
      await cleanupEmulator();
      document.body.classList.remove("popup-active");
      emit("close");
    };

    // Watch for changes in gameUrl and visibility
    watch(
      [() => props.gameUrl, () => props.isVisible],
      async ([newUrl, isVisible]) => {
        if (newUrl && isVisible) {
          try {
            document.body.classList.add("popup-active");
            await setupEmulator(newUrl);
          } catch (error) {
            console.error("Failed to setup emulator:", error);
            emit("close");
          }
        }
      }
    );

    // Cleanup on component unmount
    onUnmounted(async () => {
      await cleanupEmulator();
    });

    return {
      closeEmulator,
    };
  },
};
</script>

<style scoped>
#game-popup {
  position: fixed;
  top: 50;
  left: 50;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.popup-content {
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 90%;
  max-height: 800px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

#close-popup {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #ff4444;
  color: white;
  font-weight: bold;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

#close-popup:hover {
  background: #ff6666;
}

.game-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

#game {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

#emulator {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* Sizing for the EJS canvas (at least I tried...) */
:deep(canvas) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
