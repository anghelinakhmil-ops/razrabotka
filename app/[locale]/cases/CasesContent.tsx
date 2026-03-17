"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { sectionPresets } from "@/lib/motion";

/**
 * Данные кейса
 */
interface CaseItem {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  result: string;
  imageSrc?: string;
}

/**
 * Cases Page — страница портфолио
 */
export default function CasesContent() {
  const t = useTranslations("pages.cases");
  const allCases = t.raw("items") as CaseItem[];

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("caption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <h1 className="mb-6">
              <BrokenText
                text={t("title")}
                spaced
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
              {t("description")}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Cases Grid */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            staggerDelay={sectionPresets.grid.stagger}
          >
            {allCases.map((caseItem) => (
              <StaggerItem key={caseItem.slug}>
                <CaseCard caseItem={caseItem} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

/**
 * CaseCard — карточка кейса
 */
function CaseCard({ caseItem }: { caseItem: CaseItem }) {
  const t = useTranslations("pages.cases");
  const { slug, title, categoryLabel, description, result, imageSrc } = caseItem;

  return (
    <Link
      href={`/cases/${slug}`}
      className="group block relative overflow-hidden rounded-sm bg-[var(--color-background-alt)] border border-[var(--color-line)] hover:border-[var(--color-line-dark)] transition-colors duration-300"
    >
      {/* Image / Placeholder */}
      <div className="relative aspect-[4/3] bg-[var(--color-background)] overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-all duration-500 group-hover:scale-105 grayscale-[20%] contrast-[1.05] group-hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute top-1/4 left-0 right-0 h-px bg-[var(--color-line)]" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--color-line)]" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-[var(--color-line)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border border-[var(--color-line)] rounded-sm" />
              </div>
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--color-text-primary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6">
        {/* Category */}
        <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
          {categoryLabel}
        </span>

        {/* Title */}
        <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-text-secondary)] transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-body-sm text-[var(--color-text-muted)] mb-3 line-clamp-2">
          {description}
        </p>

        {/* Result */}
        <p className="text-body font-medium text-[var(--color-text-primary)]">
          {result}
        </p>

        {/* Arrow indicator */}
        <div className="mt-4 flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transition-colors">
          <span>{t("viewCase")}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transform transition-transform group-hover:translate-x-1"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

/**
 * CTA Section
 */
function CTASection() {
  const t = useTranslations("pages.cases");

  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-bg-dark)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll direction="up">
            <h2 className="mb-4">
              <BrokenText
                text={t("ctaTitle")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-background)]"
              />
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <p className="text-body text-[var(--color-text-light)] mb-8">
              {t("ctaText")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton
                variant="primary"
                size="lg"
                style={{ backgroundColor: "#F9F7F2", color: "#1A1A1A", borderColor: "#F9F7F2" }}
              >
                {t("ctaButton")}
              </CtaButton>
              <Button
                variant="outline"
                size="lg"
                as={Link}
                href="/services"
                style={{ backgroundColor: "transparent", color: "#F9F7F2", borderColor: "#F9F7F2" }}
              >
                {t("ctaServicesButton")}
              </Button>
            </div>
            <p className="mt-4">
              <Link
                href="/blog"
                className="text-body-sm text-[var(--color-text-light)] underline hover:text-[var(--color-background)] transition-colors"
              >
                {t("ctaBlogButton")}
              </Link>
            </p>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
