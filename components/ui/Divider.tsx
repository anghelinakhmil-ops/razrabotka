import { clsx } from "clsx";

type DividerOrientation = "horizontal" | "vertical";

interface DividerProps {
  /** Ориентация разделителя */
  orientation?: DividerOrientation;
  /** Текст посередине (только для horizontal) */
  label?: string;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Divider — разделитель контента
 *
 * @example
 * // Горизонтальный разделитель
 * <Divider />
 *
 * @example
 * // С текстом посередине
 * <Divider label="или" />
 *
 * @example
 * // Вертикальный разделитель
 * <div className="flex items-center gap-4">
 *   <span>Слева</span>
 *   <Divider orientation="vertical" />
 *   <span>Справа</span>
 * </div>
 */
export function Divider({
  orientation = "horizontal",
  label,
  className,
}: DividerProps) {
  // Vertical divider
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={clsx(
          "self-stretch",
          "w-px",
          "bg-[var(--color-line)]",
          className
        )}
      />
    );
  }

  // Horizontal divider with label
  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={clsx(
          "flex items-center gap-4",
          "w-full",
          className
        )}
      >
        <div className="flex-1 h-px bg-[var(--color-line)]" />
        <span
          className={clsx(
            "text-[13px]",
            "text-[var(--color-text-muted)]",
            "uppercase",
            "tracking-[var(--letter-spacing-wide)]"
          )}
        >
          {label}
        </span>
        <div className="flex-1 h-px bg-[var(--color-line)]" />
      </div>
    );
  }

  // Simple horizontal divider
  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={clsx(
        "w-full",
        "h-px",
        "bg-[var(--color-line)]",
        "border-none",
        "m-0",
        className
      )}
    />
  );
}

export default Divider;
