<template>
  <div class="saves-content">
    <div v-if="saves.length > 0">
      <div v-for="save in saves" :key="save.id" class="save-item">
        <div class="save-info">
          <div class="save-header">
            <label class="save-title">{{ save.game }}</label>
            <button
              @click="$emit('delete', save)"
              class="delete-button"
              :disabled="isDeleting"
            >
              <img class="trash-icon" src="/assets/trash-bin.png">
            </button>
          </div>
          <br />
          <span class="profile-span">
            <strong>Créée le </strong></span><span class="save-date"><em>{{ formatDateTime(save.creation_date) }}</em></span><br />
            <span class="profile-span">
            
            <strong>Modifiée le </strong></span><span class="save-date"><em>{{ formatDateTime(save.change_date) }}</em></span><br />
          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from "../utils/dateFormat";
import type { UserSave } from "../types/user";

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

.save-title {
  font-family: var(--font-press-start);
  font-size: 0.9rem;
  width: 230px;
  color: var(--blue);
  line-clamp: 3;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
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
  font-family: var(--font-pixelify);
  font-optical-sizing: auto;
  font-weight: 400;
}

span.save-date {
  font-family: var(--font-micro);
  font-size: 1.2rem;
}

.delete-button {
  width: 40px;
  height: 40px;
  font-weight: 400;
  background: var(--red);
  border-top: 5px solid var(--border-light-red);
  border-left: 5px solid var(--border-light-red);
  border-right: 5px solid var(--border-dark-red);
  border-bottom: 5px solid var(--border-dark-red);
  border-radius: var(--radius-big);
  color: white;
  cursor: var(--cusror-click);
  transition: all 0.2s;
}

.trash-icon {
  width: 20px;
}

.delete-button:active {
  background: var(--red-active);
  border-top: 5px solid var(--border-dark-red);
  border-left: 5px solid var(--border-dark-red);
  border-right: 5px solid var(--border-light-red);
  border-bottom: 5px solid var(--border-light-red);
}

.delete-button:hover {
  font-size: 0.8em;
  cursor: url("/assets/cursor-click.png"), auto;
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
