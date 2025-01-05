import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile, PlaytimeData } from "../types/user";
// import type { ApiPlaytimeData } from "../types/api";
import { authApi } from "../services/api";
import { useNotificationStore } from "./notifications";
import { convertApiTimeFormat } from "../utils/playtimeFormat";

export const useUserProfileStore = defineStore("userProfile", () => {
  const profile = ref<UserProfile | null>(null);
  const notificationStore = useNotificationStore();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const playtime = ref<PlaytimeData[]>([]);

  const avatarPath = computed(() => {
    if (!profile.value?.id) {
      console.log("No profile ID found, using default avatar at: /assets/profilepic/default.png");
      return '/assets/profilepic/default.png';
    }
    
    // Try all possible extensions
    const userId = profile.value.id;
    // This will try PNG first, then JPG, then GIF
    for (const ext of ['png', 'jpg', 'gif']) {
      const path = `/assets/profilepic/${userId}.${ext}`;
      console.log("Trying to load user avatar at:", path);
      
      // Try to fetch the image to see if it exists
      fetch(path)
        .then(response => {
          if (response.ok) {
            console.log("Found avatar with extension:", ext);
          }
        })
        .catch(() => {
          console.log("Failed to find avatar with extension:", ext);
        });
        
      return path; // Return the first possible path
    }
    
    return '/assets/profilepic/default.png';
  });

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
      const apiData = await authApi.getPlaytime();
      playtime.value = apiData.map((game) => convertApiTimeFormat(game));
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
      notificationStore.addNotification(
        "Profil mis à jour avec succès",
        "success"
      );
    } catch (err) {
      error.value = "Erreur lors de la mise à jour du profil";
      notificationStore.addNotification(
        "Erreur lors de la mise à jour du profil",
        "error"
      );
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
      notificationStore.addNotification(
        "Avatar mis à jour avec succès",
        "success"
      );
    } catch (err) {
      error.value = "Erreur lors de la mise à jour de l'avatar";
      notificationStore.addNotification(
        "Erreur lors de la mise à jour de l'avatar",
        "error"
      );
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
    avatarPath
  };
});
