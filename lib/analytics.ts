/**
 * Google Analytics 4 — утилиты для трекинга событий
 *
 * Все функции безопасны: если GA не загружен — ничего не происходит.
 */

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | undefined;
};

/**
 * Отправка события в GA4
 */
export function trackEvent({ action, ...params }: GTagEvent) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}

/**
 * Трекинг просмотра страницы (для SPA-навигации)
 */
export function trackPageView(url: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
    page_path: url,
  });
}

/* ============================================
   Предопределённые события
   ============================================ */

/** Клик по CTA кнопке */
export function trackCtaClick(location: string, text: string, page: string) {
  trackEvent({
    action: "cta_click",
    location,
    text,
    page,
  });
}

/** Начало заполнения формы */
export function trackFormStart(formName: string) {
  trackEvent({
    action: "form_start",
    form_name: formName,
  });
}

/** Отправка формы */
export function trackFormSubmit(formName: string) {
  trackEvent({
    action: "form_submit",
    form_name: formName,
  });
}

/** Ошибка формы */
export function trackFormError(formName: string, error: string) {
  trackEvent({
    action: "form_error",
    form_name: formName,
    error_message: error,
  });
}

/** Просмотр секции */
export function trackSectionView(sectionName: string) {
  trackEvent({
    action: "section_view",
    section_name: sectionName,
  });
}

/** Просмотр кейса */
export function trackCaseView(caseSlug: string) {
  trackEvent({
    action: "case_view",
    case_slug: caseSlug,
  });
}

/** Прочтение статьи */
export function trackBlogRead(articleSlug: string) {
  trackEvent({
    action: "blog_read",
    article_slug: articleSlug,
  });
}

/* ============================================
   Типы для window.gtag
   ============================================ */

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, string | number | undefined>
    ) => void;
    dataLayer: Array<unknown>;
  }
}
