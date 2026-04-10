// src/lib/activity/ActivityFormatter.ts

export function formatActivityTime(timestamp: number) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;

  return new Date(timestamp).toLocaleDateString();
}
