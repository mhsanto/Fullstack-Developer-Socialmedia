import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";
import { BADGE_CRITERIA } from "@/constants";
import { BadgeCounts } from "@/types";
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

  const monthIndex: number = inputDate?.getMonth();
  const year: number = inputDate?.getFullYear();

  const joinedDate: string = `${months[monthIndex]} ${year}`;

  return joinedDate;
}
type FormUrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};
export function formUrlQuery({ params, key, value }: FormUrlQueryParams) {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
}
type removeKeysFromQueryProps = {
  params: string;
  keysToRemove: string[];
};
export function removeKeysFromQuery({
  params,
  keysToRemove,
}: removeKeysFromQueryProps) {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
}
//a function assignBadges that calculates how many badges of each type (GOLD, SILVER, BRONZE) should be assigned based on certain criteria.
type BadegeParams = {
  criteria:{
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
};

export const assignBadges = (params: BadegeParams) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };
  const { criteria } = params;

  criteria.forEach((element) => {
    const { type, count } = element;
    const badgeLevels:any = BADGE_CRITERIA[type];
    Object.keys(badgeLevels).forEach((badgeLevel) => {
      
      if (count >= badgeLevels[badgeLevel]) {
        badgeCounts[badgeLevel as keyof BadgeCounts] += 1;
      }
    });
  });
  return badgeCounts
};
