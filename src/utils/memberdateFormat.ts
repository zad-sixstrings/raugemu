export const memberdateFormat = (timestamp: string): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `${date.toLocaleDateString("fr-FR")}`;
  };
  