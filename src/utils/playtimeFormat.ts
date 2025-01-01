export function playtimeFormat(time: { seconds: number; milliseconds: number }): string {
  const totalSeconds = time.seconds + time.milliseconds / 1000;
  if (totalSeconds < 60) {
      return `${Math.round(totalSeconds)} secondes`;
  }
  return `${Math.round(totalSeconds / 60)} minutes`;
}