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
      nds: ["nds"],
      n64: ["n64", "z64", "v64"],
      atari2600: ["a26"],
      atari5200: ["a52"],
      atari7800: ["a78"],
      lynx: ["lnx"],
      segaMS: ["sms", "SMS"],
      segaMD: ["md"],
      segaGG: ["gg"]
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
        return;
      }

      const core = determineCore(gameUrl);
      console.log("Selected core:", core);
      console.log("Game URL:", gameUrl);

      if (!core) {
        console.error("Unsupported game type!");
        return;
      }

      await cleanupEmulator();

      const gameContainer = document.querySelector("#game");
      if (gameContainer) {
        gameContainer.innerHTML = '<div id="emulator"></div>';
      }

      return new Promise((resolve, reject) => {
        // Set up EJS properties
        window.EJS_player = "#emulator";
        if (!gameUrl.startsWith("/")) {
          window.EJS_gameUrl = `/${gameUrl}`;
        } else {
          window.EJS_gameUrl = gameUrl;
        }
        window.EJS_core = core;
        window.EJS_pathtodata = "/data/";
        window.EJS_startOnLoad = true;

        console.log("EJS configuration:", {
          // Add this debug block
          player: window.EJS_player,
          gameUrl: window.EJS_gameUrl,
          core: window.EJS_core,
          pathtodata: window.EJS_pathtodata,
        });

        // Add ready callback before loading script
        window.EJS_onGameStart = () => {
          console.log("Game started!");
          emulatorLoaded.value = true;
          currentGameUrl.value = gameUrl;
          resolve();
        };

        const script = document.createElement("script");
        script.src = `${window.location.origin}/data/loader.js`;
        script.async = true;

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
      const oldScript = document.querySelector('script[src="/data/loader.js"]');
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
      async ([newUrl, isVisible], [oldUrl, oldVisible]) => {
        if (newUrl && isVisible) {
          try {
            if (newUrl !== oldUrl || (!oldVisible && isVisible)) {
              document.body.classList.add("popup-active");
              await setupEmulator(newUrl);
            }
          } catch (error) {
            console.error("Failed to setup emulator:", error);
            emit("close");
          }
        } else if (!isVisible && oldVisible) {
          await cleanupEmulator();
          document.body.classList.remove("popup-active");
        }
      },
      { immediate: true }
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
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  padding: 20px;
  max-width: 1200px;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  cursor: url("/assets/cursor.png"), auto;
}

#close-popup {
  position: absolute;
  top: 0;
  right: 20px;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: url("/assets/cursor.png"), auto;
  z-index: 1001;
  color: white;
  background-color: rgb(216, 11, 55);
  border-radius: 10px;
}


.popup-content {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 850px;
  background: rgb(122, 122, 122);
  border-top: 5px solid rgb(161, 161, 161);
  border-left: 5px solid rgb(161, 161, 161);
  border-right: 5px solid rgb(59, 59, 59);
  border-bottom: 5px solid rgb(59, 59, 59);
  border-radius: 10px;
  overflow: hidden;
}

#close-popup {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 20px;
  border-radius: 2%;
  border: none;
  background: #ff4444;
  border-top: 2px solid #f07a72;
  border-left: 2px solid #f07a72;
  border-right: 2px solid #ad1f2a;
  border-bottom: 2px solid #ad1f2a;
  color: white;
  font-weight: bold;
  font-size: 14px;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: font-size 0.2s;
}

#close-popup:hover {
  cursor: url("/assets/cursor-click.png"), auto;
  font-size: 16px;
}

#close-popup:active {
  background: #da3434;
  border-top: 2px solid #ad1f2a;
  border-left: 2px solid #ad1f2a;
  border-right: 2px solid #f07a72;
  border-bottom: 2px solid #f07a72;
  cursor: url("/assets/cursor-click.png"), auto;
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
  width: 200%;
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

:deep(canvas) {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

</style>
