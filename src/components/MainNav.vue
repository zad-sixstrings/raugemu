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
            <router-link class="main-menu-item" to="/console/RAND"
              >Randomizer</router-link
            >
            <router-link class="main-menu-item" to="/console/ROMHACK"
              >RomHacks</router-link
            >
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
