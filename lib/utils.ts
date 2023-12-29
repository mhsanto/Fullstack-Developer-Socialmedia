import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { number } from "zod";

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

export const formatAndDivideNumber = (number: number) => {
  if (number >= 1000000) {
    const formattedNum = (number / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (number >= 1000) {
    const formattedNum = (number / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return number.toString();
  }
};

//takes a parameter Date and return joined date
export function getJoinedDate(inputDate: Date): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex: number = inputDate.getMonth();
  const year: number = inputDate.getFullYear();

  const joinedDate: string = `${months[monthIndex]} ${year}`;

  return joinedDate;
}
