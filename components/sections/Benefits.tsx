"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { RevealOnScroll, StaggerContainer, StaggerItem, SplitTextReveal, ScrollScrubText } from "@/components/motion";
import { ease, duration, sectionPresets } from "@/lib/motion";

/**
 * Данные для одного преимущества
 */
export interface BenefitData {
  /** Номер преимущества (01, 02, ...) */
  number: string;
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle: string;
  /** Описание (текст или ReactNode) */
  description: ReactNode;
  /** Паттерн для «ломаной» типографики заголовка */
  /** URL изображения */
  imageSrc?: string;
  /** Alt текст для изображения */
  imageAlt?: string;
  /** Blur placeholder */
  blurDataURL?: string;
}

interface BenefitsProps {
  /** Массив преимуществ */
  benefits?: BenefitData[];
}

/**
 * Benefits — секция преимуществ
 *
 * Стиль: Premium-minimal / Architectural (референс: THE BRIDGE)
 * Особенности:
 * - Чередующийся layout (изображение слева/справа)
 * - Крупные номера как «каркас»
 * - Stagger анимации
 */
export function Benefits({ benefits }: BenefitsProps) {
  const t = useTranslations("benefits");

  const IMAGE_SLUGS = ["strategy", "design", "speed", "integrations", "support"];

  const translatedBenefits: BenefitData[] = (t.raw("items") as Array<{
    number: string; title: string; subtitle: string; description: string; imageAlt: string;
  }>).map((item, i) => ({
    number: item.number,
    title: item.title,
    subtitle: item.subtitle,
    description: item.description,
    imageAlt: item.imageAlt,
    imageSrc: `/images/benefits/benefit-${item.number}-${IMAGE_SLUGS[i]}.jpg`,
  }));

  const items = benefits || translatedBenefits;

  return (
    <section
      id="benefits"
      className="py-[var(--section-gap)] bg-[var(--color-background)]"
    >
      <Container>
        {/* Заголовок секции */}
        <div className="mb-20 lg:mb-32">
          <div className="flex flex-col gap-4">
            <SplitTextReveal
              text={t("caption")}
              as="span"
              className="text-caption text-[var(--color-text-muted)]"
              direction="up"
              staggerDelay={sectionPresets.heading.captionStagger}
            />
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: sectionPresets.heading.titleDuration, ease, delay: sectionPresets.heading.titleDelay }}
            >
              <BrokenText
                text={t("title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </motion.h2>
          </div>
        </div>

        {/* Список преимуществ */}
        <div className="flex flex-col gap-16 sm:gap-24 lg:gap-40">
          {items.map((benefit, index) => (
            <BenefitItem
              key={benefit.number}
              {...benefit}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * Props для BenefitItem
 */
interface BenefitItemProps extends BenefitData {
  /** Развернуть layout (изображение слева) */
  reversed?: boolean;
}

/**
 * BenefitItem — один блок преимущества
 */
function BenefitItem({
  number,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  blurDataURL,
  reversed = false,
}: BenefitItemProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        reversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Текстовый блок */}
      <div className={`flex flex-col gap-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
        <StaggerContainer className="flex flex-col gap-4">
          {/* Номер */}
          <StaggerItem>
            <motion.span
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-[var(--color-text-primary)]/10 leading-none select-none"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.slow, ease }}
            >
              {number}
            </motion.span>
          </StaggerItem>

          {/* Заголовок */}
          <StaggerItem>
            <h3>
              <BrokenText
                text={title}
                spaced
                className="text-h3 font-display font-bold text-[var(--color-text-primary)] tracking-wide"
              />
            </h3>
          </StaggerItem>

          {/* Подзаголовок */}
          <StaggerItem>
            <p className="text-body-lg text-[var(--color-text-secondary)] font-medium">
              {subtitle}
            </p>
          </StaggerItem>

          {/* Описание — scrub-эффект при скролле */}
          <StaggerItem>
            {typeof description === "string" ? (
              <ScrollScrubText
                text={description}
                className="text-body text-[var(--color-text-muted)] max-w-lg"
              />
            ) : (
              <div className="text-body text-[var(--color-text-muted)] max-w-lg">
                {description}
              </div>
            )}
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Визуальный блок */}
      <div className={`${reversed ? "lg:order-1" : "lg:order-2"}`}>
        <RevealOnScroll
          direction={reversed ? "right" : "left"}
          delay={sectionPresets.image.delay}
          duration={sectionPresets.image.duration}
        >
          <div className="relative aspect-[4/3] bg-[var(--color-background-alt)] overflow-hidden">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt || `${title} — ${subtitle}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
              />
            ) : (
              /* Геометрический placeholder */
              <BenefitPlaceholder number={number} />
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

/**
 * BenefitPlaceholder — декоративный placeholder для изображения
 */
function BenefitPlaceholder({ number }: { number: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-2/3 h-2/3">
        {/* Рамки */}
        <motion.div
          className="absolute inset-0 border border-[var(--color-line)]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease, delay: 0.3 }}
        />
        <motion.div
          className="absolute inset-4 border border-[var(--color-line-dark)]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease, delay: 0.4 }}
        />
        {/* Номер внутри */}
        <motion.div
          className="absolute inset-8 bg-[var(--color-text-primary)] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease, delay: 0.5 }}
        >
          <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-background)]">
            {number}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default Benefits;
