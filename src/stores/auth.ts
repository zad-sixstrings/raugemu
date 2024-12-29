import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types/auth";
import { useNotificationStore } from "./notifications";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  function setUser(newUser: User | null) {
    user.value = newUser;
    if (newUser) {
      const notificationStore = useNotificationStore();
      notificationStore.addNotification("Connecté!", "success");
    }
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("token");
    const notificationStore = useNotificationStore();
    notificationStore.addNotification("Déconnecté!", "info");
  }

  function initializeAuth() {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUser({
          id: "temp-id",
          username: "temp-username",
          email: "temp-email",
        } as User);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        logout(); // Clear invalid token/user data
      }
    }
  }

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
    initializeAuth,
  };
});