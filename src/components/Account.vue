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
      <p class="profile-loading">Chargement...</p>
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
        <div class="section-header">
          <h3 class="account-subtitle">Profil</h3>
          <button @click="showEditDialog = true" class="edit-button">
            Modifier
          </button>
        </div>
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
              memberdateFormat(profileStore.profile.creation_date)
            }}</span>
          </div>
          <div class="bio-item">
            <label class="profile-label">Bio:</label><br />
            <p class="bio">
              {{ profileStore.profile?.profile ?? "Coming soon..." }}
            </p>
          </div>
        </div>
      </div>
      <div class="stats-section">
        <h3 class="account-subtitle center">Avatar</h3>
        <div class="user-avatar">
          <img
            class="avatar"
            :src="profileStore.avatarPath"
            @error="handleImageError"
            alt="Profile avatar"
          />
        </div>
      </div>
      <div class="saves-section">
        <h3 class="account-subtitle">
          Sauvegardes:
          <span class="saves-span">{{ profileStore.profile?.saves ?? 0 }}</span>
        </h3>
        <template v-if="savesStore.saves.length > 0">
          <SearchBar v-model="savesSearchQuery" />
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
        <h3 class="account-subtitle">
          Temps de jeu: {{ getTotalPlaytime(gamePlaytime) }}
        </h3>

        <template v-if="gamePlaytime.length > 0">
          <SearchBar v-model="playtimeSearchQuery" />
        </template>
        <div class="playtime-grid">
          <div
            v-for="game in sortedAndFilteredPlaytime"
            :key="game.gamename"
            class="playtime-card"
          >
            <span class="game-name">{{ game.gamename }}</span>
            <span class="game-time">{{ playtimeFormat(game.playedtime) }}</span>
          </div>
        </div>
      </div>
      <!--
      <div class="stats-section">
        <h3 class="account-subtitle">
          Succès:
          <span class="achievements-span">{{
            achievementsStore.achievements.length
          }}</span>
        </h3>
        <template v-if="achievementsStore.achievements.length > 0">
          <SearchBar v-model="achievementSearchQuery" />
          <AchievementsList :achievements="filteredAchievements" />
        </template>
        <div v-else class="no-achievements">
          <span class="profile-span"
            >Vous n'avez pas encore débloqué de succès.</span
          >
        </div>
      </div> -->
    </div>
  </div>
  <ProfileEditDialog
    v-if="showEditDialog"
    :initial-bio="profileStore.profile?.profile ?? ''"
    :image-path="profileStore.profile?.imagePath"
    @close="showEditDialog = false"
    @saved="handleProfileUpdate"
  />
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
import { authApi } from "../services/api";
import { useUserProfileStore } from "../stores/userProfile";
import { useUserSavesStore } from "../stores/userSaves";
import type { PlaytimeData, UserSave } from "../types/user";
import {
  convertApiTimeFormat,
  playtimeFormat,
  getTotalPlaytime,
} from "../utils/playtimeFormat";
// import type { GamePlaytime } from "../types/user";
import { memberdateFormat } from "../utils/memberdateFormat";
import SearchBar from "./SearchBar.vue";
import SavesList from "./SavesList.vue";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.vue";
import ProfileEditDialog from "./ProfileEditDialog.vue";
// import AchievementsList from './AchievementsList.vue';
import { useAchievementsStore } from "../stores/achievements";
// import type { ApiPlaytimeData } from "../types/api";

const router = useRouter();
const authStore = useAuthStore();
const profileStore = useUserProfileStore();
const savesStore = useUserSavesStore();
const savesSearchQuery = ref("");
const showConfirmDialog = ref(false);
const selectedSave = ref<UserSave | null>(null);
const gamePlaytime = ref<PlaytimeData[]>([]);
const playtimeSearchQuery = ref("");
const showEditDialog = ref(false);
const achievementsStore = useAchievementsStore();
// const achievementSearchQuery = ref("");
const handleProfileUpdate = async () => {
  await profileStore.fetchProfile();
};

/* const filteredAchievements = computed(() => {
  if (!achievementSearchQuery.value.trim()) return achievementsStore.achievements;
  const query = achievementSearchQuery.value.toLowerCase().trim();
  return achievementsStore.achievements.filter((achievement) =>
    achievement.game.toLowerCase().includes(query) ||
    achievement.achievementname.toLowerCase().includes(query) ||
    achievement.description.toLowerCase().includes(query)
  );
}); */

