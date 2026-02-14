"use client";

import { useState, useCallback } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

/**
 * =============================================================================
 * MDX COMPONENTS
 * =============================================================================
 * Кастомные компоненты для рендеринга MDX контента.
 * Соответствуют дизайн-системе проекта (premium-minimal style).
 */

// =============================================================================
// IMAGE COMPONENT
// =============================================================================

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
  className?: string;
}

/**
 * MDXImage — оптимизированное изображение для MDX
 *
 * Использует next/image с автоматическим placeholder.
 * Поддерживает подписи (caption).
 */
export function MDXImage({
  src,
  alt,
  width = 800,
  height = 450,
  caption,
  priority = false,
  className,
}: MDXImageProps) {
  return (
    <figure className={cn("my-8", className)}>
      <div className="relative overflow-hidden rounded-sm border border-[var(--color-line)]">
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-caption text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// =============================================================================
// CODE COMPONENT
// =============================================================================

interface MDXCodeProps {
  children: string;
  className?: string;
  language?: string;
}

/**
 * MDXCode — блок кода с подсветкой и кнопкой копирования
 *
 * Определяет язык из className (language-*).
 * Включает кнопку копирования в буфер.
 */
export function MDXCode({ children, className }: MDXCodeProps) {
  const [copied, setCopied] = useState(false);

  // Извлекаем язык из className (формат: language-typescript)
  const language = className?.replace("language-", "") || "text";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [children]);

  return (
    <div className="relative group my-6">
      {/* Заголовок с языком */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-text-primary)] border-b border-[var(--color-text-secondary)] rounded-t-sm">
        <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-background)] transition-colors"
          aria-label={copied ? "Скопировано" : "Копировать код"}
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <CheckIcon className="w-4 h-4" />
              Скопировано
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <CopyIcon className="w-4 h-4" />
              Копировать
            </span>
          )}
        </button>
      </div>

      {/* Код */}
      <pre className="p-4 bg-[var(--color-text-primary)] text-[var(--color-background)] overflow-x-auto rounded-b-sm">
        <code className={cn("text-sm font-mono leading-relaxed", className)}>
          {children}
        </code>
      </pre>
    </div>
  );
}

/**
 * MDXPre — обёртка для pre элемента
 */
export function MDXPre({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  // Если children — это code элемент, извлекаем его содержимое
  const codeElement = children as React.ReactElement<{
    children?: string;
    className?: string;
  }>;

  if (codeElement?.props?.children) {
    return (
      <MDXCode
        className={codeElement.props.className}
      >
        {codeElement.props.children}
      </MDXCode>
    );
  }

  // Fallback для обычного pre
  return (
    <pre
      className="p-4 my-6 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm overflow-x-auto"
      {...props}
    >
      {children}
    </pre>
  );
}

/**
 * MDXInlineCode — инлайн код
 */
export function MDXInlineCode({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="px-1.5 py-0.5 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded text-sm font-mono text-[var(--color-text-primary)]"
      {...props}
    >
      {children}
    </code>
  );
}

// =============================================================================
// CALLOUT / NOTE COMPONENT
// =============================================================================

type CalloutType = "info" | "warning" | "tip" | "error";

interface MDXCalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutStyles: Record<CalloutType, { bg: string; border: string; icon: React.ReactNode }> = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: <InfoIcon className="w-5 h-5 text-blue-600" />,
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: <WarningIcon className="w-5 h-5 text-amber-600" />,
  },
  tip: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: <TipIcon className="w-5 h-5 text-green-600" />,
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: <ErrorIcon className="w-5 h-5 text-red-600" />,
  },
};

/**
 * MDXCallout — блок для заметок, предупреждений, советов
 *
 * Типы: info, warning, tip, error
 */
export function MDXCallout({
  type = "info",
  title,
  children,
  className,
}: MDXCalloutProps) {
  const styles = calloutStyles[type];

  return (
    <div
      className={cn(
        "my-6 p-4 rounded-sm border-l-4",
        styles.bg,
        styles.border,
        className
      )}
      role="note"
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-medium text-[var(--color-text-primary)] mb-1">
              {title}
            </p>
          )}
          <div className="text-body-sm text-[var(--color-text-secondary)] [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// BLOCKQUOTE COMPONENT
// =============================================================================

interface MDXBlockquoteProps {
  children: React.ReactNode;
  author?: string;
  source?: string;
  className?: string;
}

/**
 * MDXBlockquote — стилизованная цитата
 */
export function MDXBlockquote({
  children,
  author,
  source,
  className,
}: MDXBlockquoteProps) {
  return (
    <blockquote
      className={cn(
        "my-8 pl-6 border-l-2 border-[var(--color-text-primary)]",
        className
      )}
    >
      <div className="text-body-lg text-[var(--color-text-secondary)] italic leading-relaxed [&>p]:mb-0">
        {children}
      </div>
      {(author || source) && (
        <footer className="mt-4 text-body-sm text-[var(--color-text-muted)]">
          {author && <cite className="not-italic font-medium">— {author}</cite>}
          {source && <span>, {source}</span>}
        </footer>
      )}
    </blockquote>
  );
}

// =============================================================================
// TABLE COMPONENT
// =============================================================================

/**
 * MDXTable — responsive таблица
 */
