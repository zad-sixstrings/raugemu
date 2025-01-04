<template>
  <div id="main-menu">
    <button class="mobile-menu-button" @click="toggleMobileMenu">
      <span class="hamburger"></span>
    </button>
    <nav :class="{ 'mobile-active': isMobileMenuOpen }">
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
import { ref } from "vue";

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

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
  content: url("/assets/about-icon.gif");
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

/* Your existing CSS remains the same, then add: */

/* Mobile menu button - hidden by default */
.mobile-menu-button {
  display: none;
  background: var(--grey);
  border-top: 5px solid var(--border-light-grey);
  border-left: 5px solid var(--border-light-grey);
  border-right: 5px solid var(--border-dark-grey);
  border-bottom: 5px solid var(--border-dark-grey);
  padding: 1rem;
  cursor: pointer;
  position: relative;
  z-index: 100;
}

.hamburger {
  display: block;
  width: 1.5rem;
  height: 2px;
  background: white;
  position: relative;
  transition: all 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: "";
  position: absolute;
  width: 1.5rem;
  height: 2px;
  background: white;
  transition: all 0.3s;
}

.hamburger::before {
  top: -6px;
}

.hamburger::after {
  top: 6px;
}

/* Responsive styles */
@media screen and (max-width: 790px) {
  #main-menu {
    height: auto;
    margin: 0;
  }

  .mobile-menu-button {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  nav {
    display: none; /* Hidden by default on mobile */
  }

  nav.mobile-active {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg-main);
    z-index: 90;
    padding-top: 5rem;
  }

  #main-menu ul {
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  #main-menu li {
    float: none;
    width: 100%;
    height: auto;
  }

  #main-menu li.last,
  #main-menu li.about {
    float: none;
  }

  .dropdown-menu {
    position: static;
    width: 100%;
    visibility: visible;
    opacity: 1;
    display: none;
  }

  #main-menu li:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu-last {
    left: 0;
    width: 100%;
  }

  a.main-menu-item,
  a.sub-menu-item {
    padding: 1rem;
    line-height: 1.5;
    font-size: 1rem;
  }

  /* Adjust icon sizes for mobile */
  .about-icon,
  .account-icon {
    width: 20px;
  }
}

/* Additional adjustment for very small screens */
@media screen and (max-width: 480px) {
  a.main-menu-item,
  a.sub-menu-item {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
}
</style>
