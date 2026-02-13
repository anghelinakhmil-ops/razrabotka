"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrokenText } from "../ui/BrokenText";
import { Button } from "../ui/Button";
import { NavLink } from "./NavLink";
import { NAV_ITEMS } from "@/lib/constants";

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
 * - CTA кнопка «Заказать звонок»
 * - Кнопка «Меню» / «Закрити» для мобильного меню
 * - Sticky с backdrop-blur при скролле
 */
export function Header({
  isMenuOpen = false,
  onMenuOpen,
  onMenuClose,
  onCallbackClick,
  className,
}: HeaderProps) {
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
              text="WEBSTUDIO"
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
          <nav className="hidden lg:block" aria-label="Основная навигация">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} exact={item.href === "/"}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: CTA + Menu toggle */}
          <div className="flex items-center gap-4">
            {/* CTA Button - hidden on mobile, hidden when menu open */}
            {!isMenuOpen && (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onCallbackClick}
                  className="hidden sm:inline-flex lg:inline-flex"
                >
                  Заказать звонок
                </Button>
                {/* Compact CTA for mobile */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onCallbackClick}
                  className="sm:hidden px-3 text-[11px]"
                >
                  Звонок
                </Button>
              </>
            )}

            {/* Mobile menu toggle: "Меню" / "Закрити" */}
            <button
              type="button"
              onClick={handleMenuToggle}
              aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
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
              {isMenuOpen ? "Закрити" : "Меню"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
