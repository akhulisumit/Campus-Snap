import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type EventCategory = "All" | "Cultural" | "Technical" | "Sports" | "Academic";

export const EVENT_CATEGORIES: EventCategory[] = ["All", "Cultural", "Technical", "Sports", "Academic"];

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "MMMM d, yyyy");
}
