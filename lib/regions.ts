/**
 * Конфигурация регионов для гео-детекции и ценообразования
 *
 * 12 регионов: UA, MD, RU, KZ, RO, PL, IT, DE, GB, SE, CH, DEFAULT
 * Регион определяется по x-vercel-ip-country header в middleware
 */

export type RegionCode = "UA" | "MD" | "RU" | "KZ" | "RO" | "PL" | "IT" | "DE" | "GB" | "SE" | "CH" | "DEFAULT";

export interface RegionConfig {
  code: RegionCode;
  currency: string;
  currencySymbol: string;
  currencyLocale: string;
}

export const REGIONS: Record<RegionCode, RegionConfig> = {
  UA: { code: "UA", currency: "UAH", currencySymbol: "₴", currencyLocale: "uk-UA" },
  MD: { code: "MD", currency: "MDL", currencySymbol: "lei", currencyLocale: "ro-MD" },
  RU: { code: "RU", currency: "RUB", currencySymbol: "₽", currencyLocale: "ru-RU" },
  KZ: { code: "KZ", currency: "KZT", currencySymbol: "₸", currencyLocale: "ru-KZ" },
  RO: { code: "RO", currency: "RON", currencySymbol: "lei", currencyLocale: "ro-RO" },
  PL: { code: "PL", currency: "PLN", currencySymbol: "zł", currencyLocale: "pl-PL" },
  IT: { code: "IT", currency: "EUR", currencySymbol: "€", currencyLocale: "it-IT" },
  DE: { code: "DE", currency: "EUR", currencySymbol: "€", currencyLocale: "de-DE" },
  GB: { code: "GB", currency: "GBP", currencySymbol: "£", currencyLocale: "en-GB" },
  SE: { code: "SE", currency: "SEK", currencySymbol: "kr", currencyLocale: "sv-SE" },
  CH: { code: "CH", currency: "EUR", currencySymbol: "€", currencyLocale: "fr-CH" },
  DEFAULT: { code: "DEFAULT", currency: "EUR", currencySymbol: "€", currencyLocale: "en-US" },
};

/**
 * Маппинг ISO 3166-1 alpha-2 кода страны → RegionCode
 * AT (Австрия) → DE, BY (Беларусь) → RU
 */
const COUNTRY_TO_REGION: Record<string, RegionCode> = {
  UA: "UA",
  MD: "MD",
  RU: "RU",
  BY: "RU",
  KZ: "KZ",
  RO: "RO",
  PL: "PL",
  IT: "IT",
  DE: "DE",
  AT: "DE",
  GB: "GB",
  SE: "SE",
  CH: "CH",
};

export function getRegionByCountry(countryCode: string | undefined | null): RegionCode {
  if (!countryCode) return "DEFAULT";
  return COUNTRY_TO_REGION[countryCode.toUpperCase()] ?? "DEFAULT";
}

export function getRegionConfig(regionCode: RegionCode): RegionConfig {
  return REGIONS[regionCode] ?? REGIONS.DEFAULT;
}

export const REGION_COOKIE = "user-region";
