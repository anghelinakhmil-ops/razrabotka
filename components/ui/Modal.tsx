"use client";

import { clsx } from "clsx";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

interface ModalProps {
  /** Состояние открытия */
  isOpen: boolean;
  /** Callback при закрытии */
  onClose: () => void;
  /** Заголовок модального окна */
  title?: string;
  /** Контент модального окна */
  children: React.ReactNode;
  /** Размер модального окна */
  size?: ModalSize;
  /** Закрывать при клике на overlay */
  closeOnOverlay?: boolean;
  /** Закрывать при нажатии Escape */
  closeOnEscape?: boolean;
  /** Показывать кнопку закрытия */
  showCloseButton?: boolean;
  /** Дополнительные CSS классы для контента */
  className?: string;
}

/**
 * Modal — модальное окно с overlay и анимациями
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Заказать звонок"
 * >
 *   <p>Содержимое модального окна</p>
 * </Modal>
 *
 * @example
 * // Большое модальное окно
 * <Modal isOpen={isOpen} onClose={onClose} size="lg" title="Галерея">
 *   <ImageGallery />
 * </Modal>
 */
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
}: ModalProps) {
  const t = useTranslations("common");
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  // Size classes
  const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)]",
  };

  // Handle Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Focus trap
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab" || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
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

  // Effects
  useEffect(() => {
    if (isOpen) {
      // Save previous focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Lock body scroll (iOS-compatible)
      const scrollY = window.scrollY;
      document.body.classList.add("scroll-locked");
      document.body.style.top = `-${scrollY}px`;

      // Add event listeners
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keydown", handleTabKey);

      // Focus first focusable element
      const timer = setTimeout(() => {
        const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        const savedScrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
        document.body.classList.remove("scroll-locked");
        document.body.style.top = "";
        window.scrollTo(0, savedScrollY);
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keydown", handleTabKey);

        // Restore previous focus
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, handleKeyDown, handleTabKey]);

  // Don't render if not open
  if (!isOpen) return null;

  // Render via portal
  const modalContent = (
    <div
      className={clsx(
        "fixed inset-0 z-50",
        "flex items-center justify-center",
        "p-4"
      )}
      role="presentation"
    >
      {/* Overlay */}
      <div
        className={clsx(
          "absolute inset-0",
          "bg-black/60",
          "backdrop-blur-sm",
          // Animation
          "animate-fade-in"
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={clsx(
          "relative z-10",
          "w-full",
          sizeClasses[size],
          "bg-[var(--color-background)]",
          "border-2 border-[var(--color-line)]",
          "shadow-2xl",
          // Animation with blur effect
          "animate-modal-blur-in",
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={clsx(
              "flex items-center justify-between",
              "px-4 py-3 sm:px-6 sm:py-4",
              "border-b border-[var(--color-line)]"
            )}
          >
            {/* Title */}
            {title && (
              <h2
                id={titleId}
                className={clsx(
                  "text-[18px] md:text-[20px]",
                  "font-medium",
                  "text-[var(--color-text-primary)]",
                  "m-0"
                )}
              >
                {title}
              </h2>
            )}

            {/* Close Button */}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label={t("close")}
                className={clsx(
                  "p-2 -m-2",
                  "text-[var(--color-text-muted)]",
                  "transition-colors duration-200",
                  "hover:text-[var(--color-text-primary)]",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
                  !title && "ml-auto"
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
            )}
          </div>
        )}

        {/* Body */}
        <div
          className={clsx(
            "px-4 py-4 sm:px-6 sm:py-6",
            "text-[var(--color-text-primary)]",
            "max-h-[calc(100dvh-12rem)]",
            "overflow-y-auto"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );

  // Use portal to render at document body level
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return null;
}

export default Modal;
