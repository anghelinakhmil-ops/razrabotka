"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";

/**
 * Категории статей
 */
type BlogCategory = "all" | "development" | "design" | "marketing" | "business";

/**
 * Данные статьи
 */
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  categoryLabel: string;
  date: string;
  readTime: string;
  author: string;
}

/**
 * Все статьи (отсортированы по дате, новые первые)
 */
const allPosts: BlogPost[] = [
  {
    slug: "why-nextjs-for-business",
    title: "Почему Next.js — лучший выбор для бизнес-сайта в 2024",
    excerpt:
      "Разбираем преимущества Next.js для коммерческих проектов: SEO, производительность, масштабируемость.",
    category: "development",
    categoryLabel: "Разработка",
    date: "2024-12-15",
    readTime: "8 мин",
    author: "Команда WebStudio",
  },
  {
    slug: "conversion-design-principles",
    title: "7 принципов конверсионного дизайна",
    excerpt:
      "Как дизайн влияет на продажи. Практические приёмы, которые увеличивают конверсию.",
    category: "design",
    categoryLabel: "Дизайн",
    date: "2024-12-10",
    readTime: "6 мин",
    author: "Команда WebStudio",
  },
  {
    slug: "seo-for-new-websites",
    title: "SEO для нового сайта: пошаговый чеклист",
    excerpt:
      "Что нужно сделать для SEO до запуска и в первые месяцы работы сайта.",
    category: "marketing",
    categoryLabel: "Маркетинг",
    date: "2024-12-05",
    readTime: "10 мин",
    author: "Команда WebStudio",
  },
  {
    slug: "expert-website-roi",
    title: "Окупаемость сайта для эксперта: реальные цифры",
    excerpt:
      "Сколько стоит сайт, сколько приносит клиентов и когда окупается. Разбор на примерах.",
    category: "business",
    categoryLabel: "Бизнес",
    date: "2024-11-28",
    readTime: "7 мин",
    author: "Команда WebStudio",
  },
  {
    slug: "tailwind-vs-css-modules",
    title: "Tailwind CSS vs CSS Modules: что выбрать",
    excerpt:
      "Сравниваем два подхода к стилизации в React-проектах. Плюсы, минусы, когда что использовать.",
    category: "development",
    categoryLabel: "Разработка",
    date: "2024-11-20",
    readTime: "9 мин",
    author: "Команда WebStudio",
  },
  {
    slug: "minimalism-in-web-design",
    title: "Минимализм в веб-дизайне: тренд или необходимость",
    excerpt:
      "Почему меньше — это больше. Как минималистичный дизайн влияет на UX и конверсию.",
    category: "design",
    categoryLabel: "Дизайн",
    date: "2024-11-15",
    readTime: "5 мин",
    author: "Команда WebStudio",
  },
  {
    slug: "lighthouse-score-optimization",
    title: "Как поднять Lighthouse до 90+",
    excerpt:
      "Практический гайд по оптимизации производительности сайта. Core Web Vitals, изображения, код.",
    category: "development",
    categoryLabel: "Разработка",
    date: "2024-11-10",
    readTime: "12 мин",
    author: "Команда WebStudio",
  },
  {
    slug: "landing-page-anatomy",
    title: "Анатомия идеального лендинга",
    excerpt:
      "Какие блоки должны быть на лендинге и в каком порядке. Структура, которая продаёт.",
    category: "marketing",
    categoryLabel: "Маркетинг",
    date: "2024-11-05",
    readTime: "8 мин",
    author: "Команда WebStudio",
  },
];

/**
 * Фильтры категорий
 */
const categoryFilters: { value: BlogCategory; label: string }[] = [
  { value: "all", label: "Все статьи" },
  { value: "development", label: "Разработка" },
  { value: "design", label: "Дизайн" },
  { value: "marketing", label: "Маркетинг" },
  { value: "business", label: "Бизнес" },
];

/**
 * Форматирование даты
 */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Blog Page — страница блога
 */
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return allPosts;
    return allPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              Статьи
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="mb-6">
              <BrokenText
                text="БЛОГ"
                spaced
                mixPattern={[1, 3]}
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
              Делимся опытом в разработке, дизайне и продвижении сайтов.
              Практические советы и разборы кейсов.
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="py-6 bg-[var(--color-background)] border-b border-[var(--color-line)] sticky top-0 z-40">
        <Container>
          <RevealOnScroll direction="up">
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveCategory(filter.value)}
                  className={`
                    px-4 py-2 text-body-sm font-medium rounded-sm transition-all duration-300
                    ${
                      activeCategory === filter.value
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

      {/* Posts Grid */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          {filteredPosts.length > 0 ? (
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              staggerDelay={0.1}
            >
              {filteredPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard {...post} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <NoResults onReset={() => setActiveCategory("all")} />
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

/**
 * BlogCard — карточка статьи
 */
function BlogCard({
  slug,
  title,
  excerpt,
  categoryLabel,
  date,
  readTime,
}: BlogPost) {
  return (
    <a
      href={`/blog/${slug}`}
      className="group flex flex-col h-full p-6 lg:p-8 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors duration-300"
    >
      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-caption text-[var(--color-text-muted)]">
          {categoryLabel}
        </span>
        <span className="w-1 h-1 rounded-full bg-[var(--color-line)]" />
        <span className="text-caption text-[var(--color-text-muted)]">
          {readTime}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-text-secondary)] transition-colors line-clamp-2">
        {title}
      </h2>

      {/* Excerpt */}
      <p className="text-body-sm text-[var(--color-text-muted)] mb-6 flex-grow line-clamp-3">
        {excerpt}
      </p>

      {/* Date & Arrow */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-line)]">
        <span className="text-caption text-[var(--color-text-muted)]">
          {formatDate(date)}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-primary)] transform transition-all group-hover:translate-x-1"
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
    </a>
  );
}

/**
 * NoResults — состояние «Нет статей»
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
            d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H9L11 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
        Нет статей
      </h3>
      <p className="text-body text-[var(--color-text-muted)] mb-6">
        В этой категории пока нет публикаций
      </p>
      <Button variant="outline" size="md" onClick={onReset}>
        Показать все статьи
      </Button>
    </div>
  );
}

/**
 * CTA Section
 */
function CTASection() {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll direction="up">
            <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
              Нужен сайт?
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body text-[var(--color-text-muted)] mb-8">
              Применим все эти знания на практике — для вашего проекта.
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" as="a" href="/#contact">
                Обсудить проект
              </Button>
              <Button variant="outline" size="lg" as="a" href="/services">
                Смотреть услуги
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
