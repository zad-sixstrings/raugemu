<template>
  <div v-for="category in categories" :key="category.title">
    <div class="featured-games-title-wrapper">
      <h2 class="featured-games-title">{{ category.title }}</h2>
    </div>
    <div id="content">
      <div :id="generateId(category.title)" class="featured-games">
        <div id="featured-container">
          <GameList :games="category.games" @game-selected="openEmulator" />
        </div>
      </div>
    </div>
  </div>
  <EmulatorPopup
    :is-visible="isEmulatorVisible"
    :game-url="selectedGameUrl"
    @close="closeEmulator"
  />
</template>

<script>
import GameList from "./GameCard.vue";
import EmulatorPopup from "./EmulatorPopup.vue";
import BrowserWarning from "./BrowserWarning.vue";

export default {
  components: {
    GameList,
    EmulatorPopup,
  },
  data() {
    return {
      categories: [],
      isEmulatorVisible: false,
      selectedGameUrl: "",
    };
  },
  mounted() {
    this.loadGamesData();
  },
  methods: {
    async loadGamesData() {
      try {
        const response = await fetch("/games.json");
        const gamesData = await response.json();
        this.categories = [
          {
            title: "SELECTION",
            games: gamesData.filter((game) =>
              game.categories.includes("featured")
            ),
          },
          {
            title: "POKEMON EXTRAVAGANZA",
            games: gamesData.filter((game) =>
              game.categories.includes("pokemon")
            ),
          },
          {
            title: "RETOUR VERS LE FUTUR",
            games: gamesData.filter((game) =>
              game.categories.includes("retourverslefutur")
            ),
          },
        ];
      } catch (error) {
        console.error("Failed to load games data:", error);
      }
    },
    generateId(title) {
      return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    },
    openEmulator(romPath) {
      this.selectedGameUrl = romPath;
      this.isEmulatorVisible = true;
    },
    closeEmulator() {
      this.isEmulatorVisible = false;
      this.selectedGameUrl = "";
    },
  },
};
</script>
