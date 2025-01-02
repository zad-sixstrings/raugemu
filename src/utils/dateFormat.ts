export const formatDateTime = (timestamp: string): string => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString(
    "fr-FR",
    { hour: "2-digit", minute: "2-digit" }
  )}`;
};
