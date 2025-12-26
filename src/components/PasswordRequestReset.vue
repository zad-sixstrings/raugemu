<!-- components/PasswordRequestReset.vue -->
<template>
  <div class="auth-container">
    <h2 class="pwdrecovery-box-title">Réinitialisation</h2>
    <form @submit.prevent="handleSubmit" class="password-reset-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
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
        :disabled="passwordRecoveryStore.isLoading"
        class="loginbutton"
      >
        {{
          passwordRecoveryStore.isLoading
            ? "Envoi en cours..."
            : "Réinitialiser"
        }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePasswordRecoveryStore } from "../stores/passwordRecovery";

const passwordRecoveryStore = usePasswordRecoveryStore();
const email = ref("");

async function handleSubmit() {
  await passwordRecoveryStore.requestReset(email.value);
}
</script>
<style scoped>
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
  color: var(--red);
  margin: 10px 0;
  text-align: center;
  font-family: var(--font-secondary);
  font-weight: 400;
}

.success-message {
  color: var(--green);
  margin: 10px 0;
  text-align: center;
  font-family: var(--font-secondary);
  font-weight: 400;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-group input[type="email"] {
  padding: 10px;
  border-top: 5px solid var(--border-dark);
  border-left: 5px solid var(--border-dark);
  border-right: 5px solid var(--border-light);
  border-bottom: 5px solid var(--border-light);
  font-family: var(--font-secondary);
  font-weight: 400;
  font-size: 1em;
}

</style>
