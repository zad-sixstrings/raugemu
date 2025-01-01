// Type for the API response
export interface ApiPlaytimeData {
  gamename: string;
  playedtime: {
    minutes?: number;
    seconds: number;
    milliseconds: number;
  };
}

// Type for our internal use after conversion
export interface PlaytimeData {
  hours?: number;
  minutes: number;
}

export interface GamePlaytime {
  gamename: string;
  playedtime: PlaytimeData;
}