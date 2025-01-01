import { defineStore } from "pinia";
import { ref } from "vue";
import type { UserSave } from "../services/api";
import { authApi } from "../services/api";
import { useNotificationStore } from "./notifications";

export const useUserSavesStore = defineStore("userSaves", () => {
  const saves = ref<UserSave[]>([]);
  const notificationStore = useNotificationStore();
  const loading = ref(false);
  const error = ref<string | null>(null);
  const isDeleting = ref(false);

  async function fetchSaves() {
    try {
      const userSaves = await authApi.getUserSaves();
      saves.value = userSaves;
    } catch (error) {
      notificationStore.addNotification(
        "Erreur lors du chargement des sauvegardes",
        "error"
      );
      throw error;
    }
  }

  async function deleteSave(saveId: string) {
    try {
      await authApi.deleteSave(saveId);
      saves.value = saves.value.filter((save) => save.id !== saveId);
      notificationStore.addNotification(
        "Sauvegarde supprimée avec succès",
        "success"
      );
    } catch (error) {
      notificationStore.addNotification(
        "Erreur lors de la suppression",
        "error"
      );
      throw error;
    }
  }

  function clearSaves() {
    saves.value = [];
  }

  return {
    saves,
    fetchSaves,
    deleteSave,
    clearSaves,
    loading,
    error,
    isDeleting,
  };
});
