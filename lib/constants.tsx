/**
 * constants.ts — единый источник правды для всех данных сайта
 *
 * Все контактные данные, навигация, соцсети, юридические ссылки
 * импортируются ТОЛЬКО из этого файла.
 */

// ─── Типы ───────────────────────────────────────────────

export interface NavItem {
  key: string;
  href: string;
}



// ─── Компания ───────────────────────────────────────────

export const COMPANY_NAME = "NAKO Agency";
export const COMPANY_DOMAIN = "nakoagency.com";

// ─── Контактные данные ──────────────────────────────────

export const CONTACT = {
  email: "hello@nakoagency.com",
} as const;

// ─── Навигация ──────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "cases", href: "/cases" },
  { key: "blog", href: "/blog" },
  { key: "contacts", href: "/contacts" },
];

export const LEGAL_LINKS: NavItem[] = [
  { key: "privacyLink", href: "/privacy" },
  { key: "termsLink", href: "/terms" },
];
