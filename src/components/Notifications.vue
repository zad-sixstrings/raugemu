<template>
  <div class="notifications-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notificationStore.notifications"
        :key="notification.id"
        class="notification"
        :class="notification.type"
      >
        {{ notification.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from "../stores/notifications";
const notificationStore = useNotificationStore();
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 15%;
  right: 15%;
  z-index: 1005;
}

.notification {
  margin-bottom: 1.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  color: white;
  min-width: 200px;
  text-align: center;
  font-family: "Press Start 2P", serif;
  font-optical-sizing: auto;
  font-weight: 400;
}

.success {
  background-color: #4caf50;
  border-top: 5px solid #84df6e;
  border-left: 5px solid #84df6e;
  border-right: 5px solid #276e36;
  border-bottom: 5px solid #276e36;
}

.error {
  background-color: #f44336;
  border-top: 5px solid #f16615;
  border-left: 5px solid #f16615;
  border-right: 5px solid #911d1d;
  border-bottom: 5px solid #911d1d;
}

.warning {
  background-color: #ff9800;
  border-top: 5px solid #ffd13b;
  border-left: 5px solid #ffd13b;
  border-right: 5px solid #9e460c;
  border-bottom: 5px solid #9e460c;
}

.info {
  background-color: #2196f3;
  border-top: 5px solid #63ceff;
  border-left: 5px solid #63ceff;
  border-right: 5px solid #0c479e;
  border-bottom: 5px solid #0c479e;
}

/* Transition animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
