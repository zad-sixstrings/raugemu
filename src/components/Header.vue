<template>
  <div class="header-container">
    <header>
      <div class="logo-wrapper">
        <img
          @click="handleLogoClick"
          src="/assets/raugemu-logo.png"
          alt="Logo"
          class="logo"
        />
      </div>
      <div class="titles-wrapper">
        <div class="main-title-wrapper">
          <h1 class="main-title blue-text">
            RaugEmu<span class="beta-span">(beta)</span>
          </h1>
        </div>
        <div class="sub-title-wrapper">
          <h2 class="main-title-sub purple-text text-shadow-small">
            You rip 'em, we emulate 'em.&reg;
          </h2>
        </div>
      </div>
    </header>
    <div class="header-warning">
      <span class="header-info-span"> Joyeuses fêtes de fin d'année! </span>
      <span class="header-warning-span"
        >&#9888; Certains jeux Nintendo 64 sont actuellement instables.</span
      >
      <span class="header-info-span"
        >&#10004; La gestion des sauvegardes Nintendo DS a été
        implémentée!</span
      >
      <span class="header-info-span"
        >&#10004; Sega Saturn ajoutée à l'essai!</span
      >
    </div>
    <ee v-if="showEE" @close="showEE = false" />

    <!-- ============ CHRISTMAS SNOWFALL - REMOVE AFTER SEASON ============ -->
    <div class="snowfall-container">
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
      <div class="snowflake">❄</div>
    </div>
    <!-- ============ END CHRISTMAS SNOWFALL ============ -->
  </div>
</template>

<script>
import ee from "./ee.vue";

export default {
  components: {
    ee,
  },
  data() {
    return {
      logoClicks: 0,
      showEE: false,
    };
  },
  methods: {
    handleLogoClick() {
      this.logoClicks++;
      if (this.logoClicks === 21) {
        this.showEE = true;
        this.logoClicks = 0;
      }
    },
  },
  watch: {
    showEE(newVal) {},
  },
};
</script>

<style scoped>
header {
  display: flex;
  height: 150px;
  margin: 0 auto;
  width: 100%;
  pointer-events: auto;
}

span.green {
  color: var(--green);
}

.logo-wrapper {
  height: 100%;
  margin: 1rem 2rem;
}

.logo {
  width: 120px;
}

.titles-wrapper {
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  width: 100%;
}

.main-title {
  font-family: var(--font-press-start);
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 3rem;
}

.main-title-sub {
  font-family: var(--font-pixelify);
  font-weight: 400;
  font-optical-sizing: auto;
  font-size: 1.5rem;
}

.header-warning {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
}

span.header-warning-span {
  color: var(--yellow);
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
  font-size: 0.9em;
}
span.header-info-span {
  color: var(--green);
  font-family: "Pixelify Sans", serif;
  font-weight: 400;
  font-size: 0.9em;
}

@media (max-width: 640px) {
  .main-title {
    font-size: 2rem;
  }
  .main-title-sub {
    font-size: 1rem;
  }
  .logo {
    width: 80px;
  }
}
@media (max-width: 475px) {
  .main-title {
    font-size: 1.4rem;
  }
  .main-title-sub {
    font-size: 0.8rem;
  }
  .logo {
    width: 50px;
    margin: 2rem auto;
  }
}

/* ============ CHRISTMAS SNOWFALL CSS - REMOVE AFTER SEASON ============ */
.snowfall-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -10px;
  color: white;
  font-size: 1em;
  user-select: none;
  pointer-events: none;
  animation: fall linear infinite;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  z-index: 99999;
}

@keyframes fall {
  0% {
    transform: translateY(-10px) translateX(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(20px) rotate(360deg);
    opacity: 0.7;
  }
}

.snowflake:nth-child(1) { left: 7%; animation-duration: 9s; animation-delay: 0s; font-size: 0.8em; }
.snowflake:nth-child(2) { left: 15%; animation-duration: 11s; animation-delay: 1s; font-size: 1.1em; }
.snowflake:nth-child(3) { left: 23%; animation-duration: 13s; animation-delay: 2s; font-size: 0.9em; }
.snowflake:nth-child(4) { left: 31%; animation-duration: 10s; animation-delay: 0.5s; font-size: 1.2em; }
.snowflake:nth-child(5) { left: 39%; animation-duration: 12s; animation-delay: 3s; font-size: 0.85em; }
.snowflake:nth-child(6) { left: 47%; animation-duration: 14s; animation-delay: 1.5s; font-size: 1em; }
.snowflake:nth-child(7) { left: 55%; animation-duration: 11s; animation-delay: 0s; font-size: 0.95em; }
.snowflake:nth-child(8) { left: 63%; animation-duration: 13s; animation-delay: 2.5s; font-size: 1.15em; }
.snowflake:nth-child(9) { left: 71%; animation-duration: 10s; animation-delay: 1s; font-size: 0.9em; }
.snowflake:nth-child(10) { left: 79%; animation-duration: 12s; animation-delay: 3.5s; font-size: 1.05em; }
.snowflake:nth-child(11) { left: 87%; animation-duration: 14s; animation-delay: 0.5s; font-size: 0.8em; }
.snowflake:nth-child(12) { left: 95%; animation-duration: 11s; animation-delay: 2s; font-size: 1.2em; }
.snowflake:nth-child(13) { left: 12%; animation-duration: 13s; animation-delay: 1.5s; font-size: 0.85em; }
.snowflake:nth-child(14) { left: 42%; animation-duration: 10s; animation-delay: 3s; font-size: 1.1em; }
.snowflake:nth-child(15) { left: 68%; animation-duration: 12s; animation-delay: 0.5s; font-size: 0.95em; }
/* ============ END CHRISTMAS SNOWFALL CSS ============ */
</style>