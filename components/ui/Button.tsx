"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

// Базовые пропсы для всех вариантов Button
interface ButtonBaseProps {
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
  /** Иконка слева */
  leftIcon?: React.ReactNode;
  /** Иконка справа */
  rightIcon?: React.ReactNode;
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Дополнительные CSS классы */
  className?: string;
}

// Пропсы для button элемента
interface ButtonAsButton extends ButtonBaseProps {
  as?: "button";
  href?: never;
}

// Пропсы для a элемента
interface ButtonAsAnchor extends ButtonBaseProps {
  as: "a";
  href: string;
  target?: string;
  rel?: string;
}

// Пропсы для Next.js Link
interface ButtonAsLink extends ButtonBaseProps {
  as: typeof Link;
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

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
 * Хук для получения классов кнопки
 */
function useButtonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  hoverLift = false,
  disabled = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  hoverLift?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const isDisabled = disabled || loading;

  const baseClasses = [
    "relative",
    "inline-flex items-center justify-center gap-2",
    "font-medium uppercase",
    "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
    "cursor-pointer",
    "select-none",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
  ];

  const variantClasses: Record<ButtonVariant, string> = {
    primary: clsx(
      "bg-[var(--color-accent)] text-white",
      "border-2 border-[var(--color-accent)]",
      "hover:bg-[var(--color-accent-hover)] hover:border-[var(--color-accent-hover)]",
      "active:scale-[0.98]",
      "tracking-[var(--letter-spacing-extra-wide)]"
    ),
    secondary: clsx(
      "bg-transparent text-[var(--color-text-primary)]",
      "border-2 border-[var(--color-line-dark)]",
      "hover:border-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]",
      "active:scale-[0.98]",
      "tracking-[var(--letter-spacing-wide)]"
    ),
    ghost: clsx(
      "bg-transparent text-[var(--color-text-primary)]",
      "border-2 border-transparent",
      "hover:bg-[var(--color-background-alt)]",
      "active:bg-[var(--color-line)]",
      "tracking-[var(--letter-spacing-wide)]"
    ),
    outline: clsx(
      "bg-transparent text-[var(--color-text-primary)]",
      "border-2 border-[var(--color-text-primary)]",
      "hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)]",
      "active:scale-[0.98]",
      "tracking-[var(--letter-spacing-extra-wide)]"
    ),
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: clsx("h-9 px-4", "text-[12px]"),
    md: clsx("h-11 px-6", "text-[13px]"),
    lg: clsx("h-14 px-8", "text-[14px]"),
  };

  const disabledClasses = isDisabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const widthClasses = fullWidth ? "w-full" : "";

  const hoverLiftClasses =
    hoverLift && !isDisabled ? "hover:-translate-y-0.5" : "";

  return clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabledClasses,
    widthClasses,
    hoverLiftClasses,
    className
  );
}

/**
 * Button — универсальный компонент кнопки
 *
 * Поддерживает рендеринг как:
 * - `<button>` (по умолчанию)
 * - `<a>` (as="a" href="...")
 * - `<Link>` (as={Link} href="...")
 *
 * @example
 * // Обычная кнопка
 * <Button variant="primary">Нажми меня</Button>
 *
 * @example
 * // Кнопка-ссылка (внешняя)
 * <Button as="a" href="https://example.com" target="_blank">
 *   Перейти
 * </Button>
 *
 * @example
 * // Кнопка-ссылка (Next.js)
 * <Button as={Link} href="/contacts">
 *   Контакты
 * </Button>
 *
 * @example
 * // С иконками
 * <Button leftIcon={<ArrowLeft />} rightIcon={<ArrowRight />}>
 *   Текст
 * </Button>
 */
export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    as,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    hoverLift = false,
    leftIcon,
    rightIcon,
    children,
    className,
    ...restProps
  } = props;

  const classes = useButtonClasses({
    variant,
    size,
    fullWidth,
    loading,
    hoverLift,
    disabled: "disabled" in restProps ? Boolean(restProps.disabled) : false,
    className,
  });

  const content = (
    <>
      {loading && <Spinner size={size} />}
      {!loading && leftIcon && (
        <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span className={loading ? "opacity-70" : ""}>{children}</span>
      {!loading && rightIcon && (
        <span className="inline-flex shrink-0">{rightIcon}</span>
      )}
    </>
  );

  // Рендер как Next.js Link
  if (as === Link) {
    const { href, ...linkProps } = restProps as Omit<ButtonAsLink, "as" | "children" | "variant" | "size" | "fullWidth" | "loading" | "hoverLift" | "leftIcon" | "rightIcon" | "className">;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  // Рендер как <a>
  if (as === "a") {
    const { href, target, rel, ...anchorProps } = restProps as Omit<ButtonAsAnchor, "as" | "children" | "variant" | "size" | "fullWidth" | "loading" | "hoverLift" | "leftIcon" | "rightIcon" | "className">;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
        className={classes}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  // Рендер как <button> (по умолчанию)
  const { disabled, ...buttonProps } = restProps as Omit<ButtonAsButton, "as" | "children" | "variant" | "size" | "fullWidth" | "loading" | "hoverLift" | "leftIcon" | "rightIcon" | "className"> & { disabled?: boolean };
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