const sortedAndFilteredPlaytime = computed(() => {
  const sorted = [...gamePlaytime.value].sort((a, b) => {
    const aMinutes = (a.playedtime.hours || 0) * 60 + a.playedtime.minutes;
    const bMinutes = (b.playedtime.hours || 0) * 60 + b.playedtime.minutes;
    return bMinutes - aMinutes;
  });

  if (!playtimeSearchQuery.value.trim()) return sorted;
  const query = playtimeSearchQuery.value.toLowerCase().trim();
  return sorted.filter((game) => game.gamename.toLowerCase().includes(query));
});

const filteredSaves = computed(() => {
  if (!savesSearchQuery.value.trim()) return savesStore.saves;

  const query = savesSearchQuery.value.toLowerCase().trim();
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

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = '/assets/profilepic/default.png';
};

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
    return;
  }
  try {
    await Promise.all([
      profileStore.fetchProfile(),
      savesStore.fetchSaves(),
      profileStore.fetchPlaytime(),
      achievementsStore.fetchAchievements(),
      (async () => {
        const apiData = await authApi.getPlaytime();
        gamePlaytime.value = apiData.map((game) => convertApiTimeFormat(game));
      })(),
    ]);
  } catch (error) {
    console.error("Error in data fetching:", error);
  }
});
</script>

<style scoped>
.account-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  border-left: 5px solid var(--border-light-purple);
  border-bottom: 5px solid var(--border-dark-purple);
  border-right: 5px solid var(--border-dark-purple);
  border-top: none;
  overflow-y: auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.account-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 800px;
  text-align: left;
  background-color: var(--purple);
  border-top: 5px solid var(--border-light-purple);
  border-left: 5px solid var(--border-light-purple);
  border-right: 5px solid var(--border-dark-purple);
  border-bottom: 5px solid var(--border-dark-purple);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.account-title {
  font-family: var(--font-press-start);
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
  font-family: var(--font-press-start);
  font-weight: 400;
  font-size: 1em;
}

.profile-section,
.stats-section {
  margin-bottom: 2rem;
  flex: 1;
  min-width: 300px;
  padding: 20px;
}

.saves-section {
  margin: 0 auto;
  width: 350px;
}

.profile-section,
.stats-section {
  flex: 1;
}

.profile-section,
.stats-section,
.saves-section {
  margin: 0;
  padding: 20px;
}

.stats-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
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
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
}

.info-item,
.stat-item {
  display: flex;
  align-items: center;
}

p.bio {
  color: white;
  font-family: var(--font-pixelify);
  font-optical-sizing: auto;
  font-weight: 400;
}

.info-item label,
.stat-item label {
  min-width: 150px;
  flex-shrink: 0;
}

label.profile-label {
  color: var(--blue);
  font-family: var(--font-pixelify);
  font-optical-sizing: auto;
  font-weight: 400;
}

span.profile-span {
  color: white;
  font-family: var(--font-pixelify);
  font-optical-sizing: auto;
  font-weight: 400;
}

p.profile-loading {
  color: var(--green);
  font-family: var(--font-pixelify);
  font-optical-sizing: auto;
  font-weight: 400;
}

p.profile-error {
  color: var(--red);
  font-family: var(--font-pixelify);
  font-optical-sizing: auto;
  font-weight: 400;
}

/* PLAYTIME GRID */
.playtime-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1rem;
  align-items: flex-start;
  height: 350px;
  overflow-y: auto;
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

.playtime-grid::-webkit-scrollbar {
  display: none;
}

.playtime-card {
  flex: 0 0 auto;
  background: rgba(74, 158, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  width: 150px;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.game-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-family: var(--font-pixelify);
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 0.9em;
}

.game-time {
  color: var(--blue);
  font-family: var(--font-press-start);
  font-weight: 400;
  font-size: 0.6em;
}

/* AVATAR */
.user-avatar {
  display: flex;
  justify-content: center;
}

img.avatar {
  width: 200px;
  border-radius: 100%;
  border: 5px solid var(--purple);
}

/* PROFILE CUSTOMIZATION */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.edit-button {
  background: var(--blue);
  border-top: 5px solid var(--border-light-blue);
  border-left: 5px solid var(--border-light-blue);
  border-right: 5px solid var(--border-dark-blue);
  border-bottom: 5px solid var(--border-dark-blue);
  color: white;
  padding: 4px 12px;
  border-radius: 5px;
  cursor: var(--cursor-click);
  font-family: var(--font-pixelify);
  font-size: 0.9em;
}
.edit-button:active {
  background: var(--blue-active);
  border-top: 5px solid var(--border-dark-blue);
  border-left: 5px solid var(--border-dark-blue);
  border-right: 5px solid var(--border-light-blue);
  border-bottom: 5px solid var(--border-light-blue);
}
</style>
