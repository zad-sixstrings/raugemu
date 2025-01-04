<template>
  <div class="console-games">
    <div class="featured-games-title-wrapper">
      <h2 class="featured-games-title">
        <img
          v-if="consoleIcon"
          :src="consoleIcon"
          :alt="`${console} icon`"
          class="console-icon"
        />{{ console }}
      </h2>
    </div>
    <div id="content">
      <div class="featured-games">
        <div id="featured-container">
          <GameCard :games="filteredGames" @game-selected="openEmulator" />
        </div>
      </div>
    </div>
    <EmulatorPopup
      :is-visible="isEmulatorVisible"
      :game-url="selectedGameUrl"
      @close="closeEmulator"
    />
  </div>
</template>

<script>
import GameCard from "./GameCard.vue";
import EmulatorPopup from "./EmulatorPopup.vue";

const consoleIcons = {
  2600: "/assets/console-icons/2600.png",
  5200: "/assets/console-icons/5200.png",
  7800: "/assets/console-icons/7800.png",
  LYNX: "/assets/console-icons/lynx.png",
  NES: "/assets/console-icons/nes.png",
  SNES: "/assets/console-icons/snes.png",
  N64: "/assets/console-icons/n64.png",
  GB: "/assets/console-icons/gb.png",
  GBC: "/assets/console-icons/gbc.png",
  GBA: "/assets/console-icons/gba.png",
  NDS: "/assets/console-icons/ds.png",
  SMS: "/assets/console-icons/sms.png",
  SMD: "/assets/console-icons/md.png",
  SGG: "/assets/console-icons/gg.png",
};

export default {
  name: "ConsoleGames",
  components: {
    GameCard,
    EmulatorPopup,
  },
  props: {
    console: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      games: [],
      isEmulatorVisible: false,
      selectedGameUrl: "",
    };
  },
  computed: {
    filteredGames() {
      return this.games
        .filter(
          (game) => game.console.toUpperCase() === this.console.toUpperCase()
        )
        .sort((a, b) => a.title.localeCompare(b.title));
    },
    consoleIcon() {
      return consoleIcons[this.console.toUpperCase()] || "";
    },
  },
  watch: {
    console(newConsole) {
      this.loadGamesData(); // Reload games when the console changes
    },
  },
  async mounted() {
    await this.loadGamesData(); // Load games data when the component is mounted
  },
  methods: {
    async loadGamesData() {
      try {
        const response = await fetch("/games.json");
        const gamesData = await response.json();
        this.games = gamesData;
      } catch (error) {
        console.error("Failed to load games data:", error);
      }
    },
    openEmulator(romPath) {
      this.selectedGameUrl = romPath;
      this.isEmulatorVisible = true; // Show the emulator when a game is selected
    },
    closeEmulator() {
      this.isEmulatorVisible = false;
      this.selectedGameUrl = "";
    },
  },
};
</script>

<style scoped>
.featured-games-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.console-icon {
  width: 32px;
  object-fit: contain;
}
</style>