<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog-content">
      <h3 class="dialog-title">Modifier le profil</h3>

      <div class="avatar-section">
        <img :src="currentAvatarUrl" alt="Avatar" class="preview-avatar" />
        <div class="avatar-controls">
          <label class="upload-button" :class="{ disabled: isLoading }">
            Changer l'avatar
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              @change="handleAvatarChange"
              :disabled="isLoading"
            />
          </label>
        </div>
      </div>

      <div class="bio-section">
        <label class="bio-label">Bio:</label>
        <textarea
          v-model="bioText"
          class="bio-input"
          :disabled="isLoading"
          rows="4"
        ></textarea>
      </div>

      <div class="dialog-actions">
        <button @click="handleSave" :disabled="isLoading" class="save-button">
          {{ isLoading ? "Sauvegarde..." : "Sauvegarder" }}
        </button>
        <button
          @click="$emit('close')"
          :disabled="isLoading"
          class="cancel-button"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserProfileStore } from "../stores/userProfile";

const props = defineProps<{
  initialBio: string;
  avatarPath?: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saved"): void;
}>();

const profileStore = useUserProfileStore();
const bioText = ref(props.initialBio);
const isLoading = ref(false);
const currentAvatarUrl = computed(() => {
  return props.avatarPath || "/assets/profilepic/default.png";
});
// const hasCustomAvatar = computed(() => !!props.avatarPath);

async function handleAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  try {
    isLoading.value = true;
    await profileStore.updateAvatar(file);
    emit("saved");
  } catch (error) {
    console.error("Error updating avatar:", error);
  } finally {
    isLoading.value = false;
  }
}

async function handleSave() {
  try {
    isLoading.value = true;
    await profileStore.updateProfile(bioText.value);
    emit("saved");
    emit("close");
  } catch (error) {
    console.error("Error saving profile:", error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: rgb(122, 122, 122);
  border-top: 5px solid rgb(161, 161, 161);
  border-left: 5px solid rgb(161, 161, 161);
  border-right: 5px solid rgb(59, 59, 59);
  border-bottom: 5px solid rgb(59, 59, 59);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
}

.dialog-title {
  color: white;
  font-family: "Press Start 2P", serif;
  font-weight: 400;
  font-size: 1em;
  margin-bottom: 20px;
  text-align: center;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.preview-avatar {
  width: 150px;
  height: 150px;
  border-radius: 100%;
}

.avatar-controls {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.upload-button {
  background: #4a9eff;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Pixelify Sans", serif;

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    display: none;
  }
}

.delete-button {
  background: #ff4a4a;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: "Pixelify Sans", serif;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.bio-section {
  margin-bottom: 20px;
}

.bio-label {
  display: block;
  color: white;
  margin-bottom: 8px;
  font-family: "Pixelify Sans", serif;
}

.bio-input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  background-color: rgb(109, 109, 109);
  border-top: 5px solid rgb(59, 59, 59);
  border-left: 5px solid rgb(59, 59, 59);
  border-right: 5px solid rgb(161, 161, 161);
  border-bottom: 5px solid rgb(161, 161, 161);
  color: white;
  font-family: "Pixelify Sans", serif;
  resize: vertical;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-button,
.cancel-button {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: "Pixelify Sans", serif;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.save-button {
  background: #4a9eff;
  color: white;
}

.cancel-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}
</style>
