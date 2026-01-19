"use client";

import { clsx } from "clsx";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

// ============================================
// Accordion Context
// ============================================

interface AccordionContextValue {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be used within an Accordion");
  }
  return context;
}

// ============================================
// Accordion
// ============================================

interface AccordionProps {
  /** Дочерние AccordionItem элементы */
  children: React.ReactNode;
  /** Разрешить несколько открытых элементов одновременно */
  allowMultiple?: boolean;
  /** Индексы изначально открытых элементов */
  defaultOpenIndexes?: number[];
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Accordion — контейнер для сворачиваемых секций
 *
 * @example
 * // Базовое использование
 * <Accordion>
 *   <AccordionItem title="Вопрос 1">Ответ 1</AccordionItem>
 *   <AccordionItem title="Вопрос 2">Ответ 2</AccordionItem>
 * </Accordion>
 *
 * @example
 * // Несколько открытых одновременно
 * <Accordion allowMultiple defaultOpenIndexes={[0]}>
 *   <AccordionItem title="FAQ 1">Ответ</AccordionItem>
 *   <AccordionItem title="FAQ 2">Ответ</AccordionItem>
 * </Accordion>
 */
export function Accordion({
  children,
  allowMultiple = false,
  defaultOpenIndexes = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    () => new Set(defaultOpenIndexes.map((i) => `item-${i}`))
  );

  const toggleItem = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const newSet = new Set(prev);

        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          if (!allowMultiple) {
            newSet.clear();
          }
          newSet.add(id);
        }

        return newSet;
      });
    },
    [allowMultiple]
  );

  const contextValue = useMemo(
    () => ({
      openItems,
      toggleItem,
      allowMultiple,
    }),
    [openItems, toggleItem, allowMultiple]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={clsx("w-full divide-y divide-[var(--color-line)]", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ============================================
// AccordionItem
// ============================================

interface AccordionItemProps {
  /** Заголовок элемента */
  title: string;
  /** Контент элемента */
  children: React.ReactNode;
  /** Уникальный идентификатор (генерируется автоматически) */
  id?: string;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * AccordionItem — отдельный сворачиваемый элемент
 */
export function AccordionItem({
  title,
  children,
  id: providedId,
  className,
}: AccordionItemProps) {
  const generatedId = useId();
  const id = providedId || generatedId;
  const contentId = `${id}-content`;
  const triggerId = `${id}-trigger`;

  const { openItems, toggleItem } = useAccordionContext();
  const isOpen = openItems.has(id);

  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const accordion = buttonRef.current?.closest("[data-accordion]");
    if (!accordion) return;

    const buttons = Array.from(
      accordion.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]")
    );
    const currentIndex = buttons.indexOf(buttonRef.current!);

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        buttons[(currentIndex + 1) % buttons.length]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        buttons[(currentIndex - 1 + buttons.length) % buttons.length]?.focus();
        break;
      case "Home":
        e.preventDefault();
        buttons[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        buttons[buttons.length - 1]?.focus();
        break;
    }
  };

  return (
    <div
      className={clsx("w-full", className)}
      data-accordion
      data-state={isOpen ? "open" : "closed"}
    >
      {/* Header / Trigger */}
      <h3 className="m-0">
        <button
          ref={buttonRef}
          id={triggerId}
          type="button"
          onClick={() => toggleItem(id)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-controls={contentId}
          data-accordion-trigger
          className={clsx(
            "w-full",
            "flex items-center justify-between gap-4",
            "py-5 md:py-6",
            "text-left",
            "text-[16px] md:text-[18px]",
            "font-medium",
            "text-[var(--color-text-primary)]",
            "bg-transparent",
            "border-none",
            "cursor-pointer",
            "transition-colors duration-200",
            "hover:text-[var(--color-text-secondary)]",
            "focus-visible:outline-none",
            "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
          )}
        >
          <span>{title}</span>

          {/* Chevron Icon */}
          <svg
            className={clsx(
              "w-5 h-5 shrink-0",
              "text-[var(--color-text-muted)]",
              "transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
              isOpen && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </h3>

      {/* Content */}
      <div
        ref={contentRef}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className={clsx(
          "overflow-hidden",
          "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        style={{
          height: isOpen ? "auto" : 0,
        }}
      >
        <div
          className={clsx(
            "pb-5 md:pb-6",
            "text-[15px] md:text-[16px]",
            "text-[var(--color-text-muted)]",
            "leading-relaxed"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
