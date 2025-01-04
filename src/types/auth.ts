export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Update User interface to match UserProfile
export interface User {
  id: string;
  nickname: string;
  email: string;
  creation_date: string;
  profile: string;
  saves: number;
  imagePath: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}