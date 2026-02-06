const BASE_URL = "https://webstudio.dev";

/**
 * Organization schema — информация о компании
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebStudio",
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, скорость, SEO.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Russian", "English"],
    },
    sameAs: [],
  };
}

/**
 * WebSite schema — информация о сайте
 */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WebStudio",
    url: BASE_URL,
    description:
      "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, скорость, SEO.",
    publisher: {
      "@type": "Organization",
      name: "WebStudio",
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
      name: "WebStudio",
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
          name: "WebStudio",
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
