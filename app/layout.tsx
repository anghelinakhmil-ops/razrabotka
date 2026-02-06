import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { LayoutClient } from "@/components/layout";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://webstudio.dev"),
  title: {
    default: "WebStudio | Разработка сайтов под ключ",
    template: "%s | WebStudio",
  },
  description:
    "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, скорость, SEO.",
  keywords: [
    "разработка сайтов",
    "создание сайтов",
    "веб-студия",
    "сайт под ключ",
    "лендинг",
    "интернет-магазин",
  ],
  authors: [{ name: "WebStudio" }],
  creator: "WebStudio",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "WebStudio",
    title: "WebStudio | Разработка сайтов под ключ",
    description:
      "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, скорость, SEO.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebStudio | Разработка сайтов под ключ",
    description:
      "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, скорость, SEO.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1A1A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema()),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[var(--color-background)] text-[var(--color-text-primary)]`}
      >
        <GoogleAnalytics />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
