<template>
  <Season />
  <BrowserWarning />
  <Notifications />
  <Header />
  <MainNav />
  <router-view></router-view>
  <Footer />
</template>

<script setup lang="ts">
import Season from "./components/Season.vue";
import BrowserWarning from "./components/BrowserWarning.vue";
import Header from "./components/Header.vue";
import MainNav from "./components/MainNav.vue";
import Footer from "./components/Footer.vue";
import Notifications from "./components/Notifications.vue";
</script>

<style></style>
