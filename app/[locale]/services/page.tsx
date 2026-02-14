import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { LeadFormSection } from "@/components/sections";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Пакеты услуг: сайт для эксперта, интернет-магазин, лендинг. Фиксированные сроки, прозрачные цены. Узнайте, что входит в каждый пакет.",
  openGraph: {
    title: "Услуги | NAKO Agency",
    description: "Пакеты услуг: сайт для эксперта, интернет-магазин, лендинг.",
    type: "website",
  },
};

interface PackageData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  timeline: string;
  features: string[];
  idealFor: string[];
}

interface ComparisonRow {
  label: string;
  expert: string;
  ecommerce: string;
  landing: string;
}

/**
 * Services Page — страница услуг
 */
export default async function ServicesPage() {
  const t = await getTranslations("pages.services");

  const packages = t.raw("packages") as PackageData[];
  const comparisonRows = t.raw("comparisonRows") as ComparisonRow[];
  const packageNumbers = ["01", "02", "03"];

  const services = packages.map((pkg) => ({
    name: pkg.title,
    description: pkg.description,
    price: pkg.price.replace(/от |from /i, ""),
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
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: t("title"), url: "/services" },
          ])),
        }}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("caption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="mb-6">
              <BrokenText
                text={t("title")}
                spaced
                mixPattern="every-3"
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

      {/* Quick Navigation */}
      <section className="py-8 bg-[var(--color-background-alt)] border-y border-[var(--color-line)]">
        <Container>
          <RevealOnScroll direction="up">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
              {packages.map((pkg, index) => (
                <a
                  key={pkg.id}
                  href={`#${pkg.id}`}
                  className="flex items-center gap-2 text-body text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <span className="text-caption text-[var(--color-text-muted)]">
                    {packageNumbers[index]}
                  </span>
                  {pkg.title}
                </a>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Package Sections */}
      {packages.map((pkg, index) => {
        const number = packageNumbers[index];
        const isEven = (index + 1) % 2 === 0;

        return (
          <section
            key={pkg.id}
            id={pkg.id}
            className={`py-[var(--section-gap)] ${isEven ? "bg-[var(--color-background-alt)]" : "bg-[var(--color-background)]"}`}
          >
            <Container>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Info */}
                <div className={isEven ? "lg:order-2" : ""}>
                  <RevealOnScroll direction="up">
                    <span className="text-6xl sm:text-8xl lg:text-9xl font-display font-bold text-[var(--color-line)] leading-none block mb-6">
                      {number}
                    </span>
                  </RevealOnScroll>

                  <RevealOnScroll direction="up" delay={0.1}>
                    <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
                      {pkg.subtitle}
                    </span>
                    <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
                      {pkg.title}
                    </h2>
                  </RevealOnScroll>

                  <RevealOnScroll direction="up" delay={0.2}>
                    <p className="text-body text-[var(--color-text-secondary)] mb-8">
                      {pkg.description}
                    </p>
                  </RevealOnScroll>

                  {/* Price & Timeline */}
                  <RevealOnScroll direction="up" delay={0.3}>
                    <div className="flex flex-wrap gap-6 mb-8">
                      <div>
                        <span className="text-caption text-[var(--color-text-muted)] block mb-1">
                          {t("priceLabel")}
                        </span>
                        <span className="text-h3 font-display font-bold text-[var(--color-text-primary)]">
                          {pkg.price}
                        </span>
                      </div>
                      <div>
                        <span className="text-caption text-[var(--color-text-muted)] block mb-1">
                          {t("timelineLabel")}
                        </span>
                        <span className="text-h3 font-display font-bold text-[var(--color-text-primary)]">
                          {pkg.timeline}
                        </span>
                      </div>
                    </div>
                  </RevealOnScroll>

                  {/* CTA */}
                  <RevealOnScroll direction="up" delay={0.4}>
                    <CtaButton
                      variant="primary"
                      size="lg"
                      className="hover-lift"
                    >
                      {t("orderButton")}
                    </CtaButton>
                  </RevealOnScroll>
                </div>

                {/* Right: Features & Ideal For */}
                <div className={isEven ? "lg:order-1" : ""}>
                  {/* Features Checklist */}
                  <RevealOnScroll direction="up" delay={0.2}>
                    <div className="mb-10">
                      <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6">
                        {t("featuresTitle")}
                      </h3>
                      <StaggerContainer className="space-y-3" staggerDelay={0.05}>
                        {pkg.features.map((feature, featureIndex) => (
                          <StaggerItem key={featureIndex}>
                            <div className="flex items-start gap-3">
                              <svg
                                className="w-5 h-5 text-[var(--color-text-primary)] flex-shrink-0 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span className="text-body text-[var(--color-text-secondary)]">
                                {feature}
                              </span>
                            </div>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </div>
                  </RevealOnScroll>

                  {/* Ideal For */}
                  <RevealOnScroll direction="up" delay={0.3}>
                    <div className="p-6 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm">
                      <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-4">
                        {t("idealForTitle")}
                      </h3>
                      <ul className="space-y-2">
                        {pkg.idealFor.map((item, idealIndex) => (
                          <li
                            key={idealIndex}
                            className="flex items-center gap-2 text-body-sm text-[var(--color-text-muted)]"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </RevealOnScroll>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Comparison Table */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up" className="mb-12 lg:mb-16 text-center">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("comparisonCaption")}
            </span>
            <h2>
              <BrokenText
                text={t("comparisonTitle")}
                spaced
                mixPattern="every-3"
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            {/* Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 border-b border-[var(--color-line)]" />
                    {packages.map((pkg, index) => (
                      <th
                        key={pkg.id}
                        className="text-center p-4 border-b border-[var(--color-line)]"
                      >
                        <span className="text-caption text-[var(--color-text-muted)] block mb-1">
                          {packageNumbers[index]}
                        </span>
                        <span className="text-h4 font-display font-bold text-[var(--color-text-primary)]">
                          {pkg.title}
                        </span>
                        <span className="text-body-sm text-[var(--color-text-muted)] block mt-1">
                          {pkg.price}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-[var(--color-background-alt)]" : ""}
                    >
                      <td className="p-4 text-body text-[var(--color-text-secondary)] border-b border-[var(--color-line)]">
                        {row.label}
                      </td>
                      <td className="p-4 text-center text-body text-[var(--color-text-primary)] border-b border-[var(--color-line)]">
                        {row.expert}
                      </td>
                      <td className="p-4 text-center text-body text-[var(--color-text-primary)] border-b border-[var(--color-line)]">
                        {row.ecommerce}
                      </td>
                      <td className="p-4 text-center text-body text-[var(--color-text-primary)] border-b border-[var(--color-line)]">
                        {row.landing}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards - Mobile */}
            <div className="lg:hidden space-y-6">
              {packages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="p-6 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm"
                >
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-caption text-[var(--color-text-muted)]">
                      {packageNumbers[index]}
                    </span>
                    <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)]">
                      {pkg.title}
                    </h3>
                  </div>
                  <p className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-4">
                    {pkg.price}
                  </p>
                  <div className="space-y-2 text-body-sm">
                    {comparisonRows.slice(0, 6).map((row, rowIndex) => {
                      const value =
                        pkg.id === "expert"
                          ? row.expert
                          : pkg.id === "ecommerce"
                            ? row.ecommerce
                            : row.landing;
                      return (
                        <div key={rowIndex} className="flex justify-between">
                          <span className="text-[var(--color-text-muted)]">{row.label}</span>
                          <span className="text-[var(--color-text-primary)]">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    variant="outline"
                    size="md"
                    as="a"
                    href={`#${pkg.id}`}
                    className="w-full mt-6"
                  >
                    {t("detailsButton")}
                  </Button>
                </div>
              ))}
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
