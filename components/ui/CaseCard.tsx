import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

interface CaseCardProps {
  /** Название проекта */
  title: string;
  /** Ниша/тип проекта (Эксперт, Магазин, Лендинг) */
  category: string;
  /** Краткий результат (например: +120% конверсии) */
  result?: string;
  /** Путь к превью изображению */
  image: string;
  /** Ссылка на детальную страницу кейса */
  href: string;
  /** Alt текст для изображения */
  alt?: string;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * CaseCard — карточка кейса/портфолио
 *
 * @example
 * <CaseCard
 *   title="Сайт для психолога"
 *   category="Эксперт"
 *   result="+85% заявок"
 *   image="/images/cases/case-1.jpg"
 *   href="/cases/psychologist-site"
 * />
 */
export function CaseCard({
  title,
  category,
  result,
  image,
  href,
  alt,
  className,
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "group block relative",
        "overflow-hidden",
        "bg-[var(--color-background)]",
        className
      )}
    >
      {/* Image Container */}
      <div
        className={clsx(
          "relative aspect-[4/3]",
          "overflow-hidden",
          "bg-[var(--color-background-alt)]"
        )}
      >
        {/* Image */}
        <Image
          src={image}
          alt={alt || title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={clsx(
            "object-cover",
            "transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            "group-hover:scale-105"
          )}
        />

        {/* Overlay on hover */}
        <div
          className={clsx(
            "absolute inset-0",
            "bg-[var(--color-text-primary)]",
            "opacity-0 transition-opacity duration-300",
            "group-hover:opacity-20"
          )}
        />

        {/* Category Badge */}
        <span
          className={clsx(
            "absolute top-4 left-4",
            "px-3 py-1",
            "bg-[var(--color-background)]",
            "text-[12px] font-medium uppercase",
            "tracking-[var(--letter-spacing-wide)]",
            "text-[var(--color-text-primary)]"
          )}
        >
          {category}
        </span>

        {/* Result Badge (if provided) */}
        {result && (
          <span
            className={clsx(
              "absolute bottom-4 right-4",
              "px-3 py-1",
              "bg-[var(--color-accent)]",
              "text-[12px] font-medium",
              "text-[var(--color-background)]"
            )}
          >
            {result}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="pt-5 pb-2">
        {/* Title */}
        <h3
          className={clsx(
            "text-[18px] md:text-[20px]",
            "font-medium",
            "text-[var(--color-text-primary)]",
            "mb-3",
            "transition-colors duration-300"
          )}
        >
          {title}
        </h3>

        {/* CTA */}
        <span
          className={clsx(
            "inline-flex items-center gap-2",
            "text-[13px] font-medium uppercase",
            "tracking-[var(--letter-spacing-wide)]",
            "text-[var(--color-text-muted)]",
            "transition-all duration-300",
            "group-hover:text-[var(--color-text-primary)]",
            "group-hover:gap-3"
          )}
        >
          Смотреть кейс
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
        </span>
      </div>

      {/* Bottom border animation */}
      <div
        className={clsx(
          "absolute bottom-0 left-0",
          "h-[2px] w-0",
          "bg-[var(--color-accent)]",
          "transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          "group-hover:w-full"
        )}
      />
    </Link>
  );
}

export default CaseCard;
