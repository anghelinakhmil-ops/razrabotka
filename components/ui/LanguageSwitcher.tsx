"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { ease, duration } from "@/lib/motion";

interface LanguageSwitcherProps {
  /** "light" для светлого фона (Header), "dark" для тёмного (MobileMenu) */
  variant?: "light" | "dark";
  /** "dropdown" (desktop) или "inline" (mobile menu — grid) */
  mode?: "dropdown" | "inline";
  /** Дополнительные CSS классы */
  className?: string;
}

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -4,
    transition: { duration: duration.fast, ease },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.fast, ease },
  },
};

/**
 * LanguageSwitcher — переключатель языка
 *
 * mode="dropdown": компактная кнопка «EN ▾» → выпадающий список (desktop header)
 * mode="inline": grid-сетка всех языков (mobile menu)
 */
export function LanguageSwitcher({
  variant = "light",
  mode = "dropdown",
  className,
}: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwitch = (locale: Locale) => {
    if (locale === currentLocale) return;
    router.replace(pathname, { locale });
    setIsOpen(false);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (mode === "inline") {
    return (
      <div
        className={clsx(
          "flex flex-wrap items-center gap-x-3 gap-y-2",
          className,
        )}
      >
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => handleSwitch(locale)}
            aria-label={localeNames[locale]}
            aria-current={locale === currentLocale ? "true" : undefined}
            className={clsx(
              "min-w-[44px] min-h-[44px] flex items-center justify-center",
              "text-[13px] tracking-[0.05em] font-medium transition-colors duration-300 rounded-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1",
              locale === currentLocale
                ? variant === "dark"
                  ? "text-white"
                  : "text-[var(--color-text-primary)]"
                : variant === "dark"
                  ? "text-white/40 hover:text-white/80"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
            )}
          >
            {localeNames[locale]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={clsx(
          "flex items-center gap-1 text-[12px] tracking-[0.05em] font-medium transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 rounded-sm px-1 py-0.5",
          variant === "dark"
            ? "text-white hover:text-white/80"
            : "text-[var(--color-text-primary)] hover:text-[var(--color-text-muted)]",
        )}
      >
        {localeNames[currentLocale]}
        <svg
          className={clsx(
            "w-3 h-3 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="listbox"
            aria-label="Language"
            className={clsx(
              "absolute top-full right-0 mt-2 py-1 min-w-[100px] border z-50",
              variant === "dark"
                ? "bg-[var(--color-bg-dark)] border-white/10"
                : "bg-[var(--color-background)] border-[var(--color-line)]",
            )}
          >
            {locales.map((locale) => (
              <button
                key={locale}
                type="button"
                role="option"
                aria-selected={locale === currentLocale}
                onClick={() => handleSwitch(locale)}
                className={clsx(
                  "w-full text-left px-4 py-2 text-[12px] tracking-[0.05em] font-medium transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]",
                  locale === currentLocale
                    ? variant === "dark"
                      ? "text-white bg-white/5"
                      : "text-[var(--color-text-primary)] bg-[var(--color-background-alt)]"
                    : variant === "dark"
                      ? "text-white/50 hover:text-white hover:bg-white/5"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]",
                )}
              >
                {localeNames[locale]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
