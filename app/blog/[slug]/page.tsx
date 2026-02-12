import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryLabel: string;
  date: string;
  readTime: string;
  author: string;
  toc: TOCItem[];
  content: string;
}

/**
 * База данных статей
 */
const postsData: Record<string, BlogPostData> = {
  "why-nextjs-for-business": {
    slug: "why-nextjs-for-business",
    title: "Почему Next.js — лучший выбор для бизнес-сайта в 2024",
    excerpt:
      "Разбираем преимущества Next.js для коммерческих проектов: SEO, производительность, масштабируемость.",
    category: "development",
    categoryLabel: "Разработка",
    date: "2024-12-15",
    readTime: "8 мин",
    author: "Команда WebStudio",
    toc: [
      { id: "intro", title: "Введение" },
      { id: "seo", title: "SEO из коробки" },
      { id: "performance", title: "Производительность" },
      { id: "dx", title: "Developer Experience" },
      { id: "conclusion", title: "Выводы" },
    ],
    content: `
      <h2 id="intro">Введение</h2>
      <p>Next.js стал стандартом для создания современных веб-приложений. В 2024 году это особенно актуально для бизнес-сайтов, где важны SEO, скорость загрузки и масштабируемость.</p>
      <p>В этой статье разберём, почему мы выбираем Next.js для коммерческих проектов и какие преимущества это даёт нашим клиентам.</p>

      <h2 id="seo">SEO из коробки</h2>
      <p>Главное преимущество Next.js для бизнеса — отличное SEO. В отличие от обычных React-приложений, Next.js поддерживает серверный рендеринг (SSR) и статическую генерацию (SSG).</p>
      <p>Это означает, что поисковые системы видят полностью готовую страницу, а не пустой HTML с JavaScript. Результат — быстрая индексация и высокие позиции в поиске.</p>
      <ul>
        <li>Автоматическая генерация meta-тегов</li>
        <li>Встроенная поддержка Open Graph</li>
        <li>Автоматический sitemap.xml</li>
        <li>Оптимизация для Core Web Vitals</li>
      </ul>

      <h2 id="performance">Производительность</h2>
      <p>Next.js оптимизирует производительность на уровне фреймворка. Автоматическое code splitting, оптимизация изображений, prefetching ссылок — всё это работает без дополнительной настройки.</p>
      <p>Для бизнеса это критично: каждая секунда задержки загрузки может стоить конверсий. С Next.js мы стабильно получаем Lighthouse Score 90+.</p>

      <h2 id="dx">Developer Experience</h2>
      <p>Хороший DX означает быструю разработку и меньше багов. Next.js предоставляет:</p>
      <ul>
        <li>Hot Module Replacement для мгновенных изменений</li>
        <li>TypeScript из коробки</li>
        <li>Встроенный API Routes</li>
        <li>Отличную документацию и сообщество</li>
      </ul>

      <h2 id="conclusion">Выводы</h2>
      <p>Next.js — это не просто модный фреймворк, а инструмент, который решает реальные бизнес-задачи. SEO, производительность, масштабируемость — всё это из коробки.</p>
      <p>Если вы планируете создать сайт, который должен приносить клиентов из поиска и конвертировать посетителей — Next.js будет правильным выбором.</p>
    `,
  },
  "conversion-design-principles": {
    slug: "conversion-design-principles",
    title: "7 принципов конверсионного дизайна",
    excerpt:
      "Как дизайн влияет на продажи. Практические приёмы, которые увеличивают конверсию.",
    category: "design",
    categoryLabel: "Дизайн",
    date: "2024-12-10",
    readTime: "6 мин",
    author: "Команда WebStudio",
    toc: [
      { id: "hierarchy", title: "Визуальная иерархия" },
      { id: "cta", title: "Чёткий CTA" },
      { id: "whitespace", title: "Воздух в дизайне" },
      { id: "trust", title: "Элементы доверия" },
      { id: "speed", title: "Скорость загрузки" },
    ],
    content: `
      <h2 id="hierarchy">1. Визуальная иерархия</h2>
      <p>Глаз пользователя должен двигаться по странице в нужном направлении. Размер, цвет, контраст — инструменты управления вниманием.</p>
      <p>Главный оффер должен быть заметен сразу. Второстепенная информация — меньше и бледнее.</p>

      <h2 id="cta">2. Чёткий CTA</h2>
      <p>Кнопка призыва к действию должна быть очевидной. Контрастный цвет, понятный текст, достаточный размер.</p>
      <p>Один главный CTA на экран. Не заставляйте пользователя выбирать между несколькими равнозначными действиями.</p>

      <h2 id="whitespace">3. Воздух в дизайне</h2>
      <p>Пустое пространство — не пустая трата места. Это инструмент, который помогает выделить важное и улучшить читаемость.</p>
      <p>Перегруженный дизайн утомляет и снижает конверсию. Дайте контенту дышать.</p>

      <h2 id="trust">4. Элементы доверия</h2>
      <p>Отзывы, логотипы клиентов, сертификаты, гарантии — всё, что подтверждает вашу надёжность.</p>
      <p>Размещайте их рядом с CTA — это снижает тревогу перед принятием решения.</p>

      <h2 id="speed">5. Скорость загрузки</h2>
      <p>Красивый дизайн бесполезен, если страница грузится 10 секунд. Оптимизация — часть дизайна.</p>
      <p>Lighthouse Score 90+ — минимальный стандарт для коммерческого сайта.</p>
    `,
  },
  "seo-for-new-websites": {
    slug: "seo-for-new-websites",
    title: "SEO для нового сайта: пошаговый чеклист",
    excerpt:
      "Что нужно сделать для SEO до запуска и в первые месяцы работы сайта.",
    category: "marketing",
    categoryLabel: "Маркетинг",
    date: "2024-12-05",
    readTime: "10 мин",
    author: "Команда WebStudio",
    toc: [
      { id: "before-launch", title: "До запуска" },
      { id: "technical", title: "Техническое SEO" },
      { id: "content", title: "Контент" },
      { id: "first-months", title: "Первые месяцы" },
    ],
    content: `
      <h2 id="before-launch">До запуска</h2>
      <p>SEO начинается до публикации сайта. Подготовка на этом этапе сэкономит месяцы работы.</p>
      <ul>
        <li>Исследование ключевых слов</li>
        <li>Структура URL</li>
        <li>Планирование контента</li>
        <li>Настройка аналитики</li>
      </ul>

      <h2 id="technical">Техническое SEO</h2>
      <p>Фундамент, без которого остальные усилия бессмысленны:</p>
      <ul>
        <li>HTTPS обязателен</li>
        <li>Мобильная версия</li>
        <li>Скорость загрузки < 3 сек</li>
        <li>Правильная структура заголовков</li>
        <li>XML sitemap</li>
        <li>robots.txt</li>
      </ul>

      <h2 id="content">Контент</h2>
      <p>Уникальный, полезный контент — основа SEO. Каждая страница должна отвечать на конкретный запрос пользователя.</p>
      <p>Meta title и description для каждой страницы. Alt-тексты для изображений. Внутренняя перелинковка.</p>

      <h2 id="first-months">Первые месяцы</h2>
      <p>После запуска — мониторинг и улучшения:</p>
      <ul>
        <li>Регистрация в Search Console</li>
        <li>Отслеживание позиций</li>
        <li>Анализ поведения пользователей</li>
        <li>Регулярное добавление контента</li>
      </ul>
    `,
  },
  "expert-website-roi": {
    slug: "expert-website-roi",
    title: "Окупаемость сайта для эксперта: реальные цифры",
    excerpt:
      "Сколько стоит сайт, сколько приносит клиентов и когда окупается. Разбор на примерах.",
    category: "business",
    categoryLabel: "Бизнес",
    date: "2024-11-28",
    readTime: "7 мин",
    author: "Команда WebStudio",
    toc: [
      { id: "costs", title: "Стоимость сайта" },
      { id: "traffic", title: "Источники трафика" },
      { id: "conversion", title: "Конверсия" },
      { id: "roi", title: "Расчёт окупаемости" },
    ],
    content: `
      <h2 id="costs">Стоимость сайта</h2>
      <p>Сайт для эксперта стоит от 80 000 до 200 000 ₽ в зависимости от сложности. Это разовая инвестиция, которая работает годами.</p>

      <h2 id="traffic">Источники трафика</h2>
      <p>Откуда приходят клиенты на сайт эксперта:</p>
      <ul>
        <li>Органический поиск (SEO) — 40-60%</li>
        <li>Социальные сети — 20-30%</li>
        <li>Рекомендации — 10-20%</li>
        <li>Реклама — 10-15%</li>
      </ul>

      <h2 id="conversion">Конверсия</h2>
      <p>Средняя конверсия сайта эксперта — 3-7%. При 1000 посетителей в месяц это 30-70 заявок.</p>
      <p>Конверсия в клиента — около 30%. Итого: 9-21 новый клиент в месяц.</p>

      <h2 id="roi">Расчёт окупаемости</h2>
      <p>Пример: средний чек консультации — 5000 ₽. 15 клиентов × 5000 ₽ = 75 000 ₽/месяц.</p>
      <p>При стоимости сайта 100 000 ₽ окупаемость — 1.5 месяца. Дальше — чистая прибыль.</p>
    `,
  },
  "tailwind-vs-css-modules": {
    slug: "tailwind-vs-css-modules",
    title: "Tailwind CSS vs CSS Modules: что выбрать",
    excerpt:
      "Сравниваем два подхода к стилизации в React-проектах. Плюсы, минусы, когда что использовать.",
    category: "development",
    categoryLabel: "Разработка",
    date: "2024-11-20",
    readTime: "9 мин",
    author: "Команда WebStudio",
    toc: [
      { id: "tailwind-pros", title: "Плюсы Tailwind" },
      { id: "tailwind-cons", title: "Минусы Tailwind" },
      { id: "modules-pros", title: "Плюсы CSS Modules" },
      { id: "when-to-use", title: "Когда что использовать" },
    ],
    content: `
      <h2 id="tailwind-pros">Плюсы Tailwind</h2>
      <ul>
        <li>Быстрая разработка — не нужно придумывать имена классов</li>
        <li>Консистентность — дизайн-токены из коробки</li>
        <li>Маленький итоговый CSS — только используемые стили</li>
        <li>Легко кастомизировать тему</li>
      </ul>

      <h2 id="tailwind-cons">Минусы Tailwind</h2>
      <ul>
        <li>Длинные классы в разметке</li>
        <li>Кривая обучения</li>
        <li>Сложные состояния требуют много классов</li>
      </ul>

      <h2 id="modules-pros">Плюсы CSS Modules</h2>
      <ul>
        <li>Привычный CSS синтаксис</li>
        <li>Изоляция стилей по умолчанию</li>
        <li>Легко мигрировать существующий CSS</li>
      </ul>

      <h2 id="when-to-use">Когда что использовать</h2>
      <p>Tailwind — для новых проектов, где важна скорость разработки и консистентность.</p>
      <p>CSS Modules — для проектов с существующей дизайн-системой или командой, привыкшей к классическому CSS.</p>
    `,
  },
  "minimalism-in-web-design": {
    slug: "minimalism-in-web-design",
    title: "Минимализм в веб-дизайне: тренд или необходимость",
    excerpt:
      "Почему меньше — это больше. Как минималистичный дизайн влияет на UX и конверсию.",
    category: "design",
    categoryLabel: "Дизайн",
    date: "2024-11-15",
    readTime: "5 мин",
    author: "Команда WebStudio",
    toc: [
      { id: "why", title: "Почему минимализм работает" },
      { id: "principles", title: "Принципы" },
      { id: "mistakes", title: "Ошибки" },
    ],
    content: `
      <h2 id="why">Почему минимализм работает</h2>
      <p>Минимализм — не про пустоту, а про фокус. Когда на странице нет лишнего, пользователь видит главное.</p>
      <p>Исследования показывают: простые страницы воспринимаются как более надёжные и профессиональные.</p>

      <h2 id="principles">Принципы минимализма</h2>
      <ul>
        <li>Один главный акцент на экран</li>
        <li>Максимум 2-3 цвета</li>
        <li>Много воздуха между элементами</li>
        <li>Понятная типографика</li>
      </ul>

      <h2 id="mistakes">Типичные ошибки</h2>
      <p>Минимализм ≠ скучно. Пустая страница без акцентов — это не минимализм, это плохой дизайн.</p>
      <p>Каждый элемент должен работать. Если что-то не несёт смысла — убираем.</p>
    `,
  },
  "lighthouse-score-optimization": {
    slug: "lighthouse-score-optimization",
    title: "Как поднять Lighthouse до 90+",
    excerpt:
      "Практический гайд по оптимизации производительности сайта. Core Web Vitals, изображения, код.",
    category: "development",
    categoryLabel: "Разработка",
    date: "2024-11-10",
    readTime: "12 мин",
    author: "Команда WebStudio",
    toc: [
      { id: "cwv", title: "Core Web Vitals" },
      { id: "images", title: "Изображения" },
      { id: "code", title: "Оптимизация кода" },
      { id: "fonts", title: "Шрифты" },
    ],
    content: `
      <h2 id="cwv">Core Web Vitals</h2>
      <p>Три главные метрики Google:</p>
      <ul>
        <li>LCP (Largest Contentful Paint) < 2.5 сек</li>
        <li>FID (First Input Delay) < 100 мс</li>
        <li>CLS (Cumulative Layout Shift) < 0.1</li>
      </ul>

      <h2 id="images">Изображения</h2>
      <p>Главный источник проблем с производительностью:</p>
      <ul>
        <li>WebP/AVIF форматы</li>
        <li>Lazy loading</li>
        <li>Правильные размеры (srcset)</li>
        <li>Blur placeholder</li>
      </ul>

      <h2 id="code">Оптимизация кода</h2>
      <ul>
        <li>Code splitting</li>
        <li>Tree shaking</li>
        <li>Минификация</li>
        <li>Удаление неиспользуемого CSS</li>
      </ul>

      <h2 id="fonts">Шрифты</h2>
      <p>Шрифты часто блокируют рендеринг:</p>
      <ul>
        <li>font-display: swap</li>
        <li>Предзагрузка критичных шрифтов</li>
        <li>Подмножество символов</li>
      </ul>
    `,
  },
  "landing-page-anatomy": {
    slug: "landing-page-anatomy",
    title: "Анатомия идеального лендинга",
    excerpt:
      "Какие блоки должны быть на лендинге и в каком порядке. Структура, которая продаёт.",
    category: "marketing",
    categoryLabel: "Маркетинг",
    date: "2024-11-05",
    readTime: "8 мин",
    author: "Команда WebStudio",
    toc: [
      { id: "hero", title: "Hero-секция" },
      { id: "benefits", title: "Преимущества" },
      { id: "social-proof", title: "Социальные доказательства" },
      { id: "cta", title: "CTA-блок" },
    ],
    content: `
      <h2 id="hero">Hero-секция</h2>
      <p>Первый экран решает всё. За 5 секунд пользователь должен понять:</p>
      <ul>
        <li>Что вы предлагаете</li>
        <li>Для кого это</li>
        <li>Почему стоит остаться</li>
      </ul>

      <h2 id="benefits">Преимущества</h2>
      <p>Не характеристики, а выгоды. Не «10 лет опыта», а «Решим вашу проблему за 3 дня».</p>
      <p>3-5 ключевых преимуществ с иконками или иллюстрациями.</p>

      <h2 id="social-proof">Социальные доказательства</h2>
      <p>Отзывы, кейсы, логотипы клиентов, цифры — всё, что подтверждает ваши слова.</p>
      <p>Размещайте ближе к CTA — это снижает сомнения.</p>

      <h2 id="cta">CTA-блок</h2>
      <p>Финальный призыв к действию. Кратко повторите оффер и добавьте форму или кнопку.</p>
      <p>Уберите всё лишнее — только действие.</p>
    `,
  },
};

