"use client";

import Script from "next/script";
import {
  getConsent,
  hasConsented,
} from "@/lib/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * GoogleAnalytics — GA4 с Google Consent Mode v2
 *
 * Default consent ('denied') устанавливается inline в layout.tsx <head>.
 * Этот компонент загружает gtag.js и обновляет consent при наличии сохранённого выбора.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  const hasUserConsented = hasConsented();
  const userConsent = hasUserConsented ? getConsent() : null;

  const consentUpdate = userConsent
    ? `gtag('consent', 'update', {
        'analytics_storage': '${userConsent.analytics ? "granted" : "denied"}',
        'ad_storage': '${userConsent.marketing ? "granted" : "denied"}',
        'ad_user_data': '${userConsent.marketing ? "granted" : "denied"}',
        'ad_personalization': '${userConsent.marketing ? "granted" : "denied"}',
        'functionality_storage': '${userConsent.preferences ? "granted" : "denied"}',
        'personalization_storage': '${userConsent.preferences ? "granted" : "denied"}'
      });`
    : "";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          ${consentUpdate}
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

export default GoogleAnalytics;
