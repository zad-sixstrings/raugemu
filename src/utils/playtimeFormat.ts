import type { ApiPlaytimeData, PlaytimeData, GamePlaytime } from '../types/playtime';

export function convertApiTimeFormat(apiPlaytime: ApiPlaytimeData): GamePlaytime {
  // Convert everything to total minutes
  const totalMinutes = 
    (apiPlaytime.playedtime.minutes || 0) + // Minutes from API
    Math.round(apiPlaytime.playedtime.seconds / 60); // Seconds converted to minutes
  
  return {
    gamename: apiPlaytime.gamename,
    playedtime: {
      hours: Math.floor(totalMinutes / 60),
      minutes: totalMinutes % 60
    }
  };
}

export function playtimeFormat(time: PlaytimeData): string {
  if (time.hours && time.hours > 0) {
    return `${time.hours}h ${time.minutes}m`;
  }
  return `${time.minutes}m`;
}

export function getTotalPlaytime(games: GamePlaytime[]): string {
  const totalMinutes = games.reduce((total, game) => {
    const timeInMinutes = (game.playedtime.hours || 0) * 60 + game.playedtime.minutes;
    return total + timeInMinutes;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return playtimeFormat({ hours, minutes });
}