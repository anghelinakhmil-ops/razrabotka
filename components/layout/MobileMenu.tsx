"use client";

import { clsx } from "clsx";
import { useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { NAV_ITEMS, CONTACT } from "@/lib/constants";

interface MobileMenuProps {
  /** Открыто ли меню */
  isOpen: boolean;
  /** Callback для закрытия меню */
  onClose: () => void;
  /** Callback для открытия модала "Заказать звонок" */
  onCallbackClick?: () => void;
}

/**
 * MobileMenu — полноэкранное мобильное меню (fullscreen overlay)
 *
 * - Fullscreen тёмный overlay (100vw × 100vh)
 * - CSS-переходы (без AnimatePresence) — 100% надёжность открытия/закрытия
 * - Блокировка скролла body
 * - Focus trap + Escape
 * - Stagger-эффект навигационных пунктов через CSS transition-delay
 */
export function MobileMenu({
  isOpen,
  onClose,
  onCallbackClick,
}: MobileMenuProps) {
  const t = useTranslations();
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle Escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Focus trap
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !menuRef.current) return;

    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  }, []);

  // Scroll lock (iOS-compatible) + keyboard handlers
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.classList.add("scroll-locked");
      document.body.style.top = `-${scrollY}px`;
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTabKey);
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.classList.remove("scroll-locked");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.classList.remove("scroll-locked");
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen, handleEscape, handleTabKey]);

  // Close on nav click
  const handleNavClick = () => onClose();

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal={isOpen}
      aria-label={t("header.ariaOpenMenu")}
      aria-hidden={!isOpen}
      className={clsx(
        // Fullscreen overlay
        "fixed inset-0 z-40",
        "bg-[var(--color-text-primary)]",
        "lg:hidden",
        // CSS transition (opacity + visibility) for 100% reliability
        "transition-[opacity,visibility] duration-300 ease-out",
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      )}
    >
      {/* Inner scroll container */}
      <div className="flex flex-col h-full overflow-y-auto pt-20 px-6 sm:px-8 safe-bottom">
        {/* Navigation — main content */}
        <nav className="flex-1" aria-label={t("nav.home")}>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item, index) => (
              <li
                key={item.href}
                className="overflow-hidden"
              >
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  tabIndex={isOpen ? 0 : -1}
                  className={clsx(
                    "block py-3",
                    "text-[28px] sm:text-[32px] font-medium",
                    "text-white",
                    "transition-all duration-400 ease-out",
                    // Stagger: each item has increasing delay
                    isOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4",
                  )}
                  style={{
                    transitionDelay: isOpen ? `${100 + index * 50}ms` : "0ms",
                  }}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language Switcher + Contact info */}
        <div
          className={clsx(
            "mt-8 pt-8 border-t border-white/10 transition-all duration-400 ease-out",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{
            transitionDelay: isOpen ? `${100 + NAV_ITEMS.length * 50}ms` : "0ms",
          }}
        >
          <LanguageSwitcher variant="dark" className="mb-6" />
          <a
            href={`mailto:${CONTACT.email}`}
            tabIndex={isOpen ? 0 : -1}
            className="block text-[16px] text-white hover:text-white/60 transition-colors"
          >
            {CONTACT.email}
          </a>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
