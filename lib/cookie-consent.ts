/**
 * Cookie Consent Store — управление согласиями на cookies (GDPR-compliant)
 *
 * Категории:
 * - necessary: всегда true, нельзя отключить
 * - analytics: GA4, Vercel Analytics
 * - marketing: рекламные пиксели (будущее)
 * - preferences: язык, регион, тема
 */

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface ConsentRecord {
  consent: CookieConsent;
  timestamp: string;
  version: string;
  region: string;
  method: "banner" | "settings";
}

const STORAGE_KEY = "cookie_consent_v2";
const COOKIE_KEY = "cc_status";
const POLICY_VERSION = "1.0";

const DEFAULT_CONSENT: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

const ALL_ACCEPTED: CookieConsent = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function getConsent(): CookieConsent {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const record = JSON.parse(raw) as ConsentRecord;
    return { ...DEFAULT_CONSENT, ...record.consent, necessary: true };
  } catch {
    return DEFAULT_CONSENT;
  }
}

export function hasConsented(): boolean {
  if (typeof window === "undefined") return false;
  return getCookie(COOKIE_KEY) === "1";
}

export function setConsent(
  consent: Omit<CookieConsent, "necessary">,
  method: "banner" | "settings",
  region: string,
): ConsentRecord {
  const fullConsent: CookieConsent = { ...consent, necessary: true };
  const record: ConsentRecord = {
    consent: fullConsent,
    timestamp: new Date().toISOString(),
    version: POLICY_VERSION,
    region,
    method,
  };

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // localStorage unavailable
    }
    setCookie(COOKIE_KEY, "1", 31536000);
  }

  updateGtagConsent(fullConsent);
  return record;
}

export function acceptAll(region: string): ConsentRecord {
  return setConsent(ALL_ACCEPTED, "banner", region);
}

export function rejectAll(region: string): ConsentRecord {
  return setConsent(DEFAULT_CONSENT, "banner", region);
}

export function revokeConsent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  setCookie(COOKIE_KEY, "", 0);
  updateGtagConsent(DEFAULT_CONSENT);
}

/**
 * Google Consent Mode v2 — обновление состояния gtag
 */
export function updateGtagConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (!w.gtag) return;

  w.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
    functionality_storage: consent.preferences ? "granted" : "denied",
    personalization_storage: consent.preferences ? "granted" : "denied",
  });
}

export function getDefaultGtagConsent(): Record<string, string> {
  return {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  };
}

export { POLICY_VERSION, DEFAULT_CONSENT };
