"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useCallback, useRef } from "react";
import { Button } from "../ui/Button";
import { NAV_ITEMS, SOCIAL_LINKS_COMPACT, CONTACT } from "@/lib/constants";

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

  // Scroll lock + keyboard handlers
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTabKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTabKey);
    };
  }, [isOpen, handleEscape, handleTabKey]);

  // Close on nav click
  const handleNavClick = () => onClose();

  // CTA click — close menu then open callback modal
  const handleCtaClick = () => {
    onClose();
    onCallbackClick?.();
  };

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal={isOpen}
      aria-label="Мобильное меню"
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
      <div className="flex flex-col h-full overflow-y-auto pt-20 pb-8 px-6 sm:px-8">
        {/* Navigation — main content */}
        <nav className="flex-1" aria-label="Мобильная навигация">
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
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div
          className={clsx(
            "mt-8 transition-all duration-400 ease-out",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{
            transitionDelay: isOpen ? `${100 + NAV_ITEMS.length * 50}ms` : "0ms",
          }}
        >
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleCtaClick}
            tabIndex={isOpen ? 0 : -1}
            className="border-white text-white hover:bg-white hover:text-[var(--color-text-primary)]"
          >
            Заказать звонок
          </Button>
        </div>

        {/* Contact info */}
        <div
          className={clsx(
            "mt-8 space-y-3 transition-all duration-400 ease-out",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{
            transitionDelay: isOpen ? `${150 + NAV_ITEMS.length * 50}ms` : "0ms",
          }}
        >
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            tabIndex={isOpen ? 0 : -1}
            className="block text-[16px] text-white hover:text-white/60 transition-colors"
          >
            {CONTACT.phone}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            tabIndex={isOpen ? 0 : -1}
            className="block text-[16px] text-white/50 hover:text-white transition-colors"
          >
            {CONTACT.email}
          </a>
        </div>

        {/* Social links */}
        <div
          className={clsx(
            "mt-6 pt-6 border-t border-white/10 transition-all duration-400 ease-out",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{
            transitionDelay: isOpen ? `${200 + NAV_ITEMS.length * 50}ms` : "0ms",
          }}
        >
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS_COMPACT.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                tabIndex={isOpen ? 0 : -1}
                className="p-2 text-white/40 hover:text-white transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
