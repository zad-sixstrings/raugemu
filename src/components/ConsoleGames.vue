<template>
  <div class="page-transition">
    <div class="console-games">
      <div v-if="loading" class="loading">Loading games...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <template v-else>
        <div class="featured-games-title-wrapper">
          <div class="featured-games-title">
            <h2 class="featured-games-title-h2">
              <img
                v-if="consoleIcon"
                :src="consoleIcon"
                :alt="`${props.console} icon`"
                class="console-icon"
              />{{ props.console }}
            </h2>
            <div class="title-search-box">
              <SearchBarConsoles v-model="searchQuery" />
            </div>
          </div>
        </div>
        <div id="content">
          <div class="featured-games">
            <div id="featured-container">
              <GameCard :games="filteredGames" @game-selected="openEmulator" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import GameCard from "./GameCard.vue";
import EmulatorPopup from "./EmulatorPopup.vue";
import { useRomStore } from "../stores/roms";
import SearchBarConsoles from "./searchBarConsoles.vue";

const props = defineProps<{
  console: string;
}>();

const store = useRomStore();
const isEmulatorVisible = ref(false);
const selectedGameUrl = ref("");
const searchQuery = ref("");

const consoleIcons: Record<string, string> = {
  "2600": "/assets/console-icons/2600.png",
  "5200": "/assets/console-icons/5200.png",
  "7800": "/assets/console-icons/7800.png",
  LYNX: "/assets/console-icons/lynx.png",
  VB: "/assets/console-icons/vb.png",
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
  "32X": "/assets/console-icons/32x.png",
  SSN: "/assets/console-icons/ssn.png",
  PSX: "/assets/console-icons/psx.png",
  PSP: "/assets/console-icons/psp.png",
  COLECOVISION: "/assets/console-icons/cv.png",
};

const filteredGames = computed(() => {
  let games = store.existingRoms.filter(
    (game) =>
      game.isAvailable &&
      game.console?.toUpperCase() === props.console.toUpperCase()
  );

  // Apply search filter if there's a search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    games = games.filter((game) => game.title?.toLowerCase().includes(query));
  }

  return games.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
});

const consoleIcon = computed(() => {
  return consoleIcons[props.console.toUpperCase()] || "";
});

const loading = computed(() => store.loading);
const error = computed(() => store.error);

watch(
  () => props.console,
  () => {
    store.fetchAllRoms();
  }
);

onMounted(async () => {
  await store.fetchAllRoms();
});

function openEmulator(romPath: string) {
  selectedGameUrl.value = romPath;
  isEmulatorVisible.value = true;
}

function closeEmulator() {
  isEmulatorVisible.value = false;
  selectedGameUrl.value = "";
}
</script>

<style scoped>
.featured-games-title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 15px;
}

.title-search-box {
  max-width: 350px;
}

.console-icon {
  width: 32px;
  margin-right: 15px;
}

@media (max-width: 475px) {
  .featured-games-title {
    flex-direction: column;
    margin-bottom: 5px;
  }
}

</style>
