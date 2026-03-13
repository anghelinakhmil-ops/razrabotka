"use client";

import { clsx } from "clsx";
import { useRegion } from "@/components/providers/RegionProvider";

interface CurrencyBadgeProps {
  variant?: "light" | "dark";
  className?: string;
}

/**
 * CurrencyBadge — показывает валюту текущего региона
 *
 * Отображает код валюты (EUR, UAH, PLN и т.д.),
 * определённый по гео-детекции через RegionProvider.
 */
export function CurrencyBadge({ variant = "light", className }: CurrencyBadgeProps) {
  const { region } = useRegion();

  if (region.currency === "USD") return null;

  return (
    <span
      className={clsx(
        "text-[11px] tracking-[0.05em] font-medium px-1.5 py-0.5 border rounded-sm",
        variant === "dark"
          ? "text-white/50 border-white/10"
          : "text-[var(--color-text-muted)] border-[var(--color-line)]",
        className,
      )}
    >
      {region.currencySymbol} {region.currency}
    </span>
  );
}
