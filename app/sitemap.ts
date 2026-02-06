import { MetadataRoute } from "next";

const BASE_URL = "https://webstudio.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  /* Статические страницы */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cases`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacts`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/brief`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

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

  const casePages: MetadataRoute.Sitemap = caseSlugs.map((slug) => ({
    url: `${BASE_URL}/cases/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

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

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...casePages, ...blogPages];
}
