import type { LoginCredentials, RegisterCredentials } from "../types/auth";

export interface UserProfile {
  id: string;
  nickname: string;
  email: string;
  creation_date: string;
  profile: string;
  saves: number;
  imagePath: string;
}

export interface UserSave {
  id: string;
  game: string;
  console: string;
  creation_date: string;
  change_date: string;
}

export interface ApiStatus {
  message: string;
}

export interface PlaytimeData {
  gamename: string;
  playedtime: {
    seconds: number;
    milliseconds: number;
  };
}

export interface ProfileUpdateData {
  profileText: string;
}

export interface AvatarUpdateResponse {
  success: boolean;
  imagePath: string;
}

export interface Achievement {
  game: string;
  achievementname: string;
  description: string;
  unlockdate: string;
}

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  console.error("API_URL not configured. Please check your .env file.");
}

export const authApi = {
  async getApiStatus(): Promise<ApiStatus> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`${API_URL}/status`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch API status");
      }

      const data = await response.json();
      return data; // Return the full API status
    } catch (error) {
      console.error("Get API status error:", error);
      throw error;
    }
  },

  async login(credentials: LoginCredentials) {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data.user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
  async register(credentials: RegisterCredentials) {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  async getUserProfile(): Promise<UserProfile> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/user/userprofile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      return await response.json();
    } catch (error) {
      console.error("Get user profile error:", error);
      throw error;
    }
  },

  async getUserSaves(): Promise<UserSave[]> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`${API_URL}/user/usersavelist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user saves");
      }

      const data = await response.json();

      // Check for the "no saves" response
      if (data.message === "No save file found") {
        return [];
      }

      // If we have saves, sort and return them
      return data.sort((a: UserSave, b: UserSave) =>
        a.game.localeCompare(b.game, "fr-FR")
      );
    } catch (error) {
      console.error("Get user saves error:", error);
      throw error;
    }
  },

  async deleteSave(saveId: string): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`${API_URL}/user/userdeletesave`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: saveId }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete save");
      }
    } catch (error) {
      console.error("Delete save error:", error);
      throw error;
    }
  },
  async getPlaytime(): Promise<PlaytimeData[]> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/user/getplayedtime`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch playtime");
      }

      return await response.json();
    } catch (error) {
      console.error("Get playtime error:", error);
      throw error;
    }
  },

  async updateProfile(profileData: ProfileUpdateData): Promise<UserProfile> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await fetch(`${API_URL}/user/updateprofile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  },
  
  async updateAvatar(file: File): Promise<AvatarUpdateResponse> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
  
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await fetch(`${API_URL}/user/uploadavatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: "multipart/form-data",
      });
  
      if (!response.ok) {
        throw new Error("Failed to update avatar");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Update avatar error:", error);
      throw error;
    }
  },
  async getAchievements(): Promise<Achievement[]> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      
      const response = await fetch(`${API_URL}/user/getachievement`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }
  
      const data = await response.json();
      
      // Check for the "no achievements" response
      if (data.message === "No achievements found") {
        return [];
      }
  
      // If we have achievements, sort them by game name and unlock date
      return data.sort((a: Achievement, b: Achievement) => {
        // First sort by game
        const gameCompare = a.game.localeCompare(b.game, "fr-FR");
        if (gameCompare !== 0) return gameCompare;
        // Then by unlock date (most recent first)
        return new Date(b.unlockdate).getTime() - new Date(a.unlockdate).getTime();
      });
    } catch (error) {
      console.error("Get achievements error:", error);
      throw error;
    }
  }
};
