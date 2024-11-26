import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum Routes {
  Home = "/items",
  Login = "/auth/login",
  Activities = "/activities",
  LeaderBoards = "/leaderboards",
  Upload = "/upload",
  Profile = "/profile",
  Terms = "/terms",
  Privacy = "/privacy",
  Notification = "/notifications",
  AccountInformation = "/profile/account-information",
  AuctionInformation = "/profile/auction-information",
  PaymentInformation = "/profile/payment-information",
  Password = "/profile/password",
  NotificationSettings = "/profile/notification-settings",
}

export const getInitials = (value: string) => {
  const names = value.split(" ");
  const initials = names
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
};

export const Badges: Record<string, string> = {
  "Fastest Bidder": "/svgs/badges/fastest.svg",
  "Frequent Bidder": "/svgs/badges/frequent.svg",
  "Highest Baller": "/svgs/badges/highest.svg",
  "Lucky Winner": "/svgs/badges/lucky.svg",
  "Top Bidder": "/svgs/badges/top.svg",
};

/**
 *
 * @param date
 * @returns string
 * @example 2mins ago
 */
export function getRelativeTime(date: Date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
  }
}

export const errorFormatter = (error: any) => {
  const errorData = error?.response?.data;
  if (errorData.message) {
    if (typeof errorData.message === "string") return errorData.message;
    if (Array.isArray(errorData.message)) return errorData.message.join(", ");
  }
};

export const auctionLimit = 8;

export const publicRoutes: string[] = [];
export const authRoutes: string[] = [Routes.Login];

export enum cacheTags {
  user = "user",
  currentuser = "currentuser",
  activebids = "activebids",
  carts = "carts",
  categories = "categories",
  merchantTransactions = "merchantTransactions",
  banks = "banks",
  auctionItems = "auctionItems",
  notifications = "notifications",
}

export const formatError = (error: any) => {
  return error?.response?.data?.errors?.[0]?.message || "Something went wrong";
};

export const pageLimit = 12;
