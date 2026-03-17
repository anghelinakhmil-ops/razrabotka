import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "NAKO Agency — Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Blog post titles per locale (from translations).
 * Edge runtime cannot use next-intl server helpers,
 * so we keep a lightweight lookup duplicated here.
 */
const POST_TITLES: Record<string, Record<string, string>> = {
  "website-cost-for-business-2026": {
    en: "How Much Does a Website Cost for Business in 2026?",
    ru: "Сколько стоит сайт для бизнеса в 2026?",
    uk: "Скільки коштує сайт для бізнесу в 2026?",
    ro: "Cât costă un site pentru afaceri în 2026?",
    pl: "Ile kosztuje strona dla firmy w 2026?",
    de: "Was kostet eine Website für Unternehmen 2026?",
    it: "Quanto costa un sito web per aziende nel 2026?",
    fr: "Combien coûte un site web pour entreprise en 2026 ?",
  },
  "what-website-your-business-needs": {
    en: "What Type of Website Does Your Business Need?",
    ru: "Какой сайт нужен вашему бизнесу?",
    uk: "Який сайт потрібен вашому бізнесу?",
    ro: "Ce tip de site are nevoie afacerea ta?",
    pl: "Jaki typ strony potrzebuje Twoja firma?",
    de: "Welche Art von Website braucht Ihr Unternehmen?",
    it: "Di che tipo di sito ha bisogno la tua azienda?",
    fr: "De quel type de site votre entreprise a-t-elle besoin ?",
  },
  "why-ads-fail-without-good-website": {
    en: "Why Ads Fail Without a Good Website",
    ru: "Почему реклама не работает без хорошего сайта",
    uk: "Чому реклама не працює без хорошого сайту",
    ro: "De ce reclamele eșuează fără un site bun",
    pl: "Dlaczego reklamy zawodzą bez dobrej strony",
    de: "Warum Werbung ohne gute Website scheitert",
    it: "Perché la pubblicità fallisce senza un buon sito",
    fr: "Pourquoi la publicité échoue sans un bon site",
  },
  "how-many-leads-your-business-loses": {
    en: "How Many Leads Your Business Loses",
    ru: "Сколько заявок теряет ваш бизнес",
    uk: "Скільки заявок втрачає ваш бізнес",
    ro: "Câte lead-uri pierde afacerea ta",
    pl: "Ile leadów traci Twoja firma",
    de: "Wie viele Leads Ihr Unternehmen verliert",
    it: "Quanti lead perde la tua azienda",
    fr: "Combien de leads votre entreprise perd",
  },
  "how-to-choose-web-contractor": {
    en: "How to Choose a Web Development Contractor",
    ru: "Как выбрать подрядчика для разработки сайта",
    uk: "Як обрати підрядника для розробки сайту",
    ro: "Cum să alegi un contractor web",
    pl: "Jak wybrać wykonawcę strony internetowej",
    de: "Wie man einen Web-Entwickler auswählt",
    it: "Come scegliere un fornitore di sviluppo web",
    fr: "Comment choisir un prestataire de développement web",
  },
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const title =
    POST_TITLES[slug]?.[locale] ??
    POST_TITLES[slug]?.en ??
    slug.replace(/-/g, " ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#252321",
          padding: "60px",
        }}
      >
        {/* Top: category label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "4px",
              background: "#A67B5B",
            }}
          />
          <span
            style={{
              color: "#A67B5B",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Blog
          </span>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "#F9F7F2",
              fontSize: title.length > 60 ? "42px" : "52px",
              fontWeight: 700,
              lineHeight: 1.25,
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "#A67B5B",
              }}
            />
            <span
              style={{
                color: "#F9F7F2",
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              NAKO AGENCY
            </span>
          </div>
          <span
            style={{
              color: "rgba(249,247,242,0.4)",
              fontSize: "20px",
            }}
          >
            nakoagency.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
