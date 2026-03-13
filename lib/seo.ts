import { locales } from "@/i18n/config";

const BASE_URL = "https://nakoagency.com";

/**
 * Генерирует alternates (canonical + hreflang) для страницы
 *
 * @param path — путь без локали, напр. "/about" или "/services"
 * @param locale — текущая локаль
 */
export function getPageAlternates(path: string, locale: string) {
  const suffix = path === "/" ? "" : path;
  const languages: Record<string, string> = {
    "x-default": `${BASE_URL}/en${suffix}`,
  };
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}${suffix}`;
  }

  return {
    canonical: `${BASE_URL}/${locale}${suffix}`,
    languages,
  };
}
