"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";

/**
 * Типы категорий
 */
type CategoryFilter = "all" | "expert" | "ecommerce" | "landing";

/**
 * Данные кейса
 */
interface CaseItem {
  slug: string;
  title: string;
  category: CategoryFilter;
  categoryLabel: string;
  description: string;
  result: string;
  imageSrc?: string;
}

/**
 * Все кейсы
 */
const allCases: CaseItem[] = [
  {
    slug: "expert-coach",
    title: "Персональный сайт коуча",
    category: "expert",
    categoryLabel: "Эксперт",
    description: "Сайт для бизнес-коуча с записью на консультации и блогом.",
    result: "+180% заявок",
  },
  {
    slug: "ecommerce-fashion",
    title: "Интернет-магазин одежды",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    description: "Магазин женской одежды с каталогом 500+ товаров.",
    result: "3.2 сек LCP",
  },
  {
    slug: "landing-saas",
    title: "Лендинг SaaS-продукта",
    category: "landing",
    categoryLabel: "Лендинг",
    description: "Конверсионная страница для облачного сервиса аналитики.",
    result: "8.5% конверсия",
  },
  {
    slug: "expert-psychologist",
    title: "Сайт психолога",
    category: "expert",
    categoryLabel: "Эксперт",
    description: "Персональный сайт с онлайн-записью и интеграцией с календарём.",
    result: "+240% записей",
  },
  {
    slug: "ecommerce-cosmetics",
    title: "Магазин косметики",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    description: "Интернет-магазин натуральной косметики с подпиской.",
    result: "95 Lighthouse",
  },
  {
    slug: "landing-event",
    title: "Промо-страница мероприятия",
    category: "landing",
    categoryLabel: "Лендинг",
    description: "Лендинг для бизнес-конференции с онлайн-регистрацией.",
    result: "1200+ регистраций",
  },
  {
    slug: "expert-lawyer",
    title: "Сайт юридической практики",
    category: "expert",
    categoryLabel: "Эксперт",
    description: "Корпоративный сайт юриста с портфолио дел и записью.",
    result: "+150% обращений",
  },
  {
    slug: "ecommerce-electronics",
    title: "Магазин электроники",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    description: "Интернет-магазин гаджетов с умным поиском и фильтрами.",
    result: "+85% конверсии",
  },
  {
    slug: "landing-app",
    title: "Лендинг мобильного приложения",
    category: "landing",
    categoryLabel: "Лендинг",
    description: "Промо-страница для fitness-приложения с App Store ссылками.",
    result: "12K установок",
  },
];

/**
 * Фильтры категорий
 */
const filters: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Все проекты" },
  { value: "expert", label: "Эксперт" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "landing", label: "Лендинг" },
];

/**
 * Cases Page — страница портфолио
 */
export default function CasesPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");

  const filteredCases = useMemo(() => {
    if (activeFilter === "all") return allCases;
    return allCases.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              Портфолио
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="mb-6">
              <BrokenText
                text="КЕЙСЫ"
                spaced
                mixPattern={[1, 3]}
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
              Реальные проекты с измеримыми результатами. Каждый кейс — это решение
              конкретной бизнес-задачи.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Filters */}
      <section className="py-6 bg-[var(--color-background)] border-b border-[var(--color-line)] sticky top-0 z-40">
        <Container>
          <RevealOnScroll direction="up">
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`
                    px-4 py-2 text-body-sm font-medium rounded-sm transition-all duration-300
                    ${
                      activeFilter === filter.value
                        ? "bg-[var(--color-text-primary)] text-[var(--color-background)]"
                        : "bg-[var(--color-background-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-line)] hover:text-[var(--color-text-primary)]"
                    }
                  `}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Cases Grid */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          {filteredCases.length > 0 ? (
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              staggerDelay={0.1}
            >
              {filteredCases.map((caseItem) => (
                <StaggerItem key={caseItem.slug}>
                  <CaseCard {...caseItem} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <NoResults onReset={() => setActiveFilter("all")} />
          )}
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
function CaseCard({
  slug,
  title,
  categoryLabel,
  description,
  result,
  imageSrc,
}: CaseItem) {
  return (
    <a
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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
 * NoResults — состояние «Нет результатов»
 */
function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-background-alt)] flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[var(--color-text-muted)]"
        >
          <path
            d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
        Нет проектов
      </h3>
      <p className="text-body text-[var(--color-text-muted)] mb-6">
        В этой категории пока нет кейсов
      </p>
      <Button variant="outline" size="md" onClick={onReset}>
        Показать все проекты
      </Button>
    </div>
  );
}

/**
 * CTA Section
 */
function CTASection() {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-text-primary)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll direction="up">
            <h2 className="mb-4">
              <BrokenText
                text="ВАШ ПРОЕКТ"
                spaced
                mixPattern={[2, 6]}
                className="text-h2 font-display font-bold text-[var(--color-background)]"
              />
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body text-[var(--color-text-light)] mb-8">
              Хотите, чтобы ваш проект был в этом списке? Расскажите о задаче — обсудим решение.
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                as="a"
                href="/#contact"
                className="bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]"
              >
                Обсудить проект
              </Button>
              <Button
                variant="outline"
                size="lg"
                as="a"
                href="/services"
                className="border-[var(--color-background)] text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
              >
                Смотреть услуги
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
