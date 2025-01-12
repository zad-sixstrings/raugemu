<template>
  <Transition name="fade">
    <div v-if="isVisible" id="browser-warning">
      <p>
        <span class="warning-icon">&#9888; </span>Cette page est optimisée pour
        <a href="https://www.google.com/intl/fr/chrome/">Google Chrome</a>.
        Utiliser un autre navigateur mênera inévitablement à des bugs et à une
        émulation moins performante.
      </p>
      <button class="browser-warning-close" @click="closeWarning">×</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isVisible = ref(false);

const isChrome = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isFirefox = userAgent.indexOf("firefox") > -1;
  const isChrome =
    userAgent.includes("chrome") &&
    !userAgent.includes("edge") &&
    !userAgent.includes("edg");

  return isChrome && !isFirefox;
};

const closeWarning = () => {
  isVisible.value = false;
  localStorage.setItem("browserWarningDismissed", Date.now().toString());
};

onMounted(() => {
  const lastDismissed = localStorage.getItem("browserWarningDismissed");
  const chromeResult = isChrome();

  if (!chromeResult) {  // Only proceed with timing checks if it's not Chrome
    if (lastDismissed) {
      const daysSinceDismissed = (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60 * 24);
      
      if (daysSinceDismissed > 3) {
        isVisible.value = true;
      }
    } else {
      // If never dismissed and not Chrome, show warning
      isVisible.value = true;
    }
  }
});
</script>

<style scoped>
#browser-warning {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  width: 600px;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  color: white;
  padding: 10px;
  z-index: 1000;
  background-color: #1e232d;
  border-top: 5px solid #4b596b;
  border-left: 5px solid #4b596b;
  border-right: 5px solid #171b29;
  border-bottom: 5px solid #171b29;
  border-radius: 10px;
  animation: slideDown 0.5s ease forwards;
}

.warning-icon {
  color: var(--yellow);
}

#browser-warning p {
  font-family: var(--font-pixelify);
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 1.2em;
  margin-top: 10px;
  width: 500px;
  padding: 10px;
  line-height: 23px;
}

button.browser-warning-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 28px;
  border-top-right-radius: 5px;
  border: none;
  background: var(--red);
  border-top: 5px solid var(--border-light-red);
  border-left: 5px solid var(--border-light-red);
  border-right: 5px solid var(--border-dark-red);
  border-bottom: 5px solid var(--border-dark-red);
  color: white;
  font-family: var(--font-press-start);
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 13px;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: font-size 0.2s;
}

button.browser-warning-close:hover {
  cursor: url("/assets/cursor-click.png"), auto;
  font-size: 16px;
}

button.browser-warning-close:active {
  background: var(--red-active);
  border-top: 5px solid var(--border-dark-red);
  border-left: 5px solid var(--border-dark-red);
  border-right: 5px solid var(--border-light-red);
  border-bottom: 5px solid var(--border-light-red);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes slideDown {
  0% {
    top: -100px;
  }
  100% {
    top: 0;
  }
}
</style>
