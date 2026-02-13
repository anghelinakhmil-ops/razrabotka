/**
 * UTM — модуль для обработки UTM-меток из рекламных ссылок
 *
 * Читает utm_source, utm_medium, utm_campaign, utm_term, utm_content
 * из URL при первом визите и сохраняет в sessionStorage.
 * При отправке формы — данные добавляются в заявку.
 */

const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

type UtmParam = (typeof UTM_PARAMS)[number];

export interface UtmData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const STORAGE_KEY = "webstudio_utm";

/**
 * Захватить UTM-метки из текущего URL и сохранить в sessionStorage.
 * Вызывать один раз при загрузке страницы (в LayoutClient).
 */
export function captureUtm(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const hasUtm = UTM_PARAMS.some((key) => params.has(key));

  if (!hasUtm) return;

  const data: UtmData = {};
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) {
      data[key as UtmParam] = value;
    }
  }

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage недоступен — молча игнорируем
  }
}

/**
 * Получить сохранённые UTM-данные.
 * Возвращает объект с метками или пустой объект.
 */
export function getUtmData(): UtmData {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as UtmData;
  } catch {
    return {};
  }
}

/**
 * Форматировать UTM-данные для отображения в уведомлениях.
 * Возвращает строку вида "google / cpc / brand_campaign" или пустую строку.
 */
export function formatUtmString(utm: UtmData): string {
  const parts: string[] = [];
  if (utm.utm_source) parts.push(utm.utm_source);
  if (utm.utm_medium) parts.push(utm.utm_medium);
  if (utm.utm_campaign) parts.push(utm.utm_campaign);
  return parts.join(" / ");
}
