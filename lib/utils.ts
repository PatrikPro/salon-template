import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Spojí Tailwind třídy bezpečně (clsx + tailwind-merge).
 * Preferuje pozdější třídy při konfliktech.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
