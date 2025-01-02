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

  async function updateProfile(profileText: string) {
    try {
      loading.value = true;
      error.value = null;
      const updatedProfile = await authApi.updateProfile({ profileText });
      profile.value = updatedProfile;
      notificationStore.addNotification("Profil mis à jour avec succès", "success");
    } catch (err) {
      error.value = "Erreur lors de la mise à jour du profil";
      notificationStore.addNotification("Erreur lors de la mise à jour du profil", "error");
      throw err;
    } finally {
      loading.value = false;
    }
  }
  
  async function updateAvatar(file: File) {
    try {
      loading.value = true;
      error.value = null;
      const result = await authApi.updateAvatar(file);
      if (result.success && profile.value) {
        profile.value = { ...profile.value, imagePath: result.imagePath };
      }
      notificationStore.addNotification("Avatar mis à jour avec succès", "success");
    } catch (err) {
      error.value = "Erreur lors de la mise à jour de l'avatar";
      notificationStore.addNotification("Erreur lors de la mise à jour de l'avatar", "error");
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    profile,
    fetchProfile,
    updateProfile,
    updateAvatar,
    clearProfiles,
    loading,
    error,
    playtime,
    fetchPlaytime,
  };
});
