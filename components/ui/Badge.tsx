import { clsx } from "clsx";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "error" | "outline";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps {
  /** Содержимое бейджа */
  children: React.ReactNode;
  /** Вариант оформления */
  variant?: BadgeVariant;
  /** Размер */
  size?: BadgeSize;
  /** Показывать кнопку удаления */
  removable?: boolean;
  /** Callback при удалении */
  onRemove?: () => void;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Badge — метка/тег для категорий, статусов, фильтров
 *
 * @example
 * // Базовое использование
 * <Badge>Новинка</Badge>
 *
 * @example
 * // Варианты цветов
 * <Badge variant="success">Выполнено</Badge>
 * <Badge variant="warning">В процессе</Badge>
 * <Badge variant="error">Ошибка</Badge>
 *
 * @example
 * // С возможностью удаления
 * <Badge removable onRemove={() => handleRemove()}>
 *   Фильтр
 * </Badge>
 *
 * @example
 * // Для категорий
 * <Badge variant="outline" size="sm">Эксперт</Badge>
 * <Badge variant="outline" size="sm">Магазин</Badge>
 */
export function Badge({
  children,
  variant = "default",
  size = "md",
  removable = false,
  onRemove,
  className,
}: BadgeProps) {
  // Variant classes
  const variantClasses: Record<BadgeVariant, string> = {
    default: clsx(
      "bg-[var(--color-background-alt)]",
      "text-[var(--color-text-primary)]",
      "border border-[var(--color-line)]"
    ),
    primary: clsx(
      "bg-[var(--color-accent)]",
      "text-[var(--color-background)]",
      "border border-transparent"
    ),
    success: clsx(
      "bg-emerald-100",
      "text-emerald-800",
      "border border-emerald-200"
    ),
    warning: clsx(
      "bg-amber-100",
      "text-amber-800",
      "border border-amber-200"
    ),
    error: clsx(
      "bg-red-100",
      "text-red-800",
      "border border-red-200"
    ),
    outline: clsx(
      "bg-transparent",
      "text-[var(--color-text-primary)]",
      "border-2 border-[var(--color-line)]"
    ),
  };

  // Size classes
  const sizeClasses: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-[12px]",
    lg: "px-3 py-1.5 text-[13px]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5",
        "font-medium uppercase",
        "tracking-[var(--letter-spacing-wide)]",
        "rounded-sm",
        "whitespace-nowrap",
        "transition-colors duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}

      {/* Remove button */}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Удалить"
          className={clsx(
            "inline-flex items-center justify-center",
            "w-3.5 h-3.5",
            "-mr-0.5",
            "rounded-full",
            "opacity-60",
            "transition-opacity duration-200",
            "hover:opacity-100",
            "focus-visible:outline-none",
            "focus-visible:ring-1 focus-visible:ring-current"
          )}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </span>
  );
}

export default Badge;
