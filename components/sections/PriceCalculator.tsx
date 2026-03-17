"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/motion";
import { BrokenText } from "@/components/ui/BrokenText";
import { CtaButton } from "@/components/ui/CtaButton";
import { useRegion } from "@/components/providers/RegionProvider";
import { calculateEstimate } from "@/lib/pricing";
import type { CalcOptions } from "@/lib/pricing";
import { duration, ease } from "@/lib/motion";

const STEPS = ["siteType", "pages", "design", "features", "content", "seo"] as const;
type StepKey = (typeof STEPS)[number];

const SITE_TYPES = ["experts", "business", "landing", "ecommerce", "courses", "events"];
const PAGES_OPTIONS = ["1", "5-10", "10-20", "20+"];
const DESIGN_OPTIONS = ["template", "custom"];
const FEATURE_OPTIONS = ["forms", "crm", "payments", "multilingual", "blog", "account"];
const CONTENT_OPTIONS = ["own", "need"];
const SEO_OPTIONS = ["no", "yes"];

/**
 * PriceCalculator — interactive cost estimator
 */
export function PriceCalculator() {
  const t = useTranslations("pages.services.calculator");
  const tServices = useTranslations("pages.services");
  const { regionCode } = useRegion();

  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<CalcOptions>({
    siteType: "",
    pages: "",
    design: "",
    features: [],
    content: "",
    seo: "",
  });
  const [showResult, setShowResult] = useState(false);

  const stepKey = STEPS[currentStep];
  const totalSteps = STEPS.length;

  const isStepComplete = useMemo(() => {
    switch (stepKey) {
      case "siteType": return selections.siteType !== "";
      case "pages": return selections.pages !== "";
      case "design": return selections.design !== "";
      case "features": return true; // optional
      case "content": return selections.content !== "";
      case "seo": return selections.seo !== "";
      default: return false;
    }
  }, [stepKey, selections]);

  const handleSelect = (key: StepKey, value: string) => {
    if (key === "features") {
      setSelections((prev) => ({
        ...prev,
        features: prev.features.includes(value)
          ? prev.features.filter((f) => f !== value)
          : [...prev.features, value],
      }));
    } else {
      setSelections((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setShowResult(false);
    setSelections({ siteType: "", pages: "", design: "", features: [], content: "", seo: "" });
  };

  const estimate = useMemo(() => {
    if (!showResult) return "";
    return calculateEstimate(regionCode, selections);
  }, [showResult, regionCode, selections]);

  const getOptions = (step: StepKey) => {
    switch (step) {
      case "siteType": return SITE_TYPES;
      case "pages": return PAGES_OPTIONS;
      case "design": return DESIGN_OPTIONS;
      case "features": return FEATURE_OPTIONS;
      case "content": return CONTENT_OPTIONS;
      case "seo": return SEO_OPTIONS;
      default: return [];
    }
  };

  const isSelected = (step: StepKey, value: string) => {
    if (step === "features") return selections.features.includes(value);
    return selections[step] === value;
  };

  return (
    <section id="calculator" className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-accent)] mb-4 block text-center">
              {t("caption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h2 className="mb-4 text-center">
              <BrokenText
                text={t("title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-body text-[var(--color-text-secondary)] text-center mb-12">
              {t("description")}
            </p>
          </RevealOnScroll>

          {/* Progress */}
          {!showResult && (
            <div className="flex items-center gap-1 mb-8">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    i <= currentStep
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-line)]"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={stepKey}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: duration.fast, ease }}
              >
                {/* Step title */}
                <p className="text-caption text-[var(--color-text-muted)] mb-2">
                  {currentStep + 1} / {totalSteps}
                </p>
                <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-6">
                  {t(`steps.${stepKey}.title`)}
                </h3>

                {stepKey === "features" && (
                  <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
                    {t("steps.features.hint")}
                  </p>
                )}

                {/* Options grid */}
                <div className={`grid gap-3 mb-8 ${
                  stepKey === "siteType" ? "grid-cols-1 sm:grid-cols-2" :
                  stepKey === "features" ? "grid-cols-1 sm:grid-cols-2" :
                  "grid-cols-1 sm:grid-cols-2"
                }`}>
                  {getOptions(stepKey).map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect(stepKey, option)}
                      className={`p-4 text-left border rounded-sm transition-all duration-200 cursor-pointer ${
                        isSelected(stepKey, option)
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 text-[var(--color-text-primary)]"
                          : "border-[var(--color-line)] bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:border-[var(--color-line-dark)]"
                      }`}
                    >
                      <span className="text-body-sm font-medium block">
                        {t(`steps.${stepKey}.options.${option}`)}
                      </span>
                      {stepKey === "siteType" && (
                        <span className="text-caption text-[var(--color-text-muted)] mt-1 block">
                          {t(`steps.${stepKey}.descriptions.${option}`)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    ← {t("back")}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={!isStepComplete}
                    className={`px-6 py-3 text-body-sm font-medium transition-all duration-200 cursor-pointer ${
                      isStepComplete
                        ? "bg-[var(--color-text-primary)] text-[var(--color-background)] hover:opacity-90"
                        : "bg-[var(--color-line)] text-[var(--color-text-muted)] cursor-not-allowed"
                    }`}
                  >
                    {currentStep === totalSteps - 1 ? t("calculate") : t("next")} →
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Result */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: duration.normal, ease }}
                className="text-center"
              >
                <p className="text-caption text-[var(--color-text-muted)] mb-4">
                  {t("result.caption")}
                </p>

                <div className="mb-2">
                  <span className="text-caption text-[var(--color-text-muted)]">
                    {tServices("priceFrom")}
                  </span>
                </div>

                <p className="text-[48px] lg:text-[64px] font-display font-bold text-[var(--color-text-primary)] leading-none mb-6">
                  {estimate}
                </p>

                <p className="text-body text-[var(--color-text-secondary)] max-w-lg mx-auto mb-8">
                  {t("result.note")}
                </p>

                {/* Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 text-left max-w-lg mx-auto">
                  <SummaryItem label={t("steps.siteType.title")} value={t(`steps.siteType.options.${selections.siteType}`)} />
                  <SummaryItem label={t("steps.pages.title")} value={t(`steps.pages.options.${selections.pages}`)} />
                  <SummaryItem label={t("steps.design.title")} value={t(`steps.design.options.${selections.design}`)} />
                  <SummaryItem label={t("steps.content.title")} value={t(`steps.content.options.${selections.content}`)} />
                  <SummaryItem label={t("steps.seo.title")} value={t(`steps.seo.options.${selections.seo}`)} />
                  {selections.features.length > 0 && (
                    <SummaryItem
                      label={t("steps.features.title")}
                      value={selections.features.map((f) => t(`steps.features.options.${f}`)).join(", ")}
                    />
                  )}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CtaButton variant="primary" size="lg">
                    {t("result.cta")}
                  </CtaButton>
                  <Link
                    href="/brief"
                    className="inline-flex items-center justify-center px-6 py-3 text-body-sm font-medium border border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-[var(--color-background)] transition-colors"
                  >
                    {t("result.brief")}
                  </Link>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-6 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                >
                  {t("result.reset")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm">
      <span className="text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider block mb-1">
        {label}
      </span>
      <span className="text-body-sm font-medium text-[var(--color-text-primary)]">
        {value}
      </span>
    </div>
  );
}
