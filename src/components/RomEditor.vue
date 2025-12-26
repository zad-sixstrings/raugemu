<template>
  <div class="rom-item" :class="{ editing: isEditing }">
    <div class="rom-header">
      <div class="rom-info">
        <h3 class="rom-title">{{ rom.title || "Untitled ROM" }}</h3>
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
        <button v-if="isEditing" @click="cancelEdit" class="cancel-button">
          Cancel Edit
        </button>
        <button v-else @click="startEdit" class="edit-button">
          Edit ROM Info
        </button>
      </div>
    </div>

    <div v-if="isEditing" class="edit-form">
      <div class="edit-form-group">
        <label>Title*</label>
        <input
          class="edit-input"
          v-model="editedRom.title"
          type="text"
          required
        />
      </div>
      <div class="edit-form-group">
        <label>Year*</label>
        <input
          class="edit-input"
          v-model.number="editedRom.year"
          type="number"
          required
        />
      </div>
      <div class="edit-form-group">
        <label>Developer*</label>
        <input
          class="edit-input"
          v-model="editedRom.developer"
          type="text"
          required
        />
      </div>
      <div class="edit-form-group">
        <label>Box Art URL</label>
        <input
          v-model="editedRom.boxArtPath"
          type="text"
          class="box-art-input"
          readonly
        />
      </div>
      <div class="edit-form-group">
        <label>Categories*</label>
        <input
          class="edit-input"
          v-model="editedRom.categories"
          type="text"
          placeholder="Enter categories"
          required
        />
      </div>
      <div class="button-group">
        <button @click="saveChanges" class="save-button">Save Changes</button>
        <button
          type="button"
          class="remove-button"
          @click="showConfirmDialog = true"
          :disabled="loading"
        >
          Remove
        </button>
      </div>
      <div v-if="showConfirmDialog" class="dialog-overlay">
        <div class="dialog-content">
          <h3>Confirm Removal</h3>
          <p>
            Are you sure you want to remove this ROM? User data will be
            preserved but the ROM will no longer be available on the site.
          </p>
          <div class="dialog-buttons">
            <button
              @click="handleRemove"
              :disabled="loading"
              class="confirm-button"
            >
              Yes, Remove
            </button>
            <button
              @click="showConfirmDialog = false"
              :disabled="loading"
              class="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import type { RomData, RomUpdatePayload } from "../types/roms";
import { useRomStore } from '../stores/roms';

const romStore = useRomStore();

const props = defineProps<{
  rom: RomData;
  isNew: boolean;
}>();

const emit = defineEmits<{
  (e: "update", rom: RomData): void;
  (e: "beforeEdit", rom: RomData): void;
  (e: "update-success"): void;
}>();

const isEditing = ref(false);
const editedRom = ref<RomData>({ ...props.rom });
const showConfirmDialog = ref(false);
const loading = ref(false);

function getFileNameFromPath(path: string | null | undefined): string {
  if (!path) return "";
  const filename = path.split("/").pop();
  return filename || "";
}

function getBoxArtPath(romFileName: string | undefined | null): string {
  if (!romFileName) return "/assets/boxart/";
  const nameWithoutExtension = romFileName.replace(/\.[^/.]+$/, "");
  return `/assets/boxart/${nameWithoutExtension}.jpg`;
}

function startEdit() {
  console.log("Starting edit with ROM data - detailed:", {
    title: props.rom.title,
    year: props.rom.year,
    developer: props.rom.developer,
    categories: props.rom.categories,
    romPath: props.rom.romPath,
    filename: props.rom.filename,
    console: props.rom.console,
  });

  let romFileName: string | null = null;
  if (props.isNew) {
    romFileName = props.rom.romPath?.split("/").pop() || null;
  } else {
    romFileName = props.rom.filename || "";
  }

  editedRom.value = {
    ...props.rom,
    title: props.rom.title || "",
    year: props.rom.year || 0,
    developer: props.rom.developer || "",
    categories: props.rom.categories || "None",
    boxArtPath: props.rom.boxArtPath || getBoxArtPath(romFileName),
    romPath: props.rom.romPath || `/ROM/${props.rom.console}/${props.rom.filename}`,
    consoleid: props.rom.consoleid,
    isAvailable: props.rom.isAvailable ?? true // Default to true if not set
  };

  console.log("Initialized editedRom - detailed:", {
    title: editedRom.value.title,
    year: editedRom.value.year,
    developer: editedRom.value.developer,
    categories: editedRom.value.categories,
    romPath: editedRom.value.romPath,
    filename: editedRom.value.filename,
    console: editedRom.value.console,
  });

  isEditing.value = true;
}

