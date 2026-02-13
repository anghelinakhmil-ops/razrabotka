"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrokenText } from "../ui/BrokenText";
import { Button } from "../ui/Button";
import { NavLink } from "./NavLink";
import { NAV_ITEMS } from "@/lib/constants";

interface HeaderProps {
  /** Callback для открытия мобильного меню */
  onMenuOpen?: () => void;
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
 * - Sticky с backdrop-blur при скролле
 */
export function Header({
  onMenuOpen,
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

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0",
        "z-50",
        "transition-all duration-300",
        // Background & blur on scroll — no shadow, subtle effect
        isScrolled
          ? "bg-[var(--color-background)]/90 backdrop-blur-md"
          : "bg-transparent",
        className
      )}
    >
      {/* Main header — single row, no contact bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          className={clsx(
            "flex items-center justify-between",
            "transition-all duration-300",
            isScrolled ? "h-16 lg:h-16" : "h-[72px] lg:h-20"
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
                "tracking-[0.15em]"
              )}
            />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Right side: CTA + Mobile menu button */}
          <div className="flex items-center gap-4">
            {/* CTA Button - hidden on mobile */}
            <Button
              variant="primary"
              size="sm"
              onClick={onCallbackClick}
              className="hidden sm:inline-flex"
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

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={onMenuOpen}
              aria-label="Открыть меню"
              className={clsx(
                "lg:hidden",
                "p-2 -mr-2",
                "text-[var(--color-text-primary)]",
                "transition-colors duration-200",
                "hover:text-[var(--color-text-muted)]",
                "focus-visible:outline-none",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              )}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
