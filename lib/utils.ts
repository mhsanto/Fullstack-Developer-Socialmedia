import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimeStamp = (createdAt: Date): string => {
  const currentTimestamp = new Date().getTime();
  const createdTimestamp = createdAt.getTime();
  const timeDifference = currentTimestamp - createdTimestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximate, not exact

  if (months > 0) {
      return months === 1 ? `${months} month ago` : `${months} months ago`;
  } else if (days > 0) {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (hours > 0) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (minutes > 0) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  } else {
      return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
  }
};

