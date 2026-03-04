import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { LeadFormSection } from "@/components/sections";
import { breadcrumbSchema } from "@/lib/schema";
import { sectionPresets } from "@/lib/motion";

interface WhyAppItem {
  number: string;
  title: string;
  description: string;
}

interface TypeItem {
  title: string;
  subtitle: string;
  description: string;
}

interface CapabilityItem {
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.appDev.meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
    },
  };
}

/**
 * App Development Page — страница разработки приложений
 */
export default async function AppDevelopmentPage() {
  const t = await getTranslations("pages.appDev");
  const tForm = await getTranslations("leadForm");

  const whyItems = t.raw("whyApp.items") as WhyAppItem[];
  const typeItems = t.raw("types.items") as TypeItem[];
  const capabilityItems = t.raw("capabilities.items") as CapabilityItem[];
  const processSteps = t.raw("process.steps") as ProcessStep[];

  return (
    <main>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: t("meta.title"), url: "/app-development" },
          ])),
        }}
      />

      {/* Hero Section */}
      <section className="pt-24 pb-20 lg:pt-40 lg:pb-28 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("heroCaption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="mb-6">
              <BrokenText
                text={t("heroTitle")}
                spaced
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-8">
              {t("heroDescription")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.3}>
            <CtaButton variant="primary" size="lg" className="hover-lift">
              {tForm("cta")}
            </CtaButton>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Why App Section — 3 numbered blocks */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
        <Container>
          <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("whyApp.caption")}
            </span>
            <h2>
              <BrokenText
                text={t("whyApp.title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            staggerDelay={sectionPresets.grid.stagger}
          >
            {whyItems.map((item) => (
              <StaggerItem key={item.number}>
                <div className="flex flex-col gap-4">
                  <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-line)] leading-none">
                    {item.number}
                  </span>
                  <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-body text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Types Section — 3 cards */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("types.caption")}
            </span>
            <h2>
              <BrokenText
                text={t("types.title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            staggerDelay={sectionPresets.grid.stagger}
          >
            {typeItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 lg:p-8 bg-[var(--color-background-alt)] border border-[var(--color-line)] h-full">
                  <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
                    {item.subtitle}
                  </span>
                  <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Capabilities Section — 6 compact cards */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
        <Container>
          <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("capabilities.caption")}
            </span>
            <h2>
              <BrokenText
                text={t("capabilities.title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            staggerDelay={sectionPresets.denseGrid.stagger}
          >
            {capabilityItems.map((item) => (
              <StaggerItem key={item.title}>
                <div className="p-6 bg-[var(--color-background)] border border-[var(--color-line)] h-full">
                  <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Process Section — 5 numbered steps */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up" className="mb-12 lg:mb-20">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("process.caption")}
            </span>
            <h2>
              <BrokenText
                text={t("process.title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8"
            staggerDelay={sectionPresets.denseGrid.stagger}
          >
            {processSteps.map((step) => (
              <StaggerItem key={step.number}>
                <div>
                  <span className="block text-5xl sm:text-6xl xl:text-7xl font-display font-bold text-[var(--color-line)] mb-4 leading-none">
                    {step.number}
                  </span>
                  <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Lead Form */}
      <LeadFormSection
        title={tForm("title")}
        subtitle={tForm("subtitle")}
      />
    </main>
  );
}
