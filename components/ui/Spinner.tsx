import { clsx } from "clsx";

type SpinnerSize = "sm" | "md" | "lg";
type SpinnerColor = "default" | "primary" | "white" | "muted";

interface SpinnerProps {
  /** Размер спиннера */
  size?: SpinnerSize;
  /** Цвет спиннера */
  color?: SpinnerColor;
  /** Текст для screen readers */
  label?: string;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Spinner — индикатор загрузки
 *
 * @example
 * // Базовое использование
 * <Spinner />
 *
 * @example
 * // Разные размеры
 * <Spinner size="sm" />
 * <Spinner size="md" />
 * <Spinner size="lg" />
 *
 * @example
 * // В кнопке
 * <Button disabled>
 *   <Spinner size="sm" color="white" />
 *   Загрузка...
 * </Button>
 *
 * @example
 * // На тёмном фоне
 * <div className="bg-black p-4">
 *   <Spinner color="white" />
 * </div>
 */
export function Spinner({
  size = "md",
  color = "default",
  label = "Загрузка",
  className,
}: SpinnerProps) {
  // Size classes
  const sizeClasses: Record<SpinnerSize, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  // Color classes
  const colorClasses: Record<SpinnerColor, string> = {
    default: "text-[var(--color-text-primary)]",
    primary: "text-[var(--color-accent)]",
    white: "text-white",
    muted: "text-[var(--color-text-muted)]",
  };

  return (
    <div
      role="status"
      aria-label={label}
      className={clsx("inline-flex", className)}
    >
      <svg
        className={clsx(
          "animate-spin",
          sizeClasses[size],
          colorClasses[color]
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        {/* Spinning arc */}
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {/* Screen reader text */}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Spinner;
