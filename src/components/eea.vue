<template>
  <div class="eea-wrapper">
    <img
      v-if="eeStore.hasAchievement('puzzle-solved')"
      src="/assets/achievements/ee-main.png"
      class="ee-icon"
      alt="RaugEmu Master"
      title="A résolu l'énigme RaugEmu"
    />
    <img
      v-if="eeStore.hasAchievement('ghost-in-the-shell')"
      src="/assets/achievements/ee-gits.png"
      class="ee-icon"
      alt="Ghost in the Shell"
      title="A résolu l'enigme sans laisser aucune trace de son passage"
    />
  </div>
</template>
<script setup lang="ts">
import { useEE } from "../stores/ee";

const eeStore = useEE();
</script>

<style scoped>
.eea-wrapper {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.ee-icon {
  width: 16px;
  height: 16px;
  image-rendering: pixelated;
  cursor: help;
}
</style>