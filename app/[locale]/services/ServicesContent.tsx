"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { TierCard } from "@/components/ui/TierCard";
import { RevealOnScroll } from "@/components/motion";
import { sectionPresets } from "@/lib/motion";
import { useRegion } from "@/components/providers/RegionProvider";
import { getFormattedPrice } from "@/lib/pricing";
import type { PriceId } from "@/lib/pricing";

interface TierData {
  tier: "start" | "standard" | "pro";
  audience: string;
  features: string[];
  timeline: string;
}

interface CategoryData {
  id: string;
  title: string;
  description: string;
  tiers: TierData[];
}

interface AdditionalServiceItem {
  title: string;
  description: string;
}

interface SupportPackageData {
  tier: "start" | "standard" | "pro";
  name: string;
  audience: string;
  features: string[];
  limits: string;
}

interface SupportIncludedItem {
  tier: string;
  text: string;
}

const categoryNumbers = ["01", "02", "03", "04", "05", "06"];

/**
 * ServicesContent — клиентская интерактивная часть страницы услуг
 *
 * Содержит 6 категорий с 3 тирами, дополнительные услуги.
 * Ценовая группа определяется автоматически по гео-детекции.
 */
export function ServicesContent() {
  const t = useTranslations("pages.services");
  const { regionCode } = useRegion();

  const categories = t.raw("categories") as CategoryData[];
  const tierLabels = t.raw("tierLabels") as Record<string, string>;
  const additionalItems = t.raw("additionalServices.items") as AdditionalServiceItem[];

  return (
    <>
      {/* Quick Nav */}
      <section className="py-8 bg-[var(--color-background-alt)] border-y border-[var(--color-line)]">
        <Container>
          <div className="flex flex-wrap justify-center gap-3 lg:gap-6">
            {categories.map((cat, index) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <span className="text-caption text-[var(--color-accent)]">
                  {categoryNumbers[index]}
                </span>
                {cat.title}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Category Sections */}
      {categories.map((category, catIndex) => {
        const isEven = catIndex % 2 === 1;

        return (
          <section
            key={category.id}
            id={category.id}
            className={`py-[var(--section-gap)] ${isEven ? "bg-[var(--color-background-alt)]" : "bg-[var(--color-background)]"}`}
          >
            <Container>
              {/* Category Header */}
              <div className="mb-12 lg:mb-16">
                <RevealOnScroll direction="up">
                  <span className="text-caption text-[var(--color-accent)] mb-4 block">
                    {categoryNumbers[catIndex]}
                  </span>
                </RevealOnScroll>

                <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
                  <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
                    {category.title}
                  </h2>
                </RevealOnScroll>

                <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
                  <p className="text-body text-[var(--color-text-secondary)] max-w-2xl">
                    {category.description}
                  </p>
                </RevealOnScroll>
              </div>

              {/* Tier Cards */}
              <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 3}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                  {category.tiers.map((tier) => (
                    <TierCard
                      key={tier.tier}
                      tier={tier.tier}
                      tierLabel={tierLabels[tier.tier]}
                      audience={tier.audience}
                      features={tier.features}
                      timeline={tier.timeline}
                      price={getFormattedPrice(regionCode, `${category.id}-${tier.tier}` as PriceId)}
                      timelineLabel={t("timelineLabel")}
                      priceLabel={t("priceLabel")}
                      orderButton={t("orderButton")}
                      featuresTitle={t("featuresTitle")}
                      audienceTitle={t("audienceTitle")}
                      recommended={t("recommended")}
                    />
                  ))}
                </div>
              </RevealOnScroll>
            </Container>
          </section>
        );
      })}

      {/* Price Note */}
      <section className="py-6 bg-[var(--color-background)]">
        <Container>
          <p className="text-caption text-[var(--color-text-muted)] text-center">
            {t("priceNote")}
          </p>
        </Container>
      </section>

      {/* Additional Services */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-accent)] mb-4 block">
              {t("additionalServices.caption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <h2 className="mb-12 lg:mb-16">
              <BrokenText
                text={t("additionalServices.title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {additionalItems.map((item, index) => (
              <RevealOnScroll
                key={index}
                direction="up"
                delay={sectionPresets.cascade.step * (index + 2)}
              >
                <div className="p-6 lg:p-8 border border-[var(--color-line)] bg-[var(--color-background)]">
                  <h3 className="text-[18px] font-display font-bold text-[var(--color-text-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* Support Section */}
      <SupportSection />

      {/* App Development Banner */}
      <section className="py-12 lg:py-16 bg-[var(--color-background)] border-y border-[var(--color-line)]">
        <Container>
          <RevealOnScroll direction="up">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-h3 font-display font-bold text-[var(--color-text-primary)] text-center sm:text-left">
                {t("appDevBanner")}
              </p>
              <Link
                href="/app-development"
                className="text-body font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-70 transition-opacity whitespace-nowrap"
              >
                {t("appDevBannerCta")} →
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Cases Banner */}
      <section className="py-12 lg:py-16 bg-[var(--color-background-alt)] border-b border-[var(--color-line)]">
        <Container>
          <RevealOnScroll direction="up">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-h3 font-display font-bold text-[var(--color-text-primary)] text-center sm:text-left">
                {t("casesBanner")}
              </p>
              <Link
                href="/cases"
                className="text-body font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-70 transition-opacity whitespace-nowrap"
              >
                {t("casesBannerCta")} →
              </Link>
            </div>
          </RevealOnScroll>
        </Container>
      </section>
    </>
  );
}

/**
 * SupportSection — секция пакетов сопровождения
 */
function SupportSection() {
  const t = useTranslations("pages.services.support");
  const tServices = useTranslations("pages.services");
  const { regionCode } = useRegion();
  const tierLabels = tServices.raw("tierLabels") as Record<string, string>;
  const recommendedLabel = tServices("recommended");

  const packages = t.raw("packages") as SupportPackageData[];
  const includedItems = t.raw("includedItems") as SupportIncludedItem[];

  return (
    <section id="support" className="py-[var(--section-gap)] bg-[var(--color-bg-dark)]">
      <Container>
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-accent)] mb-4 block">
              {t("caption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <h2 className="mb-4">
              <BrokenText
                text={t("title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-background)]"
              />
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
            <p className="text-body text-[var(--color-text-muted)] max-w-2xl">
              {t("description")}
            </p>
          </RevealOnScroll>
        </div>

        {/* Included with package */}
        <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 3}>
          <div className="mb-12 lg:mb-16 p-6 lg:p-8 border border-[var(--color-line-dark)]">
            <h3 className="text-[16px] font-display font-bold text-[var(--color-background)] mb-4 uppercase tracking-[var(--letter-spacing-wide)]">
              {t("includedTitle")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {includedItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-caption text-[var(--color-accent)] shrink-0">
                    {item.tier}
                  </span>
                  <span className="text-body-sm text-[var(--color-text-muted)]">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Monthly Support Packages */}
        <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 4}>
          <h3 className="text-h3 font-display font-bold text-[var(--color-background)] mb-8">
            {t("monthlyTitle")}
          </h3>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 5}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            {packages.map((pkg) => {
              const isStandard = pkg.tier === "standard";
              const price = getFormattedPrice(regionCode, `support-${pkg.tier}` as PriceId);

              return (
                <div
                  key={pkg.tier}
                  className={`relative flex flex-col p-6 lg:p-8 border transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-[var(--color-accent)] ${
                    isStandard
                      ? "border-[var(--color-background)] lg:scale-[1.02]"
                      : "border-[var(--color-line-dark)]"
                  }`}
                >
                  {/* Recommended badge */}
                  {isStandard && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-[var(--color-accent)] text-[var(--color-background)] text-[11px] font-medium uppercase tracking-[var(--letter-spacing-extra-wide)]">
                      {recommendedLabel}
                    </div>
                  )}

                  {/* Tier label */}
                  <span className="text-[11px] font-medium uppercase tracking-[var(--letter-spacing-extra-wide)] text-[var(--color-accent)] mb-2">
                    {tierLabels[pkg.tier]}
                  </span>

                  {/* Package name */}
                  <h4 className="text-[20px] font-display font-bold text-[var(--color-background)] mb-4">
                    {pkg.name}
                  </h4>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-[24px] lg:text-[28px] font-display font-bold text-[var(--color-background)]">
                      {price}
                    </span>
                    <span className="text-body-sm text-[var(--color-text-muted)] ml-1">
                      {t("perMonth")}
                    </span>
                  </div>

                  {/* Limits */}
                  <div className="mb-6 pb-6 border-b border-[var(--color-line-dark)]">
                    <span className="text-[11px] uppercase tracking-[var(--letter-spacing-wide)] text-[var(--color-text-muted)] block mb-1">
                      {t("limitsLabel")}
                    </span>
                    <span className="text-body-sm text-[var(--color-background)]">
                      {pkg.limits}
                    </span>
                  </div>

                  {/* Audience */}
                  <p className="text-body-sm text-[var(--color-text-muted)] mb-6 leading-relaxed">
                    {pkg.audience}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 flex-1">
                    {pkg.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 text-[14px] text-[var(--color-text-light)]"
                      >
                        <svg
                          className="w-4 h-4 shrink-0 mt-0.5 text-[var(--color-accent)]"
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
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

export default ServicesContent;
