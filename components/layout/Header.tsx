"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrokenText } from "../ui/BrokenText";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { NavLink } from "./NavLink";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";

interface HeaderProps {
  /** Открыто ли мобильное меню */
  isMenuOpen?: boolean;
  /** Callback для открытия мобильного меню */
  onMenuOpen?: () => void;
  /** Callback для закрытия мобильного меню */
  onMenuClose?: () => void;
  /** Callback для открытия модала "Заказать звонок" */
  onCallbackClick?: () => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Header — шапка сайта
 *
 * Включает:
 * - Логотип (типографический, «ломаный» стиль)
 * - Навигация по центру (скрыта на mobile)
 * - Email контакт
 * - Кнопка «Меню» / «Закрыть» для мобильного меню
 * - Sticky с backdrop-blur при скролле
 */
export function Header({
  isMenuOpen = false,
  onMenuOpen,
  onMenuClose,
  onCallbackClick,
  className,
}: HeaderProps) {
  const t = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      onMenuClose?.();
    } else {
      onMenuOpen?.();
    }
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0",
        "z-50",
        "transition-all duration-300",
        // When menu is open — transparent bg on dark overlay
        isMenuOpen
          ? "bg-transparent"
          : isScrolled
            ? "bg-[var(--color-background)]/90 backdrop-blur-md"
            : "bg-transparent",
        className
      )}
    >
      {/* Main header — single row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          className={clsx(
            "flex items-center justify-between",
            "transition-all duration-300",
            isScrolled && !isMenuOpen ? "h-16 lg:h-16" : "h-[72px] lg:h-20"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className={clsx(
              "relative z-10",
              "focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            )}
          >
            <BrokenText
              text="NAKO"
              spaced
              className={clsx(
                "text-[18px] lg:text-[22px]",
                "font-bold",
                "tracking-[0.15em]",
                // White text when menu is open (dark bg)
                "transition-colors duration-300",
                isMenuOpen ? "text-white" : ""
              )}
            />
          </Link>

          {/* Desktop Navigation — hidden when menu overlay is open */}
          <nav className="hidden lg:block" aria-label={t("nav.home")}>
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} exact={item.href === "/"}>
                    {t(`nav.${item.key}`)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: lang switcher + email + menu toggle */}
          <div className="flex items-center gap-6">
            {/* Language Switcher — desktop only */}
            <LanguageSwitcher
              variant={isMenuOpen ? "dark" : "light"}
              className="hidden lg:flex"
            />

            {/* Email — desktop only */}
            <a
              href={`mailto:${CONTACT.email}`}
              className={clsx(
                "hidden lg:block",
                "text-[13px] tracking-wide",
                "transition-colors duration-300",
                isMenuOpen
                  ? "text-white/60 hover:text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {CONTACT.email}
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? t("header.ariaCloseMenu") : t("header.ariaOpenMenu")}
              aria-expanded={isMenuOpen}
              className={clsx(
                "lg:hidden",
                "py-2 px-1",
                "text-[14px] font-medium uppercase tracking-[0.05em]",
                "transition-colors duration-300",
                isMenuOpen
                  ? "text-white hover:text-white/60"
                  : "text-[var(--color-text-primary)] hover:text-[var(--color-text-muted)]",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              )}
            >
              {isMenuOpen ? t("header.menuClose") : t("header.menuOpen")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
