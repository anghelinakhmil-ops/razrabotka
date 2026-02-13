"use client";

import { clsx } from "clsx";

/**
 * Карта замены кириллических букв на похожие латинские
 * Используется для создания «ломаного» стиля типографики
 */
const cyrillicToLatinMap: Record<string, string> = {
  А: "A",
  В: "B",
  Е: "E",
  К: "K",
  М: "M",
  Н: "H",
  О: "O",
  Р: "P",
  С: "C",
  Т: "T",
  У: "Y",
  Х: "X",
};

/**
 * Позиции для замены букв (каждая N-ая буква)
 * или конкретные индексы
 */
type MixPattern = "every-2" | "every-3" | "random" | number[];

interface BrokenTextProps {
  /** Текст для отображения */
  text: string;
  /** Вариант spacing: normal (0.2em) или ultra (0.35em) */
  variant?: "normal" | "ultra";
  /** Размер текста */
  size?: "h1" | "h2" | "h3";
  /** Добавить пробелы между буквами */
  spaced?: boolean;
  /** Паттерн смешивания кириллицы/латиницы */
  mixPattern?: MixPattern;
  /** Дополнительные CSS классы */
  className?: string;
  /** HTML тег для рендеринга */
  as?: "h1" | "h2" | "h3" | "span" | "div" | "p";
}

/**
 * Определяет, нужно ли заменить букву на латиницу
 */
function shouldReplace(index: number, pattern: MixPattern): boolean {
  if (pattern === "every-2") return index % 2 === 1;
  if (pattern === "every-3") return index % 3 === 1;
  if (pattern === "random") return Math.random() > 0.6;
  if (Array.isArray(pattern)) return pattern.includes(index);
  return false;
}

/**
 * Обрабатывает текст: заменяет кириллицу на латиницу и добавляет пробелы
 */
function processText(
  text: string,
  spaced: boolean,
  mixPattern?: MixPattern
): string {
  const chars = text.toUpperCase().split("");

  const processed = chars.map((char, index) => {
    // Пропускаем пробелы
    if (char === " ") return spaced ? "   " : " ";

    // Заменяем кириллицу на латиницу если нужно
    if (mixPattern && cyrillicToLatinMap[char] && shouldReplace(index, mixPattern)) {
      return cyrillicToLatinMap[char];
    }

    return char;
  });

  // Добавляем пробелы между буквами
  if (spaced) {
    return processed.join(" ");
  }

  return processed.join("");
}

/**
 * BrokenText — компонент для «ломаной» типографики
 *
 * Создаёт эффект смешения кириллицы и латиницы с увеличенной разрядкой.
 * Референс: THE BRIDGE — «П R ИРОДА», «O РЕНДИ», «THE B RIDGE»
 *
 * @example
 * // Простой текст с пробелами
 * <BrokenText text="САЙТЫ" spaced />
 * // Результат: "С А Й Т Ы"
 *
 * @example
 * // Смешение кириллицы и латиницы
 * <BrokenText text="САЙТЫ" spaced mixPattern="every-2" />
 * // Результат: "C А Й T Ы" (некоторые буквы заменены на латиницу)
 *
 * @example
 * // Конкретные позиции для замены
 * <BrokenText text="ПОДКЛЮЧ" spaced mixPattern={[1, 4]} />
 * // Результат: "П O Д К Л Y Ч"
 */
export function BrokenText({
  text,
  variant = "normal",
  size,
  spaced = false,
  mixPattern,
  className,
  as: Component = "span",
}: BrokenTextProps) {
  const processedText = processText(text, spaced, mixPattern);

  const classes = clsx(
    variant === "ultra" ? "text-broken-ultra" : "text-broken",
    size === "h1" && "text-broken-h1",
    size === "h2" && "text-broken-h2",
    size === "h3" && "text-broken-h3",
    className
  );

  return <Component className={classes}>{processedText}</Component>;
}

/**
 * Готовые пресеты для часто используемых текстов
 */
export const brokenTextPresets = {
  /** "С А Й Т Ы" с заменой А→A */
  sites: { text: "САЙТЫ", spaced: true, mixPattern: [1] as number[] },
  /** "П O Д К Л Ю Ч" с заменой О→O */
  turnkey: { text: "ПОДКЛЮЧ", spaced: true, mixPattern: [1] as number[] },
  /** "N A K O" */
  nako: { text: "NAKO", spaced: true },
  /** "Р A З Р А Б О Т К А" */
  development: { text: "РАЗРАБОТКА", spaced: true, mixPattern: [1, 5] as number[] },
};

export default BrokenText;
