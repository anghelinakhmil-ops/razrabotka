import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem, ScrollScrubText } from "@/components/motion";
import { sectionPresets } from "@/lib/motion";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Веб-студия с фокусом на результат. Создаём сайты для экспертов, e-commerce и бизнеса. Узнайте о нашем подходе, ценностях и принципах работы.",
  openGraph: {
    title: "О нас | NAKO Agency",
    description: "Веб-студия с фокусом на результат. Создаём сайты для экспертов, e-commerce и бизнеса.",
    type: "website",
  },
};

/**
 * About Page — страница «О нас»
 */
export default async function AboutPage() {
  const t = await getTranslations("pages.about");

  const values = t.raw("values") as Array<{ number: string; title: string; description: string }>;
  const principles = t.raw("principles") as Array<{ title: string; description: string }>;
  const achievements = t.raw("achievements") as Array<{ value: string; label: string }>;

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 pb-20 lg:pt-40 lg:pb-28 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("heroCaption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <h1 className="mb-6">
              <BrokenText
                text={t("heroTitle")}
                spaced
                mixPattern="every-3"
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <ScrollScrubText
            text={t("heroDescription")}
            className="text-body-lg text-[var(--color-text-muted)] max-w-2xl"
          />
        </Container>
      </section>

      {/* Approach Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <RevealOnScroll direction="up">
                <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
                  {t("approachCaption")}
                </span>
                <h2 className="mb-6">
                  <BrokenText
                    text={t("approachTitle")}
                    spaced
                    mixPattern="every-3"
                    className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
                  />
                </h2>
              </RevealOnScroll>

              <div className="space-y-4 text-body">
                <ScrollScrubText
                  text={t("approachText1")}
                  className="text-[var(--color-text-muted)]"
                />
                <ScrollScrubText
                  text={t("approachText2")}
                  className="text-[var(--color-text-muted)]"
                />
                <ScrollScrubText
                  text={t("approachText3")}
                  className="text-[var(--color-text-muted)]"
                />
              </div>
            </div>

            <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
              <div className="aspect-[4/3] bg-[var(--color-background)] border border-[var(--color-line)] flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl sm:text-8xl font-display font-bold text-[var(--color-line)]">
                    01
                  </span>
                  <p className="text-caption text-[var(--color-text-muted)] mt-4">
                    {t("approachVisualLabel")}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("valuesCaption")}
            </span>
            <h2>
              <BrokenText
                text={t("valuesTitle")}
                spaced
                mixPattern="every-3"
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            staggerDelay={sectionPresets.grid.stagger}
          >
            {values.map((value) => (
              <StaggerItem key={value.number}>
                <div className="flex gap-6">
                  <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-line)] leading-none flex-shrink-0">
                    {value.number}
                  </span>
                  <div>
                    <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
                      {value.title}
                    </h3>
                    <p className="text-body text-[var(--color-text-muted)]">
                      {value.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Principles Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
        <Container>
          <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("principlesCaption")}
            </span>
            <h2>
              <BrokenText
                text={t("principlesTitle")}
                spaced
                mixPattern="every-3"
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            staggerDelay={sectionPresets.denseGrid.stagger}
          >
            {principles.map((principle, index) => (
              <StaggerItem key={index}>
                <div className="p-6 bg-[var(--color-background)] border border-[var(--color-line)] h-full">
                  <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-muted)]">
                    {principle.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Achievements Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up" className="mb-12 lg:mb-16 text-center">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("achievementsCaption")}
            </span>
            <h2>
              <BrokenText
                text={t("achievementsTitle")}
                spaced
                mixPattern="every-3"
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0"
            staggerDelay={sectionPresets.denseGrid.stagger}
          >
            {achievements.map((item, index) => (
              <StaggerItem key={index}>
                <div
                  className={`
                    flex flex-col items-center text-center py-8 lg:py-12
                    ${index < achievements.length - 1 ? "lg:border-r lg:border-[var(--color-line)]" : ""}
                  `}
                >
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-[var(--color-text-primary)] leading-none">
                    {item.value}
                  </span>
                  <p className="mt-4 text-body text-[var(--color-text-muted)]">
                    {item.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-text-primary)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <RevealOnScroll direction="up">
              <h2 className="mb-4">
                <BrokenText
                  text={t("ctaTitle")}
                  spaced
                  mixPattern="every-3"
                  className="text-h2 font-display font-bold text-[var(--color-background)]"
                />
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
              <p className="text-body text-[var(--color-text-light)] mb-8">
                {t("ctaDescription")}
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CtaButton
                  variant="primary"
                  size="lg"
                  className="bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]"
                >
                  {t("ctaCta")}
                </CtaButton>
                <Link href="/cases">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-[var(--color-background)] text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
                  >
                    {t("ctaCases")}
                  </Button>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </main>
  );
}
