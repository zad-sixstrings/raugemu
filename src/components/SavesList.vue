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
            <strong>Créée le</strong> <em>{{ formatDateTime(save.creation_date) }}</em>
          </span><br />
          <span class="profile-span">
            <strong>Modifiée le</strong> <em>{{ formatDateTime(save.change_date) }}</em>
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

span.profile-span {
  color: white;
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
}

.delete-button {
  width: 100px;
  height: 40px;
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  background: var(--red);
  border-top: 5px solid var(--border-light-red);
  border-left: 5px solid var(--border-light-red);
  border-right: 5px solid var(--border-dark-red);
  border-bottom: 5px solid var(--border-dark-red);
  color: white;
  font-size: 0.8em;
  padding: 5px 10px;
  margin-right: 20px;
  border-radius: 0.25rem;
  cursor: var(--cusror-click);
  transition: all 0.2s;
}

.delete-button:active {
  background: var(--red-active);
  border-top: 3px solid var(--border-dark-red);
  border-left: 3px solid var(--border-dark-red);
  border-right: 3px solid var(--border-light-red);
  border-bottom: 3px solid var(--border-light-red);
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
