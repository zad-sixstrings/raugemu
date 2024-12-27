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
  console.log("Console prop:", this.console);  // Log selected console
  console.log("All games:", this.games);      // Log all the games
  const filtered = this.games.filter((game) => {
    console.log("Checking game:", game.title, "Console:", game.console);  // Log each game's console
    return game.console.toUpperCase() === this.console.toUpperCase();
  });
  console.log("Filtered games for console:", this.console, filtered);  // Check filtered games
  return filtered;
}
  },
  watch: {
    // Watch for changes to the console prop
    console(newConsole) {
      this.loadGamesData();
    },
  },
  async mounted() {
    await this.loadGamesData();
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
  },
};
</script>
