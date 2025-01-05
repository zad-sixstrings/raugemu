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
        <label>Box Art URL</label>
        <input
          v-model="editedRom.boxArtPath"
          type="text"
          class="box-art-input"
          readonly
        />
      </div>
      <div class="form-group">
        <label>Categories*</label>
        <input
          v-model="editedRom.categories"
          type="text"
          placeholder="Enter categories"
          required
        />
      </div>
      <div class="button-group">
        <button @click="saveChanges" class="save-button">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import type { RomData } from "../types/roms";

const props = defineProps<{
  rom: RomData;
  isNew: boolean;
}>();

const emit = defineEmits<{
  (e: "update", rom: RomData): void; // Changed from RomData to RomUpdatePayload
  (e: "beforeEdit", rom: RomData): void;
}>();

const isEditing = ref(false);
const editedRom = ref<RomData>({ ...props.rom });

function getFileNameFromPath(path: string | null | undefined): string {
  if (!path) return "";

  const filename = path.split("/").pop();
  return filename || "";
}

function getBoxArtPath(romFileName: string | undefined | null): string {
  if (!romFileName) return "/assets/boxart/";

  // Remove file extension and replace with .jpg
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

  // Remove the direct DOM query and just use the props data
  editedRom.value = {
    ...props.rom,
    title: props.rom.title || "",
    year: props.rom.year || 0,
    developer: props.rom.developer || "",
    categories: props.rom.categories || "None", // Default to "None" if no categories
    boxArtPath: props.rom.boxArtPath || getBoxArtPath(romFileName),
    romPath:
      props.rom.romPath || `/ROM/${props.rom.console}/${props.rom.filename}`,
    consoleid: props.rom.consoleid,
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
}

function saveChanges() {
  console.log("saveChanges called with isNew:", props.isNew);
  console.log("Current editedRom data:", editedRom.value);

  // Log each validation check separately
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

  emit("update", editedRom.value);
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

.form-group input.box-art-input {
  font-family: monospace;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  background-color: #f5f5f5;
  cursor: default;
}

button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-weight: bold;
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
