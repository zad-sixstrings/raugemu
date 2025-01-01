export function playtimeFormat(time: { hours?: number; minutes?: number; seconds: number; milliseconds: number }): string {
  const totalMilliseconds =
    (time.hours || 0) * 3600000 +
    (time.minutes || 0) * 60000 +
    time.seconds * 1000 +
    time.milliseconds;

  const hours = Math.floor(totalMilliseconds / 3600000);
  const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}
