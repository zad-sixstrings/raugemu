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
        <label for="password">Password</label>
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

      <button type="submit" :disabled="loading">
        {{ loading ? "Logging in..." : "Login" }}
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
    error.value = "";

    const response = await authApi.login(form);
    // Store token in localStorage
    if (response.token) {
      localStorage.setItem("token", response.token);
    }

    // Update auth store with user info
    authStore.setUser(response.user);
    router.push("/");
  } catch (err) {
    error.value = "Email ou mot de passe erroné";
    localStorage.removeItem("token"); // Clear any existing token on error
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  border-radius: 10px;
  background: rgb(122, 122, 122);
  border-top: 5px solid rgb(161, 161, 161);
  border-left: 5px solid rgb(161, 161, 161);
  border-right: 5px solid rgb(59, 59, 59);
  border-bottom: 5px solid rgb(59, 59, 59);
}

.box-title {
  font-family: "Press Start 2P", serif;
  font-weight: 400;
  font-style: normal;
  padding: 2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  padding: 0 2rem 1.2rem 2rem;
  flex-direction: column;
}

label {
  font-family: "Micro 5", serif;
  font-weight: 400;
  font-size: 1.5em;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  padding: 10px;
  border-top: 5px solid rgb(59, 59, 59);
  border-left: 5px solid rgb(59, 59, 59);
  border-right: 5px solid rgb(161, 161, 161);
  border-bottom: 5px solid rgb(161, 161, 161);
  font-family: "Micro 5", serif;
  font-weight: 400;
  font-size: 1.2em;
}

.error-message {
  color: #b91313;
  font-size: 0.875rem;
  text-align: center;
  font-family: "Micro 5", serif;
  font-weight: 400;
  font-size: 1.2em;
  padding-bottom: 10px;
}

button {
  width: 100%;
  height: 80px;
  padding: 0.75rem;
  color: white;
  border: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: url("/assets/cursor-click.png"), auto;
  background: rgb(0, 130, 200);
  border-top: 5px solid rgb(44, 174, 235);
  border-left: 5px solid rgb(44, 174, 235);
  border-right: 5px solid rgb(10, 60, 117);
  border-bottom: 5px solid rgb(10, 60, 117);
  font-family: "Press Start 2P", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 5px;
  text-align: center;
  font-size: 0.7em;
  line-height: 30px;
  font-size: 1em;
  transition: font-size 0.2s;
}

button:hover {
  font-size: 1.1em;
}

button:active {
  background: rgb(3, 115, 175);
  border-top: 5px solid rgb(10, 60, 117);
  border-left: 5px solid rgb(10, 60, 117);
  border-right: 5px solid rgb(44, 174, 235);
  border-bottom: 5px solid rgb(44, 174, 235);
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.auth-switch {
  text-align: center;
  font-family: "Micro 5", serif;
  font-weight: 400;
  font-size: 1.2em;
  padding-bottom: 1.2rem;
}

.auth-switch-link {
  color: rgb(123, 18, 209);
}

input {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}
</style>
