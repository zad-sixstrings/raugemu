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
        <router-link class="auth-switch-link" to="/login">Se connecter</router-link>
      </p>

      <div v-if="error">
        <p class="error-message"> {{ error }} </p>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? "Creating account..." : "Register" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { authApi } from "../services/api";
import type { RegisterCredentials } from "../types/auth";

const router = useRouter();
const loading = ref(false);
const error = ref("");

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

    await authApi.register(form);
    router.push("/login");
  } catch (err) {
    error.value = "Echec de création de compte, veuillez réessayer";
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

input[type=email], input[type=password], input[type=text] {
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