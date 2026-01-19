import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  /** Заголовок статьи */
  title: string;
  /** Краткое описание/excerpt */
  excerpt: string;
  /** Дата публикации */
  date: string;
  /** Время чтения (например: "5 мин") */
  readingTime: string;
  /** Путь к превью изображению */
  image: string;
  /** Ссылка на статью */
  href: string;
  /** Alt текст для изображения */
  alt?: string;
  /** Категория статьи (опционально) */
  category?: string;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * BlogCard — карточка статьи блога
 *
 * @example
 * <BlogCard
 *   title="5 ошибок при создании лендинга"
 *   excerpt="Разбираем типичные ошибки, которые снижают конверсию..."
 *   date="15 января 2026"
 *   readingTime="5 мин"
 *   image="/images/blog/landing-mistakes.jpg"
 *   href="/blog/5-oshibok-pri-sozdanii-lendinga"
 * />
 */
export function BlogCard({
  title,
  excerpt,
  date,
  readingTime,
  image,
  href,
  alt,
  category,
  className,
}: BlogCardProps) {
  return (
    <article
      className={clsx(
        "group relative",
        "bg-[var(--color-background)]",
        className
      )}
    >
      <Link href={href} className="block">
        {/* Image Container */}
        <div
          className={clsx(
            "relative aspect-[16/10]",
            "overflow-hidden",
            "bg-[var(--color-background-alt)]",
            "mb-5"
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
              "group-hover:opacity-10"
            )}
          />

          {/* Category Badge (if provided) */}
          {category && (
            <span
              className={clsx(
                "absolute top-4 left-4",
                "px-3 py-1",
                "bg-[var(--color-background)]",
                "text-[11px] font-medium uppercase",
                "tracking-[var(--letter-spacing-wide)]",
                "text-[var(--color-text-muted)]"
              )}
            >
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div>
          {/* Meta: Date & Reading Time */}
          <div
            className={clsx(
              "flex items-center gap-3",
              "text-[13px]",
              "text-[var(--color-text-muted)]",
              "mb-3"
            )}
          >
            <time dateTime={date}>{date}</time>
            <span className="w-1 h-1 rounded-full bg-[var(--color-line-dark)]" />
            <span>{readingTime}</span>
          </div>

          {/* Title */}
          <h3
            className={clsx(
              "text-[18px] md:text-[20px]",
              "font-medium",
              "text-[var(--color-text-primary)]",
              "mb-3",
              "leading-snug",
              "transition-colors duration-300",
              "group-hover:text-[var(--color-text-secondary)]"
            )}
          >
            {title}
          </h3>

          {/* Excerpt */}
          <p
            className={clsx(
              "text-[15px]",
              "text-[var(--color-text-muted)]",
              "leading-relaxed",
              "mb-4",
              // Limit to 3 lines
              "line-clamp-3"
            )}
          >
            {excerpt}
          </p>

          {/* Read More Link */}
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
            Читать
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
      </Link>

      {/* Bottom border animation */}
      <div
        className={clsx(
          "absolute bottom-0 left-0",
          "h-[2px] w-0",
          "bg-[var(--color-text-primary)]",
          "transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          "group-hover:w-full"
        )}
      />
    </article>
  );
}

export default BlogCard;
