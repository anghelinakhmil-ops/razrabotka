"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollScrubTextProps {
  /** Текст для анимации */
  text: string;
  /** HTML тег обёртки */
  as?: "p" | "span" | "div";
  /** CSS классы для обёртки */
  className?: string;
  /** Начальная opacity для неактивных слов */
  minOpacity?: number;
  /** Scroll offset — когда начинается и заканчивается анимация */
  scrollOffset?: [string, string];
}

/**
 * ScrollScrubWord — одно слово с привязкой opacity к скроллу
 */
function ScrollScrubWord({
  word,
  index,
  totalWords,
  progress,
  minOpacity,
}: {
  word: string;
  index: number;
  totalWords: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  minOpacity: number;
}) {
  // Каждое слово активируется в своём диапазоне скролла
  const wordStart = index / totalWords;
  const wordEnd = (index + 1) / totalWords;

  const opacity = useTransform(
    progress,
    [wordStart, wordEnd],
    [minOpacity, 1]
  );

  return (
    <span className="inline-block">
      <motion.span
        className="inline-block"
        style={{ opacity }}
        aria-hidden="true"
      >
        {word}
      </motion.span>
      {index < totalWords - 1 && (
        <span className="inline-block" aria-hidden="true">
          &nbsp;
        </span>
      )}
    </span>
  );
}

/**
 * ScrollScrubText — scrub-эффект для текста
 *
 * Слова «проявляются» (opacity 0.2→1) при скролле,
 * привязанные к позиции скролла элемента.
 * Аналог `scrub-each-word` из THE BRIDGE.
 *
 * @example
 * <ScrollScrubText
 *   text="Создаём уникальный визуальный стиль без шаблонов"
 *   className="text-body-lg text-[var(--color-text-muted)]"
 * />
 */
export function ScrollScrubText({
  text,
  as: Component = "p",
  className,
  minOpacity = 0.2,
  scrollOffset = ["start 0.8", "start 0.3"],
}: ScrollScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset as ["start end", "start start"],
  });

  const words = text.split(" ");

  return (
    <Component
      ref={ref}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <ScrollScrubWord
          key={i}
          word={word}
          index={i}
          totalWords={words.length}
          progress={scrollYProgress}
          minOpacity={minOpacity}
        />
      ))}
    </Component>
  );
}

export default ScrollScrubText;
