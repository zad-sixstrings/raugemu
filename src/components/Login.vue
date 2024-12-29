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

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button class="loginbutton" type="submit" :disabled="loading">
        {{ loading ? "Connexion..." : "Connexion" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { authApi } from "../services/api";
import type { LoginCredentials } from "../types/auth";

const router = useRouter();
const authStore = useAuthStore();

const loading = ref(false);
const error = ref("");

const form = reactive<LoginCredentials>({
  email: "",
  password: "",
});

async function handleSubmit() {
  try {
    loading.value = true;
    error.value = '';
    
    const user = await authApi.login(form);
    authStore.setUser(user);
    router.push('/');
  } catch (err) {
    error.value = 'Email ou mot de passe invalide.';
  } finally {
    loading.value = false;
  }
}
</script>
