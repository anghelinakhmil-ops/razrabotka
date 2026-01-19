"use client";

import { clsx } from "clsx";
import {
  forwardRef,
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

/** Опция для Select */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  /** Метка над полем */
  label?: string;
  /** Список опций */
  options: SelectOption[];
  /** Выбранное значение */
  value?: string;
  /** Callback при изменении */
  onChange?: (value: string) => void;
  /** Placeholder когда ничего не выбрано */
  placeholder?: string;
  /** Текст ошибки */
  error?: string;
  /** Подсказка под полем */
  helperText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Отключено */
  disabled?: boolean;
  /** Поиск по опциям */
  searchable?: boolean;
  /** Placeholder для поиска */
  searchPlaceholder?: string;
  /** Дополнительные CSS классы */
  className?: string;
  /** Дополнительные CSS классы для контейнера */
  containerClassName?: string;
}

/**
 * Select — компонент выпадающего списка
 *
 * @example
 * // Базовое использование
 * <Select
 *   label="Тип сайта"
 *   options={[
 *     { value: "expert", label: "Сайт для эксперта" },
 *     { value: "ecommerce", label: "Интернет-магазин" },
 *     { value: "landing", label: "Лендинг" },
 *   ]}
 *   value={type}
 *   onChange={setType}
 * />
 *
 * @example
 * // С поиском
 * <Select
 *   label="Страна"
 *   options={countries}
 *   searchable
 *   searchPlaceholder="Поиск страны..."
 * />
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder = "Выберите...",
      error,
      helperText,
      required = false,
      disabled = false,
      searchable = false,
      searchPlaceholder = "Поиск...",
      className,
      containerClassName,
    },
    ref
  ) => {
    const generatedId = useId();
    const errorId = `${generatedId}-error`;
    const helperId = `${generatedId}-helper`;
    const listboxId = `${generatedId}-listbox`;

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const hasError = Boolean(error);
    const hasHelper = Boolean(helperText) && !hasError;

    // Найти выбранную опцию
    const selectedOption = useMemo(
      () => options.find((opt) => opt.value === value),
      [options, value]
    );

    // Фильтрованные опции
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchQuery) return options;
      const query = searchQuery.toLowerCase();
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(query)
      );
    }, [options, searchable, searchQuery]);

    // Закрытие при клике вне
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Фокус на поиск при открытии
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Скролл к выделенному элементу
    useEffect(() => {
      if (isOpen && highlightedIndex >= 0 && listRef.current) {
        const item = listRef.current.children[highlightedIndex] as HTMLElement;
        if (item) {
          item.scrollIntoView({ block: "nearest" });
        }
      }
    }, [highlightedIndex, isOpen]);

    // Открыть/закрыть
    const toggleOpen = useCallback(() => {
      if (disabled) return;
      setIsOpen((prev) => {
        if (!prev) {
          // При открытии выделяем текущий выбранный элемент
          const currentIndex = filteredOptions.findIndex(
            (opt) => opt.value === value
          );
          setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
        } else {
          setSearchQuery("");
        }
        return !prev;
      });
    }, [disabled, filteredOptions, value]);

    // Выбор опции
    const selectOption = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;
        onChange?.(option.value);
        setIsOpen(false);
        setSearchQuery("");
        triggerRef.current?.focus();
      },
      [onChange]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
          case "Enter":
          case " ":
            e.preventDefault();
            if (!isOpen) {
              toggleOpen();
            } else if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
              selectOption(filteredOptions[highlightedIndex]);
            }
            break;

          case "Escape":
            e.preventDefault();
            setIsOpen(false);
            setSearchQuery("");
            triggerRef.current?.focus();
            break;

          case "ArrowDown":
            e.preventDefault();
            if (!isOpen) {
              toggleOpen();
            } else {
              setHighlightedIndex((prev) => {
                const next = prev + 1;
                // Пропускаем disabled опции
                let index = next;
                while (
                  index < filteredOptions.length &&
                  filteredOptions[index]?.disabled
                ) {
                  index++;
                }
                return index < filteredOptions.length ? index : prev;
              });
            }
            break;

          case "ArrowUp":
            e.preventDefault();
            if (isOpen) {
              setHighlightedIndex((prev) => {
                const next = prev - 1;
                // Пропускаем disabled опции
                let index = next;
                while (index >= 0 && filteredOptions[index]?.disabled) {
                  index--;
                }
                return index >= 0 ? index : prev;
              });
            }
            break;

          case "Home":
            e.preventDefault();
            if (isOpen) {
              const firstEnabled = filteredOptions.findIndex((opt) => !opt.disabled);
              setHighlightedIndex(firstEnabled >= 0 ? firstEnabled : 0);
            }
            break;

          case "End":
            e.preventDefault();
            if (isOpen) {
              for (let i = filteredOptions.length - 1; i >= 0; i--) {
                if (!filteredOptions[i].disabled) {
                  setHighlightedIndex(i);
                  break;
                }
              }
            }
            break;

          case "Tab":
            if (isOpen) {
              setIsOpen(false);
              setSearchQuery("");
            }
            break;
        }
      },
      [disabled, isOpen, toggleOpen, highlightedIndex, filteredOptions, selectOption]
    );

    // Классы для trigger button
    const triggerClasses = clsx(
      // Базовые стили
      "w-full h-11 px-4",
      "bg-[var(--color-background)]",
      "border-2 border-[var(--color-line)]",
      "text-left text-[16px]",
      "rounded-none",
      "flex items-center justify-between gap-2",
      "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      // Hover
      !disabled && !hasError && "hover:border-[var(--color-line-dark)]",
      // Focus
      "focus:outline-none",
      "focus:border-[var(--color-text-primary)]",
      "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
      // Open state
      isOpen && "border-[var(--color-text-primary)]",
      // Selected
      selectedOption && "text-[var(--color-text-primary)]",
      !selectedOption && "text-[var(--color-text-light)]",
      // Error
      hasError && [
        "border-red-500",
        "hover:border-red-600",
        "focus:border-red-500",
      ],
      // Disabled
      disabled && [
        "opacity-50",
        "cursor-not-allowed",
        "bg-[var(--color-background-alt)]",
      ],
      !disabled && "cursor-pointer",
      className
    );

    // Классы для label
    const labelClasses = clsx(
      "block mb-2",
      "text-[14px] font-medium",
      "tracking-[var(--letter-spacing-wide)]",
      "transition-colors duration-200",
      hasError ? "text-red-500" : "text-[var(--color-text-primary)]",
      disabled && "opacity-50"
    );

    // Классы для dropdown
    const dropdownClasses = clsx(
      "absolute z-50 w-full mt-1",
      "bg-[var(--color-background)]",
      "border-2 border-[var(--color-text-primary)]",
      "shadow-lg",
      "max-h-60 overflow-auto",
      // Анимация
      "transition-all duration-200",
      isOpen
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-2 pointer-events-none"
    );

    // Классы для option
    const getOptionClasses = (option: SelectOption, index: number) =>
      clsx(
        "px-4 py-3 text-[16px]",
        "transition-colors duration-150",
        "cursor-pointer",
        // Highlighted
        highlightedIndex === index && "bg-[var(--color-background-alt)]",
        // Selected
        option.value === value && [
          "text-[var(--color-accent)]",
          "font-medium",
        ],
        // Disabled
        option.disabled && [
          "opacity-50",
          "cursor-not-allowed",
          "text-[var(--color-text-muted)]",
        ],
        // Hover (только если не disabled)
        !option.disabled && "hover:bg-[var(--color-background-alt)]"
      );

    // Классы для helper/error
    const messageClasses = clsx(
      "mt-2 text-[13px]",
      hasError ? "text-red-500" : "text-[var(--color-text-muted)]"
    );

    return (
      <div
        ref={(node) => {
          // Merge refs
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={clsx("w-full relative", containerClassName)}
      >
        {/* Label */}
        {label && (
          <label className={labelClasses}>
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Trigger Button */}
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : hasHelper ? helperId : undefined}
          disabled={disabled}
          className={triggerClasses}
          onClick={toggleOpen}
          onKeyDown={handleKeyDown}
        >
          <span className="truncate">
            {selectedOption?.label || placeholder}
          </span>
          {/* Chevron Icon */}
          <svg
            className={clsx(
              "w-5 h-5 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
              disabled ? "text-[var(--color-text-light)]" : "text-[var(--color-text-muted)]"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown */}
        <div className={dropdownClasses}>
          {/* Search Input */}
          {searchable && (
            <div className="p-2 border-b border-[var(--color-line)]">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={searchPlaceholder}
                className={clsx(
                  "w-full h-9 px-3",
                  "bg-[var(--color-background-alt)]",
                  "border border-[var(--color-line)]",
                  "text-[14px]",
                  "rounded-none",
                  "focus:outline-none focus:border-[var(--color-text-primary)]"
                )}
              />
            </div>
          )}

          {/* Options List */}
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="py-1"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-[var(--color-text-muted)] text-[14px]">
                Ничего не найдено
              </li>
            ) : (
              filteredOptions.map((option, index) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled}
                  className={getOptionClasses(option, index)}
                  onClick={() => selectOption(option)}
                  onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
                >
                  {option.label}
                  {option.value === value && (
                    <svg
                      className="inline-block w-4 h-4 ml-2 text-[var(--color-accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Error message */}
        {hasError && (
          <p id={errorId} className={messageClasses} role="alert">
            {error}
          </p>
        )}

        {/* Helper text */}
        {hasHelper && (
          <p id={helperId} className={messageClasses}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
