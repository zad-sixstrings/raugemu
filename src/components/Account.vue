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
        <div class="info-grid">
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
        <div class="stats-grid">
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
      <div v-if="userSaves.length > 0" class="saves-section">
        <h3 class="account-subtitle">Sauvegardes enregistrées</h3>
        <div class="saves-grid">
          <div v-for="save in userSaves" :key="save.id" class="save-item">
            <div class="save-info">
              <label class="profile-label">{{ save?.game ?? "coucou" }}</label>
              <br />
              <span class="profile-span">
                Créé le {{ formatDateTime(save.creation_date) + " / " }}
              </span>
              <span class="profile-span">
                Modifié le {{ formatDateTime(save.change_date) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
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

.info-grid,
.stats-grid {
  display: grid;
  gap: 1rem;
}

.info-item,
.stat-item {
  display: grid;
  grid-template-columns: 150px 1fr;
  align-items: center;
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
</style>
