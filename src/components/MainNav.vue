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
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/2600.png" />
              </div>
              <div class="sub-menu-item-name">2600</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/5200"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/5200.png" />
              </div>
              <div class="sub-menu-item-name">5200</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/7800"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/7800.png" />
              </div>
              <div class="sub-menu-item-name">7800</div></router-link
            >
            <!-- <router-link class="sub-menu-item" to="/console/JAGUAR"
              ><div class="sub-menu-item-image">
                <img
                  class="menu-image"
                  src="/assets/console-icons/jag.png"
                />
              </div>
              <div class="sub-menu-item-name">JAGUAR</div></router-link
            > -->
            <router-link class="sub-menu-item" to="/console/LYNX"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/lynx.png" />
              </div>
              <div class="sub-menu-item-name">LYNX</div></router-link
            >
          </div>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Nintendo</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/VB">
              <div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/vb.png" />
              </div>
              <div class="sub-menu-item-name">VB</div>
            </router-link>
            <router-link class="sub-menu-item" to="/console/NES"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/nes.png" />
              </div>
              <div class="sub-menu-item-name">NES</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/SNES"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/snes.png" />
              </div>
              <div class="sub-menu-item-name">SNES</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/N64"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/n64.png" />
              </div>
              <div class="sub-menu-item-name">N64</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/GB"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/gb.png" />
              </div>
              <div class="sub-menu-item-name">GB</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/GBC"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/gbc.png" />
              </div>
              <div class="sub-menu-item-name">GBC</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/GBA"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/gba.png" />
              </div>
              <div class="sub-menu-item-name">GBA</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/NDS"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/ds.png" />
              </div>
              <div class="sub-menu-item-name">DS</div></router-link
            >
          </div>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Sega</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/SMS"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/sms.png" />
              </div>
              <div class="sub-menu-item-name">SMS</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/SMD"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/md.png" />
              </div>
              <div class="sub-menu-item-name">SMD</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/32X">
              <div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/32x.png" />
              </div>
              <div class="sub-menu-item-name">32X</div>
            </router-link>
            <router-link class="sub-menu-item" to="/console/SGG"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/gg.png" />
              </div>
              <div class="sub-menu-item-name">SGG</div></router-link
            >
            <router-link class="sub-menu-item" to="/console/SSN"
              ><div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/ssn.png" />
              </div>
              <div class="sub-menu-item-name">Saturn</div></router-link
            >
          </div>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Sony</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/PSX">
              <div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/psx.png" />
              </div>
              <div class="sub-menu-item-name">PSX</div> </router-link
            ><!--
            <router-link class="sub-menu-item" to="/console/PSP">
              <div class="sub-menu-item-image">
                <img
                  class="menu-image"
                  src="/assets/console-icons/psp.png"
                />
              </div>
              <div class="sub-menu-item-name">PSP</div>
            </router-link> -->
          </div>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Autres</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/CV">
              <div class="sub-menu-item-image">
                <img class="menu-image" src="/assets/console-icons/cv.png" />
              </div>
              <div class="sub-menu-item-name">CV</div>
            </router-link>
          </div>
        </li>
        <li>
          <a class="main-menu-item dropdown" href="#">Hacks</a>
          <div class="dropdown-menu">
            <router-link class="sub-menu-item" to="/console/RANDO"
              >Randomizer</router-link
            >
            <router-link class="sub-menu-item" to="/console/HACKS"
              >RomHacks</router-link
            >
          </div>
        </li>
        <li class="about">
          <router-link class="main-menu-item" to="/REPedia"
            ><img class="about-icon" src="/assets/about-icon.png"
          /></router-link>
        </li>
        <li class="last">
          <a class="main-menu-item dropdown" href="#">
            <img
              class="account-icon"
              :src="
                authStore.isAuthenticated
                  ? profileStore.avatarPath
                  : '/assets/account.png'
              "
              :alt="authStore.isAuthenticated ? 'Connecté' : 'Non connecté'"
              @error="handleImageError"
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
import { useUserProfileStore } from "../stores/userProfile";
import { useRouter } from "vue-router";
import { ref } from "vue";

