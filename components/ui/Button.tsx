"use client";

import { clsx } from "clsx";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Вариант кнопки */
  variant?: ButtonVariant;
  /** Размер кнопки */
  size?: ButtonSize;
  /** Растянуть на всю ширину */
  fullWidth?: boolean;
  /** Дочерние элементы */
  children: React.ReactNode;
}

/**
 * Button — базовый компонент кнопки
 *
 * Варианты:
 * - primary: основная кнопка с заливкой
 * - secondary: кнопка с обводкой
 * - ghost: прозрачная кнопка (только текст)
 * - outline: кнопка с обводкой и hover заливкой
 *
 * Размеры:
 * - sm: компактная кнопка
 * - md: стандартная кнопка
 * - lg: крупная кнопка
 *
 * @example
 * <Button variant="primary" size="md">
 *   ОБСУДИТЬ ПРОЕКТ
 * </Button>
 *
 * @example
 * <Button variant="outline" fullWidth>
 *   Отправить заявку
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Базовые стили для всех кнопок
    const baseClasses = [
      "inline-flex items-center justify-center",
      "font-medium uppercase",
      "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
      "cursor-pointer",
      "select-none",
      // Focus styles для accessibility
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    ];

    // Стили вариантов
    const variantClasses: Record<ButtonVariant, string> = {
      // Primary — основная CTA кнопка с заливкой
      primary: clsx(
        "bg-[var(--color-accent)] text-white",
        "border-2 border-[var(--color-accent)]",
        "hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]",
        "active:scale-[0.98]",
        "tracking-[var(--letter-spacing-extra-wide)]"
      ),
      // Secondary — кнопка с обводкой
      secondary: clsx(
        "bg-transparent text-[var(--color-text-primary)]",
        "border-2 border-[var(--color-line-dark)]",
        "hover:border-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]",
        "active:scale-[0.98]",
        "tracking-[var(--letter-spacing-wide)]"
      ),
      // Ghost — прозрачная кнопка, только текст
      ghost: clsx(
        "bg-transparent text-[var(--color-text-primary)]",
        "border-2 border-transparent",
        "hover:bg-[var(--color-background-alt)]",
        "active:bg-[var(--color-line)]",
        "tracking-[var(--letter-spacing-wide)]"
      ),
      // Outline — обводка с заливкой на hover (CTA стиль)
      outline: clsx(
        "bg-transparent text-[var(--color-text-primary)]",
        "border-2 border-[var(--color-text-primary)]",
        "hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)]",
        "active:scale-[0.98]",
        "tracking-[var(--letter-spacing-extra-wide)]"
      ),
    };

    // Стили размеров с точными значениями padding
    const sizeClasses: Record<ButtonSize, string> = {
      // SM — компактная кнопка
      sm: clsx(
        "h-9 px-4",
        "text-[12px]"
      ),
      // MD — стандартная кнопка
      md: clsx(
        "h-11 px-6",
        "text-[13px]"
      ),
      // LG — крупная CTA кнопка
      lg: clsx(
        "h-14 px-8",
        "text-[14px]"
      ),
    };

    // Стили disabled
    const disabledClasses = disabled
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "";

    // Стили fullWidth
    const widthClasses = fullWidth ? "w-full" : "";

    const classes = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabledClasses,
      widthClasses,
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
