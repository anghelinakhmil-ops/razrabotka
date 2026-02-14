"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { clsx } from "clsx";

interface LanguageSwitcherProps {
  /** "light" для светлого фона (Header), "dark" для тёмного (MobileMenu) */
  variant?: "light" | "dark";
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * LanguageSwitcher — переключатель языка
 *
 * Текстовые кнопки EN · RU · UK · RO
 * Сохраняет текущий путь при смене локали
 */
export function LanguageSwitcher({
  variant = "light",
  className,
}: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return;
    router.replace(pathname, { locale });
  };

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span
              className={clsx(
                "mx-1 text-[11px] select-none",
                variant === "dark"
                  ? "text-white/20"
                  : "text-[var(--color-line)]"
              )}
              aria-hidden="true"
            >
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => handleSwitch(locale)}
            aria-label={localeNames[locale]}
            aria-current={locale === currentLocale ? "true" : undefined}
            className={clsx(
              "text-[12px] tracking-[0.05em] font-medium transition-colors duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 rounded-sm px-0.5",
              locale === currentLocale
                ? variant === "dark"
                  ? "text-white"
                  : "text-[var(--color-text-primary)]"
                : variant === "dark"
                  ? "text-white/40 hover:text-white/80"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            )}
          >
            {localeNames[locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
