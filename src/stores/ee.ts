// stores/easterEgg.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAuthStore } from "./auth";
import type { EasterEggAchievement, EasterEggAchievementId } from "../types/ee";

export const useEE = defineStore("easterEgg", () => {
  const achievements = ref<
    Record<string, Record<string, EasterEggAchievement>>
  >({});
  const authStore = useAuthStore();

  // Achievement definitions
  const achievementDetails: Record<
    EasterEggAchievementId,
    Omit<EasterEggAchievement, "unlockedAt">
  > = {
    "ghost-in-the-shell": {
      id: "ghost-in-the-shell",
      name: "Ghost in the Shell",
      description: "A laissé aucune trace de son passage.",
      iconClass: "fa-ghost", // If you're using FontAwesome
    },
    "puzzle-solved": {
      id: "puzzle-solved",
      name: "L'énigme RaugEmu",
      description: "A résolu l'énigme cachée de RaugEmu.",
      iconClass: "fa-puzzle-piece",
    },
  };

  // Load achievements from localStorage
  function loadAchievements() {
    const stored = localStorage.getItem("raugemu-ee-achievements");
    if (stored) {
      achievements.value = JSON.parse(stored);
    }
  }

  // Save achievements to localStorage
  function saveAchievements() {
    localStorage.setItem(
      "raugemu-ee-achievements",
      JSON.stringify(achievements.value)
    );
  }

  // Unlock an achievement
  function unlockAchievement(achievementId: EasterEggAchievementId) {
    const nickname = authStore.user?.nickname;
    if (!nickname) return;

    if (!achievements.value[nickname]) {
      achievements.value[nickname] = {};
    }

    const achievementDetails = getAchievementDetails(achievementId);
    if (!achievementDetails) return;

    achievements.value[nickname][achievementId] = {
      ...achievementDetails,
      unlockedAt: new Date().toISOString(),
    };

    saveAchievements();
  }

  // Check if user has an achievement
  function hasAchievement(achievementId: EasterEggAchievementId): boolean {
    const nickname = authStore.user?.nickname;
    if (!nickname) return false;

    return !!achievements.value[nickname]?.[achievementId];
  }

  function getAchievementDetails(id: EasterEggAchievementId) {
    return achievementDetails[id];
  }

  // Get current user's achievements
  const userAchievements = computed(() => {
    const nickname = authStore.user?.nickname;
    if (!nickname || !achievements.value[nickname]) return [];

    return Object.values(achievements.value[nickname]);
  });

  return {
    achievements,
    userAchievements,
    loadAchievements,
    unlockAchievement,
    hasAchievement,
  };
});
