import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { RevealOnScroll } from "@/components/motion";
import { Link } from "@/i18n/navigation";
import { LeadFormSection } from "@/components/sections";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { ServicesContent } from "./ServicesContent";
import { getPageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
    alternates: getPageAlternates("/services", locale),
  };
}

/**
 * Services Page — страница услуг
 *
 * 6 категорий × 3 тира (Start / Standard / Pro)
 * Переключатель региона (Украина / Европа)
 */
export default async function ServicesPage() {
  const t = await getTranslations("pages.services");
  const tNav = await getTranslations("nav");

  const categories = t.raw("categories") as { title: string; description: string }[];
  /** Базовые цены (EUR, min Start-тир) для Schema.org */
  const basePrices: Record<number, string> = {
    0: "500",   // experts
    1: "650",   // business
    2: "400",   // landing
    3: "2500",  // ecommerce
    4: "500",   // courses
    5: "400",   // events
  };
  const services = categories.map((cat, index) => ({
    name: cat.title,
    description: cat.description,
    price: basePrices[index],
  }));

  return (
    <main>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(services)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: tNav("home"), url: "/" },
              { name: t("title"), url: "/services" },
            ])
          ),
        }}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-20 lg:pt-40 lg:pb-28 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-accent)] mb-4 block">
              {t("caption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="mb-6">
              <BrokenText
                text={t("title")}
                spaced
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
              {t("description")}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Interactive Content (client) */}
      <ServicesContent />

      {/* Cross-link to Cases */}
      <section className="pb-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
              <p className="text-body text-[var(--color-text-secondary)]">
                {t("casesLinkText")}
              </p>
              <Link
                href="/cases"
                className="text-body font-medium text-[var(--color-text-primary)] underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
              >
                {t("casesLinkLabel")} →
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Lead Form */}
      <LeadFormSection
        title={t("formTitle")}
        subtitle={t("formSubtitle")}
      />
    </main>
  );
}
