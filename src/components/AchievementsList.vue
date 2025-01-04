<template>
    <div class="achievements-list">
      <div v-for="achievement in achievements" :key="achievement.game" class="achievement-item">
        <div class="achievement-header">
          <h4>{{ achievement.game }}</h4>
          <span class="achievement-date">{{ formatDateTime(achievement.unlockdate) }}</span>
        </div>
        <div class="achievement-content">
          <h5>{{ achievement.achievementname }}</h5>
          <p>{{ achievement.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Achievement } from '../services/api';
  import { formatDateTime } from '../utils/dateFormat';
  
  defineProps<{
    achievements: Achievement[];
  }>();
  </script>