/**
 * Все посты для навигации
 */
const allPostSlugs = Object.keys(postsData);

/**
 * Генерация статических путей
 */
export function generateStaticParams() {
  return allPostSlugs.map((slug) => ({ slug }));
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
  const post = postsData[slug];

  if (!post) {
    return { title: "Статья не найдена | WebStudio" };
  }

  return {
    title: `${post.title} | Блог WebStudio`,
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
 * Форматирование даты
 */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
  const post = postsData[slug];

  if (!post) {
    notFound();
  }

  // Навигация prev/next
  const currentIndex = allPostSlugs.indexOf(slug);
  const prevPost = currentIndex > 0 ? postsData[allPostSlugs[currentIndex - 1]] : null;
  const nextPost =
    currentIndex < allPostSlugs.length - 1
      ? postsData[allPostSlugs[currentIndex + 1]]
      : null;

  // Похожие статьи (той же категории)
  const relatedPosts = Object.values(postsData)
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 3);

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
            { name: "Главная", url: "/" },
            { name: "Блог", url: "/blog" },
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
                Все статьи
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
                <span>•</span>
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
                    Содержание
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
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="group p-6 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
              >
                <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
                  ← Предыдущая
                </span>
                <span className="text-body font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-text-secondary)] transition-colors line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group p-6 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors text-right"
              >
                <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
                  Следующая →
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
                Читать ещё
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
                Нужна помощь с проектом?
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.1}>
              <p className="text-body text-[var(--color-text-muted)] mb-8">
                Применим эти знания для вашего бизнеса. Обсудим задачу?
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.2}>
              <CtaButton variant="primary" size="lg" source="blog_detail_cta">
                Обсудить проект
              </CtaButton>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </main>
  );
}
