<template>
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

  <BrowserWarning />
  <Notifications />
  <Header />
  <MainNav />
  <router-view></router-view>
  <Footer />
</template>

<script setup lang="ts">
import BrowserWarning from "./components/BrowserWarning.vue";
import Header from "./components/Header.vue";
import MainNav from "./components/MainNav.vue";
import Footer from "./components/Footer.vue";
import Notifications from './components/Notifications.vue';
</script>

<style>
/* ============ CHRISTMAS SNOWFALL CSS - REMOVE AFTER SEASON ============ */
.snowfall-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 8;
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
}

@keyframes fall {
  0% {
    transform: translateY(-10px) translateX(0) rotate(0deg);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(20px) rotate(360deg);
    opacity: 0;
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