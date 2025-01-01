import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserProfile, PlaytimeData } from "../services/api";
import { authApi } from "../services/api";
import { useNotificationStore } from "./notifications";

export const useUserProfileStore = defineStore("userProfile", () => {
  const profile = ref<UserProfile | null>(null);
  // const extendedProfile = ref<ExtendedUserProfile | null>(null);
  const notificationStore = useNotificationStore();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const playtime = ref<PlaytimeData[]>([]);

  async function fetchProfile() {
    try {
      const userProfile = await authApi.getUserProfile();
      profile.value = userProfile;
    } catch (error) {
      notificationStore.addNotification(
        "Erreur lors du chargement du profil",
        "error"
      );
      throw error;
    }
  }


  async function fetchPlaytime() {
    try {
      playtime.value = await authApi.getPlaytime();
    } catch (error) {
      notificationStore.addNotification(
        "Erreur lors du chargement du temps de jeu",
        "error"
      );
      throw error;
    }
  }

  function clearProfiles() {
    profile.value = null;

  }

  return {
    profile,

    fetchProfile,

    clearProfiles,
    loading,
    error,
    playtime,
    fetchPlaytime,
  };
});
