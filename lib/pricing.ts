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
  "landing-standard": [650, 1400],
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
 * Получить отформатированную цену для региона (только нижняя граница)
 *
 * @param regionCode — код региона из гео-детекции
 * @param priceId — идентификатор ценовой позиции
 * @returns отформатированная строка, напр. "€550" или "21 050 kr"
 */
/**
 * Калькулятор: базовые цены по типу сайта (EUR, уровень Украины)
 * Используются min-цены из START-тиров как отправная точка
 */
const CALC_BASE: Record<string, number> = {
  experts: 500,
  business: 650,
  landing: 400,
  ecommerce: 2500,
  courses: 500,
  events: 400,
};

/** Множители для количества страниц */
const PAGES_MULT: Record<string, number> = {
  "1": 1.0,
  "5-10": 1.6,
  "10-20": 2.2,
  "20+": 3.0,
};

/** Множители для дизайна */
const DESIGN_MULT: Record<string, number> = {
  template: 1.0,
  custom: 1.8,
};

/** Доплаты за фичи (EUR, уровень Украины) */
const FEATURE_ADD: Record<string, number> = {
  forms: 80,
  crm: 150,
  payments: 200,
  multilingual: 250,
  blog: 150,
  account: 300,
};

/** Доплата за контент */
const CONTENT_ADD: Record<string, number> = {
  own: 0,
  need: 300,
};

/** Доплата за SEO */
const SEO_ADD: Record<string, number> = {
  no: 0,
  yes: 400,
};

/**
 * Рассчитать ориентировочную стоимость проекта
 */
export interface CalcOptions {
  siteType: string;
  pages: string;
  design: string;
  features: string[];
  content: string;
  seo: string;
}

export function calculateEstimate(regionCode: RegionCode, options: CalcOptions): string {
  const base = CALC_BASE[options.siteType] ?? 500;
  const pagesMult = PAGES_MULT[options.pages] ?? 1.0;
  const designMult = DESIGN_MULT[options.design] ?? 1.0;
  const featuresAdd = options.features.reduce((sum, f) => sum + (FEATURE_ADD[f] ?? 0), 0);
  const contentAdd = CONTENT_ADD[options.content] ?? 0;
  const seoAdd = SEO_ADD[options.seo] ?? 0;

  const totalEur = base * pagesMult * designMult + featuresAdd + contentAdd + seoAdd;

  const multiplier = PRICE_MULTIPLIERS[regionCode] ?? PRICE_MULTIPLIERS.DEFAULT;
  const currencyRate = CURRENCY_RATES[regionCode] ?? 1;
  const format = CURRENCY_FORMAT[regionCode] ?? CURRENCY_FORMAT.DEFAULT;

  const price = roundPrice(totalEur * multiplier * currencyRate);
  const priceStr = formatNumber(price, format.separator);

  if (format.position === "before") {
    return `${format.symbol}${priceStr}`;
  }
  return `${priceStr} ${format.symbol}`;
}

export function getFormattedPrice(regionCode: RegionCode, priceId: PriceId): string {
  const [baseMin] = BASE_PRICES[priceId];
  const multiplier = PRICE_MULTIPLIERS[regionCode] ?? PRICE_MULTIPLIERS.DEFAULT;
  const currencyRate = CURRENCY_RATES[regionCode] ?? 1;
  const format = CURRENCY_FORMAT[regionCode] ?? CURRENCY_FORMAT.DEFAULT;

  const min = roundPrice(baseMin * multiplier * currencyRate);
  const minStr = formatNumber(min, format.separator);

  if (format.position === "before") {
    return `${format.symbol}${minStr}`;
  }
  return `${minStr} ${format.symbol}`;
}
