"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { BrokenText } from "@/components/ui/BrokenText";
import { ease, duration } from "@/lib/motion";
import { trackCtaClick } from "@/lib/analytics";
import { useLenis } from "@/components/motion/LenisProvider";

interface HeroProps {
  /** Callback для CTA кнопки */
  onCtaClick?: () => void;
  /** URL фонового изображения */
  imageSrc?: string;
}

/**
 * Hero — fullscreen секция с фоновым изображением
 *
 * Стиль: Premium-minimal / Architectural (референс: THE BRIDGE)
 * Текст по центру поверх тёмного overlay на фото.
 */
export function Hero({ onCtaClick, imageSrc }: HeroProps) {
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
      {/* Background: fallback color + image + overlay */}
      <div className="absolute inset-0 bg-[var(--color-text-primary)]" />
      <Image
        src={imageSrc || "/images/hero-bg.jpg"}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content — centered */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 text-center">
        {/* Caption */}
        <motion.p
          className="text-caption text-white/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.normal, ease, delay: 0.2 }}
        >
          {t("caption")}
        </motion.p>

        {/* H1 — Headline */}
        <motion.h1
          className="flex flex-col items-center gap-2 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.slow, ease, delay: 0.4 }}
        >
          <BrokenText
            text={t("line1")}
            spaced
            mixPattern="every-3"
            className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight"
          />
          <BrokenText
            text={t("line2")}
            spaced
            mixPattern="every-3"
            className="text-white text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight"
          />
          <BrokenText
            text={t("line3")}
            spaced
            mixPattern="every-3"
            className="text-white/60 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium mt-2"
          />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-body-lg text-white/70 max-w-lg mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.normal, ease, delay: 0.6 }}
        >
          {t("subtitle")}{" "}
          <span className="text-white font-medium">{t("subtitleExperts")}</span>,{" "}
          <span className="text-white font-medium">{t("subtitleEcommerce")}</span>{" & "}
          <span className="text-white font-medium">{t("subtitleBusiness")}</span>
        </motion.p>

        {/* 2 CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration.normal, ease, delay: 0.8 }}
        >
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
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.normal, ease, delay: 1.2 }}
        aria-label={t("ariaScroll")}
      >
        <span className="text-caption">{t("scroll")}</span>
        <motion.div
          className="w-[1px] h-8 bg-current"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}

export default Hero;
