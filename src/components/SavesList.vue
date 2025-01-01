<template>
  <div class="saves-content">
    <div v-if="saves.length > 0">
      <div v-for="save in saves" :key="save.id" class="save-item">
        <div class="save-info">
          <div class="save-header">
            <label class="profile-label">{{ save.game }}</label>
            <button
              @click="$emit('delete', save)"
              class="delete-button"
              :disabled="isDeleting"
            >
              Supprimer
            </button>
          </div>
          <br />
          <span class="profile-span">
            Créé le {{ formatDateTime(save.creation_date) }} /
          </span>
          <span class="profile-span">
            Modifié le {{ formatDateTime(save.change_date) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from "../utils/dateFormat";
import type { UserSave } from "../types/saves";

defineProps<{
  saves: UserSave[];
  isDeleting: boolean;
}>();

defineEmits<{
  delete: [save: UserSave];
}>();
</script>

<style scoped>
.save-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.saves-content {
  background-color: transparent;
  height: 350px;
  overflow: scroll;
  flex: 1 1 100%;
  mask-image: linear-gradient(to bottom, black calc(100% - 50px), transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black calc(100% - 50px), transparent 100%);
}

.save-info {
  margin-bottom: 20px;
  background-color: rgb(70, 70, 70);
  padding: 10px;
  border-radius: 10px;
}

.delete-button {
  width: 100px;
  height: 40px;
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  background: #ff4444;
  border-top: 3px solid #f38a83;
  border-left: 3px solid #f38a83;
  border-right: 3px solid #7a151d;
  border-bottom: 3px solid #7a151d;
  color: white;
  font-size: 0.8em;
  padding: 5px 10px;
  margin-right: 20px;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-button:active {
  background: #da3434;
  border-top: 3px solid #7a151d;
  border-left: 3px solid #7a151d;
  border-right: 3px solid #f38a83;
  border-bottom: 3px solid #f38a83;
}

.delete-button:hover {
  font-size: 0.9em;
  cursor: url("/assets/cursor-click.png"), auto;
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
