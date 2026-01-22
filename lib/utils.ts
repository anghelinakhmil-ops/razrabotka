import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Утилита для объединения классов Tailwind CSS
 *
 * Использует clsx для условного объединения и twMerge
 * для правильного разрешения конфликтующих классов.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