export function MDXTable({
  children,
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-6 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <table
        className={cn(
          "w-full border-collapse text-body-sm",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function MDXTableHead({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn("border-b-2 border-[var(--color-line)]", className)}
      {...props}
    >
      {children}
    </thead>
  );
}

export function MDXTableBody({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={cn("divide-y divide-[var(--color-line)]", className)} {...props}>
      {children}
    </tbody>
  );
}

export function MDXTableRow({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("hover:bg-[var(--color-background-alt)] transition-colors", className)}
      {...props}
    >
      {children}
    </tr>
  );
}

export function MDXTableHeader({
  children,
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left font-medium text-[var(--color-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function MDXTableCell({
  children,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-[var(--color-text-secondary)]",
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

// =============================================================================
// VIDEO COMPONENT
// =============================================================================

interface MDXVideoProps {
  src: string;
  title?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
  className?: string;
}

/**
 * MDXVideo — embed для видео (YouTube, Vimeo)
 *
 * Автоматически определяет платформу по URL.
 * Lazy loading для производительности.
 */
export function MDXVideo({
  src,
  title = "Video",
  aspectRatio = "16:9",
  className,
}: MDXVideoProps) {
  const aspectRatioClasses = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  };

  // Определяем embed URL
  const embedUrl = getEmbedUrl(src);

  return (
    <figure className={cn("my-8", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-sm border border-[var(--color-line)]",
          aspectRatioClasses[aspectRatio]
        )}
      >
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {title && title !== "Video" && (
        <figcaption className="mt-3 text-center text-caption text-[var(--color-text-muted)]">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Преобразует обычный URL видео в embed URL
 */
function getEmbedUrl(url: string): string {
  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  // Vimeo
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  // Если уже embed или другой URL — возвращаем как есть
  return url;
}

// =============================================================================
// HEADINGS
// =============================================================================

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const HeadingComponent = ({ children, className, ...props }: HeadingProps) => {
    const Tag = `h${level}` as const;

    // Генерируем id из текста для якорных ссылок
    const id =
      typeof children === "string"
        ? children.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
        : undefined;

    const headingClasses = {
      1: "text-h1 font-display font-bold mt-12 mb-6",
      2: "text-h2 font-display font-bold mt-10 mb-4",
      3: "text-h3 font-display font-bold mt-8 mb-3",
      4: "text-h4 font-display font-bold mt-6 mb-2",
      5: "text-body font-bold mt-4 mb-2",
      6: "text-body-sm font-bold mt-4 mb-2",
    };

    return (
      <Tag
        id={id}
        className={cn(
          headingClasses[level],
          "text-[var(--color-text-primary)] scroll-mt-24 group",
          className
        )}
        {...props}
      >
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 opacity-0 group-hover:opacity-100 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-opacity"
            aria-label={`Ссылка на ${children}`}
          >
            #
          </a>
        )}
      </Tag>
    );
  };

  HeadingComponent.displayName = `MDXHeading${level}`;
  return HeadingComponent;
}

export const MDXHeading1 = createHeading(1);
export const MDXHeading2 = createHeading(2);
export const MDXHeading3 = createHeading(3);
export const MDXHeading4 = createHeading(4);
export const MDXHeading5 = createHeading(5);
export const MDXHeading6 = createHeading(6);

// =============================================================================
// OTHER ELEMENTS
// =============================================================================

/**
 * MDXParagraph — параграф
 */
export function MDXParagraph({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-body text-[var(--color-text-secondary)] leading-relaxed mb-4",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/**
 * MDXLink — ссылка
 */
export function MDXLink({
  children,
  href,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith("http");

  return (
    <a
      href={href}
      className={cn(
        "text-[var(--color-text-primary)] underline underline-offset-2 hover:text-[var(--color-text-secondary)] transition-colors",
        className
      )}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
      {isExternal && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}

/**
 * MDXList — списки (ul/ol)
 */
export function MDXUnorderedList({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        "my-4 ml-6 list-disc text-[var(--color-text-secondary)] space-y-2",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

export function MDXOrderedList({
  children,
  className,
  ...props
}: React.OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        "my-4 ml-6 list-decimal text-[var(--color-text-secondary)] space-y-2",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

export function MDXListItem({
  children,
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn("pl-2", className)} {...props}>
      {children}
    </li>
  );
}

/**
 * MDXHorizontalRule — разделитель
 */
export function MDXHorizontalRule({
  className,
  ...props
}: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn("my-12 border-t border-[var(--color-line)]", className)}
      {...props}
    />
  );
}

// =============================================================================
// ICONS
// =============================================================================

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function TipIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  );
}

// =============================================================================
// EXPORT MDX COMPONENTS MAP
// =============================================================================

/**
 * Объект компонентов для использования с MDX
 *
 * Использование:
 * import { mdxComponents } from '@/components/mdx/MDXComponents';
 * <MDXRemote source={content} components={mdxComponents} />
 */
export const mdxComponents = {
  // Headings
  h1: MDXHeading1,
  h2: MDXHeading2,
  h3: MDXHeading3,
  h4: MDXHeading4,
  h5: MDXHeading5,
  h6: MDXHeading6,

  // Text
  p: MDXParagraph,
  a: MDXLink,

  // Lists
  ul: MDXUnorderedList,
  ol: MDXOrderedList,
  li: MDXListItem,

  // Code
  pre: MDXPre,
  code: MDXInlineCode,

  // Quotes
  blockquote: MDXBlockquote,

  // Tables
  table: MDXTable,
  thead: MDXTableHead,
  tbody: MDXTableBody,
  tr: MDXTableRow,
  th: MDXTableHeader,
  td: MDXTableCell,

  // Other
  hr: MDXHorizontalRule,
  img: MDXImage,

  // Custom components (для использования в MDX)
  Image: MDXImage,
  Video: MDXVideo,
  Callout: MDXCallout,
  Note: MDXCallout, // Алиас
};

export default mdxComponents;
