"use client";

import { clsx } from "clsx";

type Region = "ukraine" | "europe";

interface PricingToggleProps {
  region: Region;
  onChange: (region: Region) => void;
  labels: { ukraine: string; europe: string };
  className?: string;
}

/**
 * PricingToggle — переключатель региона ценообразования (Украина / Европа)
 */
export function PricingToggle({
  region,
  onChange,
  labels,
  className,
}: PricingToggleProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center",
        "border border-[var(--color-line)] rounded-[3px]",
        "p-0.5",
        className
      )}
      role="radiogroup"
      aria-label="Pricing region"
    >
      <button
        type="button"
        role="radio"
        aria-checked={region === "ukraine"}
        onClick={() => onChange("ukraine")}
        className={clsx(
          "px-5 py-2.5",
          "text-[13px] font-medium uppercase",
          "tracking-[var(--letter-spacing-wide)]",
          "rounded-[2px]",
          "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          "cursor-pointer",
          region === "ukraine"
            ? "bg-[var(--color-text-primary)] text-[var(--color-background)]"
            : "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        )}
      >
        {labels.ukraine}
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={region === "europe"}
        onClick={() => onChange("europe")}
        className={clsx(
          "px-5 py-2.5",
          "text-[13px] font-medium uppercase",
          "tracking-[var(--letter-spacing-wide)]",
          "rounded-[2px]",
          "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          "cursor-pointer",
          region === "europe"
            ? "bg-[var(--color-text-primary)] text-[var(--color-background)]"
            : "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        )}
      >
        {labels.europe}
      </button>
    </div>
  );
}

export type { Region };
export default PricingToggle;
