<template>
  <div class="console-games">
    <div v-if="loading" class="loading">Loading games...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
      <div class="featured-games-title-wrapper">
        <h2 class="featured-games-title">
          <img
            v-if="consoleIcon"
            :src="consoleIcon"
            :alt="`${props.console} icon`"
            class="console-icon"
          />{{ props.console }}
        </h2>
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import GameCard from "./GameCard.vue";
import EmulatorPopup from "./EmulatorPopup.vue";
import { useRomStore } from '../stores/roms';

const props = defineProps<{
  console: string
}>();

const store = useRomStore();
const isEmulatorVisible = ref(false);
const selectedGameUrl = ref("");

const consoleIcons: Record<string, string> = {
  "2600": "/assets/console-icons/2600.png",
  "5200": "/assets/console-icons/5200.png",
  "7800": "/assets/console-icons/7800.png",
  "LYNX": "/assets/console-icons/lynx.png",
  "NES": "/assets/console-icons/nes.png",
  "SNES": "/assets/console-icons/snes.png",
  "N64": "/assets/console-icons/n64.png",
  "GB": "/assets/console-icons/gb.png",
  "GBC": "/assets/console-icons/gbc.png",
  "GBA": "/assets/console-icons/gba.png",
  "NDS": "/assets/console-icons/ds.png",
  "SMS": "/assets/console-icons/sms.png",
  "SMD": "/assets/console-icons/md.png",
  "SGG": "/assets/console-icons/gg.png",
};

const filteredGames = computed(() => {
  return store.existingRoms
    .filter(game => game.console?.toUpperCase() === props.console.toUpperCase())
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
});

const consoleIcon = computed(() => {
  return consoleIcons[props.console.toUpperCase()] || "";
});

const loading = computed(() => store.loading);
const error = computed(() => store.error);

watch(() => props.console, () => {
  store.fetchAllRoms();
});

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
  align-items: center;
  gap: 12px;
}

.console-icon {
  width: 32px;
  object-fit: contain;
}
</style>