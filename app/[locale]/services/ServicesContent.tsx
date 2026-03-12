"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { PricingToggle, type Region } from "@/components/ui/PricingToggle";
import { TierCard } from "@/components/ui/TierCard";
import { RevealOnScroll } from "@/components/motion";
import { sectionPresets } from "@/lib/motion";

interface TierData {
  tier: "start" | "standard" | "pro";
  audience: string;
  features: string[];
  timeline: string;
  priceUA: string;
  priceEU: string;
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

const categoryNumbers = ["01", "02", "03", "04", "05", "06"];

/**
 * ServicesContent — клиентская интерактивная часть страницы услуг
 *
 * Содержит переключатель региона, 6 категорий с 3 тирами,
 * дополнительные услуги.
 */
export function ServicesContent() {
  const t = useTranslations("pages.services");
  const [region, setRegion] = useState<Region>("europe");

  const categories = t.raw("categories") as CategoryData[];
  const regionToggle = t.raw("regionToggle") as { ukraine: string; europe: string };
  const tierLabels = t.raw("tierLabels") as Record<string, string>;
  const additionalItems = t.raw("additionalServices.items") as AdditionalServiceItem[];

  return (
    <>
      {/* Quick Nav + Region Toggle */}
      <section className="py-8 bg-[var(--color-background-alt)] border-y border-[var(--color-line)]">
        <Container>
          <div className="flex flex-col gap-6 items-center">
            {/* Region Toggle */}
            <PricingToggle
              region={region}
              onChange={setRegion}
              labels={regionToggle}
            />

            {/* Category Nav */}
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
                      price={region === "ukraine" ? tier.priceUA : tier.priceEU}
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
    </>
  );
}

export default ServicesContent;
