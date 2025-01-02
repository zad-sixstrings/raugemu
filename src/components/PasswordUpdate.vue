<template>
  <div class="auth-container">
    <h2 class="pwdrecovery-box-title">Réinitialisation</h2>
    <form @submit.prevent="handleSubmit" class="password-reset-form">
      <div class="form-group">
        <label for="password">Nouveau mot de passe:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          :disabled="passwordRecoveryStore.isLoading"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe:</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          :disabled="passwordRecoveryStore.isLoading"
        />
      </div>

      <div v-if="passwordRecoveryStore.error" class="error-message">
        {{ passwordRecoveryStore.error }}
      </div>

      <div v-if="passwordRecoveryStore.success" class="success-message">
        {{ passwordRecoveryStore.success }}
      </div>

      <button
        type="submit"
        class="loginbutton"
        :disabled="passwordRecoveryStore.isLoading || !isValidForm"
      >
        {{
          passwordRecoveryStore.isLoading
            ? "Mise à jour..."
            : "Mettre à jour le mot de passe"
        }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { usePasswordRecoveryStore } from "../stores/passwordRecovery";

const route = useRoute();
const passwordRecoveryStore = usePasswordRecoveryStore();
const password = ref("");
const confirmPassword = ref("");

const isValidForm = computed(
  () =>
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value
);

async function handleSubmit() {
  if (!isValidForm.value) return;

  const token = route.query.token as string;
  if (!token) {
    passwordRecoveryStore.error = "Token de réinitialisation manquant";
    return;
  }

  await passwordRecoveryStore.updatePassword(token, password.value);
}
</script>

<style scoped>
.password-reset-form,
.password-update-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group input[type="password"] {
  padding: 10px;
  border-top: 5px solid rgb(59, 59, 59);
  border-left: 5px solid rgb(59, 59, 59);
  border-right: 5px solid rgb(161, 161, 161);
  border-bottom: 5px solid rgb(161, 161, 161);
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
  font-size: 1em;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error-message {
  color: #dc3545;
  margin: 10px 0;
  text-align: center;
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
}

.success-message {
  color: #22c922;
  margin: 10px 0;
  text-align: center;
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
