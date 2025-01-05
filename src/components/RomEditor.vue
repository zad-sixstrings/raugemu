<template>
  <div class="rom-item" :class="{ editing: isEditing }">
    <div class="rom-header">
      <div class="rom-info">
        <h3 class="rom-title">{{ rom.title || 'Untitled ROM' }}</h3>
        <p>File: {{ rom.filename || getFileNameFromPath(rom.romPath) }}</p>
        <p>Console: {{ rom.console }}</p>
        <img
          v-if="rom.boxArtPath"
          :src="rom.boxArtPath?.replace('./dist', '')"
          alt="Box Art"
          class="box-art"
        />
      </div>
      <div class="rom-actions">
        <button
          v-if="isEditing"
          @click="cancelEdit"
          class="cancel-button"
        >
          Cancel Edit
        </button>
        <button v-else @click="startEdit" class="edit-button">
          Edit ROM Info
        </button>
      </div>
    </div>
    
    <div v-if="isEditing" class="edit-form">
      <div class="form-group">
        <label>Title*</label>
        <input v-model="editedRom.title" type="text" required />
      </div>
      <div class="form-group">
        <label>Year*</label>
        <input v-model.number="editedRom.year" type="number" required />
      </div>
      <div class="form-group">
        <label>Developer*</label>
        <input v-model="editedRom.developer" type="text" required />
      </div>
      <div class="form-group">
        <label>Categories*</label>
        <input
          type="text"
          :value="editedRom.categories?.join(', ')"
          placeholder="Separate categories with commas"
          @input="handleCategoriesInput"
          required
        />
      </div>
      <button @click="saveChanges" class="save-button">
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { RomData } from '../types/roms';

const props = defineProps<{
  rom: RomData;
  isNew: boolean;
}>();

const emit = defineEmits<{
  (e: 'update', rom: RomData): void;
}>();

const isEditing = ref(false);
const editedRom = ref<RomData>({ ...props.rom });

function getFileNameFromPath(path: string | null | undefined): string {
  if (!path) return "";
  
  // Extract filename from path (e.g., "SimCity (USA).sfc" from "./dist/ROM/Nintendo/SNES/SimCity (USA).sfc")
  const filename = path.split("/").pop();
  return filename || "";
}

function handleCategoriesInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target) {
    const categories = target.value
      .split(",")
      .map((cat: string) => cat.trim())
      .filter(Boolean);
    editedRom.value.categories = categories.length ? categories : undefined;
  }
}

function startEdit() {
  editedRom.value = { ...props.rom };
  isEditing.value = true;
}

function cancelEdit() {
  editedRom.value = { ...props.rom };
  isEditing.value = false;
}

function saveChanges() {
  if (!editedRom.value.title || !editedRom.value.year || 
      !editedRom.value.developer || !editedRom.value.categories) {
    // You might want to add some visual feedback here
    return;
  }

  emit('update', editedRom.value);
  isEditing.value = false;
}
</script>

<style scoped>
.rom-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}

.rom-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.rom-info {
  flex: 1;
}

.rom-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.rom-info p {
  margin: 0.25rem 0;
  color: #666;
}

.box-art {
  max-width: 100px;
  height: auto;
  margin-top: 0.5rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
}

.form-group input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.save-button {
  background-color: #2196F3;
  color: white;
  align-self: flex-start;
}

.rom-actions {
  display: flex;
  gap: 0.5rem;
}
</style>