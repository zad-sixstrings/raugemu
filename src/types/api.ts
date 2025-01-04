export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
  }
  
  export interface ApiStatus {
    message: string;
  }
  
  export interface AvatarUpdateResponse {
    success: boolean;
    imagePath: string;
  }
  
  export interface ApiPlaytimeData {
    gamename: string;
    playedtime: {
      hours?: number;
      minutes?: number;
      seconds: number;
      milliseconds: number;
    };
  }