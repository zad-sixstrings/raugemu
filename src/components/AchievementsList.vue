<template>
  <div class="achievements-list-wrapper">
    <div class="achievements-list">
      <div
        v-for="achievement in sortedAchievements"
        :key="achievement.game"
        class="achievement-item"
      >
        <div class="flexrow">
          <div class="achievement-header">
            <h4>{{ achievement.achievementname }}</h4>
          </div>
          <div class="achievement-icon-wrapper">
            <img
              class="achievement-icon"
              src="/assets/achievements/default.png"
            />
          </div>
        </div>
        <div class="achievement-content">
          <div class="achievement-game-wrapper">
            <h5 class="achievement-name">{{ achievement.game }}</h5>
          </div>
          <div class="achievement-description-wrapper">
            <p class="achievement-description">{{ achievement.description }}</p>
          </div>
          <div class="achievement-date-wrapper">
            <span class="achievement-date">{{
              formatDateTime(achievement.unlockdate)
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Achievement } from "../types/user";
import { formatDateTime } from "../utils/dateFormat";
import { computed } from "vue";

const props = defineProps<{
  achievements: Achievement[];
}>();

const sortedAchievements = computed(() => {
  return [...props.achievements].sort((a, b) => {
    return new Date(b.unlockdate).getTime() - new Date(a.unlockdate).getTime();
  });
});
</script>

<style scoped>
.achievements-list-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.achievements-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  gap: 1rem;
  width: 95%;
  min-width: 90%;
  height: 320px;
  overflow: scroll;
  padding: 0.5rem;
  mask-image: linear-gradient(
    to bottom,
    black calc(100% - 50px),
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    black calc(100% - 50px),
    transparent 100%
  );
}

.achievement-item {
  width: 220px;
  height: fit-content;
  display: flex;
  flex-direction: column;
}

.flexrow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: var(--purple);
  border-top: 5px solid var(--border-light-purple);
  border-left: 5px solid var(--border-light-purple);
  border-right: 5px solid var(--border-dark-purple);
  border-bottom: 5px solid var(--border-dark-purple);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.achievement-header {
  display: flex;
  align-items: center;
  width: 200px;
  height: 55px;
  padding: 10px;
}

.achievement-header h4 {
  font-family: var(--font-press-start);
  margin: 0 auto;
  color: white;
  font-size: 0.8em;
}

.achievement-icon-wrapper {
  width: 50px;
  padding: 5px;
  border-top: 5px solid var(--border-light-purple);
  border-left: 5px solid var(--border-light-purple);
  border-right: 5px solid var(--border-dark-purple);
  border-bottom: 5px solid var(--border-dark-purple);
}

.achievement-icon {
  width: 32px;
}

.achievement-content {
  height: 120px;
  padding: 10px;
  background-color: var(--blue);
  border-left: 5px solid var(--border-light-blue);
  border-right: 5px solid var(--border-dark-blue);
  border-bottom: 5px solid var(--border-dark-blue);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.achievement-game-wrapper {
  margin: 0 auto;
  height: 30px;
  font-size: 0.9em;
  text-align: center;
}

.achievement-description-wrapper {
  height: 50px;
  text-align: center;
  padding-top: 10px;
}

.achievement-date-wrapper {
  width: 100%;
  text-align: right;
}

span.achievement-date {
  font-family: var(--font-micro);
  font-size: 1.2em;
  color: white;
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
