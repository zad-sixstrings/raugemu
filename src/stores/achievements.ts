import { defineStore } from "pinia";
import { ref } from "vue";
import type { Achievement } from "../types/user";
import { authApi } from "../services/api";
import { useNotificationStore } from "./notifications";

export const useAchievementsStore = defineStore("achievements", () => {
  const achievements = ref<Achievement[]>([]);
  const notificationStore = useNotificationStore();
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAchievements() {
    try {
      loading.value = true;
      const userAchievements = await authApi.getAchievements();
      achievements.value = userAchievements;
    } catch (error) {
      notificationStore.addNotification(
        "Erreur lors du chargement des succès",
        "error"
      );
      throw error;
    } finally {
      loading.value = false;
    }
  }

  function clearAchievements() {
    achievements.value = [];
  }

  return {
    achievements,
    fetchAchievements,
    clearAchievements,
    loading,
    error,
  };
});