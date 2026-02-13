import type { Metadata } from "next";

/**
 * Root layout — minimal pass-through.
 * All rendering (html, body, fonts, providers) is in app/[locale]/layout.tsx.
 * This file exists for non-localized routes (api, sitemap, robots, OG images).
 */

export const metadata: Metadata = {
  metadataBase: new URL("https://nakoagency.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
