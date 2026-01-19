"use client";

import { clsx } from "clsx";
import { forwardRef, useId, useRef, useEffect, useCallback } from "react";

interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows"> {
  /** Метка над полем */
  label?: string;
  /** Текст ошибки */
  error?: string;
  /** Подсказка под полем */
  helperText?: string;
  /** Обязательное поле */
  required?: boolean;
  /** Количество строк */
  rows?: number;
  /** Авто-высота по контенту */
  autoResize?: boolean;
  /** Минимальное количество строк (при autoResize) */
  minRows?: number;
  /** Максимальное количество строк (при autoResize) */
  maxRows?: number;
  /** Дополнительные CSS классы для контейнера */
  containerClassName?: string;
}

/**
 * Textarea — компонент многострочного текстового поля
 *
 * @example
 * // Базовое использование
 * <Textarea label="Сообщение" placeholder="Введите текст..." />
 *
 * @example
 * // С фиксированным количеством строк
 * <Textarea label="Описание" rows={6} />
 *
 * @example
 * // С авто-высотой
 * <Textarea
 *   label="Комментарий"
 *   autoResize
 *   minRows={3}
 *   maxRows={10}
 * />
 *
 * @example
 * // С ошибкой
 * <Textarea
 *   label="Сообщение"
 *   error="Минимум 10 символов"
 *   required
 * />
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      rows = 4,
      autoResize = false,
      minRows = 3,
      maxRows = 10,
      containerClassName,
      className,
      disabled,
      id: providedId,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    // Генерируем уникальный id если не передан
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;

    // Внутренний ref для auto-resize
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    const hasError = Boolean(error);
    const hasHelper = Boolean(helperText) && !hasError;

    // Функция для авто-изменения высоты
    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      // Сбрасываем высоту для корректного расчёта scrollHeight
      textarea.style.height = "auto";

      // Вычисляем line-height
      const computedStyle = window.getComputedStyle(textarea);
      const lineHeight = parseFloat(computedStyle.lineHeight) || 24;
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
      const borderTop = parseFloat(computedStyle.borderTopWidth) || 0;
      const borderBottom = parseFloat(computedStyle.borderBottomWidth) || 0;

      // Вычисляем min и max высоту
      const minHeight = lineHeight * minRows + paddingTop + paddingBottom + borderTop + borderBottom;
      const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom + borderTop + borderBottom;

      // Устанавливаем новую высоту
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = `${newHeight}px`;
    }, [autoResize, minRows, maxRows, textareaRef]);

    // Эффект для начальной настройки высоты
    useEffect(() => {
      if (autoResize) {
        adjustHeight();
      }
    }, [autoResize, adjustHeight, value, defaultValue]);

    // Обработчик изменения с авто-resize
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        adjustHeight();
      }
      onChange?.(e);
    };

    // Классы для textarea
    const textareaClasses = clsx(
      // Базовые стили (default state)
      "w-full",
      "bg-[var(--color-background)]",
      "border-2 border-[var(--color-line)]",
      "text-[var(--color-text-primary)]",
      "rounded-none", // Острые углы для premium стиля
      "resize-none", // Отключаем resize (используем autoResize)
      "py-3 px-4 text-[16px]",

      // Placeholder стили
      "placeholder:text-[var(--color-text-light)]",
      "placeholder:transition-opacity placeholder:duration-200",
      "focus:placeholder:opacity-50",

      // Transition
      "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",

      // Hover state
      !disabled && !hasError && "hover:border-[var(--color-line-dark)]",

      // Focus state
      "focus:outline-none",
      "focus:border-[var(--color-text-primary)]",
      "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",

      // Filled state
      "[&:not(:placeholder-shown):not(:focus)]:border-[var(--color-line-dark)]",

      // Error state
      hasError && [
        "border-red-500",
        "hover:border-red-600",
        "focus:border-red-500",
        "focus-visible:ring-red-500/20",
      ],

      // Disabled state
      disabled && [
        "opacity-50",
        "cursor-not-allowed",
        "bg-[var(--color-background-alt)]",
        "hover:border-[var(--color-line)]",
      ],

      // Кастомные классы
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

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id={id}
          rows={autoResize ? minRows : rows}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? errorId : hasHelper ? helperId : undefined
          }
          className={textareaClasses}
          onChange={handleChange}
          value={value}
          defaultValue={defaultValue}
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

Textarea.displayName = "Textarea";

export default Textarea;
