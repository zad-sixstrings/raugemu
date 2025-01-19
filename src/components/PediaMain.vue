<template>
  <div class="page-transition">
    <div class="pedia-main-wrapper">
      <div class="pedia-main-title">
        <h2>RaugEmu Pedia</h2>
      </div>
      <div class="pedia-menu">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="pedia-menu-item"
          :class="{ active: currentSection === item.id }"
          @click="currentSection = item.id"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="pedia-section">
        <div class="pedia-title-wrapper">
          <h2 class="pedia-title">{{ currentMenuItem?.label }}</h2>
        </div>
        <div class="pedia-content">
          <component :is="currentComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import PediaFAQ from "./PediaFAQ.vue";
// import PediaManual from "./PediaManual.vue";
import PediaController from "./PediaController.vue";

const menuItems = [
  { id: "faq", label: "FAQ", component: PediaFAQ },
//   { id: "manual", label: "MANUEL", component: PediaManual },
  { id: "controller", label: "CONTRÔLES", component: PediaController },
];

const currentMenuItem = computed(() => 
  menuItems.find(item => item.id === currentSection.value)
);

const currentSection = ref("faq"); // Default to FAQ

const currentComponent = computed(() => {
  const item = menuItems.find((item) => item.id === currentSection.value);
  return item ? item.component : PediaFAQ;
});
</script>

<style scoped>
/* Main Layout */
.pedia-main-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 90%;
}

/* Main Title */
.pedia-main-title {
  width: 100%;
  color: var(--blue);
  text-align: center;
  font-family: var(--font-press-start);
  margin-bottom: 50px;
}

/* Menu Styles */
.pedia-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 25px;
  margin-bottom: 30px;
}

.pedia-menu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  color: white;
  font-family: var(--font-pixelify);
  background-color: var(--purple);
  border: 5px solid;
  border-top-color: var(--border-light-purple);
  border-left-color: var(--border-light-purple);
  border-right-color: var(--border-dark-purple);
  border-bottom-color: var(--border-dark-purple);
  border-radius: 10px;
  cursor: var(--cursor-click);
}

.pedia-menu-item.active {
  background-color: var(--purple-active);
  border-top-color: var(--border-dark-purple);
  border-left-color: var(--border-dark-purple);
  border-right-color: var(--border-light-purple);
  border-bottom-color: var(--border-light-purple);
}

/* Content Section */
.pedia-section {
  width: 100%;
  max-width: 800px;
}

/* Title Bar */
.pedia-title-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purple);
  border: 5px solid var(--border-dark-purple);
  border-top-color: var(--border-light-purple);
  border-left-color: var(--border-light-purple);
  border-radius: 10px 10px 0 0;
}

.pedia-title {
  font-family: var(--font-press-start);
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: italic;
  color: white;
  font-size: 1.4em;
  line-height: 40px;
  margin: 0;
}

/* Content Area */
.pedia-content {
  padding: 2rem;
  border-left: 5px solid var(--border-light-purple);
  border-right: 5px solid var(--border-dark-purple);
  border-bottom: 5px solid var(--border-dark-purple);
  border-top: none;
  overflow-y: auto;
}

/* Shared Text Styles */
:deep(h3) {
  color: var(--blue);
  margin-bottom: 1rem;
  font-family: var(--font-press-start);
  font-weight: 400;
  font-size: 1em;
}

:deep(p) {
  font-family: var(--font-pixelify);
  font-weight: 400;
  font-size: 1em;
  color: white;
  text-align: justify;
  margin-bottom: 10px;
}

:deep(section) {
  margin-bottom: 4rem;
}

:deep(.warning) {
  color: var(--yellow);
}

:deep(.hint) {
  color: yellowgreen;
}

@media (max-width: 700px) {
  .pedia-menu {
    flex-direction: column;
    gap: 10px;
  }
}
</style>