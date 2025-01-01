<template>
  <div class="account-container">
    <div
      v-if="profileStore.loading || savesStore.loading"
      class="account-content"
    >
      <p class="profile-error">Chargement...</p>
    </div>
    <div
      v-else-if="profileStore.error || savesStore.error"
      class="account-content"
    >
      <p class="profile-error">
        Une erreur est survenue: {{ profileStore.error || savesStore.error }}
      </p>
    </div>
    <div v-else-if="profileStore.profile" class="account-content">
      <div class="profile-section">
        <h3 class="account-subtitle">Profil</h3>
        <div class="info-content">
          <div class="info-item">
            <label class="profile-label">Pseudo:</label>
            <span class="profile-span">{{
              profileStore.profile.nickname
            }}</span>
          </div>
          <div class="info-item">
            <label class="profile-label">Email:</label>
            <span class="profile-span">{{
              profileStore.profile.email || "email"
            }}</span>
          </div>
          <div class="info-item">
            <label class="profile-label">Membre depuis:</label>
            <span class="profile-span">{{
              formatDateTime(profileStore.profile.creation_date)
            }}</span>
          </div>
          <div class="info-item">
            <label class="profile-label">Bio:</label>
            <span class="profile-span">{{
              profileStore.profile?.profile ?? "Coming soon..."
            }}</span>
          </div>
        </div>
      </div>
      <div class="stats-section">
        <h3 class="account-subtitle">Statistiques</h3>
        <div class="stats-content">
          <div class="stat-item">
            <label class="profile-label">Sauvegardes:</label>
            <span class="profile-span">{{
              profileStore.profile?.saves ?? 0
            }}</span>
          </div>
          <div class="stat-item">
            <label class="profile-label">Temps de jeu:</label>
            <div class="playtime-grid">
              <div
                v-for="game in profileStore.playtime"
                :key="game.gamename"
                class="playtime-card"
              >
                <span class="game-name">{{ game.gamename }}</span>
                <span class="game-time">{{
                  playtimeFormat(game.playedtime)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="saves-section">
        <h3 class="account-subtitle">Sauvegardes enregistrées</h3>

        <!-- Show search and saves only if there are saves -->
        <template v-if="savesStore.saves.length > 0">
          <SearchBar v-model="searchQuery" />
          <SavesList
            :saves="filteredSaves"
            @delete="confirmDelete"
            :isDeleting="savesStore.isDeleting"
          />
        </template>
        <div v-else class="no-saves">
          <span class="profile-span"
            >Vous n'avez pas encore de sauvegardes enregistrées.</span
          >
        </div>
      </div>
    </div>
  </div>
  <DeleteConfirmationDialog
    v-if="showConfirmDialog"
    :save="selectedSave"
    :isDeleting="savesStore.isDeleting"
    @confirm="handleDelete"
    @cancel="showConfirmDialog = false"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useUserProfileStore } from "../stores/userProfile";
import { useUserSavesStore } from "../stores/userSaves";
import type { UserSave } from "../types/saves";
import { formatDateTime } from "../utils/dateFormat";
import SearchBar from "./SaveSearchBar.vue";
import SavesList from "./SavesList.vue";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";
import { playtimeFormat } from "../utils/playtimeFormat";

const router = useRouter();
const authStore = useAuthStore();
const profileStore = useUserProfileStore();
const savesStore = useUserSavesStore();
const searchQuery = ref("");
const showConfirmDialog = ref(false);
const selectedSave = ref<UserSave | null>(null);

const filteredSaves = computed(() => {
  if (!searchQuery.value.trim()) return savesStore.saves;

  const query = searchQuery.value.toLowerCase().trim();
  return savesStore.saves.filter((save) =>
    save.game.toLowerCase().includes(query)
  );
});

const confirmDelete = (save: UserSave) => {
  selectedSave.value = save;
  showConfirmDialog.value = true;
};

const handleDelete = async () => {
  if (!selectedSave.value) return;

  await savesStore.deleteSave(selectedSave.value.id);
  showConfirmDialog.value = false;
  selectedSave.value = null;
};

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
    return;
  }

  await Promise.all([
    profileStore.fetchProfile(),
    savesStore.fetchSaves(),
    profileStore.fetchPlaytime(),
  ]);
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

/* PLAYTIME GRID */
.playtime-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
}

.playtime-card {
  background: rgba(74, 158, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.game-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.game-time {
  color: #4a9eff;
}
</style>
