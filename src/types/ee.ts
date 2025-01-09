export interface EasterEggAchievement {
    id: string;
    name: string;
    description: string;
    unlockedAt: string;
    iconClass?: string;  // Optional: for displaying different icons
  }
  
  export type EasterEggAchievementId = 'ghost-in-the-shell' | 'puzzle-solved';