<template>
    <div>
      <h2 class="featured-games-title">{{ title }}</h2>
      <div id="content">
        <div class="game-list">
          <div v-for="game in games" :key="game.title" class="game.card">
            <h3>{{ game.title }}</h3>
            <img :src="game.boxArtPath" alt="Box Art">
            <p>{{ game.year }} - {{ game.console }}</p>
            <p>{{ game.developer }}</p>
            <button @click="playGame(game.romPath)">Play</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      games: Array
    },
    methods: {
      playGame(romPath) {
        console.log(`Playing game: ${romPath}`);
        // Add your logic for playing the game
      }
    }
  };
  </script>
  