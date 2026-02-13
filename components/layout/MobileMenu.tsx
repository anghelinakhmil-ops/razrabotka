"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrokenText } from "../ui/BrokenText";
import { Button } from "../ui/Button";
import { NAV_ITEMS, SOCIAL_LINKS_COMPACT, CONTACT } from "@/lib/constants";
import { ease } from "@/lib/motion";

// Motion variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease }
  }
};

const menuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease }
  },
  exit: {
    x: "100%",
    transition: { duration: 0.3, ease }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.4,
      ease
    }
  })
};

interface MobileMenuProps {
  /** Открыто ли меню */
  isOpen: boolean;
  /** Callback для закрытия меню */
  onClose: () => void;
  /** Callback для открытия модала "Заказать звонок" */
  onCallbackClick?: () => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * MobileMenu — полноэкранное мобильное меню
 *
 * Включает:
 * - Fullscreen overlay с анимацией
 * - Навигация с stagger анимацией
 * - Контактная информация
 * - CTA кнопка
 * - Соцсети
 * - Закрытие по Escape и клику на overlay
 * - Блокировка скролла body
 */
export function MobileMenu({
  isOpen,
  onClose,
  onCallbackClick,
  className,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle Escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  // Focus trap
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }, []);

  // Lock body scroll, add escape listener and focus trap
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

  // Handle navigation click - close menu
  const handleNavClick = () => {
    onClose();
  };

  // Handle CTA click
  const handleCtaClick = () => {
    onClose();
    onCallbackClick?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={clsx(
              "fixed top-0 right-0 bottom-0 z-50",
              "w-full max-w-md",
              "bg-[var(--color-background)]",
              "shadow-2xl",
              "lg:hidden",
              "overflow-y-auto",
              className
            )}
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Мобильное меню"
          >
            <div className="flex flex-col min-h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-line)]">
                {/* Logo */}
                <Link href="/" onClick={handleNavClick}>
                  <BrokenText
                    text="WEBSTUDIO"
                    spaced
                    className={clsx(
                      "text-[18px]",
                      "font-bold",
                      "tracking-[0.15em]"
                    )}
                  />
                </Link>

                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Закрыть меню"
                  className={clsx(
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-6" aria-label="Мобильная навигация">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.li
                      key={item.href}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={clsx(
                          "block py-3",
                          "text-[24px] font-medium",
                          "text-[var(--color-text-primary)]",
                          "transition-colors duration-200",
                          "hover:text-[var(--color-text-muted)]",
                          "focus-visible:outline-none",
                          "focus-visible:text-[var(--color-accent)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* CTA */}
              <motion.div
                custom={NAV_ITEMS.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="px-6 pb-6"
              >
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCtaClick}
                >
                  Заказать звонок
                </Button>
              </motion.div>

              {/* Contact info */}
              <motion.div
                custom={NAV_ITEMS.length + 1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="px-6 pb-6 space-y-3"
              >
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className={clsx(
                    "block text-[16px]",
                    "text-[var(--color-text-primary)]",
                    "hover:text-[var(--color-text-muted)]",
                    "transition-colors duration-200"
                  )}
                >
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={clsx(
                    "block text-[16px]",
                    "text-[var(--color-text-muted)]",
                    "hover:text-[var(--color-text-primary)]",
                    "transition-colors duration-200"
                  )}
                >
                  {CONTACT.email}
                </a>
              </motion.div>

              {/* Social links */}
              <motion.div
                custom={NAV_ITEMS.length + 2}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="px-6 pb-8 border-t border-[var(--color-line)] pt-6"
              >
                <div className="flex items-center gap-4">
                  {SOCIAL_LINKS_COMPACT.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={clsx(
                        "p-2",
                        "text-[var(--color-text-muted)]",
                        "hover:text-[var(--color-text-primary)]",
                        "transition-colors duration-200",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
                      )}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
