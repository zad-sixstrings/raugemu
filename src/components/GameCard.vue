<template>
  <template v-for="game in games" :key="game.title">
    <div id="card" class="card-wrapper">
      <h3 class="game-title center">
        <div class="game-title-content">{{ game.title }}</div>
      </h3>

      <div class="game-content">
        <img :src="game.boxArtPath" alt="Box art" class="boxart" />
        <span class="gameinfo">{{ game.year }} - {{ game.console }}</span>
        <span class="gameinfo">{{ game.developer }}</span>
      </div>
      <div
        class="play-button"
        :data-game="game.romPath"
        @click="startGame(game.romPath)"
      >
        <p class="play-button-text center">PLAY</p>
      </div>
    </div>
  </template>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    games: {
      type: Array,
      required: true,
    },
  },
  emits: ["game-selected"],
  methods: {
    startGame(romPath) {
      this.$emit("game-selected", romPath);
    },
  },
};
</script>
<style scoped>
#card {
  flex: 1;
  image-rendering: pixelated;
  height: 500px;
  min-width: 250px;
  max-width: 250px;
  margin: 10px 10px 20px 10px;
  border-radius: 5px;
  transition: border 0.5s;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-top: 5px solid var(--border-light-grey);
  border-left: 5px solid var(--border-light-grey);
  border-right: 5px solid var(--border-dark-grey);
  border-bottom: 5px solid var(--border-dark-grey);
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: repeating-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35),    /* Slightly less dark for better contrast */
    rgba(0, 0, 0, 0.35),
    transparent 4px,         /* Slightly tighter pattern */
    transparent 8px
);
}

.game-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.game-title-content {
  max-height: 100%;
  width: 100%;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: center;
  line-height: 1.2;
  font-size: clamp(0.5em, 1em, 1.2em);
}
.boxart {
  width: 200px;
  height: 280px;
  object-fit: contain;
  pointer-events: none;
}

.play-button {
  height: 60px;
  width: 100%;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--blue);
  border-top: 5px solid var(--border-light-blue);
  border-left: 5px solid var(--border-light-blue);
  border-right: 5px solid var(--border-dark-blue);
  border-bottom: 5px solid var(--border-dark-blue);
  transition: background-color 0.3s;
  transition: border 0.3s;
  transition: font-size 0.2s;
}

.play-button:hover {
  cursor: url("/assets/cursor-click.png"), auto;
  font-size: 1.1em;
}

.play-button:active {
  background: var(--blue-active);
  border-top: 5px solid var(--border-dark-blue);
  border-left: 5px solid var(--border-dark-blue);
  border-right: 5px solid var(--border-light-blue);
  border-bottom: 5px solid var(--border-light-blue);
  cursor: url("/assets/cursor-click.png"), auto;
}
</style>