"use client";

import { clsx } from "clsx";
import { useEffect, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { NAV_ITEMS, CONTACT, SOCIAL_LINKS } from "@/lib/constants";

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
        "bg-[var(--color-bg-dark)]",
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
                    "block py-2",
                    "text-[20px] sm:text-[24px] font-medium",
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

        {/* Language Switcher + Contact info + Social */}
        <div
          className={clsx(
            "mt-auto pt-6 pb-6 border-t border-white/10 transition-all duration-400 ease-out",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
          style={{
            transitionDelay: isOpen ? `${100 + NAV_ITEMS.length * 50}ms` : "0ms",
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <LanguageSwitcher variant="dark" mode="inline" />
          </div>
          <a
            href={`mailto:${CONTACT.email}`}
            tabIndex={isOpen ? 0 : -1}
            className="block text-[14px] text-white/60 hover:text-white transition-colors mb-4"
          >
            {CONTACT.email}
          </a>
          <div className="flex items-center gap-5">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              tabIndex={isOpen ? 0 : -1}
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              tabIndex={isOpen ? 0 : -1}
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              tabIndex={isOpen ? 0 : -1}
              className="text-white/40 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
