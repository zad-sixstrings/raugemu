<template>
  <div class="console-games">
    <div class="featured-games-title-wrapper">
      <h2 class="featured-games-title">{{ console }} Games</h2>
    </div>
    <div id="content">
      <div class="featured-games">
        <div id="featured-container">
          <GameCard :games="filteredGames" @game-selected="openEmulator" />
        </div>
      </div>
    </div>
    <!-- EmulatorPopup should only handle the emulator logic, no need to load scripts here -->
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
        .sort((a, b) => a.title.localeCompare(b.title)); // Sort by title after filtering
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
