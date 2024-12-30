import { defineStore } from "pinia";
import { ref } from "vue";

export interface Notification {
  message: string;
  type: "success" | "error" | "warning" | "info";
  id: number;
}

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref<Notification[]>([]);
  let nextId = 1;

  const addNotification = (
    message: string,
    type: Notification["type"] = "info"
  ) => {
    const id = nextId++;
    notifications.value.push({ message, type, id });

    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 300000);
  };

  const removeNotification = (id: number) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
});
