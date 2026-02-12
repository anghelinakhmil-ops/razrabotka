"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerContainer, StaggerItem, SplitTextReveal } from "@/components/motion";
import { ease, duration } from "@/lib/motion";

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
 * Кейсы по умолчанию (placeholder данные)
 */
const defaultCases: CaseData[] = [
  {
    slug: "expert-coach",
    title: "Персональный сайт коуча",
    category: "Эксперт",
    result: "+180% заявок",
  },
  {
    slug: "ecommerce-fashion",
    title: "Интернет-магазин одежды",
    category: "E-commerce",
    result: "3.2 сек LCP",
  },
  {
    slug: "landing-saas",
    title: "Лендинг SaaS-продукта",
    category: "Лендинг",
    result: "8.5% конверсия",
  },
  {
    slug: "expert-psychologist",
    title: "Сайт психолога",
    category: "Эксперт",
    result: "+240% записей",
  },
  {
    slug: "ecommerce-cosmetics",
    title: "Магазин косметики",
    category: "E-commerce",
    result: "95 Lighthouse",
  },
  {
    slug: "landing-event",
    title: "Промо-страница мероприятия",
    category: "Лендинг",
    result: "1200+ регистраций",
  },
];

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
  cases = defaultCases,
  limit = 6,
}: CasesPreviewProps) {
  const displayCases = cases.slice(0, limit);

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
                text="Портфолио"
                as="span"
                className="text-caption text-[var(--color-text-muted)]"
                direction="up"
                staggerDelay={0.06}
              />
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: duration.slow, ease, delay: 0.3 }}
              >
                <BrokenText
                  text="КЕЙСЫ"
                  spaced
                  mixPattern={[1, 3]}
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
                variant="outline"
                size="md"
                as="a"
                href="/cases"
                className="hover-lift"
              >
                Все кейсы
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Сетка кейсов */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
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
            variant="outline"
            size="md"
            as="a"
            href="/cases"
            className="w-full hover-lift"
          >
            Все кейсы
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
  return (
    <a
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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          <span>Смотреть кейс</span>
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
    </a>
  );
}

/**
 * CasePlaceholder — геометрический placeholder для изображения
 */
function CasePlaceholder({ category }: { category: string }) {
  // Разные паттерны для разных категорий
  const patterns: Record<string, { bg: string; accent: string }> = {
    Эксперт: { bg: "bg-gradient-to-br from-gray-100 to-gray-200", accent: "bg-gray-300" },
    "E-commerce": { bg: "bg-gradient-to-br from-gray-50 to-gray-150", accent: "bg-gray-250" },
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
