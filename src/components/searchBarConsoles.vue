<template>
    <input
      type="text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      placeholder="Rechercher..."
      class="search-input"
    />
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();
defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<style scoped>
.search-input {
  width: 100%;
  padding: 0.7rem;
  background-color: var(--search-input);
  border-top: 5px solid var(--border-dark-purple);
  border-left: 5px solid var(--border-dark-purple);
  border-right: 5px solid var(--border-light-purple);
  border-bottom: 5px solid var(--border-light-purple);
  border-radius: 5px;
  color: white;
  font-family: var(--font-pixelify);
}

.search-input::placeholder {
  color: var(--search-input-ph);
  font-family: var(--font-pixelify);
}

.search-input:focus {
  outline: none;
  background-color: var(--search-input-focus);
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: var(--red);
}
</style>
