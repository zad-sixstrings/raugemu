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
  background: var(--grey);
  border-top: 5px solid var(--border-light-grey);
  border-left: 5px solid var(--border-light-grey);
  border-right: 5px solid var(--border-dark-grey);
  border-bottom: 5px solid var(--border-dark-grey);
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
  background: var(--red);
  border-top: 5px solid var(--border-light-red);
  border-left: 5px solid var(--border-light-red);
  border-right: 5px solid var(--border-dark-red);
  border-bottom: 5px solid var(--border-dark-red);
  color: white;
  cursor: url("/assets/cursor-click.png"), auto;
}

.confirm-button:active {
  background: var(--red-active);
  border-top: 5px solid var(--border-dark-red);
  border-left: 5px solid var(--border-dark-red);
  border-right: 5px solid var(--border-light-red);
  border-bottom: 5px solid var(--border-light-red);
}

.confirm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cancel-button {
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  background-color: var(--cancel);
  border-top: 5px solid var(--cancel-border-light);
  border-left: 5px solid var(--cancel-border-light);
  border-right: 5px solid var(--cancel-border-dark);
  border-bottom: 5px solid var(--cancel-border-dark);
  cursor: url("/assets/cursor-click.png"), auto;
}

.cancel-button:active {
  background-color: var(--cancel-active);
  border-top: 5px solid var(--cancel-border-dark);
  border-left: 5px solid var(--cancel-border-dark);
  border-right: 5px solid var(--cancel-border-light);
  border-bottom: 5px solid var(--cancel-border-light);
}
</style>