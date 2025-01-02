import { defineStore } from "pinia";
import { ref } from "vue";
import { passwordRecoveryApi } from "../services/passwordRecovery";

export const usePasswordRecoveryStore = defineStore("passwordRecovery", () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const success = ref<string | null>(null);

  async function requestReset(email: string) {
    isLoading.value = true;
    error.value = null;
    success.value = null;

    try {
      const response = await passwordRecoveryApi.requestPasswordReset(email);
      success.value = response.message || "Email de réinitialisation envoyé.";
    } catch (err) {
      error.value = "Échec de la demande de réinitialisation";
      console.error("Error requesting password reset:", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function updatePassword(token: string, newPassword: string) {
    isLoading.value = true;
    error.value = null;
    success.value = null;

    try {
      const response = await passwordRecoveryApi.updatePassword(
        token,
        newPassword
      );
      success.value =
        response.message || "Mot de passe mis à jour avec succès.";
    } catch (err) {
      error.value = "Échec de la mise à jour du mot de passe";
      console.error("Error updating password:", err);
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, error, success, requestReset, updatePassword };
});
