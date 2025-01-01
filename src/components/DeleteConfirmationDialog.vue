<template>
  <div class="confirm-dialog">
    <div class="dialog-content">
      <p>Êtes-vous sûr de vouloir supprimer cette sauvegarde ?</p>
      <p class="save-name">{{ save?.game }}</p>
      <div class="dialog-buttons">
        <button
          @click="$emit('confirm')"
          class="confirm-button"
          :disabled="isDeleting"
        >
          {{ isDeleting ? "Suppression..." : "Confirmer" }}
        </button>
        <button
          @click="$emit('cancel')"
          class="cancel-button"
          :disabled="isDeleting"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserSave } from "../types/saves";

defineProps<{
  save: UserSave | null;
  isDeleting: boolean;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>

<style scoped>
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog-content {
  background: rgb(122, 122, 122);
  border-top: 5px solid rgb(161, 161, 161);
  border-left: 5px solid rgb(161, 161, 161);
  border-right: 5px solid rgb(59, 59, 59);
  border-bottom: 5px solid rgb(59, 59, 59);
  padding: 1.5rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 90%;
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
}

.save-name {
  font-weight: bold;
  margin: 1rem 0;
}

.dialog-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.confirm-button,
.cancel-button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
}

.confirm-button {
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  background: #ff4444;
  border-top: 3px solid #f38a83;
  border-left: 3px solid #f38a83;
  border-right: 3px solid #7a151d;
  border-bottom: 3px solid #7a151d;
  color: white;
  cursor: url("/assets/cursor-click.png"), auto;
}

.confirm-button:active {
  background: #da3434;
  border-top: 3px solid #7a151d;
  border-left: 3px solid #7a151d;
  border-right: 3px solid #f38a83;
  border-bottom: 3px solid #f38a83;
}

.confirm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cancel-button {
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  background-color: #e5e7eb;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-right: 3px solid #6a7388;
  border-bottom: 3px solid #6a7388;
  cursor: url("/assets/cursor-click.png"), auto;
}

.cancel-button:active {
  background-color: #cbced8;
  border-top: 3px solid #6a7388;
  border-left: 3px solid #6a7388;
  border-right: 3px solid #ffffff;
  border-bottom: 3px solid #ffffff;
}
</style>