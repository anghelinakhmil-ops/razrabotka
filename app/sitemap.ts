import { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const BASE_URL = "https://nakoagency.com";

/**
 * Генерация alternates.languages для каждого URL
 */
function getAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${BASE_URL}/${locale}${path}`;
  }
  return languages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  /* Статические страницы */
  const staticPaths: Array<{
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/services", changeFrequency: "monthly", priority: 0.9 },
    { path: "/cases", changeFrequency: "weekly", priority: 0.9 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/contacts", changeFrequency: "monthly", priority: 0.7 },
    { path: "/brief", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap((page) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: getAlternates(page.path) },
    }))
  );

  /* Динамические страницы — кейсы */
  const caseSlugs = [
    "expert-coach",
    "ecommerce-fashion",
    "landing-saas",
    "expert-psychologist",
    "ecommerce-cosmetics",
    "landing-event",
    "expert-lawyer",
    "ecommerce-electronics",
    "landing-app",
  ];

  const casePages: MetadataRoute.Sitemap = caseSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/cases/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: { languages: getAlternates(`/cases/${slug}`) },
    }))
  );

  /* Динамические страницы — блог */
  const blogSlugs = [
    "why-nextjs-for-business",
    "conversion-design-principles",
    "seo-for-new-websites",
    "expert-website-roi",
    "tailwind-vs-css-modules",
    "minimalism-in-web-design",
    "lighthouse-score-optimization",
    "landing-page-anatomy",
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: getAlternates(`/blog/${slug}`) },
    }))
  );

  return [...staticPages, ...casePages, ...blogPages];
}
