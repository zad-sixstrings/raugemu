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
  
  export interface PlaytimeData {
    gamename: string;
    playedtime: {
      hours?: number;
      minutes: number;
    };
  }
  
  export interface GamePlaytime {
    gamename: string;
    playedtime: PlaytimeData;
  }
  
  export interface Achievement {
    game: string;
    achievementname: string;
    description: string;
    unlockdate: string;
  }