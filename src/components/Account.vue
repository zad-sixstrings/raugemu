<template>
  <div class="account-title-wrapper">
    <h2 class="account-title">
      {{ profileStore.profile?.nickname }}
    </h2>
  </div>
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
        <h3 class="account-subtitle">Avatar</h3>
        <div class="account-avatar">
          <span class="profile-span">Coming soon...</span>
        </div>
      </div>
      <div class="saves-section">
        <h3 class="account-subtitle">
          Sauvegardes:
          <span class="saves-span">{{ profileStore.profile?.saves ?? 0 }}</span>
        </h3>

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
      <div class="stats-section">
        <h3 class="account-subtitle">Temps de jeu</h3>
        <div class="stats-content">
          <template v-if="savesStore.saves.length > 0">
            <SearchBar v-model="gameSearchQuery" />
          </template>
          <div class="playtime-grid">
            <div
              v-for="game in sortedAndFilteredPlaytime"
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
import type { GamePlaytime } from "../types/playtime";

const router = useRouter();
const authStore = useAuthStore();
const profileStore = useUserProfileStore();
const savesStore = useUserSavesStore();
const searchQuery = ref("");
const showConfirmDialog = ref(false);
const selectedSave = ref<UserSave | null>(null);

const gameSearchQuery = ref("");

const sortedAndFilteredPlaytime = computed(() => {
  // First sort by playtime
  const sorted = [...profileStore.playtime].sort(
    (a: GamePlaytime, b: GamePlaytime) =>
      b.playedtime.seconds - a.playedtime.seconds
  );

  // Then filter if there's a search query
  if (!gameSearchQuery.value.trim()) return sorted;

  const query = gameSearchQuery.value.toLowerCase().trim();
  return sorted.filter((game) => game.gamename.toLowerCase().includes(query));
});
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1100px;
  border-left: 5px solid rgb(123, 18, 209);
  border-bottom: 5px solid rgb(59, 6, 129);
  border-right: 5px solid rgb(59, 6, 129);
  border-top: none;
  overflow-y: auto;
}

.account-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 1100px;
  text-align: left;
  background-color: rgb(90, 0, 180);
  border-top: 5px solid rgb(123, 18, 209);
  border-left: 5px solid rgb(123, 18, 209);
  border-right: 5px solid rgb(59, 6, 129);
  border-bottom: 5px solid rgb(59, 6, 129);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.account-title {
  font-family: "Press Start 2P", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: italic;
  color: white;
  font-size: 1.4em;
  line-height: 40px;
}

.account-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  background-color: transparent;
  border-radius: 8px;
  color: white;
  padding: 20px;
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
  flex: 1;
  min-width: 300px;
  padding: 20px;
  /*background: transparent;
  border-top: 5px solid rgb(161, 161, 161);
  border-left: 5px solid rgb(161, 161, 161);
  border-right: 5px solid rgb(59, 59, 59);
  border-bottom: 5px solid rgb(59, 59, 59);
  border-radius: 10px;*/
}

.saves-section {
  margin: 0 auto;
  width: 450px;
  /*background: rgb(122, 122, 122);
  border-top: 5px solid rgb(161, 161, 161);
  border-left: 5px solid rgb(161, 161, 161);
  border-right: 5px solid rgb(59, 59, 59);
  border-bottom: 5px solid rgb(59, 59, 59);
  border-radius: 10px;
  padding: 20px;*/
}

.profile-section {
  flex: 1;
}

.stats-section {
  flex: 2;
}
.profile-section,
.stats-section,
.saves-section {
  margin: 0;  /* Remove margin-bottom */
  padding: 20px;
}
.stats-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;  /* Add this to match heights */
}
.info-content,
.stats-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.stats-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%; /* Add this */
}
.stat-item {
  display: flex;
  flex-direction: column; /* Change to column */
  width: 100%; /* Add this */
  gap: 1rem; /* Add this */
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

span.save-span {
  font-family: "Press Start 2P", serif;
  font-weight: 400;
  font-size: 1em;
  color: white;
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
  width: 150px;
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