function cancelEdit() {
  editedRom.value = { ...props.rom };
  isEditing.value = false;
  showConfirmDialog.value = false;
}

async function handleRemove() {
  try {
    loading.value = true;
    const updatePayload: RomUpdatePayload = {
      title: editedRom.value.title || "",
      year: editedRom.value.year || 0,
      developer: editedRom.value.developer || "",
      categories: editedRom.value.categories || "None",
      boxArtPath: editedRom.value.boxArtPath || null,
      romPath: editedRom.value.romPath,
      isAvailable: false
    };

    await romStore.updateExistingRom(updatePayload);
    showConfirmDialog.value = false;
    emit('update-success');
    isEditing.value = false;
  } catch (error) {
    console.error('Failed to remove ROM:', error);
  } finally {
    loading.value = false;
  }
}

async function saveChanges() {
  console.log("saveChanges called with isNew:", props.isNew);
  console.log("Current editedRom data:", editedRom.value);

  console.log("Validation checks:", {
    title: editedRom.value.title,
    hasTitle: Boolean(editedRom.value.title),
    year: editedRom.value.year,
    hasYear: Boolean(editedRom.value.year),
    developer: editedRom.value.developer,
    hasDeveloper: Boolean(editedRom.value.developer),
    categories: editedRom.value.categories,
    hasCategories: Boolean(editedRom.value.categories),
    romPath: editedRom.value.romPath,
    hasRomPath: Boolean(editedRom.value.romPath),
  });

  if (
    !editedRom.value.title ||
    !editedRom.value.year ||
    !editedRom.value.developer ||
    !editedRom.value.categories ||
    !editedRom.value.romPath
  ) {
    console.log("Validation failed:", editedRom.value);
    return;
  }

  try {
    loading.value = true;
    const updatePayload: RomUpdatePayload = {
      title: editedRom.value.title,
      year: editedRom.value.year,
      developer: editedRom.value.developer,
      categories: editedRom.value.categories,
      boxArtPath: editedRom.value.boxArtPath || null,
      romPath: editedRom.value.romPath,
      isAvailable: true
    };

    if (!props.isNew) {
      await romStore.updateExistingRom(updatePayload);
    }
    
    emit("update", editedRom.value);
    emit("update-success");
    isEditing.value = false;
  } catch (error) {
    console.error('Failed to save ROM:', error);
  } finally {
    loading.value = false;
  }
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
  font-family: monospace;
}

.rom-info p {
  margin: 0.25rem 0;
  color: #666;
  font-family: monospace;
  font-size: 1.1em;
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

.edit-input {
  font-family: monospace;
}

.edit-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.edit-form-group label {
  font-weight: bold;
  font-family: monospace;
}

.edit-form-group input.box-art-input {
  font-family: monospace;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  background-color: #f5f5f5;
  cursor: default;
}

.edit-form-group input[type="email"],
.edit-form-group input[type="number"],
.edit-form-group input[type="password"],
.edit-form-group input[type="text"] {
  padding: 10px;
  border: 1px solid var(--border-dark);
  font-family: monospace;
  font-weight: 400;
  font-size: 1em;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-family: monospace;
}

.edit-button {
  background-color: #4caf50;
  color: white;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.button-group {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.save-button {
  background-color: #2196f3;
  color: white;
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.save-button:hover {
  background-color: #1976d2;
}

.rom-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
