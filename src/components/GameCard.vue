<template>
  <template v-for="game in games" :key="game.title">
    <div id="card" class="card-wrapper">
      <h3 class="game-title center">{{ game.title }}</h3>
      <img :src="game.boxArtPath" alt="Box art" class="boxart" />
      <span class="gameinfo">{{ game.year }} - {{ game.console }}</span>
      <span class="gameinfo">{{ game.developer }}</span>
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
