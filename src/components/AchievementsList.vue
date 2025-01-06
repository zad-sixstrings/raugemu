<template>
    <div class="achievements-list">
      <div v-for="achievement in achievements" :key="achievement.game" class="achievement-item">
        <div class="achievement-header">
          <h4>{{ achievement.game }}</h4>
          <span class="achievement-date">{{ formatDateTime(achievement.unlockdate) }}</span>
        </div>
        <div class="achievement-content">
          <h5 class="achievement-name">{{ achievement.achievementname }}</h5>
          <p class="achievement-description">{{ achievement.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Achievement } from '../types/user';
  import { formatDateTime } from '../utils/dateFormat';
  
  defineProps<{
    achievements: Achievement[];
  }>();
  </script>

<style scoped>
.achievements-list {
  display: flex;
  max-width: 100%;
  width: 100%;
  flex-wrap: wrap;
  gap: 2rem;
}

.achievement-item {
  width: 200px;
  height: 150px;
  padding: 0.8em;
  background-color: rgba(138, 138, 138, 0.1);
  overflow: scroll;
  border-radius: 5px;
  box-shadow: 1px 1px 5px black;
}

.achievement-header h4{
  font-family: var(--font-press-start);
  font-size: 0.9rem;
  color: var(--purple);
  text-shadow: 1px 1px 2px black;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

span.achievement-date {
  font-family: var(--font-micro);
  font-size: 1.2em;
  color: var(--blue);
}

.achievement-name {
  font-family: var(--font-pixelify);
  font-size: 0.8em;
  font-weight: 700;
}

.achievement-description {
  font-family: var(--font-pixelify);
  font-size: 0.7em;
}
</style>