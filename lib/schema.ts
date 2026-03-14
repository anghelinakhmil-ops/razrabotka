const BASE_URL = "https://nakoagency.com";

/**
 * Organization schema — информация о компании
 */
export function organizationSchema(options?: {
  description?: string;
  locale?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NAKO Agency",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      options?.description ??
      "We create websites for experts, e-commerce, and businesses. Premium-minimal design, speed, SEO.",
    ...(options?.locale && { inLanguage: options.locale }),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English", "Russian", "Ukrainian", "Romanian", "Polish", "German", "Italian", "French"],
    },
    sameAs: [
      "https://www.instagram.com/nakoagency/",
      "https://t.me/nakoagency",
    ],
  };
}

/**
 * WebSite schema — информация о сайте
 */
export function webSiteSchema(options?: {
  description?: string;
  locale?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NAKO Agency",
    url: BASE_URL,
    description:
      options?.description ??
      "We create websites for experts, e-commerce, and businesses. Premium-minimal design, speed, SEO.",
    ...(options?.locale && { inLanguage: options.locale }),
    publisher: {
      "@type": "Organization",
      name: "NAKO Agency",
    },
  };
}

/**
 * BreadcrumbList schema — хлебные крошки
 */
export function breadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Article schema — для статей блога
 */
export function articleSchema({
  title,
  description,
  slug,
  date,
  author,
  image,
  locale = "en",
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
  locale?: string;
}) {
  const articleUrl = `${BASE_URL}/${locale}/blog/${slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: articleUrl,
    datePublished: date,
    dateModified: date,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "NAKO Agency",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image.startsWith("http") ? image : `${BASE_URL}${image}`,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };
}

/**
 * FAQPage schema — для секции FAQ
 */
export function faqSchema(
  questions: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/**
 * LocalBusiness schema — информация о компании для локального поиска
 */
export function localBusinessSchema(options?: {
  description?: string;
  locale?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "NAKO Agency",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      options?.description ??
      "Turnkey website development for experts, businesses and e-commerce.",
    ...(options?.locale && { inLanguage: options.locale }),
    priceRange: "€€-€€€",
    knowsLanguage: ["en", "ru", "uk", "ro", "pl", "de", "it", "fr"],
    areaServed: [
      { "@type": "Country", name: "Moldova" },
      { "@type": "Country", name: "Romania" },
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Country", name: "Poland" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "Italy" },
      { "@type": "Country", name: "Russia" },
      { "@type": "Country", name: "Kazakhstan" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Sweden" },
      { "@type": "Country", name: "Switzerland" },
    ],
    serviceType: [
      "Website Development",
      "Web Design",
      "E-commerce Development",
      "Landing Page Development",
    ],
  };
}

/**
 * Service schema — для страницы услуг
 */
export function serviceSchema(
  services: Array<{
    name: string;
    description: string;
    price?: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: "NAKO Agency",
        },
        ...(service.price && {
          offers: {
            "@type": "Offer",
            price: service.price,
            priceCurrency: "EUR",
          },
        }),
      },
    })),
  };
}
