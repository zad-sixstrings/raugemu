<template>
  <div class="account-container">
    <div v-if="loading" class="account-content">
      <p class="profile-error">Chargement...</p>
    </div>
    <div v-else-if="error" class="account-content">
      <p class="profile-error">Une erreur est survenue: {{ error }}</p>
    </div>
    <div v-else-if="userData" class="account-content">
      <div class="profile-section">
        <h3 class="account-subtitle">Profil</h3>
        <div class="info-content">
          <div class="info-item">
            <label class="profile-label">Pseudo:</label>
            <span class="profile-span">{{ userData.nickname }}</span>
          </div>
          <div class="info-item">
            <label class="profile-label">Email:</label>
            <span class="profile-span">{{ userData.email || "email" }}</span>
          </div>
          <div class="info-item">
            <label class="profile-label">Membre depuis:</label>
            <span class="profile-span">{{
              formatDateTime(userData.creation_date)
            }}</span>
          </div>
          <div class="info-item">
            <label class="profile-label">Bio:</label>
            <span class="profile-span">{{ userData.profile }}</span>
          </div>
        </div>
      </div>
      <div class="stats-section">
        <h3 class="account-subtitle">Statistiques</h3>
        <div class="stats-content">
          <div class="stat-item">
            <label class="profile-label">Temps de jeu:</label>
            <span class="profile-span">{{ userStats?.playTime ?? 0 }}</span>
          </div>
          <div class="stat-item">
            <label class="profile-label">Sauvegardes:</label>
            <span class="profile-span">{{ userStats?.saves ?? 0 }}</span>
          </div>
        </div>
      </div>
      <div v-if="userSaves.length >= 0" class="saves-section">
        <h3 class="account-subtitle">Sauvegardes enregistrées</h3>
        <!-- Search input -->
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher une sauvegarde..."
            class="search-input"
          />
        </div>
        <div v-if="filteredSaves.length >= 0" class="saves-content">
          <div v-for="save in filteredSaves" :key="save.id" class="save-item">
            <div class="save-info">
              <div class="save-header">
                <label class="profile-label">
                  {{ save?.game ?? "Pas de sauvegardes." }}
                </label>
                <button
                  v-if="userSaves.length > 0"
                  @click="confirmDelete(save)"
                  class="delete-button"
                  :disabled="isDeleting"
                >
                  Supprimer
                </button>
              </div>
              <br />
              <span class="profile-span">
                Créé le {{ formatDateTime(save?.creation_date ?? "-") + " / " }}
              </span>
              <span class="profile-span">
                Modifié le {{ formatDateTime(save?.change_date ?? "-") }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="no-results">
          <p class="profile-span">
            Aucune sauvegarde trouvée pour "{{ searchQuery }}"
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- CONFIRM DIALOG -->
  <div v-if="showConfirmDialog" class="confirm-dialog">
    <div class="dialog-content">
      <p>Êtes-vous sûr de vouloir supprimer cette sauvegarde ?</p>
      <p class="save-name">{{ selectedSave?.game }}</p>
      <div class="dialog-buttons">
        <button
          @click="handleDelete"
          class="confirm-button"
          :disabled="isDeleting"
        >
          {{ isDeleting ? "Suppression..." : "Confirmer" }}
        </button>
        <button
          @click="showConfirmDialog = false"
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
import { ref, onMounted } from "vue";
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import {
  authApi,
  type UserProfile,
  type ExtendedUserProfile,
  type UserSave,
} from "../services/api";

const authStore = useAuthStore();
const router = useRouter();
const userData = ref<UserProfile | null>(null);
const userStats = ref<ExtendedUserProfile | null>(null);
const userSaves = ref<UserSave[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const showConfirmDialog = ref(false);
const selectedSave = ref<UserSave | null>(null);
const isDeleting = ref(false);
const searchQuery = ref("");

const formatDateTime = (timestamp: string): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString("fr-FR");
  const formattedTime = date.toLocaleTimeString("fr-FR");
  return `${formattedDate} à ${formattedTime}`;
};

const fetchUserData = async () => {
  try {
    loading.value = true;
    error.value = null;

    const userId = authStore.user?.id;
    if (!userId) {
      throw new Error("User ID not found");
    }

    // Fetch all user data in parallel
    const [profile, extendedProfile, saves] = await Promise.all([
      authApi.getUserProfile(),
      authApi.getUserProfileExtended(),
      authApi.getUserSaves(),
    ]);

    userData.value = profile;
    userStats.value = extendedProfile;
    userSaves.value = saves;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "An unknown error occurred";
    console.error("Error fetching user data:", e);
  } finally {
    loading.value = false;
  }
};
const confirmDelete = (save: UserSave) => {
  selectedSave.value = save;
  showConfirmDialog.value = true;
};

const handleDelete = async () => {
  if (!selectedSave.value) return;

  try {
    isDeleting.value = true;
    await authApi.deleteSave(selectedSave.value.id);

    // Remove the save from the local list
    userSaves.value = userSaves.value.filter(
      (save) => save.id !== selectedSave.value?.id
    );

    showConfirmDialog.value = false;
    selectedSave.value = null;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to delete save";
  } finally {
    isDeleting.value = false;
  }
};

const filteredSaves = computed(() => {
  if (!searchQuery.value.trim()) {
    return userSaves.value;
  }

  const query = searchQuery.value.toLowerCase().trim();
  return userSaves.value.filter((save) =>
    save.game.toLowerCase().includes(query)
  );
});

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
    return;
  }

  await fetchUserData();
});
</script>

