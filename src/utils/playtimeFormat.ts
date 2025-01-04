import type { PlaytimeData } from '../types/user';
import type { ApiPlaytimeData } from '../types/api';

export function convertApiTimeFormat(apiPlaytime: ApiPlaytimeData): PlaytimeData {
  const totalSeconds = 
    (apiPlaytime.playedtime.hours || 0) * 3600 +  // Hours to seconds
    (apiPlaytime.playedtime.minutes || 0) * 60 +   // Minutes to seconds
    apiPlaytime.playedtime.seconds +               // Seconds from API
    Math.floor(apiPlaytime.playedtime.milliseconds / 1000); // Milliseconds to seconds

  const totalMinutes = Math.floor(totalSeconds / 60);
  
  return {
    gamename: apiPlaytime.gamename,
    playedtime: {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60
    }
  };
}

export function playtimeFormat(time: { hours?: number; minutes: number }): string {
  if (time.hours && time.hours > 0) {
    return `${time.hours}h ${time.minutes}m`;
  }
  return `${time.minutes}m`;
}

export function getTotalPlaytime(games: PlaytimeData[]): string {
  const totalMinutes = games.reduce((total, game) => {
    const timeInMinutes = (game.playedtime.hours || 0) * 60 + game.playedtime.minutes;
    return total + timeInMinutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return playtimeFormat({ hours, minutes });
}