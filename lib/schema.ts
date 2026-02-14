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
      availableLanguage: ["English", "Russian", "Ukrainian", "Romanian"],
    },
    sameAs: [],
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
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}/blog/${slug}`,
    datePublished: date,
    dateModified: date,
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
      "@id": `${BASE_URL}/blog/${slug}`,
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
            priceCurrency: "RUB",
          },
        }),
      },
    })),
  };
}
