import type { LoginCredentials, RegisterCredentials } from "../types/auth";
import type { UserProfile, UserSave, Achievement } from "../types/user";
import type {
  ApiStatus,
  AvatarUpdateResponse,
  ApiPlaytimeData,
} from "../types/api";
import type { RomData, RomUpdatePayload } from "../types/roms";

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
      return data;
    } catch (error) {
      console.error("Get API status error:", error);
      throw error;
    }
  },

  async login(credentials: LoginCredentials): Promise<UserProfile> {
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

  async register(credentials: RegisterCredentials): Promise<UserProfile> {
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

      // Store the token since it's provided
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Return the user data
      if (data.user) {
        return data.user;
      }

      throw new Error("No user data received");
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

      if (data.message === "No save file found") {
        return [];
      }

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

  async getPlaytime(): Promise<ApiPlaytimeData[]> {
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

      // Handle 204 No Content as a valid empty response
      if (response.status === 204) {
        return [];
      }

      if (!response.ok) {
        throw new Error("Failed to fetch playtime");
      }

      const apiData: ApiPlaytimeData[] = await response.json();
      return apiData;
    } catch (error) {
      console.error("Get playtime error:", error);
      throw error;
    }
  },

  async updateProfile(profileData: {
    profileText: string;
  }): Promise<UserProfile> {
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
        body: formData, // Fixed: removed the string "multipart/form-data"
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

      // Handle 304 Not Modified
      if (response.status === 304) {
        return [];
      }

      if (!response.ok) {
        throw new Error("Failed to fetch achievements");
      }

      const data = await response.json();

      // Handle the "No achievement unlocked" message
      if (data.message === "No achievement unlocked") {
        return [];
      }

      return data.sort((a: Achievement, b: Achievement) => {
        const gameCompare = a.game.localeCompare(b.game, "fr-FR");
        if (gameCompare !== 0) return gameCompare;
        return (
          new Date(b.unlockdate).getTime() - new Date(a.unlockdate).getTime()
        );
      });
    } catch (error) {
      console.error("Get achievements error:", error);
      throw error;
    }
  },
};

export const romApi = {
  async getNewRoms(): Promise<RomData[]> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/roms/checknewroms`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ROM list");
      }

      return await response.json();
    } catch (error) {
      console.error("Get ROM list error:", error);
      throw error;
    }
  },

  async getAllRoms(): Promise<RomData[]> {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/roms/getromslist`, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ROM list");
      }

      return await response.json();
    } catch (error) {
      console.error("Get ROM list error:", error);
      throw new Error("Failed to fetch ROM list");
    }
  },

  async updateRomInfo(
    romPath: string,
    updateData: RomUpdatePayload,
    consoleid: string
  ): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_URL}/roms/registernewroms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          consoleid,
          title: updateData.title,
          year: updateData.year,
          developer: updateData.developer,
          categories: updateData.categories,
          boxArtPath: updateData.boxArtPath,
          romPath: romPath,
          isAvailable: updateData.isAvailable,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update ROM information");
      }
    } catch (error) {
      console.error("Update ROM info error:", error);
      throw error;
    }
  },

  async updateExistingRom(updateData: RomUpdatePayload): Promise<void> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Updating existing ROM with data:", updateData);

      const response = await fetch(`${API_URL}/roms/updateromdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update ROM information: ${errorData}`);
      }
    } catch (error) {
      console.error("Update existing ROM error:", error);
      throw error;
    }
  },
};
