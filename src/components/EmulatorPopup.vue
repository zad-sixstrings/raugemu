<template>
  <div v-if="isVisible" id="game-popup" :class="{ hidden: !isVisible }">
    <div class="popup-content">
      <button class="close-popup" @click="closeEmulator">X</button>
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
      vb: ["vb"],
      atari2600: ["a26"],
      atari5200: ["a52"],
      atari7800: ["a78"],
      lynx: ["lnx"],
      jaguar: ["j64"],
      segaMS: ["sms", "SMS"],
      segaMD: ["md"],
      segaGG: ["gg"],
      sega32x: ["32x"],
      segaSaturn: ["chd"],
      coleco: ["col"],
      psx: ["chd"],
      psp: ["chd"],
    };

    const determineCore = (url) => {
      // First check if it's a CHD file that needs path checking
      const extension = url.split(".").pop().toLowerCase();
      if (extension === "chd") {
        // Split the path and look for known console folders
        const parts = url.split("/");
        // Look for Saturn, PSX, or PSP in the path
        if (parts.includes("Saturn")) {
          console.log("Detected Saturn game from path");
          return "segaSaturn";
        }
        if (parts.includes("PSX")) {
          console.log("Detected PlayStation game from path");
          return "psx";
        }
        if (parts.includes("PSP")) {
          console.log("Detected PSP game from path");
          return "psp";
        }
      }

      // Fall back to regular extension matching for other consoles
      console.log("File extension:", extension);

      const matchedCore = Object.entries(SUPPORTED_CORES).find(
        ([core, extensions]) => extensions.includes(extension)
      )?.[0];

      console.log("Matched core:", matchedCore);
      return matchedCore || null;
    };

    const CORES_REQUIRING_BIOS = {
      coleco: {
        path: "colecovision.rom",
        md5: "2c66f5911e5b42b8ebe113403548eee7",
      },
      psx: {
        path: "scph5502.bin",
      },
      gb: {
        path: (gameUrl) => {
          // Make sure we have a URL to check
          if (!gameUrl) return "gb_bios.bin"; // default to GB bios if no url
          const extension = gameUrl.split(".").pop().toLowerCase();
          return extension === "gbc" ? "gbc_bios.bin" : "gb_bios.bin";
        },
      },
      gba: {
        path: "gba_bios.bin",
      },
      segaSaturn: {
        path: "saturn_bios.bin",
      },
    };

    const requiresThreads = (core) => {
      // PSP is currently the only core that requires threads
      return core === "psp";
    };

    const setupEmulator = async (gameUrl) => {
      if (currentGameUrl.value === gameUrl && emulatorLoaded.value) {
        return;
      }

      const core = determineCore(gameUrl);
      console.log("Core for BIOS lookup:", core);
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

        if (requiresThreads(core)) {
          window.EJS_threads = true;
        }

        if (CORES_REQUIRING_BIOS[core]) {
          const biosPath = CORES_REQUIRING_BIOS[core].path;
          if (typeof biosPath === "function") {
            window.EJS_biosUrl = `/bios/${biosPath(window.EJS_gameUrl)}`;
          } else {
            window.EJS_biosUrl = `/bios/${biosPath}`;
          }
          console.log("BIOS path set to:", window.EJS_biosUrl);
        }

        // Add BIOS configuration if needed for this core
        // if (CORES_REQUIRING_BIOS[core]) {
        //   window.EJS_biosUrl = `/bios/${CORES_REQUIRING_BIOS[core].path}`;
        //   console.log("BIOS path set to:", window.EJS_biosUrl);
        // }

        window.EJS_startOnLoad = true;

        console.log("EJS configuration:", {
          player: window.EJS_player,
          gameUrl: window.EJS_gameUrl,
          core: window.EJS_core,
          pathtodata: window.EJS_pathtodata,
          biosUrl: window.EJS_biosUrl,
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
      // Only proceed if emulator is loaded
      if (window.EJS_emulator && emulatorLoaded.value) {
        try {
          // Pause the game first
          await window.EJS_emulator.pause();

          // Wait a moment for the pause to take effect
          await new Promise((resolve) => setTimeout(resolve, 200));

          const gameManager = window.EJS_emulator.gameManager;

          if (gameManager && !gameManager.EJS.failedToStart) {
            // Save files first
            await new Promise((resolve) => {
              gameManager.functions.saveSaveFiles();
              setTimeout(resolve, 300); // Give it time to complete
            });

            // Then wait for server save
            await new Promise((resolve) => {
              gameManager.recordStopTime();
              gameManager.setSaveFileToServer();
              setTimeout(resolve, 300); // Give it time to complete
            });

            // Finally unmount if FS exists
            if (gameManager.FS) {
              await new Promise((resolve) => {
                try {
                  gameManager.FS.unmount("/data/saves");
                } catch (e) {
                  console.warn("Unmount warning:", e);
                }
                resolve();
              });
            }
          }

          // Final wait before cleanup
          await new Promise((resolve) => setTimeout(resolve, 200));
        } catch (e) {
          console.warn("Save process warning:", e);
        }
      }

      // Now proceed with cleanup
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

.popup-content {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 850px;
  background: var(--main-light);
  border-top: 5px solid var(--border-light);
  border-left: 5px solid var(--border-light);
  border-right: 5px solid var(--border-dark);
  border-bottom: 5px solid var(--border-dark);
  border-radius: 10px;
  overflow: hidden;
}

button.close-popup {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 28px;
  border-top-right-radius: 5px;
  border: none;
  background: var(--red);
  border-top: 5px solid var(--border-danger-light);
  border-left: 5px solid var(--border-danger-light);
  border-right: 5px solid var(--border-danger-dark);
  border-bottom: 5px solid var(--border-danger-dark);
  color: white;
  font-family: var(--font-primary);
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 10px;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: font-size 0.2s;
}

button.close-popup:hover {
  cursor: url("/assets/cursor-click.png"), auto;
  font-size: 13px;
}

button.close-popup:active {
  background: var(--red-active);
  border-top: 5px solid var(--border-danger-dark);
  border-left: 5px solid var(--border-danger-dark);
  border-right: 5px solid var(--border-danger-light);
  border-bottom: 5px solid var(--border-danger-light);
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
  height: 98%;
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
