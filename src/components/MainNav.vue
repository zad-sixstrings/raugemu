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
          <router-link class="main-menu-item" to="/about"
            ><img class="about-icon" src="/assets/about-icon.png"
          /></router-link>
        </li>
        <li class="last">
          <a class="main-menu-item dropdown" href="#">
            <img
              class="account-icon"
              :src="
                authStore.isAuthenticated
                  ? '/assets/profilepic/default.png'
                  : '/assets/account.png'
              "
              :alt="authStore.isAuthenticated ? 'Connecté' : 'Non connecté'"
          /></a>
          <div class="dropdown-menu dropdown-menu-last">
            <template v-if="authStore.isAuthenticated">
              <router-link class="sub-menu-item" to="/compte"
                >Compte</router-link
              >
              <a href="#" class="sub-menu-item" @click.prevent="handleLogout"
                >Déconnexion</a
              >
            </template>
            <template v-else>
              <router-link class="sub-menu-item" to="/login"
                >Connexion</router-link
              >
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
<style scoped>
/* MAIN MENU */
#main-menu {
  height: 80px;
  margin: 0 0 30px 0;
}

#main-menu ul {
  list-style-type: none;
  height: 70px;
  margin: 0;
  padding: 0;
  background: var(--grey);
  border-top: 5px solid var(--border-light-grey);
  border-left: 5px solid var(--border-light-grey);
  border-right: 5px solid var(--border-dark-grey);
  border-bottom: 5px solid var(--border-dark-grey);
}

#main-menu li {
  position: relative;
  float: left;
  height: 60px;
  background-color: var(--grey);
  border-top: 5px solid var(--border-light-grey);
  border-left: 5px solid var(--border-light-grey);
  border-right: 5px solid var(--border-dark-grey);
  border-bottom: 5px solid var(--border-dark-grey);
  transition: border 0.2s;
  transition: background-color 0.2s;
}

#main-menu li.last {
  float: right;
}

#main-menu li.about {
  float: right;
}

.about-icon {
  width: 25px;
}

#main-menu li.about:hover .about-icon {
  content: url('/assets/about-icon.gif');
}

.dropdown-menu {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 120%;
  left: 0;
  width: 170px;
  z-index: 5;
  background: var(--grey);
  border-top: 5px solid var(--border-light-grey);
  border-left: 5px solid var(--border-light-grey);
  border-right: 5px solid var(--border-dark-grey);
  border-bottom: 5px solid var(--border-dark-grey);
  transition: opacity 0.2s ease-in-out, visibility 1s;
}

#main-menu li:hover .dropdown-menu {
  visibility: visible;
  opacity: 1;
}

.dropdown-menu-last {
  left: -220%;
  width: 200px;
}

a.main-menu-item,
a.sub-menu-item {
  display: block;
  line-height: 60px;
  color: black;
  font-family: var(--font-press-start);
  font-weight: 400;
  font-size: 0.7em;
  text-align: center;
  padding: 0 20px 0 20px;
  text-decoration: none;
  transition: border 0.1s;
  transition: background-color 0.1s;
}

.sub-menu-item:hover {
  background-color: var(--grey-active);
  border-top: 5px solid var(--border-dark-grey);
  border-left: 5px solid var(--border-dark-grey);
  border-right: 5px solid var(--border-light-grey);
  border-bottom: 5px solid var(--border-light-grey);
}

#main-menu li:hover {
  background-color: var(--grey-active);
  border-top: 5px solid var(--border-dark-grey);
  border-left: 5px solid var(--border-dark-grey);
  border-right: 5px solid var(--border-light-grey);
  border-bottom: 5px solid var(--border-light-grey);
}

.account-icon {
  width: 25px;
  border-radius: 100%;
}
</style>
