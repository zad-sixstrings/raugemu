<template>
  <div class="page-transition">
    <div v-if="loading" class="loading">Loading games...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
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
    </template>
    <EmulatorPopup
      :is-visible="isEmulatorVisible"
      :game-url="selectedGameUrl"
      @close="closeEmulator"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import GameList from "./GameCard.vue";
import EmulatorPopup from "./EmulatorPopup.vue";
import { useRomStore } from "../stores/roms";
import type { RomData } from "../types/roms";

const romStore = useRomStore();
const isEmulatorVisible = ref(false);
const selectedGameUrl = ref("");

// Helper function to check if a game belongs to a category
function belongsToCategory(game: RomData, category: string): boolean {
  if (!game.categories) return false;
  return game.categories.includes(category);
}

// Computed properties to organize games by category
const categories = computed(() => {
  if (!romStore.existingRoms.length) return [];

  const activeRoms = romStore.existingRoms.filter((game) => game.isAvailable);

  return [
    {
      title: "SELECTION",
      games: activeRoms.filter((game) => belongsToCategory(game, "featured")),
    },
    {
      title: "POKEMON EXTRAVAGANZA",
      games: activeRoms.filter((game) => belongsToCategory(game, "pokemon")),
    },
    {
      title: "LES CLOQUES AUX DOIGTS",
      games: activeRoms.filter((game) => belongsToCategory(game, "arcade")),
    },
  ].filter((category) => category.games.length > 0);
});

const loading = computed(() => romStore.loading);
const error = computed(() => romStore.error);

onMounted(async () => {
  try {
    await romStore.fetchAllRoms();
  } catch (error) {
    console.error("Failed to load games:", error);
  }
});

function generateId(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function openEmulator(romPath: string): void {
  selectedGameUrl.value = romPath;
  isEmulatorVisible.value = true;
}

function closeEmulator(): void {
  isEmulatorVisible.value = false;
  selectedGameUrl.value = "";
}
</script>
