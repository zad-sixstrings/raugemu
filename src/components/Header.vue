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
          <h1 class="main-title blue-text">RaugEmu</h1>
        </div>
        <div class="sub-title-wrapper">
          <h2 class="main-title-sub purple-text text-shadow-small">
            You rip 'em, we emulate 'em.&reg;
          </h2>
        </div>
      </div>
    </header>
    <div class="header-warning">
      <span>/!\ Certains jeux Nintendo 64 sont actuellement instables</span>
    </div>
    <ee v-if="showEE" @close="showEE = false" />
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
      if (this.logoClicks === 2) {
        this.showEE = true;
        this.logoClicks = 0;
      }
    },
  },
  watch: {
    showEE(newVal) {
    }
  }
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
  flex-direction: row;
  width: 100%;
  padding: 1rem;
}

.header-warning span {
  color: var(--yellow);
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
</style>
