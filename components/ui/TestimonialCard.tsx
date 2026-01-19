import { clsx } from "clsx";
import Image from "next/image";

interface TestimonialCardProps {
  /** Текст отзыва */
  quote: string;
  /** Имя автора */
  author: string;
  /** Должность */
  position?: string;
  /** Компания */
  company?: string;
  /** Путь к аватару (опционально) */
  avatar?: string;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * TestimonialCard — карточка отзыва клиента
 *
 * @example
 * <TestimonialCard
 *   quote="Команда превзошла все ожидания. Сайт готов за 2 недели, конверсия выросла на 85%."
 *   author="Анна Петрова"
 *   position="Психолог"
 *   company="Частная практика"
 * />
 *
 * @example
 * // С аватаром
 * <TestimonialCard
 *   quote="Отличная работа!"
 *   author="Иван Сидоров"
 *   position="CEO"
 *   company="TechStart"
 *   avatar="/images/testimonials/ivan.jpg"
 * />
 */
export function TestimonialCard({
  quote,
  author,
  position,
  company,
  avatar,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={clsx(
        "relative",
        "bg-[var(--color-background)]",
        "border-2 border-[var(--color-line)]",
        "p-6 md:p-8",
        className
      )}
    >
      {/* Quote Icon */}
      <svg
        className={clsx(
          "absolute top-6 right-6 md:top-8 md:right-8",
          "w-10 h-10 md:w-12 md:h-12",
          "text-[var(--color-line)]",
          "opacity-50"
        )}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      {/* Quote Text */}
      <blockquote
        className={clsx(
          "relative z-10",
          "text-[16px] md:text-[18px]",
          "text-[var(--color-text-primary)]",
          "leading-relaxed",
          "mb-6"
        )}
      >
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>

      {/* Author Info */}
      <figcaption className="flex items-center gap-4">
        {/* Avatar (optional) */}
        {avatar && (
          <div
            className={clsx(
              "relative",
              "w-12 h-12",
              "rounded-full overflow-hidden",
              "bg-[var(--color-background-alt)]",
              "border border-[var(--color-line)]"
            )}
          >
            <Image
              src={avatar}
              alt={author}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        )}

        {/* Name & Position */}
        <div>
          <cite
            className={clsx(
              "not-italic",
              "text-[15px] md:text-[16px]",
              "font-medium",
              "text-[var(--color-text-primary)]",
              "block"
            )}
          >
            {author}
          </cite>

          {(position || company) && (
            <span
              className={clsx(
                "text-[13px] md:text-[14px]",
                "text-[var(--color-text-muted)]"
              )}
            >
              {position}
              {position && company && ", "}
              {company}
            </span>
          )}
        </div>
      </figcaption>

      {/* Decorative accent line */}
      <div
        className={clsx(
          "absolute bottom-0 left-0",
          "h-[3px] w-16",
          "bg-[var(--color-accent)]"
        )}
      />
    </figure>
  );
}

export default TestimonialCard;
