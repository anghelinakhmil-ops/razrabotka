"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsentStatus } from "@/components/layout/CookieConsent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const emptySubscribe = () => () => {};
const getConsented = () => getConsentStatus() === "accepted";
const getServerConsented = () => false;

/**
 * GoogleAnalytics — загрузка gtag.js скрипта
 *
 * Загружается только при наличии NEXT_PUBLIC_GA_MEASUREMENT_ID
 * И только если пользователь дал согласие на cookies.
 * Стратегия: afterInteractive — не блокирует рендеринг.
 */
export function GoogleAnalytics() {
  const consented = useSyncExternalStore(emptySubscribe, getConsented, getServerConsented);

  if (!GA_ID || !consented) return null;

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
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

export default GoogleAnalytics;
