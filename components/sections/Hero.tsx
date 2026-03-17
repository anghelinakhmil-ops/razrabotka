"use client";

import { lazy, Suspense } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { BrokenText } from "@/components/ui/BrokenText";
import { trackCtaClick } from "@/lib/analytics";
import { useLenis } from "@/components/motion/LenisProvider";

const ParticleField = lazy(() =>
  import("@/components/ui/ParticleField").then((m) => ({ default: m.ParticleField }))
);

/**
 * Hero — fullscreen секция с анимированными частицами
 *
 * Стиль: Premium-minimal / Architectural
 * Все анимации через CSS — без Framer Motion для быстрого LCP.
 */
export function Hero() {
  const t = useTranslations("hero");
  const lenis = useLenis();

  const handleScrollToNext = () => {
    const nextSection = document.getElementById("benefits");
    if (nextSection) {
      if (lenis) {
        lenis.scrollTo(nextSection);
      } else {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background: Deep Espresso + particle animation */}
      <div className="absolute inset-0 bg-[#252321]" />
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Content — centered */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 text-center">
        {/* H1 — Headline */}
        <h1 className="flex flex-col items-center gap-2 mb-8 animate-hero-fade-in">
          <BrokenText
            text={t("line1")}
            spaced
            className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight"
          />
          <BrokenText
            text={t("line2")}
            spaced
            className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight"
          />
          <BrokenText
            text={t("line3")}
            spaced
            className="text-white/60 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium mt-2"
          />
        </h1>

        {/* Subtitle */}
        <p className="text-body-lg text-white/70 max-w-2xl lg:max-w-none mx-auto mb-4 animate-hero-fade-in-delayed-1">
          {t("subtitle")}{" "}
          <span className="text-white font-medium">{t("subtitleExperts")}</span>,{" "}
          <span className="text-white font-medium">{t("subtitleBusiness")}</span>,
          <br className="lg:hidden" />
          <span className="text-white font-medium"> {t("subtitleEcommerce")}</span>,{" "}
          <span className="text-white font-medium">{t("subtitleCourses")}</span>{" "}
          {t("subtitleAnd")}{" "}
          <span className="text-white font-medium">{t("subtitleEvents")}</span>
        </p>

        {/* Offer line */}
        <p className="text-body text-white/50 max-w-xl lg:max-w-none mx-auto mb-10 animate-hero-fade-in-delayed-2">
          {t("offerLine1")}
          <br className="lg:hidden" />
          {t("offerLine2")}
        </p>

        {/* 2 CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-hero-fade-in-delayed-3">
          <Button
            variant="outline"
            size="lg"
            as={Link}
            href="/brief"
            className="border-white text-white hover:bg-white hover:text-[var(--color-text-primary)]"
          >
            {t("cta")}
          </Button>
          <span onClick={() => trackCtaClick("hero", t("ctaCases"), "/")}>
            <Button
              variant="ghost"
              size="lg"
              as={Link}
              href="/cases"
              className="text-white hover:bg-white/10"
            >
              {t("ctaCases")}
            </Button>
          </span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={handleScrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer z-10 animate-hero-fade-in-delayed-4"
        aria-label={t("ariaScroll")}
      >
        <span className="text-caption">{t("scroll")}</span>
        <div className="w-[1px] h-8 bg-current animate-scroll-pulse" />
      </button>
    </section>
  );
}

export default Hero;
