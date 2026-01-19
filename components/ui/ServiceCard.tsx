import { clsx } from "clsx";
import Link from "next/link";

interface ServiceCardProps {
  /** Название услуги */
  title: string;
  /** Описание услуги */
  description: string;
  /** Список характеристик/особенностей */
  features: string[];
  /** Ссылка на детальную страницу */
  href: string;
  /** Текст CTA кнопки */
  ctaText?: string;
  /** Иконка (опционально) */
  icon?: React.ReactNode;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * ServiceCard — карточка услуги
 *
 * @example
 * <ServiceCard
 *   title="Сайт для эксперта"
 *   description="Личный бренд, консультации, курсы"
 *   features={[
 *     "Уникальный дизайн",
 *     "Адаптивная вёрстка",
 *     "SEO оптимизация",
 *     "Интеграция с CRM"
 *   ]}
 *   href="/services#expert"
 * />
 */
export function ServiceCard({
  title,
  description,
  features,
  href,
  ctaText = "Смотреть пакет",
  icon,
  className,
}: ServiceCardProps) {
  return (
    <article
      className={clsx(
        // Базовые стили
        "group relative",
        "bg-[var(--color-background)]",
        "border-2 border-[var(--color-line)]",
        "p-6 md:p-8",
        // Transition
        "transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        // Hover эффекты
        "hover:border-[var(--color-text-primary)]",
        "hover:-translate-y-1",
        "hover:shadow-lg",
        className
      )}
    >
      {/* Icon (опционально) */}
      {icon && (
        <div
          className={clsx(
            "mb-6",
            "w-12 h-12",
            "flex items-center justify-center",
            "text-[var(--color-text-primary)]",
            "transition-transform duration-300",
            "group-hover:scale-110"
          )}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h3
        className={clsx(
          "text-[20px] md:text-[24px]",
          "font-medium uppercase",
          "tracking-[var(--letter-spacing-wide)]",
          "text-[var(--color-text-primary)]",
          "mb-3"
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={clsx(
          "text-[16px]",
          "text-[var(--color-text-muted)]",
          "mb-6",
          "leading-relaxed"
        )}
      >
        {description}
      </p>

      {/* Features List */}
      <ul className="mb-8 space-y-2">
        {features.map((feature, index) => (
          <li
            key={index}
            className={clsx(
              "flex items-start gap-3",
              "text-[15px]",
              "text-[var(--color-text-secondary)]"
            )}
          >
            {/* Checkmark icon */}
            <svg
              className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-accent)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <Link
        href={href}
        className={clsx(
          "inline-flex items-center gap-2",
          "text-[14px] font-medium uppercase",
          "tracking-[var(--letter-spacing-extra-wide)]",
          "text-[var(--color-text-primary)]",
          "border-b-2 border-[var(--color-line)]",
          "pb-1",
          // Transition
          "transition-all duration-300",
          // Hover
          "hover:border-[var(--color-text-primary)]",
          // Group hover - arrow animation
          "group-hover:gap-3"
        )}
      >
        {ctaText}
        {/* Arrow icon */}
        <svg
          className={clsx(
            "w-4 h-4",
            "transition-transform duration-300",
            "group-hover:translate-x-1"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>

      {/* Decorative corner line (optional premium touch) */}
      <div
        className={clsx(
          "absolute top-0 right-0",
          "w-16 h-16",
          "border-t-2 border-r-2 border-transparent",
          "transition-all duration-300",
          "group-hover:border-[var(--color-accent)]"
        )}
      />
    </article>
  );
}

export default ServiceCard;
