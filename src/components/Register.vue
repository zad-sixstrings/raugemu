<template>
  <div class="auth-container">
    <form @submit.prevent="handleSubmit" class="auth-form">
      <h2 class="box-title">S'enregistrer</h2>

      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          required
          placeholder="Supersaucisson"
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          required
          placeholder="saucisson@charcuterie.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          v-model="form.password"
          type="password"
          required
          placeholder="Choisissez votre mot de passe"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmation</label>
        <input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          required
          placeholder="Confirmez votre mot de passe"
        />
      </div>

      <p class="auth-switch">
        Vous avez déjà un compte?
        <router-link class="auth-switch-link" to="/login"
          >Connexion</router-link
        >
      </p>

      <div v-if="error">
        <p class="error-message">{{ error }}</p>
      </div>

      <button class="loginbutton" type="submit" :disabled="loading">
        {{ loading ? "Création..." : "Confirmer" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import type { RegisterCredentials } from "../types/auth";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const loading = ref(false);
const error = ref("");
const authStore = useAuthStore();

const form = reactive<RegisterCredentials>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

async function handleSubmit() {
  if (form.password !== form.confirmPassword) {
    error.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    loading.value = true;
    error.value = "";

    const success = await authStore.register(form);
    if (success) {
      router.push("/login");
    }
  } finally {
    loading.value = false;
  }
}
</script>
