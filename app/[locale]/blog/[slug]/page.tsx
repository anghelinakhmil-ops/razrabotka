import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { TrackPageView } from "@/components/analytics/TrackPageView";

/**
 * Секция оглавления
 */
interface TOCItem {
  id: string;
  title: string;
}

/**
 * Данные статьи
 */
interface BlogPostData {
  title: string;
  excerpt: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  author: string;
  toc: TOCItem[];
  content: string;
}

/**
 * Генерация статических путей
 */
export function generateStaticParams() {
  const slugs = [
    "why-nextjs-for-business",
    "conversion-design-principles",
    "seo-for-new-websites",
    "expert-website-roi",
    "tailwind-vs-css-modules",
    "minimalism-in-web-design",
    "lighthouse-score-optimization",
    "landing-page-anatomy",
  ];
  return slugs.map((slug) => ({ slug }));
}

/**
 * Динамические metadata
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTranslations("pages.blogPost");
  const postsData = t.raw("posts") as Record<string, BlogPostData>;
  const post = postsData[slug];

  if (!post) {
    return { title: t("notFound") };
  }

  return {
    title: `${post.title} | ${t("breadcrumbBlog")} NAKO Agency`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

/**
 * Blog Post Page
 */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getTranslations("pages.blogPost");
  const format = await getFormatter();
  const postsData = t.raw("posts") as Record<string, BlogPostData>;
  const post = postsData[slug];

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr: string) =>
    format.dateTime(new Date(dateStr), { day: "numeric", month: "long", year: "numeric" });

  // Навигация prev/next
  const allPostSlugs = Object.keys(postsData);
  const currentIndex = allPostSlugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? allPostSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allPostSlugs.length - 1 ? allPostSlugs[currentIndex + 1] : null;
  const prevPost = prevSlug ? postsData[prevSlug] : null;
  const nextPost = nextSlug ? postsData[nextSlug] : null;

  // Похожие статьи (из blog listing data для получения category)
  const blogT = await getTranslations("pages.blog");
  const allBlogPosts = blogT.raw("posts") as Array<{ slug: string; category: string }>;
  const currentCategory = allBlogPosts.find((p) => p.slug === slug)?.category;
  const relatedSlugs = allBlogPosts
    .filter((p) => p.category === currentCategory && p.slug !== slug)
    .slice(0, 3)
    .map((p) => p.slug);
  const relatedPosts = relatedSlugs
    .map((s) => ({ slug: s, ...postsData[s] }))
    .filter((p) => p.title);

  return (
    <main>
      <TrackPageView event="blog_read" params={{ article_slug: slug }} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema({
            title: post.title,
            description: post.excerpt,
            slug,
            date: post.date,
            author: post.author,
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: t("breadcrumbHome"), url: "/" },
            { name: t("breadcrumbBlog"), url: "/blog" },
            { name: post.title, url: `/blog/${slug}` },
          ])),
        }}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container>
          <div className="max-w-3xl">
            <RevealOnScroll direction="up">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 8H3M3 8L7 4M3 8L7 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t("backLink")}
              </Link>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.1}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-caption text-[var(--color-text-muted)]">
                  {post.categoryLabel}
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-line)]" />
                <span className="text-caption text-[var(--color-text-muted)]">
                  {post.readTime}
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.2}>
              <h1 className="text-h1 font-display font-bold text-[var(--color-text-primary)] mb-6">
                {post.title}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.3}>
              <div className="flex items-center gap-4 text-body-sm text-[var(--color-text-muted)]">
                <span>{post.author}</span>
                <span>&bull;</span>
                <span>{formatDate(post.date)}</span>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>

      {/* Content with TOC */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
            {/* Article Content */}
            <RevealOnScroll direction="up">
              <article
                className="prose prose-lg max-w-none
                  prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--color-text-primary)]
                  prose-h2:text-h3 prose-h2:mt-12 prose-h2:mb-4
                  prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed
                  prose-ul:text-[var(--color-text-secondary)]
                  prose-li:marker:text-[var(--color-text-muted)]
                  prose-a:text-[var(--color-text-primary)] prose-a:underline
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </RevealOnScroll>

            {/* Sidebar TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <RevealOnScroll direction="up" delay={0.2}>
                  <h3 className="text-caption text-[var(--color-text-muted)] mb-4">
                    {t("tocTitle")}
                  </h3>
                  <nav className="space-y-2">
                    {post.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </RevealOnScroll>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Prev / Next Navigation */}
      <section className="py-12 bg-[var(--color-background)] border-t border-[var(--color-line)]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost && prevSlug ? (
              <Link
                href={`/blog/${prevSlug}`}
                className="group p-6 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
              >
                <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
                  {t("prevPost")}
                </span>
                <span className="text-body font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-text-secondary)] transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && nextSlug && (
              <Link
                href={`/blog/${nextSlug}`}
                className="group p-6 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors text-right"
              >
                <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
                  {t("nextPost")}
                </span>
                <span className="text-body font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-text-secondary)] transition-colors line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
          <Container>
            <RevealOnScroll direction="up" className="mb-12">
              <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)]">
                {t("relatedTitle")}
              </h2>
            </RevealOnScroll>

            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              staggerDelay={0.1}
            >
              {relatedPosts.map((relatedPost) => (
                <StaggerItem key={relatedPost.slug}>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="group block p-6 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
                  >
                    <span className="text-caption text-[var(--color-text-muted)] block mb-2">
                      {relatedPost.categoryLabel}
                    </span>
                    <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-secondary)] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <RevealOnScroll direction="up">
              <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
                {t("ctaTitle")}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.1}>
              <p className="text-body text-[var(--color-text-muted)] mb-8">
                {t("ctaText")}
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.2}>
              <CtaButton variant="primary" size="lg">
                {t("ctaButton")}
              </CtaButton>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </main>
  );
}
