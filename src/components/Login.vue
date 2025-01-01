<template>
  <div class="auth-container">
    <form @submit.prevent="handleSubmit" class="auth-form">
      <h2 class="box-title">Connexion</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="Entrez votre adresse email"
        />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <p class="auth-switch">
        Pas de compte?
        <router-link class="auth-switch-link" to="/register"
          >S'enregistrer</router-link
        >
      </p>
      <div v-if="authStore.error" class="error-message">
        {{ authStore.error }}
      </div>
      <button class="loginbutton" type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? "Connexion..." : "Connexion" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import type { LoginCredentials } from "../types/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive<LoginCredentials>({
  email: "",
  password: "",
});

async function handleSubmit() {
  const success = await authStore.login(form);
  if (success) {
    router.push("/");
  }
}
</script>
