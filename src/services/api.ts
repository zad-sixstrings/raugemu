import type { LoginCredentials, RegisterCredentials } from "../types/auth";

export interface ExtendedUserProfile {
  playTime: number;
  saves: number;
}

export interface UserProfile {
  id: string;
  nickname: string;
  email: string;
  creation_date: string;
  profile: string;
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
  async getUserProfileExtended(): Promise<ExtendedUserProfile> {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await fetch(`${API_URL}/user/userprofileextended`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch extended user profile");
      }
      return await response.json();
    } catch (error) {
      console.error("Get extended user profile error:", error);
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
      const saves = await response.json();
      return saves.sort((a: UserSave, b: UserSave) =>
        a.game.localeCompare(b.game, "fr-FR")
      );
    } catch (error) {
      console.error("Get user saves error:", error);
      throw error;
    }
  },
};
