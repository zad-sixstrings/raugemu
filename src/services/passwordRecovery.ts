export interface PasswordResetRequest {
  userMail: string;
}

export interface PasswordUpdateRequest {
  token: string;
  newPassword: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

class PasswordRecoveryApi {
  private readonly API_URL: string;

  constructor(apiUrl: string) {
    this.API_URL = apiUrl;
  }

  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    try {
      const response = await fetch(`${this.API_URL}/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMail: email }),
      });

      if (!response.ok) {
        throw new Error("Failed to request password reset");
      }

      return await response.json();
    } catch (error) {
      console.error("Password reset request error:", error);
      throw error;
    }
  }

  async updatePassword(
    token: string,
    newPassword: string
  ): Promise<PasswordResetResponse> {
    try {
      const response = await fetch(`${this.API_URL}/updatepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      return await response.json();
    } catch (error) {
      console.error("Password update error:", error);
      throw error;
    }
  }
}

export const passwordRecoveryApi = new PasswordRecoveryApi(
  import.meta.env.VITE_API_URL
);