const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const authStore = useAuthStore();
const profileStore = useUserProfileStore();
const router = useRouter();

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = "/assets/profilepic/default.png";
};

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};
</script>
<style scoped>
#main-menu {
  height: 70px;
  margin: 0 0 30px 0;
}

#main-menu ul {
  list-style-type: none;
  height: 70px;
  margin: 0;
  padding: 0;
  background: var(--main-light);
  border-top: 5px solid var(--border-light);
  border-left: 5px solid var(--border-light);
  border-right: 5px solid var(--border-dark);
  border-bottom: 5px solid var(--border-dark);
}

#main-menu li {
  position: relative;
  float: left;
  height: 60px;
  background-color: var(--main-light);
  border-top: 5px solid var(--border-light);
  border-left: 5px solid var(--border-light);
  border-right: 5px solid var(--border-dark);
  border-bottom: 5px solid var(--border-dark);
  transition: border 0.2s;
  transition: background-color 0.2s;
}

#main-menu li.last,
#main-menu li.about {
  display: flex;
  float: right;
  align-items: center;
  height: 60px;
}

.about-icon,
.account-icon,
.menu-image {
  width: 30px;
  height: 30px;
  object-fit: contain;
  display: block;
}

.account-icon {
  border-radius: 100%;
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
  background: var(--main-light);
  border-top: 5px solid var(--border-light);
  border-left: 5px solid var(--border-light);
  border-right: 5px solid var(--border-dark);
  border-bottom: 5px solid var(--border-dark);
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

a.main-menu-item {
  margin-top: -2px;
}

a.main-menu-item,
a.sub-menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 60px;
  color: black;
  font-family: var(--font-primary);
  font-weight: 400;
  font-size: 0.7em;
  line-height: normal;
  padding: 0 10px 0 10px;
  text-decoration: none;
  transition: border 0.1s;
  transition: background-color 0.1s;
}

.sub-menu-item:hover {
  background-color: var(--main-light-active);
  border-top: 5px solid var(--border-dark);
  border-left: 5px solid var(--border-dark);
  border-right: 5px solid var(--border-light);
  border-bottom: 5px solid var(--border-light);
}

#main-menu li:hover {
  background-color: var(--main-light-active);
  border-top: 5px solid var(--border-dark);
  border-left: 5px solid var(--border-dark);
  border-right: 5px solid var(--border-light);
  border-bottom: 5px solid var(--border-light);
}

/* MOBILE MENU */
.mobile-menu-button {
  display: none;
  background: var(--main-light);
  border-top: 5px solid var(--border-light);
  border-left: 5px solid var(--border-light);
  border-right: 5px solid var(--border-dark);
  border-bottom: 5px solid var(--border-dark);
  border-radius: 5px;
  padding: 1rem;
  cursor: var(--cursor-click);
  position: relative;
  z-index: 100;
}

.hamburger {
  display: block;
  width: 1.5rem;
  height: 2px;
  background: black;
  position: relative;
  transition: all 0.3s;
}

.hamburger::before,
.hamburger::after {
  content: "";
  position: absolute;
  width: 1.5rem;
  height: 2px;
  background: black;
  transition: all 0.3s;
}

.hamburger::before {
  top: -6px;
  left: 0;
}

.hamburger::after {
  top: 6px;
  left: 0;
}

/* RESPONSIVE */
@media screen and (max-width: 790px) {
  #main-menu {
    height: auto;
    margin: 0;
  }

  .mobile-menu-button {
    display: block;
    position: absolute;
    top: 2.3rem;
    right: 1.4rem;
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

.sub-menu-item-image {
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.sub-menu-item-name {
  flex: 5;
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
