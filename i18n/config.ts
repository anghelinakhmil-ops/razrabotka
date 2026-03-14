export const locales = ["en", "ru", "uk", "ro", "pl", "de", "it", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  uk: "UK",
  ro: "RO",
  pl: "PL",
  de: "DE",
  it: "IT",
  fr: "FR",
};
