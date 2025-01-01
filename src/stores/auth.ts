import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User } from "../types/auth";
import { useNotificationStore } from "./notifications";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  // Add a new function for setting user silently (without notification)
  function setUserSilently(newUser: User | null) {
    user.value = newUser;
  }

  // Keep the original setUser for active login events
  function setUser(newUser: User | null) {
    user.value = newUser;
    if (newUser) {
      const notificationStore = useNotificationStore();
      notificationStore.addNotification("Connexion réussie", "success");
    }
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("token");
    const notificationStore = useNotificationStore();
    notificationStore.addNotification("Déconnecté", "info");
  }

  function initializeAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Use setUserSilently instead of setUser
        setUserSilently({
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
    setUserSilently,
    logout,
    initializeAuth,
  };
});
