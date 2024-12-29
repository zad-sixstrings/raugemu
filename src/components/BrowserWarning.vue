<template>
  <Transition name="fade">
    <div v-if="isVisible" id="browser-warning">
      <p>
        <span class="warning-icon">/!\ </span>Cette page est optimisée pour
        <a href="https://www.google.com/intl/fr/chrome/">Google Chrome</a>.
        Utiliser un autre navigateur mênera inévitablement à des bugs et à une
        émulation moins performante.
      </p>
      <button class="close-btn" @click="closeWarning">×</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isVisible = ref(false);

const isChrome = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    userAgent.includes("chrome") &&
    !userAgent.includes("edge") &&
    !userAgent.includes("edg")
  );
};

const closeWarning = () => {
  isVisible.value = false;
  localStorage.setItem("browserWarningDismissed", "true");
};

onMounted(() => {
  const isDismissed = localStorage.getItem("browserWarningDismissed");
  if (!isChrome() && !isDismissed) {
    isVisible.value = true;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
