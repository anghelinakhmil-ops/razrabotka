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
      "transition-all duration-300",
      "cursor-pointer",
      "select-none",
    ];

    // Стили вариантов
    const variantClasses: Record<ButtonVariant, string> = {
      primary: clsx(
        "bg-[var(--color-accent)] text-white",
        "border border-[var(--color-accent)]",
        "hover:bg-[var(--color-accent-hover)]"
      ),
      secondary: clsx(
        "bg-transparent text-[var(--color-text-primary)]",
        "border border-[var(--color-line-dark)]",
        "hover:border-[var(--color-text-primary)]"
      ),
      ghost: clsx(
        "bg-transparent text-[var(--color-text-primary)]",
        "border border-transparent",
        "hover:bg-[var(--color-background-alt)]"
      ),
      outline: clsx(
        "bg-transparent text-[var(--color-text-primary)]",
        "border border-[var(--color-text-primary)]",
        "hover:bg-[var(--color-accent)] hover:text-white"
      ),
    };

    // Стили размеров
    const sizeClasses: Record<ButtonSize, string> = {
      sm: "px-4 py-2 text-[var(--font-size-small)] tracking-wide",
      md: "px-6 py-3 text-[var(--font-size-small)] tracking-wide",
      lg: "px-8 py-4 text-[var(--font-size-body)] tracking-wide",
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
