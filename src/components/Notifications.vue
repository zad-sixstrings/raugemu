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
  top: 13%;
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
  font-family: var(--font-primary);
  font-optical-sizing: auto;
  font-weight: 400;
}

.success {
  background-color: var(--green);
  border-top: 5px solid var(--border-success-light);
  border-left: 5px solid var(--border-success-light);
  border-right: 5px solid var(--border-success-dark);
  border-bottom: 5px solid var(--border-success-dark);
}

.error {
  background-color: var(--red);
  border-top: 5px solid var(--border-danger-light);
  border-left: 5px solid var(--border-danger-light);
  border-right: 5px solid var(--border-danger-dark);
  border-bottom: 5px solid var(--border-danger-dark);
}

.warning {
  background-color: var(--yellow);
  border-top: 5px solid var(--border-warning-light);
  border-left: 5px solid var(--border-warning-light);
  border-right: 5px solid var(--border-warning-dark);
  border-bottom: 5px solid var(--border-warning-dark);
}

.info {
  background-color: var(--accent-primary);
  border-top: 5px solid var(--border-primary-light);
  border-left: 5px solid var(--border-primary-light);
  border-right: 5px solid var(--border-primary-dark);
  border-bottom: 5px solid var(--border-primary-dark);
}

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
