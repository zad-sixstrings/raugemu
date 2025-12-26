<template>
  <template v-for="game in games" :key="game.title">
    <div id="card" class="card-wrapper">
      <h3 class="game-title center">
        <div class="game-title-content">{{ game.title || game.filename }}</div>
      </h3>

      <div class="game-content">
        <img
          :src="
            game.boxArtPath ||
            `/assets/boxart/${game.filename?.replace(/\.[^/.]+$/, '')}.jpg`
          "
          :alt="`${game.title} box art`"
          class="boxart"
          @error="handleImageError"
        />
        <span class="gameinfo"
          >{{ game.year || "Unknown" }} - {{ game.console }}</span
        >
        <span class="gameinfo">{{ game.developer || "Unknown" }}</span>
      </div>
      <div
        v-if="game.romPath"
        class="play-button"
        :data-game="game.romPath"
        @click="startGame(game.romPath)"
      >
        <p class="center">PLAY</p>
      </div>
      <div v-else class="play-button disabled">
        <p class="center">X</p>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { RomData } from "../types/roms";

defineProps<{
  games: RomData[];
}>();

const emit = defineEmits<{
  (e: "game-selected", romPath: string): void;
}>();

function startGame(romPath: string) {
  emit("game-selected", romPath);
}

function handleImageError(e: Event) {
  const img = e.target as HTMLImageElement;
  img.src = "/assets/raugemu-logo.png";
}
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
  border-top: 5px solid var(--border-light);
  border-left: 5px solid var(--border-light);
  border-right: 5px solid var(--border-dark);
  border-bottom: 5px solid var(--border-dark);
}

.card-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: repeating-linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35),
    rgba(0, 0, 0, 0.35),
    transparent 4px,
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

.game-title {
  font-family: var(--font-primary);
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 1em;
  background: var(--main-light);
  border-bottom: 2px solid var(--border-dark);
  color: white;
  margin: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
}

.gameinfo {
  font-family: var(--font-tertiary);
  font-weight: 400;
  font-style: normal;
  font-size: 1.5em;
  text-align: center;
  color: rgba(255, 255, 255, 0.801);
  display: block;
  padding-top: 5px;
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
  background: var(--accent-primary);
  border-top: 5px solid var(--border-primary-light);
  border-left: 5px solid var(--border-primary-light);
  border-right: 5px solid var(--border-primary-dark);
  border-bottom: 5px solid var(--border-primary-dark);
  font-family: var(--font-primary);
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 5px;
  text-align: center;
  color: white;
  font-size: 1em;
  transition: background-color 0.3s;
  transition: border 0.3s;
  transition: font-size 0.2s;
}

.play-button:hover {
  cursor: url("/assets/cursor-click.png"), auto;
  font-size: 1.1em;
}

.play-button:active {
  background: var(--accent-primary-active);
  border-top: 5px solid var(--border-primary-dark);
  border-left: 5px solid var(--border-primary-dark);
  border-right: 5px solid var(--border-primary-light);
  border-bottom: 5px solid var(--border-primary-light);
  cursor: url("/assets/cursor-click.png"), auto;
}

.disabled:hover {
  cursor: not-allowed;
  font-size: 1.1em;
}
</style>
