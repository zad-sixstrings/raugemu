import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, LoginCredentials } from "../types/auth";
import { useNotificationStore } from "./notifications";
import { authApi } from "../services/api";
import { useUserProfileStore } from "./userProfile";
import { useUserSavesStore } from "./userSaves";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref("");
  const isAuthenticated = computed(() => !!user.value);
  const notificationStore = useNotificationStore();
  const userProfileStore = useUserProfileStore();
  const userSavesStore = useUserSavesStore();

  async function login(credentials: LoginCredentials) {
    loading.value = true;
    error.value = "";
    try {
      const userData = await authApi.login(credentials);
      setUser(userData);
      return true;
    } catch (err) {
      error.value = "Email ou mot de passe invalide.";
      return false;
    } finally {
      loading.value = false;
    }
  }

  function setUser(newUser: User | null) {
    user.value = newUser;
    if (newUser) {
      notificationStore.addNotification("Connexion réussie", "success");
    }
  }

  function setUserSilently(newUser: User | null) {
    user.value = newUser;
  }

  function logout() {
    user.value = null;
    localStorage.removeItem("token");
    // Clear other stores
    userProfileStore.clearProfiles();
    userSavesStore.clearSaves();
    notificationStore.addNotification("Déconnecté", "info");
  }

  function initializeAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Update the temporary user object to match UserProfile structure
        setUserSilently({
          id: "temp-id",
          nickname: "temp-username",
          email: "temp-email",
          creation_date: new Date().toISOString(),
          profile: "",
          saves: 0,
          imagePath: ""
        } as User);
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        logout();
      }
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    setUser,
    setUserSilently,
    logout,
    initializeAuth,
  };
});