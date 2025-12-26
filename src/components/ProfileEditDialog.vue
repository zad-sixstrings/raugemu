<template>
  <div class="dialog-overlay" @click.self="$emit('close')">
    <div class="dialog-content">
      <h3 class="dialog-title">Modifier le profil</h3>

      <div class="avatar-section">
        <img
          :src="profileStore.avatarPath"
          alt="Avatar"
          class="preview-avatar"
          @error="handleImageError"
        />
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
import { ref } from "vue";
import { useUserProfileStore } from "../stores/userProfile";

const props = defineProps<{
  initialBio: string;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "saved"): void;
}>();

const profileStore = useUserProfileStore();
const bioText = ref(props.initialBio);
const isLoading = ref(false);
// Add error handling for the image
const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  console.log("Failed to load image at:", img.src);
  console.log("Falling back to default avatar");
  img.src = '/assets/profilepic/default.png';
};
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
  background: var(--main-light);
  border-top: 5px solid var(--border-light);
  border-left: 5px solid var(--border-light);
  border-right: 5px solid var(--border-dark);
  border-bottom: 5px solid var(--border-dark);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
}

.dialog-title {
  color: white;
  font-family: var(--font-primary);
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
  background: var(--accent-primary);
  border-top: 5px solid var(--border-primary-light);
  border-left: 5px solid var(--border-primary-light);
  border-right: 5px solid var(--border-primary-dark);
  border-bottom: 5px solid var(--border-primary-dark);
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: var(--cursor-click);
  font-family: var(--font-secondary);

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    display: none;
  }
}

.upload-button:active {
  background: var(--accent-primary-active);
  border-top: 5px solid var(--border-primary-dark);
  border-left: 5px solid var(--border-primary-dark);
  border-right: 5px solid var(--border-primary-light);
  border-bottom: 5px solid var(--border-primary-light);
}

.delete-button {
  background: var(--red);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-family: var(--font-secondary);

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
  font-family: var(--font-secondary);
}

.bio-input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  background-color: #13151a;
  border-top: 5px solid var(--border-dark);
  border-left: 5px solid var(--border-dark);
  border-right: 5px solid var(--border-light);
  border-bottom: 5px solid var(--border-light);
  color: white;
  font-family: var(--font-secondary);
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
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-family: var(--font-secondary);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.save-button {
  background: var(--accent-primary);
  border-top: 5px solid var(--border-primary-light);
  border-left: 5px solid var(--border-primary-light);
  border-right: 5px solid var(--border-primary-dark);
  border-bottom: 5px solid var(--border-primary-dark);
  border-radius: 5px;
  color: white;
  cursor: var(--cursor-click);
}

.save-button:active {
  background: var(--accent-primary-active);
  border-top: 5px solid var(--border-primary-dark);
  border-left: 5px solid var(--border-primary-dark);
  border-right: 5px solid var(--border-primary-light);
  border-bottom: 5px solid var(--border-primary-light);
}

.cancel-button {
  background-color: var(--cancel-btn);
  border-top: 5px solid var(--cancel-btn-border-light);
  border-left: 5px solid var(--cancel-btn-border-light);
  border-right: 5px solid var(--cancel-btn-border-dark);
  border-bottom: 5px solid var(--cancel-btn-border-dark);
  color: black;
  cursor: var(--cursor-click);
}

.cancel-button:active {
  background-color: var(--cancel-btn-active);
  border-top: 5px solid var(--cancel-btn-border-dark);
  border-left: 5px solid var(--cancel-btn-border-dark);
  border-right: 5px solid var(--cancel-btn-border-light);
  border-bottom: 5px solid var(--cancel-btn-border-light);
}
</style>
