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
  max-width: 300px;
  border-radius: 10px;
  color: white;
  min-width: 200px;
  text-align: center;
  font-family: var(--font-press-start);
  font-optical-sizing: auto;
  font-weight: 400;
}

.success {
  background-color: var(--green);
  border-top: 5px solid var(--border-light-green);
  border-left: 5px solid var(--border-light-green);
  border-right: 5px solid var(--border-dark-green);
  border-bottom: 5px solid var(--border-dark-green);
}

.error {
  background-color: var(--red);
  border-top: 5px solid var(--border-light-red);
  border-left: 5px solid var(--border-light-red);
  border-right: 5px solid var(--border-dark-red);
  border-bottom: 5px solid var(--border-dark-red);
}

.warning {
  background-color: var(--yellow);
  border-top: 5px solid var(--border-light-yellow);
  border-left: 5px solid var(--border-light-yellow);
  border-right: 5px solid var(--border-dark-yellow);
  border-bottom: 5px solid var(--border-dark-yellow);
}

.info {
  background-color: var(--blue);
  border-top: 5px solid var(--border-light-blue);
  border-left: 5px solid var(--border-light-blue);
  border-right: 5px solid var(--border-dark-blue);
  border-bottom: 5px solid var(--border-dark-blue);
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
