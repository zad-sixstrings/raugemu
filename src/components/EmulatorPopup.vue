<template>
  <div v-if="isVisible" id="game-popup" :class="{ hidden: !isVisible }">
    <div class="popup-content">
      <button id="close-popup" @click="closeEmulator">X</button>
      <div class="game-wrapper">
        <div id="game"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue"; // Added watch import

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

    const setupEmulator = (gameUrl) => {
      const core = determineCore(gameUrl);
      if (!core) {
        console.error("Unsupported game type!");
        return;
      }

      // Clear previous instance
      cleanupEmulator();

      // Setup EJS properties
      window.EJS_player = "#game";
      window.EJS_gameUrl = gameUrl;
      window.EJS_core = core;
      window.EJS_pathtodata = "./data/";

      // Load emulator script
      const script = document.createElement("script");
      script.src = "./data/loader.js";
      document.body.appendChild(script);

      // Add class to body for popup styling
      document.body.classList.add("popup-active");
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

      // Remove loader script
      const oldScript = document.querySelector(
        'script[src="./data/loader.js"]'
      );
      if (oldScript) oldScript.remove();

      // Clear EJS properties
      const ejsProperties = [
        "EJS_player",
        "EJS_gameUrl",
        "EJS_core",
        "EJS_pathtodata",
        "EJS_ready",
        "EJS_onGameStart",
        "EJS_onLoadState",
        "EJS_onSaveState",
        "EJS_onLoadSave",
        "EJS_onSaveSave",
      ];

      ejsProperties.forEach((prop) => {
        if (window[prop]) delete window[prop];
      });

      // Clear game container
      const gameContainer = document.querySelector("#game");
      if (gameContainer) gameContainer.innerHTML = "";
    };

    const closeEmulator = async () => {
      await cleanupEmulator();
      document.body.classList.remove("popup-active");
      emit("close");
    };

    // Watch for changes in gameUrl and visibility
    watch(
      () => props.gameUrl,
      (newUrl) => {
        if (newUrl && props.isVisible) {
          setupEmulator(newUrl);
        }
      }
    );

    // Watch for changes in visibility
    watch(
      () => props.isVisible,
      (newVisible) => {
        if (newVisible && props.gameUrl) {
          setupEmulator(props.gameUrl);
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
