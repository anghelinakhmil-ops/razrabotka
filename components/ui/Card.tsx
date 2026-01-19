import { clsx } from "clsx";
import { forwardRef } from "react";

type CardVariant = "default" | "elevated" | "outlined";
type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Вариант карточки */
  variant?: CardVariant;
  /** Внутренний отступ */
  padding?: CardPadding;
  /** Включить hover эффект */
  hover?: boolean;
  /** HTML тег */
  as?: "div" | "article" | "section" | "aside";
  /** Дочерние элементы */
  children: React.ReactNode;
}

/**
 * Card — базовый компонент карточки
 *
 * @example
 * // Базовое использование
 * <Card>
 *   <h3>Заголовок</h3>
 *   <p>Контент карточки</p>
 * </Card>
 *
 * @example
 * // С тенью и hover эффектом
 * <Card variant="elevated" hover>
 *   <h3>Кейс</h3>
 *   <p>Описание проекта</p>
 * </Card>
 *
 * @example
 * // Outlined вариант
 * <Card variant="outlined" padding="lg">
 *   <h3>Услуга</h3>
 *   <p>Описание услуги</p>
 * </Card>
 */
export const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      hover = false,
      as: Component = "div",
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Классы для вариантов
    const variantClasses: Record<CardVariant, string> = {
      default: clsx(
        "bg-[var(--color-background)]"
      ),
      elevated: clsx(
        "bg-[var(--color-background)]",
        "shadow-md",
        hover && "hover:shadow-lg"
      ),
      outlined: clsx(
        "bg-[var(--color-background)]",
        "border-2 border-[var(--color-line)]",
        hover && "hover:border-[var(--color-line-dark)]"
      ),
    };

    // Классы для padding
    const paddingClasses: Record<CardPadding, string> = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      xl: "p-10",
    };

    // Hover эффекты
    const hoverClasses = hover
      ? clsx(
          "cursor-pointer",
          "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          // Subtle scale
          "hover:-translate-y-0.5",
          // Focus
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
        )
      : "";

    const classes = clsx(
      // Базовые стили
      "block",
      "rounded-none", // Острые углы для premium стиля
      // Вариант
      variantClasses[variant],
      // Padding
      paddingClasses[padding],
      // Hover
      hoverClasses,
      // Кастомные классы
      className
    );

    return (
      <Component
        ref={ref as React.Ref<HTMLDivElement>}
        className={classes}
        tabIndex={hover ? 0 : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = "Card";

/**
 * CardHeader — заголовок карточки
 */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={clsx("mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardBody — основной контент карточки
 */
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardBody({ children, className, ...props }: CardBodyProps) {
  return (
    <div
      className={clsx("", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * CardFooter — футер карточки
 */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={clsx("mt-4 pt-4 border-t border-[var(--color-line)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
