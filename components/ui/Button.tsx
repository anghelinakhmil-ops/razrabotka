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
  /** Состояние загрузки */
  loading?: boolean;
  /** Микро-сдвиг вверх на hover (-2px) */
  hoverLift?: boolean;
  /** Дочерние элементы */
  children: React.ReactNode;
}

/**
 * Spinner — компонент загрузки для кнопки
 */
function Spinner({ size }: { size: ButtonSize }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <svg
      className={clsx(sizeClasses[size], "animate-spin")}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
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
 * Состояния:
 * - default: обычное состояние
 * - hover: наведение (смена цвета/заливки)
 * - focus: фокус (ring)
 * - active: нажатие (scale)
 * - disabled: заблокировано (opacity)
 * - loading: загрузка (spinner)
 *
 * @example
 * <Button variant="primary" size="md">
 *   ОБСУДИТЬ ПРОЕКТ
 * </Button>
 *
 * @example
 * <Button variant="outline" loading>
 *   Отправка...
 * </Button>
 *
 * @example
 * <Button variant="primary" hoverLift>
 *   С эффектом подъёма
 * </Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      hoverLift = false,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Кнопка заблокирована если disabled или loading
    const isDisabled = disabled || loading;

    // Базовые стили для всех кнопок
    const baseClasses = [
      "relative",
      "inline-flex items-center justify-center gap-2",
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
      sm: clsx("h-9 px-4", "text-[12px]"),
      // MD — стандартная кнопка
      md: clsx("h-11 px-6", "text-[13px]"),
      // LG — крупная CTA кнопка
      lg: clsx("h-14 px-8", "text-[14px]"),
    };

    // Стили disabled/loading
    const disabledClasses = isDisabled
      ? "opacity-50 cursor-not-allowed pointer-events-none"
      : "";

    // Стили fullWidth
    const widthClasses = fullWidth ? "w-full" : "";

    // Стили hover lift (микро-сдвиг вверх)
    const hoverLiftClasses = hoverLift && !isDisabled
      ? "hover:-translate-y-0.5"
      : "";

    const classes = clsx(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabledClasses,
      widthClasses,
      hoverLiftClasses,
      className
    );

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading && <Spinner size={size} />}
        <span className={loading ? "opacity-70" : ""}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
