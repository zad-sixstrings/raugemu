<template>
  <!-- ============ CHRISTMAS SNOWFALL - REMOVE AFTER SEASON ============ -->
  <div class="snowfall-container">
    <div
      v-for="i in snowflakeCount"
      :key="i"
      class="snowflake"
      :style="getSnowflakeStyle(i)"
    >
      ❄
    </div>
  </div>
  <!-- ============ END CHRISTMAS SNOWFALL ============ -->
</template>

<script setup lang="ts">
// ============ CHRISTMAS SNOWFALL - REMOVE AFTER SEASON ============
const snowflakeCount = 5; // Easily adjust the number of snowflakes

const getSnowflakeStyle = (index: number) => {
  // Stratified random: divide screen into sections, place randomly within each
  const sectionWidth = 100 / snowflakeCount; // Each snowflake gets a section
  const sectionStart = (index - 1) * sectionWidth; // Start of this section
  const randomWithinSection = ((index * 37) % 100) / 100; // Random 0-1
  const left = sectionStart + (randomWithinSection * sectionWidth); // Random within section
  
  // Use different prime numbers to break correlation between position and timing
  const duration = 9 + ((index * 17) % 6); // Duration between 9-14s
  const delay = ((index * 23 + 11) % 40) / 10; // Delay between 0-4s (more random)
  const size = 0.8 + ((index * 13) % 5) * 0.1; // Size between 0.8-1.2em

  return {
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    fontSize: `${size}em`,
  };
};
// ============ END CHRISTMAS SNOWFALL ============
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
  z-index: 1;
}

.snowflake {
  position: absolute;
  top: -100px; /* Start well above viewport */
  color: white;
  font-size: 1em;
  user-select: none;
  pointer-events: none;
  animation: fall linear infinite;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

@keyframes fall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 100px)) translateX(20px) rotate(360deg);
    opacity: 0;
  }
}
/* ============ END CHRISTMAS SNOWFALL CSS ============ */
</style>