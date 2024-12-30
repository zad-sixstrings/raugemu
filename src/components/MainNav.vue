<template>
  <div id="main-menu">
    <nav>
      <ul>
        <li>
          <router-link class="main-menu-item" to="/">Home</router-link>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Atari</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/2600"
              >2600</router-link
            >
            <router-link class="sub-menu-item" to="/console/5200"
              >5200</router-link
            >
            <router-link class="sub-menu-item" to="/console/7800"
              >7800</router-link
            >
            <router-link class="sub-menu-item" to="/console/LYNX"
              >LYNX</router-link
            >
          </div>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Nintendo</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/NES"
              >NES</router-link
            >
            <router-link class="sub-menu-item" to="/console/SNES"
              >SNES</router-link
            >
            <router-link class="sub-menu-item" to="/console/N64"
              >N64</router-link
            >
            <router-link class="sub-menu-item" to="/console/GB">GB</router-link>
            <router-link class="sub-menu-item" to="/console/GBC"
              >GBC</router-link
            >
            <router-link class="sub-menu-item" to="/console/GBA"
              >GBA</router-link
            >
            <router-link class="sub-menu-item" to="/console/NDS"
              >DS</router-link
            >
          </div>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Sega</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/SMS"
              >SMS</router-link
            >
            <router-link class="sub-menu-item" to="/console/SMD"
              >SMD</router-link
            >
            <router-link class="sub-menu-item" to="/console/SGG"
              >SGG</router-link
            >
          </div>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Hacks</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/RANDO"
              >Randomizer</router-link
            >
            <router-link class="sub-menu-item" to="/console/ROMHACK"
              >RomHacks</router-link
            >
          </div>
        </li>
        <li class="about">
          <router-link class="main-menu-item" to="/about">
            ?
          </router-link>
        </li>
        <li class="last">
          <a class="main-menu-item dropdown" href="#"
            > <img 
              class="account-icon" 
              :src="authStore.isAuthenticated ? '/assets/account-loggedin.png' : '/assets/account.png'"
              :alt="authStore.isAuthenticated ? 'Connecté' : 'Non connecté'"
            /></a>
          <div class="dropdown-menu dropdown-menu-last">
            <template v-if="authStore.isAuthenticated">
              <a href="#" class="sub-menu-item" @click.prevent="handleLogout"
                >Déconnexion</a
              >
            </template>
            <template v-else>
              <router-link class="sub-menu-item" to="/login">Connexion</router-link>
              <router-link class="sub-menu-item" to="/register"
                >S'enregistrer</router-link
              >
            </template>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>
