<template>
  <div class="saves-content">
    <div v-if="saves.length > 0">
      <div v-for="save in saves" :key="save.id" class="save-item">
        <div class="save-header">
          <div class="save-title-wrapper">
            <h4 class="save-title">{{ save.game }}</h4>
          </div>
          <div class="delete-button-wrapper">
            <button
              @click="$emit('delete', save)"
              class="delete-button"
              :disabled="isDeleting"
            >
              <img class="trash-icon" src="/assets/trash-bin.png" />
            </button>
          </div>
        </div>
        <div class="save-info">
          <div class="save-date-wrapper">
            <p class="profile-span"><strong>Création </strong>
              
              <p class="save-date"
                ><em>{{ formatDateTime(save.creation_date) }}</em></p
              >
            </p>
          </div>
          <div class="modification-date-wrapper">
            <p class="profile-span"><strong>Dernière modif. </strong>
              
              <p class="save-date"
                ><em>{{ formatDateTime(save.creation_date) }}</em></p
              >
            </p>
          </div>
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
.saves-content {
  background-color: transparent;
  height: 350px;
  width: 100%;
  padding: 0.5em;
  overflow: scroll;
  flex: 1 1 100%;
  mask-image: linear-gradient(
    to bottom,
    black calc(100% - 50px),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    black calc(100% - 50px),
    transparent 100%
  );
}

.save-item {
  max-height: 220px;
  margin-bottom: 20px;
}

.save-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--purple);
  border-top: 5px solid var(--border-light-purple);
  border-left: 5px solid var(--border-light-purple);
  border-right: 5px solid var(--border-dark-purple);
  border-bottom: 5px solid var(--border-dark-purple);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.save-title-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 10px;
}

.save-title {
  font-family: var(--font-press-start);
  color: white;
  font-size: 0.8em;
}

.save-info {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  margin-bottom: 20px;
  padding: 1.5em;
  background-color: var(--blue);
  border-left: 5px solid var(--border-light-blue);
  border-right: 5px solid var(--border-dark-blue);
  border-bottom: 5px solid var(--border-dark-blue);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.save-date-wrapper, .modification-date-wrapper {
  flex: 1;
}

p.save-date {
  font-family: var(--font-micro);
  font-size: 1.2rem;
}

.delete-button-wrapper {
  display: flex;
  align-items: center;
  width: 50px;
  height: 50px;
  border-top-right-radius: 10px;
}

.delete-button {
  width: 50px;
  height: 50px;
  background: var(--red);
  border-top: 5px solid var(--border-light-red);
  border-left: 5px solid var(--border-light-red);
  border-right: 5px solid var(--border-dark-red);
  border-bottom: 5px solid var(--border-dark-red);
  border-top-right-radius: 5px;
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

p.profile-span {
  font-family: var(--font-pixelify);
}
</style>