<style scoped>
.account-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.account-content {
  background-color: rgb(26, 45, 54);
  padding: 2rem;
  border-radius: 8px;
  color: white;
}

h2.account-title {
  color: white;
  margin-bottom: 1.5rem;
  font-family: "Press Start 2P", serif;
  font-weight: 400;
  text-align: center;
}

h3.account-subtitle {
  color: white;
  margin-bottom: 1rem;
  font-family: "Press Start 2P", serif;
  font-weight: 400;
  font-size: 1em;
}

.profile-section,
.stats-section {
  margin-bottom: 2rem;
}

.info-content,
.stats-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item,
.stat-item {
  display: flex;
  align-items: center;
}

/* Added to maintain the label width */
.info-item label,
.stat-item label {
  min-width: 150px;
  flex-shrink: 0;
}

label.profile-label {
  color: #4a9eff;
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
}

span.profile-span {
  color: white;
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
}

p.profile-error {
  color: rgb(189, 95, 95);
  font-family: "Pixelify Sans", serif;
  font-optical-sizing: auto;
  font-weight: 400;
}

/* SAVES SECTION */
.save-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.saves-content {
  background-color: transparent;
  max-height: 400px;
  overflow: scroll;
}

.save-info {
  margin-bottom: 20px;
  background-color: rgb(78, 78, 78);
  padding: 10px;
}

.delete-button {
  color: #ef4444;
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  margin-right: 20px;
  border: 1px solid #ef4444;
  border-radius: 0.25rem;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-button:hover {
  background-color: #ef4444;
  color: white;
}

.delete-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

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
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  max-width: 400px;
  width: 90%;
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
  background-color: #ef4444;
  color: white;
  border: none;
}

.confirm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cancel-button {
  background-color: #e5e7eb;
  border: none;
}

/* SEARCH */
.search-container {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem;
  background-color: rgb(38, 57, 66);
  border: 1px solid rgb(74, 158, 255);
  border-radius: 4px;
  color: white;
  font-family: "Pixelify Sans", serif;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
  font-family: "Pixelify Sans", serif;
}

.search-input:focus {
  outline: none;
  border-color: rgb(74, 158, 255);
  box-shadow: 0 0 0 2px rgba(74, 158, 255, 0.2);
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: red;
}
</style>
