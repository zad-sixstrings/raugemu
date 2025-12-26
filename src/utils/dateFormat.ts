export const formatDateTime = (timestamp: string): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return `${date.toLocaleDateString("fr-FR")} - ${date.toLocaleTimeString(
    "fr-FR",
    { hour: "2-digit", minute: "2-digit" }
  )}`;
};

export const formatDate = (timestamp: string): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString("fr-FR");
};

export const formatTime = (timestamp: string): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString("fr-FR", { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
};