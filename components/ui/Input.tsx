"use client";

import { clsx } from "clsx";
import { forwardRef, useId } from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Метка над полем */
  label?: string;
  /** Текст ошибки */
  error?: string;
  /** Подсказка под полем */
  helperText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Размер поля */
  size?: "sm" | "md" | "lg";
  /** Дополнительные CSS классы для контейнера */
  containerClassName?: string;
}

/**
 * Input — компонент текстового поля ввода
 *
 * @example
 * // Базовое использование
 * <Input label="Email" placeholder="you@example.com" />
 *
 * @example
 * // С ошибкой
 * <Input
 *   label="Email"
 *   error="Введите корректный email"
 *   value={email}
 *   onChange={handleChange}
 * />
 *
 * @example
 * // С подсказкой
 * <Input
 *   label="Пароль"
 *   type="password"
 *   helperText="Минимум 8 символов"
 *   required
 * />
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      size = "md",
      containerClassName,
      className,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    // Генерируем уникальный id если не передан
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    const hasError = Boolean(error);
    const hasHelper = Boolean(helperText) && !hasError;

    // Размеры поля
    const sizeClasses = {
      sm: "h-9 px-3 text-[14px]",
      md: "h-11 px-4 text-[16px]",
      lg: "h-14 px-5 text-[18px]",
    };

    // Классы для input
    const inputClasses = clsx(
      // Базовые стили
      "w-full",
      "bg-[var(--color-background)]",
      "border-2 border-[var(--color-line)]",
      "text-[var(--color-text-primary)]",
      "placeholder:text-[var(--color-text-light)]",
      "rounded-none", // Острые углы для premium стиля
      // Transition
      "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      // Focus
      "focus:outline-none",
      "focus:border-[var(--color-text-primary)]",
      "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
      // Размер
      sizeClasses[size],
      // Состояние ошибки
      hasError && "border-red-500 focus:border-red-500",
      // Disabled
      disabled && "opacity-50 cursor-not-allowed bg-[var(--color-background-alt)]",
      // Кастомные классы
      className
    );

    // Классы для label
    const labelClasses = clsx(
      "block mb-2",
      "text-[14px] font-medium",
      "text-[var(--color-text-primary)]",
      "tracking-[var(--letter-spacing-wide)]",
      disabled && "opacity-50"
    );

    // Классы для helper/error текста
    const messageClasses = clsx(
      "mt-2 text-[13px]",
      hasError ? "text-red-500" : "text-[var(--color-text-muted)]"
    );

    return (
      <div className={clsx("w-full", containerClassName)}>
        {/* Label */}
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : hasHelper ? helperId : undefined
          }
          className={inputClasses}
          {...props}
        />

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

Input.displayName = "Input";

export default Input;
