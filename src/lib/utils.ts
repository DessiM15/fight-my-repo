import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export const PHONE_NUMBER = "(888) 997-5170";
export const PHONE_HREF = "tel:+18889975170";

export const VANITY_NUMBER = "1-877-BAD-REPO";
export const VANITY_HREF = "tel:+18772237376";
