<template>
  <div class="playtime-container">
    <div class="playtime-grid">
      <div v-for="game in playtime" :key="game.gamename" class="playtime-card">
        <div class="playtime-game">
          <span class="game-name">{{ game.gamename }}</span>
        </div>
        <div class="playtime-time">
          <span class="game-time">{{ playtimeFormat(game.playedtime) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PlaytimeData } from "../types/user";
import { playtimeFormat } from "../utils/playtimeFormat";

defineProps<{
  playtime: PlaytimeData[];
}>();
</script>

<style scoped>
.playtime-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5em;
}

.playtime-grid {
  display: grid;
  grid-template-columns: repeat(2, 150px);
  gap: 1rem;
  width: fit-content;

  align-content: start;
  height: 350px;
  overflow: scroll;
  mask-image: linear-gradient(
    to bottom,
    black calc(100% - 50px),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    black calc(100% - 50px),
    transparent 100%
  );
}

.playtime-card {
  height: fit-content;
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 110px;
}

.playtime-game,
.playtime-time {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 140px;
}

.playtime-game {
  height: 70px;
  margin: 0 auto;
  background-color: var(--accent-primary);
  border-top: 5px solid var(--border-primary-light);
  border-left: 5px solid var(--border-primary-light);
  border-right: 5px solid var(--border-primary-dark);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.playtime-time {
  height: 40px;
  background-color: var(--accent-secondary);
  border-top: 5px solid var(--border-secondary-light);
  border-left: 5px solid var(--border-secondary-light);
  border-right: 5px solid var(--border-secondary-dark);
  border-bottom: 5px solid var(--border-secondary-dark);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.game-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: var(--font-secondary);
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 0.9em;
  text-align: center;
}

.game-time {
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 0.6em;
  color: white;
}
</style>
