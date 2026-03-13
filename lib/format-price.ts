import { type RegionCode, getRegionConfig } from "./regions";

/**
 * Форматирование цены для указанного региона
 *
 * formatPrice(1500, "DE") → "1.500 €"
 * formatPrice(1500, "UA") → "1 500 ₴"
 * formatPrice(1500, "DEFAULT") → "$1,500"
 */
export function formatPrice(amount: number, regionCode: RegionCode): string {
  const region = getRegionConfig(regionCode);

  return new Intl.NumberFormat(region.currencyLocale, {
    style: "currency",
    currency: region.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
