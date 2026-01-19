"use client";

import { clsx } from "clsx";
import { forwardRef, useId } from "react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "size"> {
  /** Текст метки */
  label?: string;
  /** Состояние checked */
  checked?: boolean;
  /** Callback при изменении */
  onChange?: (checked: boolean) => void;
  /** Текст ошибки */
  error?: string;
  /** Подсказка */
  helperText?: string;
  /** Размер чекбокса */
  size?: "sm" | "md" | "lg";
  /** Дополнительные CSS классы для контейнера */
  containerClassName?: string;
}

/**
 * Checkbox — кастомный чекбокс с анимацией
 *
 * @example
 * // Базовое использование
 * <Checkbox
 *   label="Согласен с условиями"
 *   checked={agreed}
 *   onChange={setAgreed}
 * />
 *
 * @example
 * // С ошибкой
 * <Checkbox
 *   label="Принимаю политику конфиденциальности"
 *   error="Необходимо принять условия"
 *   checked={accepted}
 *   onChange={setAccepted}
 * />
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked = false,
      onChange,
      error,
      helperText,
      size = "md",
      disabled = false,
      className,
      containerClassName,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;

    const hasError = Boolean(error);

    // Размеры
    const sizeConfig = {
      sm: { box: "w-4 h-4", icon: "w-2.5 h-2.5", text: "text-[14px]" },
      md: { box: "w-5 h-5", icon: "w-3 h-3", text: "text-[16px]" },
      lg: { box: "w-6 h-6", icon: "w-4 h-4", text: "text-[18px]" },
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.checked);
    };

    // Классы для контейнера
    const containerClasses = clsx(
      "inline-flex items-start gap-3",
      disabled && "opacity-50 cursor-not-allowed",
      containerClassName
    );

    // Классы для кастомного чекбокса
    const checkboxClasses = clsx(
      // Размер
      sizeConfig[size].box,
      // Базовые стили
      "relative shrink-0",
      "border-2 border-[var(--color-line-dark)]",
      "bg-[var(--color-background)]",
      "rounded-sm",
      "transition-all duration-200 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      // Hover
      !disabled && "group-hover:border-[var(--color-text-primary)]",
      // Checked
      checked && [
        "bg-[var(--color-accent)]",
        "border-[var(--color-accent)]",
      ],
      // Error
      hasError && !checked && "border-red-500",
      // Focus стили применяются через peer
      className
    );

    // Классы для иконки галочки
    const checkIconClasses = clsx(
      sizeConfig[size].icon,
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "text-white",
      "transition-all duration-200",
      checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
    );

    // Классы для label
    const labelClasses = clsx(
      sizeConfig[size].text,
      "select-none",
      "text-[var(--color-text-primary)]",
      !disabled && "cursor-pointer"
    );

    // Классы для сообщения об ошибке
    const errorClasses = clsx(
      "mt-1 text-[13px] text-red-500",
      `ml-[${size === "sm" ? "28px" : size === "md" ? "32px" : "36px"}]`
    );

    return (
      <div className={clsx("w-fit", containerClassName)}>
        <label className={containerClasses}>
          {/* Скрытый нативный input */}
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? errorId : undefined}
            className="peer sr-only"
            {...props}
          />

          {/* Кастомный чекбокс */}
          <span
            className={clsx(
              checkboxClasses,
              "group",
              // Focus ring через peer
              "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-accent)] peer-focus-visible:ring-offset-2"
            )}
          >
            {/* Иконка галочки */}
            <svg
              className={checkIconClasses}
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2.5 6L5 8.5L9.5 3.5" />
            </svg>
          </span>

          {/* Label */}
          {label && <span className={labelClasses}>{label}</span>}
        </label>

        {/* Error message */}
        {hasError && (
          <p id={errorId} className={errorClasses} role="alert">
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !hasError && (
          <p className="mt-1 text-[13px] text-[var(--color-text-muted)] ml-8">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
