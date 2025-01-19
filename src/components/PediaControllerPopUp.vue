<template>
    <div v-if="isVisible" class="popup-overlay" @click="$emit('close')">
      <div class="popup-content" @click.stop>
        <img :src="imageSrc" :alt="imageAlt" class="popup-image" />
        <button class="close-button" @click="$emit('close')">X</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    isVisible: boolean;
    imageSrc: string;
    imageAlt: string;
  }>();
  
  defineEmits<{
    (e: 'close'): void;
  }>();
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }
  
  .popup-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    animation: scaleIn 0.3s ease;
  }
  
  .popup-image {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border: 5px solid var(--border-dark-purple);
    border-top-color: var(--border-light-purple);
    border-left-color: var(--border-light-purple);
    border-radius: 10px;
  }
  
  .close-button {
    position: absolute;
    top: -20px;
    right: -20px;
    width: 40px;
    height: 40px;
    background-color: var(--red);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: var(--cursor-click);
    font-family: var(--font-press-start);
    border: 3px solid var(--border-dark-red);
    border-top-color: var(--border-light-red);
    border-left-color: var(--border-light-red);
  }
  
  .close-button:active {
    background-color: var(--red-active);
    border-color: var(--border-light-red);
    border-top-color: var(--border-dark-red);
    border-left-color: var(--border-dark-red);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.9); }
    to { transform: scale(1); }
  }
  </style>