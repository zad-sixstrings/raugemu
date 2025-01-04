import { defineStore } from "pinia";
import { ref } from "vue";
import { authApi } from "../services/api";
import type { ApiStatus } from "../types/api";

export const useApiStatusStore = defineStore("apiStatus", () => {
  const status = ref<ApiStatus | null>(null);
  const error = ref<string | null>(null);

  async function fetchStatus() {
    try {
      status.value = await authApi.getApiStatus();
    } catch (err) {
      error.value = "Failed to fetch API status";
      console.error("Error fetching API status:", err);
    }
  }

  return { status, error, fetchStatus };
});