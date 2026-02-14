"use client";

import { useState, useMemo } from "react";
import { useTranslations, useFormatter } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { sectionPresets } from "@/lib/motion";

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
 * Blog Page — страница блога
 */
export default function BlogContent() {
  const t = useTranslations("pages.blog");
  const format = useFormatter();
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("all");

  const allPosts = t.raw("posts") as BlogPost[];
  const categoryFilters: { value: BlogCategory; label: string }[] = [
    { value: "all", label: t("filterAll") },
    { value: "development", label: t("filterDevelopment") },
    { value: "design", label: t("filterDesign") },
    { value: "marketing", label: t("filterMarketing") },
    { value: "business", label: t("filterBusiness") },
  ];

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return allPosts;
    return allPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory, allPosts]);

  const formatDate = (dateStr: string) =>
    format.dateTime(new Date(dateStr), { day: "numeric", month: "long", year: "numeric" });

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("caption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <h1 className="mb-6">
              <BrokenText
                text={t("title")}
                spaced
                mixPattern="every-3"
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
              {t("description")}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Category Filters */}
      <section className="py-6 bg-[var(--color-background)] border-b border-[var(--color-line)] sticky top-16 z-40">
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
              staggerDelay={sectionPresets.grid.stagger}
            >
              {filteredPosts.map((post) => (
                <StaggerItem key={post.slug}>
                  <BlogCard post={post} formatDate={formatDate} />
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
  post,
  formatDate,
}: {
  post: BlogPost;
  formatDate: (dateStr: string) => string;
}) {
  const { slug, title, excerpt, categoryLabel, date, readTime } = post;

  return (
    <Link
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
    </Link>
  );
}

/**
 * NoResults — состояние «Нет статей»
 */
function NoResults({ onReset }: { onReset: () => void }) {
  const t = useTranslations("pages.blog");

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
        {t("noResultsTitle")}
      </h3>
      <p className="text-body text-[var(--color-text-muted)] mb-6">
        {t("noResultsText")}
      </p>
      <Button variant="outline" size="md" onClick={onReset}>
        {t("noResultsButton")}
      </Button>
    </div>
  );
}

/**
 * CTA Section
 */
function CTASection() {
  const t = useTranslations("pages.blog");

  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-text-primary)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll direction="up">
            <h2 className="text-h2 font-display font-bold text-[var(--color-background)] mb-4">
              {t("ctaTitle")}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <p className="text-body text-[var(--color-background)]/70 mb-8">
              {t("ctaText")}
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton
                variant="primary"
                size="lg"
                className="bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]"
              >
                {t("ctaButton")}
              </CtaButton>
              <Button
                variant="outline"
                size="lg"
                as={Link}
                href="/services"
                className="border-[var(--color-background)] text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
              >
                {t("ctaServicesButton")}
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
