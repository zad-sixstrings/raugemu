<template>
  <input
    type="text"
    v-model="searchQuery"
    placeholder="Rechercher un jeu..."
    class="search-input"
    @input="$emit('search', searchQuery)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const searchQuery = ref("");
defineEmits(["search"]);
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #4a9eff;
  background: rgba(74, 158, 255, 0.1);
  color: white;
}
</style>
