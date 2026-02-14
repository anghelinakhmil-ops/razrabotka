"use client";

import { clsx } from "clsx";

interface BrokenTextProps {
  /** Текст для отображения */
  text: string;
  /** Вариант spacing: normal (0.2em) или ultra (0.35em) */
  variant?: "normal" | "ultra";
  /** Размер текста */
  size?: "h1" | "h2" | "h3";
  /** Добавить пробелы между буквами */
  spaced?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
  /** HTML тег для рендеринга */
  as?: "h1" | "h2" | "h3" | "span" | "div" | "p";
}

/**
 * Обрабатывает текст: uppercase
 * Разрядка реализуется через CSS letter-spacing (не literal пробелы),
 * чтобы браузер переносил строку только на границе слов.
 */
function processText(text: string): string {
  return text.toUpperCase();
}

/**
 * BrokenText — компонент для «ломаной» типографики
 *
 * Создаёт эффект увеличенной разрядки букв.
 * Референс: THE BRIDGE — «П Р И Р О Д А», «THE B RIDGE»
 *
 * @example
 * // Заголовок с разрядкой
 * <BrokenText text="УСЛУГИ" spaced />
 *
 * @example
 * // Hero заголовок
 * <BrokenText text="РАЗРАБОТКА" spaced size="h1" />
 */
export function BrokenText({
  text,
  variant = "normal",
  size,
  spaced = false,
  className,
  as: Component = "span",
}: BrokenTextProps) {
  const processedText = processText(text);

  const classes = clsx(
    variant === "ultra" ? "text-broken-ultra" : "text-broken",
    size === "h1" && "text-broken-h1",
    size === "h2" && "text-broken-h2",
    size === "h3" && "text-broken-h3",
    spaced && "text-broken-spaced",
    className
  );

  return <Component className={classes}>{processedText}</Component>;
}

/**
 * Готовые пресеты для часто используемых текстов
 */
export const brokenTextPresets = {
  /** "С А Й Т Ы" */
  sites: { text: "САЙТЫ", spaced: true },
  /** "П О Д К Л Ю Ч" */
  turnkey: { text: "ПОДКЛЮЧ", spaced: true },
  /** "N A K O" */
  nako: { text: "NAKO", spaced: true },
  /** "Р А З Р А Б О Т К А" */
  development: { text: "РАЗРАБОТКА", spaced: true },
};

export default BrokenText;
