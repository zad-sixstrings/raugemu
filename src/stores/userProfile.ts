import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile, PlaytimeData } from "../types/user";
// import type { ApiPlaytimeData } from "../types/api";
import { authApi } from "../services/api";
import { useNotificationStore } from "./notifications";
import { convertApiTimeFormat } from "../utils/playtimeFormat";

export const useUserProfileStore = defineStore("userProfile", () => {
  const profile = ref<UserProfile | null>(null);
  const foundExtension = ref<string | null>(null);
  const notificationStore = useNotificationStore();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const playtime = ref<PlaytimeData[]>([]);

  const avatarPath = computed(() => {
    if (!profile.value?.id) {
      console.log("No profile ID found, using default avatar at: /assets/profilepic/default.png");
      return '/assets/profilepic/default.png';
    }

    // If we've already found the extension, use it
    if (foundExtension.value) {
      const path = `/assets/profilepic/${profile.value.id}.${foundExtension.value}`;
      console.log("Using cached avatar path:", path);
      return path;
    }
    
    // Default to first try, will be updated when correct extension is found
    const path = `/assets/profilepic/${profile.value.id}.jpg`;
    console.log("First attempt at avatar path:", path);
    return path;
  });

  // Add a method to check and set the correct extension
  const findCorrectExtension = async () => {
    if (!profile.value?.id) return;
    
    const userId = profile.value.id;
    const extensions = ['jpg', 'jpeg', 'png', 'gif'];

    for (const ext of extensions) {
      const path = `/assets/profilepic/${userId}.${ext}`;
      try {
        const response = await fetch(path);
        if (response.ok && response.headers.get('content-type')?.includes('image')) {
          console.log("Found correct avatar extension:", ext);
          foundExtension.value = ext;
          return;
        }
      } catch (error) {
        console.log(`No avatar found with extension: ${ext}`);
      }
    }
  };

  async function fetchProfile() {
    try {
      const userProfile = await authApi.getUserProfile();
      profile.value = userProfile;
      // After getting profile, find the correct extension
      await findCorrectExtension();
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
