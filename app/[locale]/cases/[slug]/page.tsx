import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { TrackPageView } from "@/components/analytics/TrackPageView";

/**
 * Данные кейса
 */
interface CaseData {
  title: string;
  categoryLabel: string;
  description: string;
  client: string;
  year: string;
  duration: string;
  task: string;
  solution: string[];
  results: { value: string; label: string }[];
  technologies: string[];
  screenshots?: string[];
  liveUrl?: string;
}

/**
 * Генерация статических путей
 */
export function generateStaticParams() {
  const slugs = [
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
  return slugs.map((slug) => ({ slug }));
}

/**
 * Динамические metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("pages.caseDetail");
  const casesData = t.raw("cases") as Record<string, CaseData>;
  const caseData = casesData[slug];

  if (!caseData) {
    return { title: t("notFound") };
  }

  return {
    title: `${caseData.title} | ${t("breadcrumbCases")} NAKO Agency`,
    description: caseData.description,
    openGraph: {
      title: `${caseData.title} | NAKO Agency`,
      description: caseData.description,
      type: "article",
    },
  };
}

/**
 * Case Detail Page
 */
export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("pages.caseDetail");
  const casesData = t.raw("cases") as Record<string, CaseData>;
  const caseData = casesData[slug];

  if (!caseData) {
    notFound();
  }

  // Получаем другие кейсы для блока внизу
  const otherCases = Object.entries(casesData)
    .filter(([key]) => key !== slug)
    .slice(0, 3)
    .map(([key, data]) => ({ slug: key, ...data }));

  return (
    <main>
      <TrackPageView event="case_view" params={{ case_slug: slug }} />

      {/* Hero */}
      <HeroSection caseData={caseData} t={t} />

      {/* Preview Image */}
      <PreviewSection t={t} />

      {/* Task */}
      <TaskSection task={caseData.task} t={t} />

      {/* Solution */}
      <SolutionSection solution={caseData.solution} t={t} />

      {/* Results */}
      <ResultsSection results={caseData.results} t={t} />

      {/* Technologies */}
      <TechnologiesSection technologies={caseData.technologies} t={t} />

      {/* Screenshots Gallery */}
      {caseData.screenshots && caseData.screenshots.length > 0 && (
        <GallerySection screenshots={caseData.screenshots} t={t} />
      )}

      {/* Other Cases */}
      <OtherCasesSection cases={otherCases} t={t} />

      {/* CTA */}
      <CTASection t={t} />
    </main>
  );
}

type TranslationFn = ReturnType<typeof import("next-intl").useTranslations>;

/**
 * Hero Section
 */
function HeroSection({ caseData, t }: { caseData: CaseData; t: TranslationFn }) {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M3 8L7 4M3 8L7 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t("backLink")}
          </Link>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.1}>
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            {caseData.categoryLabel}
          </span>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.2}>
          <h1 className="text-h1 font-display font-bold text-[var(--color-text-primary)] mb-6">
            {caseData.title}
          </h1>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.3}>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-8">
            {caseData.description}
          </p>
        </RevealOnScroll>

        {/* Meta info */}
        <RevealOnScroll direction="up" delay={0.4}>
          <div className="flex flex-wrap gap-8 text-body-sm">
            <div>
              <span className="text-[var(--color-text-muted)] block">{t("clientLabel")}</span>
              <span className="text-[var(--color-text-primary)] font-medium">
                {caseData.client}
              </span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] block">{t("yearLabel")}</span>
              <span className="text-[var(--color-text-primary)] font-medium">
                {caseData.year}
              </span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] block">{t("durationLabel")}</span>
              <span className="text-[var(--color-text-primary)] font-medium">
                {caseData.duration}
              </span>
            </div>
            {caseData.liveUrl && (
              <div>
                <span className="text-[var(--color-text-muted)] block">{t("siteLabel")}</span>
                <a
                  href={caseData.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-primary)] font-medium hover:underline"
                >
                  {t("openLink")}
                </a>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * Preview Section
 */
function PreviewSection({ t }: { t: TranslationFn }) {
  return (
    <section className="pb-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up">
          <div className="aspect-[16/9] bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm overflow-hidden">
            {/* Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 border border-[var(--color-line)] rounded-sm" />
                <span className="text-caption text-[var(--color-text-muted)]">
                  {t("previewAlt")}
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * Task Section
 */
function TaskSection({ task, t }: { task: string; t: TranslationFn }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <div className="max-w-3xl">
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              01
            </span>
            <h2 className="mb-6">
              <BrokenText
                text={t("taskTitle")}
                spaced
                mixPattern="every-3"
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
              {task}
            </p>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

/**
 * Solution Section
 */
function SolutionSection({ solution, t }: { solution: string[]; t: TranslationFn }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <div className="max-w-3xl">
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              02
            </span>
            <h2 className="mb-8">
              <BrokenText
                text={t("solutionTitle")}
                spaced
                mixPattern="every-3"
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {solution.map((item, index) => (
              <StaggerItem key={index}>
                <div className="flex gap-4">
                  <span className="text-h4 font-display font-bold text-[var(--color-line)] leading-none flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body text-[var(--color-text-secondary)]">
                    {item}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}

/**
 * Results Section
 */
function ResultsSection({
  results,
  t,
}: {
  results: { value: string; label: string }[];
  t: TranslationFn;
}) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-text-primary)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12 text-center">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            03
          </span>
          <h2>
            <BrokenText
              text={t("resultsTitle")}
              spaced
              mixPattern="every-3"
              className="text-h2 font-display font-bold text-[var(--color-background)]"
            />
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          staggerDelay={0.1}
        >
          {results.map((result, index) => (
            <StaggerItem key={index}>
              <div className="text-center">
                <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-background)] leading-none block mb-2">
                  {result.value}
                </span>
                <span className="text-body-sm text-[var(--color-text-light)]">
                  {result.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * Technologies Section
 */
function TechnologiesSection({ technologies, t }: { technologies: string[]; t: TranslationFn }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up" className="text-center">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            {t("techTitle")}
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm text-body-sm text-[var(--color-text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * Gallery Section
 */
function GallerySection({ screenshots, t }: { screenshots: string[]; t: TranslationFn }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12">
          <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)]">
            {t("galleryTitle")}
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          staggerDelay={0.1}
        >
          {screenshots.map((src, index) => (
            <StaggerItem key={index}>
              <div className="aspect-[4/3] bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm overflow-hidden">
                <Image
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * Other Cases Section
 */
function OtherCasesSection({
  cases,
  t,
}: {
  cases: (CaseData & { slug: string })[];
  t: TranslationFn;
}) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12">
          <h2>
            <BrokenText
              text={t("otherCasesTitle")}
              spaced
              mixPattern="every-3"
              className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {cases.map((caseItem) => (
            <StaggerItem key={caseItem.slug}>
              <Link
                href={`/cases/${caseItem.slug}`}
                className="group block p-6 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
              >
                <span className="text-caption text-[var(--color-text-muted)] block mb-2">
                  {caseItem.categoryLabel}
                </span>
                <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-secondary)] transition-colors">
                  {caseItem.title}
                </h3>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * CTA Section
 */
function CTASection({ t }: { t: TranslationFn }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll direction="up">
            <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
              {t("ctaTitle")}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body text-[var(--color-text-muted)] mb-8">
              {t("ctaText")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <CtaButton variant="primary" size="lg">
              {t("ctaButton")}
            </CtaButton>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
