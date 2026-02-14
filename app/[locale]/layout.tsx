import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Space_Grotesk, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { locales } from "@/i18n/config";
import { LayoutClient } from "@/components/layout";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Analytics } from "@vercel/analytics/react";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import "../globals.css";

const BASE_URL = "https://nakoagency.com";

// Display шрифт — для заголовков, «ломаной» типографики
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  display: "swap",
});

// Body шрифт — для основного текста
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}`;
  }

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("siteTitle"),
      template: "%s | NAKO Agency",
    },
    description: t("siteDescription"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "NAKO Agency" }],
    creator: "NAKO Agency",
    openGraph: {
      type: "website",
      siteName: "NAKO Agency",
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale,
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1A1A1A",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "meta" });

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema({
              description: t("siteDescription"),
              locale,
            })),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema({
              description: t("siteDescription"),
              locale,
            })),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[var(--color-background)] text-[var(--color-text-primary)]`}
      >
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <Analytics />
          <LayoutClient>{children}</LayoutClient>
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
