/**
 * Региональное ценообразование
 *
 * Базовые цены — уровень Украины (самые низкие).
 * Для каждого региона применяется множитель.
 * GB и SE — конвертация в локальную валюту.
 *
 * 10 ценовых уровней:
 * UA ×1.00 → MD/RU ×1.11 → KZ ×1.24 → RO ×1.46 → PL/DEFAULT ×1.84
 * → IT ×2.33 → DE ×2.96 → GB ×3.32 → SE ×3.66 → CH ×4.34
 */

import type { RegionCode } from "./regions";

/** Идентификатор ценовой позиции: "{categoryId}-{tier}" или "support-{tier}" */
export type PriceId =
  | "experts-start" | "experts-standard" | "experts-pro"
  | "business-start" | "business-standard" | "business-pro"
  | "landing-start" | "landing-standard" | "landing-pro"
  | "ecommerce-start" | "ecommerce-standard" | "ecommerce-pro"
  | "courses-start" | "courses-standard" | "courses-pro"
  | "events-start" | "events-standard" | "events-pro"
  | "support-start" | "support-standard" | "support-pro";

/** Базовые цены (Украина) — [min, max] в EUR */
const BASE_PRICES: Record<PriceId, [number, number]> = {
  "experts-start": [500, 900],
  "experts-standard": [900, 1800],
  "experts-pro": [1800, 3000],
  "business-start": [650, 1300],
  "business-standard": [1300, 2800],
  "business-pro": [2800, 4500],
  "landing-start": [400, 700],
  "landing-standard": [500, 1400],
  "landing-pro": [1400, 3000],
  "ecommerce-start": [2500, 4500],
  "ecommerce-standard": [4500, 7000],
  "ecommerce-pro": [7000, 18000],
  "courses-start": [500, 1000],
  "courses-standard": [1000, 2200],
  "courses-pro": [2200, 4000],
  "events-start": [400, 800],
  "events-standard": [800, 1800],
  "events-pro": [1800, 3000],
  "support-start": [80, 150],
  "support-standard": [150, 300],
  "support-pro": [300, 500],

};

/** Множители относительно базовой цены (Украина = 1.00) */
const PRICE_MULTIPLIERS: Record<RegionCode, number> = {
  UA: 1.00,
  MD: 1.11,
  RU: 1.11,
  KZ: 1.24,
  RO: 1.46,
  PL: 1.84,
  DEFAULT: 1.84,
  IT: 2.33,
  DE: 2.96,
  GB: 3.32,
  SE: 3.66,
  CH: 4.34,
};

/**
 * Курсы конвертации EUR → локальная валюта
 * Обновлять при значительных изменениях курса
 * Последнее обновление: 2026-03-14
 */
const CURRENCY_RATES: Partial<Record<RegionCode, number>> = {
  GB: 0.86,   // EUR → GBP
  SE: 11.49,  // EUR → SEK
};

/** Символы валют для форматирования */
const CURRENCY_FORMAT: Record<RegionCode, { symbol: string; position: "before" | "after"; separator: string }> = {
  UA: { symbol: "€", position: "before", separator: "," },
  MD: { symbol: "€", position: "before", separator: "," },
  RU: { symbol: "€", position: "before", separator: "," },
  KZ: { symbol: "€", position: "before", separator: "," },
  RO: { symbol: "€", position: "before", separator: "," },
  PL: { symbol: "€", position: "before", separator: "," },
  DEFAULT: { symbol: "€", position: "before", separator: "," },
  IT: { symbol: "€", position: "before", separator: "," },
  DE: { symbol: "€", position: "before", separator: "," },
  GB: { symbol: "£", position: "before", separator: "," },
  SE: { symbol: "kr", position: "after", separator: " " },
  CH: { symbol: "€", position: "before", separator: "," },
};

/** Округление: до 10 при значении < 200, иначе до 50 */
function roundPrice(value: number): number {
  const step = value < 200 ? 10 : 50;
  return Math.round(value / step) * step;
}

/** Форматирование числа с разделителем тысяч */
function formatNumber(value: number, separator: string): string {
  return value.toLocaleString("en-US").replace(/,/g, separator);
}

/**
 * Получить отформатированную цену для региона
 *
 * @param regionCode — код региона из гео-детекции
 * @param priceId — идентификатор ценовой позиции
 * @returns отформатированная строка, напр. "€550–1,000" или "21 050–37 900 kr"
 */
export function getFormattedPrice(regionCode: RegionCode, priceId: PriceId): string {
  const [baseMin, baseMax] = BASE_PRICES[priceId];
  const multiplier = PRICE_MULTIPLIERS[regionCode] ?? PRICE_MULTIPLIERS.DEFAULT;
  const currencyRate = CURRENCY_RATES[regionCode] ?? 1;
  const format = CURRENCY_FORMAT[regionCode] ?? CURRENCY_FORMAT.DEFAULT;

  const min = roundPrice(baseMin * multiplier * currencyRate);
  const max = roundPrice(baseMax * multiplier * currencyRate);

  const minStr = formatNumber(min, format.separator);
  const maxStr = formatNumber(max, format.separator);

  if (format.position === "before") {
    return `${format.symbol}${minStr}–${maxStr}`;
  }
  return `${minStr}–${maxStr} ${format.symbol}`;
}
