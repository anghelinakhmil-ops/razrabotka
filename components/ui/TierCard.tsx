"use client";

import { clsx } from "clsx";
import { CtaButton } from "@/components/ui/CtaButton";

interface TierCardProps {
  tier: "start" | "standard" | "pro";
  tierLabel: string;
  audience: string;
  features: string[];
  timeline: string;
  price: string;
  timelineLabel: string;
  priceLabel: string;
  orderButton: string;
  featuresTitle: string;
  audienceTitle: string;
  recommended?: string;
  className?: string;
}

/**
 * TierCard — карточка тира (Start / Standard / Pro)
 *
 * Standard тир визуально выделен как рекомендуемый.
 */
export function TierCard({
  tier,
  tierLabel,
  audience,
  features,
  timeline,
  price,
  timelineLabel,
  priceLabel,
  orderButton,
  featuresTitle,
  audienceTitle,
  recommended,
  className,
}: TierCardProps) {
  const isStandard = tier === "standard";

  return (
    <div
      className={clsx(
        "relative flex flex-col",
        "border border-[var(--color-line)]",
        "p-6 lg:p-8",
        "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        "hover:border-[var(--color-accent)]",
        isStandard && "border-[var(--color-text-primary)] lg:scale-[1.02]",
        className
      )}
    >
      {/* Recommended badge */}
      {isStandard && recommended && (
        <div
          className={clsx(
            "absolute -top-3 left-6",
            "px-3 py-1",
            "bg-[var(--color-accent)] text-[var(--color-background)]",
            "text-[11px] font-medium uppercase",
            "tracking-[var(--letter-spacing-extra-wide)]"
          )}
        >
          {recommended}
        </div>
      )}

      {/* Tier name */}
      <span
        className={clsx(
          "text-[11px] font-medium uppercase",
          "tracking-[var(--letter-spacing-extra-wide)]",
          "text-[var(--color-accent)]",
          "mb-4"
        )}
      >
        {tierLabel}
      </span>

      {/* Price */}
      <div className="mb-4">
        <span className="text-[11px] uppercase tracking-[var(--letter-spacing-wide)] text-[var(--color-text-muted)] block mb-1">
          {priceLabel}
        </span>
        <span className="text-[24px] lg:text-[28px] font-display font-bold text-[var(--color-text-primary)]">
          {price}
        </span>
      </div>

      {/* Timeline */}
      <div className="mb-6 pb-6 border-b border-[var(--color-line)]">
        <span className="text-[11px] uppercase tracking-[var(--letter-spacing-wide)] text-[var(--color-text-muted)] block mb-1">
          {timelineLabel}
        </span>
        <span className="text-body font-medium text-[var(--color-text-primary)]">
          {timeline}
        </span>
      </div>

      {/* Audience */}
      <div className="mb-6">
        <span className="text-[11px] uppercase tracking-[var(--letter-spacing-wide)] text-[var(--color-text-muted)] block mb-2">
          {audienceTitle}
        </span>
        <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
          {audience}
        </p>
      </div>

      {/* Features */}
      <div className="mb-8 flex-1">
        <span className="text-[11px] uppercase tracking-[var(--letter-spacing-wide)] text-[var(--color-text-muted)] block mb-3">
          {featuresTitle}
        </span>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-[14px] text-[var(--color-text-secondary)]"
            >
              <svg
                className="w-4 h-4 shrink-0 mt-0.5 text-[var(--color-accent)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <CtaButton
        variant={isStandard ? "primary" : "outline"}
        size="md"
        className="mt-auto w-full"
      >
        {orderButton}
      </CtaButton>
    </div>
  );
}

export default TierCard;
