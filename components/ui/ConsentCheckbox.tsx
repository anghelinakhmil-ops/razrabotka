"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ConsentCheckboxProps {
  /** Field name for react-hook-form */
  name: string;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Validation error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Inverted colors (for dark backgrounds) */
  inverted?: boolean;
}

/**
 * ConsentCheckbox — GDPR-compliant consent checkbox
 *
 * Required checkbox with link to Privacy Policy.
 * Must be explicitly checked before form submission (GDPR Art. 6(1)(a)).
 */
export const ConsentCheckbox = forwardRef<HTMLInputElement, ConsentCheckboxProps>(
  function ConsentCheckbox(
    { name, checked, onChange, onBlur, error, disabled, inverted = false },
    ref,
  ) {
    const t = useTranslations("consent");

    const textColor = inverted
      ? "text-[var(--color-text-muted)]"
      : "text-[var(--color-text-muted)]";

    const linkColor = inverted
      ? "text-[var(--color-background)] hover:text-[var(--color-background-alt)]"
      : "text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)]";

    return (
      <div className="space-y-1">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            ref={ref}
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
            className="
              mt-0.5 h-5 w-5 shrink-0 appearance-none rounded-sm
              border border-[var(--color-line-dark)]
              bg-transparent
              checked:bg-[var(--color-text-primary)] checked:border-[var(--color-text-primary)]
              checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22%23F9F7F2%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.207%204.793a1%201%200%20010%201.414l-5%205a1%201%200%2001-1.414%200l-2-2a1%201%200%20011.414-1.414L6.5%209.086l4.293-4.293a1%201%200%20011.414%200z%22%2F%3E%3C%2Fsvg%3E')]
              checked:bg-center checked:bg-no-repeat
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text-primary)] focus-visible:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              cursor-pointer
            "
          />
          <span className={`text-caption leading-relaxed ${textColor}`}>
            {t("checkbox")}{" "}
            <Link
              href="/privacy"
              className={`underline hover:no-underline transition-colors ${linkColor}`}
              target="_blank"
              rel="noopener"
            >
              {t("privacyLink")}
            </Link>
          </span>
        </label>
        {error && (
          <p
            id={`${name}-error`}
            role="alert"
            className="text-caption text-red-500 ml-8"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);
