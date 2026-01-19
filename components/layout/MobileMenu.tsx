"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrokenText } from "../ui/BrokenText";
import { Button } from "../ui/Button";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Про нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Кейсы", href: "/cases" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Telegram",
    href: "https://t.me/webstudio",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/webstudio",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
      </svg>
    ),
  },
];

// Ease timing из дизайн-системы
const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

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
  // Handle Escape key
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, [onClose]);

  // Lock body scroll and add escape listener
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, handleEscape]);

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
                  href="tel:+78001234567"
                  className={clsx(
                    "block text-[16px]",
                    "text-[var(--color-text-primary)]",
                    "hover:text-[var(--color-text-muted)]",
                    "transition-colors duration-200"
                  )}
                >
                  +7 (800) 123-45-67
                </a>
                <a
                  href="mailto:hello@webstudio.com"
                  className={clsx(
                    "block text-[16px]",
                    "text-[var(--color-text-muted)]",
                    "hover:text-[var(--color-text-primary)]",
                    "transition-colors duration-200"
                  )}
                >
                  hello@webstudio.com
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
                  {SOCIAL_LINKS.map((social) => (
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
