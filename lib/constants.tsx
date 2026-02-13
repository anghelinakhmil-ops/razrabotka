/**
 * constants.ts — единый источник правды для всех данных сайта
 *
 * Все контактные данные, навигация, соцсети, юридические ссылки
 * импортируются ТОЛЬКО из этого файла.
 */

// ─── Типы ───────────────────────────────────────────────

export interface NavItem {
  label: string;
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
  { label: "Главная", href: "/" },
  { label: "Про нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Кейсы", href: "/cases" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

export const LEGAL_LINKS: NavItem[] = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Условия использования", href: "/terms" },
];

