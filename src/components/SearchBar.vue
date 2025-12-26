<template>
  <div class="search-container">
    <input
      type="text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      placeholder="Rechercher..."
      class="search-input"
    />
  </div>
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
.search-container {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--search-input);
  border-top: 5px solid var(--border-primary-dark);
  border-left: 5px solid var(--border-primary-dark);
  border-right: 5px solid var(--border-primary-light);
  border-bottom: 5px solid var(--border-primary-light);
  border-radius: 5px;
  color: white;
  font-family: var(--font-secondary);
}

.search-input::placeholder {
  color: var(--search-input-placeholder);
  font-family: var(--font-secondary);
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
