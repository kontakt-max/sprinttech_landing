import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { publicEnv } from "@/lib/env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeText(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 5000);
}

export function getSiteUrl(): string {
  return publicEnv.NEXT_PUBLIC_SITE_URL;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}
