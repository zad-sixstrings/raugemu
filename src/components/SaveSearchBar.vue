<template>
  <div class="search-container">
    <input
      type="text"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      placeholder="Rechercher une sauvegarde..."
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
  background-color: rgb(38, 57, 66);
  border: 1px solid rgb(74, 158, 255);
  border-radius: 4px;
  color: white;
  font-family: "Pixelify Sans", serif;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-family: "Pixelify Sans", serif;
}

.search-input:focus {
  outline: none;
  border-color: rgb(74, 158, 255);
  box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: red;
}
</style>
