import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, LoginCredentials, RegisterCredentials } from "../types/auth";
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
      // Fetch profile data right after successful login
      await userProfileStore.fetchProfile();
      return true;
    } catch (err) {
      error.value = "Email ou mot de passe invalide.";
      return false;
    } finally {
      loading.value = false;
    }
  }
  async function register(credentials: RegisterCredentials) {
    loading.value = true;
    error.value = "";
    try {
      await authApi.register(credentials); // Just await the call
      notificationStore.addNotification("Compte créé avec succès!", "success");
      return true;
    } catch (err) {
      error.value = "Echec de création de compte, veuillez réessayer";
      notificationStore.addNotification("Echec de création de compte, veuillez réessayer", "error");
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

  async function initializeAuth() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Set temporary user first
        setUserSilently({
          id: "temp-id",
          nickname: "temp-username",
          email: "temp-email",
          creation_date: new Date().toISOString(),
          profile: "",
          saves: 0,
          imagePath: ""
        } as User);
        
        // Then fetch the actual profile
        await userProfileStore.fetchProfile();
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
    register,
  };
});