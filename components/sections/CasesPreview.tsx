"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerContainer, StaggerItem, SplitTextReveal } from "@/components/motion";
import { ease, duration, sectionPresets } from "@/lib/motion";

/**
 * Данные для одного кейса
 */
export interface CaseData {
  /** Slug для URL */
  slug: string;
  /** Название проекта */
  title: string;
  /** Ниша / категория */
  category: string;
  /** Краткий результат */
  result?: string;
  /** Изображение превью */
  imageSrc?: string;
  /** Alt текст */
  imageAlt?: string;
  /** Blur placeholder */
  blurDataURL?: string;
}

interface CasesPreviewProps {
  /** Массив кейсов */
  cases?: CaseData[];
  /** Максимальное количество карточек */
  limit?: number;
}


/**
 * CasesPreview — превью кейсов на главной
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Сетка карточек (1 → 2 → 3 колонки)
 * - Hover эффекты с overlay
 * - CTA к полному портфолио
 * - Ограничение 6 карточек
 */
export function CasesPreview({
  cases,
  limit = 6,
}: CasesPreviewProps) {
  const t = useTranslations("casesPreview");

  const translatedCases: CaseData[] = (t.raw("items") as Array<{
    slug: string; title: string; category: string; result: string; imageAlt: string;
  }>).map((item) => ({
    slug: item.slug,
    title: item.title,
    category: item.category,
    result: item.result,
    imageAlt: item.imageAlt,
    imageSrc: `/images/cases/case-${item.slug}.jpg`,
  }));

  const items = cases || translatedCases;
  const displayCases = items.slice(0, limit);

  return (
    <section
      id="cases"
      className="py-[var(--section-gap)] bg-[var(--color-background-alt)]"
    >
      <Container>
        {/* Заголовок секции */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
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

            {/* CTA Desktop */}
            <motion.div
              className="hidden sm:block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.normal, ease, delay: 0.5 }}
            >
              <Button
                variant="link"
                size="md"
                as={Link}
                href="/cases"
              >
                {t("viewAll")}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Сетка кейсов */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={sectionPresets.grid.stagger}
        >
          {displayCases.map((caseItem) => (
            <StaggerItem key={caseItem.slug}>
              <CaseCard {...caseItem} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA Mobile */}
        <RevealOnScroll direction="up" className="mt-10 sm:hidden">
          <Button
            variant="link"
            size="md"
            as={Link}
            href="/cases"
          >
            {t("viewAll")}
          </Button>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * CaseCard — карточка кейса
 */
function CaseCard({
  slug,
  title,
  category,
  result,
  imageSrc,
  imageAlt,
  blurDataURL,
}: CaseData) {
  const t = useTranslations("casesPreview");
  return (
    <Link
      href={`/cases/${slug}`}
      className="group block relative overflow-hidden bg-[var(--color-background)] border border-[var(--color-line)] hover:border-[var(--color-line-dark)] transition-colors duration-300 hover-card"
    >
      {/* Изображение / Placeholder */}
      <div className="relative aspect-[4/3] bg-[var(--color-background-alt)] overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-105 grayscale-[20%] contrast-[1.05] group-hover:grayscale-0"
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
          />
        ) : (
          <CasePlaceholder category={category} />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[var(--color-text-primary)] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      {/* Контент */}
      <div className="p-5 lg:p-6">
        {/* Категория */}
        <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
          {category}
        </span>

        {/* Название */}
        <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-text-secondary)] transition-colors">
          {title}
        </h3>

        {/* Результат */}
        {result && (
          <p className="text-body-sm text-[var(--color-text-muted)]">
            {result}
          </p>
        )}

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
 * CasePlaceholder — геометрический placeholder для изображения
 */
function CasePlaceholder({ category }: { category: string }) {
  // Разные паттерны для разных категорий
  const patterns: Record<string, { bg: string; accent: string }> = {
    Эксперт: { bg: "bg-gradient-to-br from-gray-100 to-gray-200", accent: "bg-gray-300" },
    "E-commerce": { bg: "bg-gradient-to-br from-gray-50 to-gray-200", accent: "bg-gray-300" },
    Лендинг: { bg: "bg-gradient-to-br from-gray-100 to-gray-100", accent: "bg-gray-200" },
  };

  const pattern = patterns[category] || patterns["Эксперт"];

  return (
    <div className={`absolute inset-0 ${pattern.bg} flex items-center justify-center`}>
      {/* Декоративные элементы */}
      <div className="relative w-full h-full">
        {/* Линии */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-[var(--color-line)]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[var(--color-line)]" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-[var(--color-line)]" />

        {/* Центральный блок */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border border-[var(--color-line)]" />
        </div>
      </div>
    </div>
  );
}

export default CasesPreview;
