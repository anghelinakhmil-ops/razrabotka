/**
 * Конфигурация регионов для гео-детекции и ценообразования
 *
 * 9 регионов: MD, RO, UA, PL, DE, IT, RU, KZ, DEFAULT (USD)
 * Регион определяется по x-vercel-ip-country header в middleware
 */

export type RegionCode = "MD" | "RO" | "UA" | "PL" | "DE" | "IT" | "RU" | "KZ" | "DEFAULT";

export interface RegionConfig {
  code: RegionCode;
  currency: string;
  currencySymbol: string;
  currencyLocale: string;
}

export const REGIONS: Record<RegionCode, RegionConfig> = {
  MD: { code: "MD", currency: "MDL", currencySymbol: "lei", currencyLocale: "ro-MD" },
  RO: { code: "RO", currency: "RON", currencySymbol: "lei", currencyLocale: "ro-RO" },
  UA: { code: "UA", currency: "UAH", currencySymbol: "₴", currencyLocale: "uk-UA" },
  PL: { code: "PL", currency: "PLN", currencySymbol: "zł", currencyLocale: "pl-PL" },
  DE: { code: "DE", currency: "EUR", currencySymbol: "€", currencyLocale: "de-DE" },
  IT: { code: "IT", currency: "EUR", currencySymbol: "€", currencyLocale: "it-IT" },
  RU: { code: "RU", currency: "RUB", currencySymbol: "₽", currencyLocale: "ru-RU" },
  KZ: { code: "KZ", currency: "KZT", currencySymbol: "₸", currencyLocale: "ru-KZ" },
  DEFAULT: { code: "DEFAULT", currency: "USD", currencySymbol: "$", currencyLocale: "en-US" },
};

/**
 * Маппинг ISO 3166-1 alpha-2 кода страны → RegionCode
 * Немецкоязычные (AT, CH) → DE, Беларусь → RU
 */
const COUNTRY_TO_REGION: Record<string, RegionCode> = {
  MD: "MD",
  RO: "RO",
  UA: "UA",
  PL: "PL",
  DE: "DE",
  AT: "DE",
  CH: "DE",
  IT: "IT",
  RU: "RU",
  BY: "RU",
  KZ: "KZ",
};

export function getRegionByCountry(countryCode: string | undefined | null): RegionCode {
  if (!countryCode) return "DEFAULT";
  return COUNTRY_TO_REGION[countryCode.toUpperCase()] ?? "DEFAULT";
}

export function getRegionConfig(regionCode: RegionCode): RegionConfig {
  return REGIONS[regionCode] ?? REGIONS.DEFAULT;
}

export const REGION_COOKIE = "user-region";
