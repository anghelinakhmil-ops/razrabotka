import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { TrackPageView } from "@/components/analytics/TrackPageView";

/**
 * Данные кейса
 */
interface CaseData {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  client: string;
  year: string;
  duration: string;
  task: string;
  solution: string[];
  results: { value: string; label: string }[];
  technologies: string[];
  screenshots: string[];
  liveUrl?: string;
}

/**
 * База данных кейсов
 */
const casesData: Record<string, CaseData> = {
  "expert-coach": {
    slug: "expert-coach",
    title: "Персональный сайт коуча",
    category: "expert",
    categoryLabel: "Эксперт",
    description: "Сайт для бизнес-коуча с записью на консультации и блогом.",
    client: "Анна Смирнова, бизнес-коуч",
    year: "2024",
    duration: "3 недели",
    task: "Создать персональный сайт для бизнес-коуча, который будет продавать услуги консультаций и онлайн-курсы. Сайт должен передавать экспертность, вызывать доверие и конвертировать посетителей в клиентов. Интеграция с календарём для записи на консультации.",
    solution: [
      "Разработали стратегию контента с фокусом на кейсы клиентов",
      "Создали минималистичный дизайн с акцентом на личный бренд",
      "Интегрировали Calendly для онлайн-записи",
      "Добавили блог для SEO и демонстрации экспертизы",
      "Настроили аналитику и цели конверсии",
    ],
    results: [
      { value: "+180%", label: "Рост заявок" },
      { value: "2.1 сек", label: "LCP" },
      { value: "94", label: "Lighthouse" },
      { value: "45%", label: "Конверсия записи" },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Calendly", "GA4"],
    screenshots: [],
  },
  "ecommerce-fashion": {
    slug: "ecommerce-fashion",
    title: "Интернет-магазин одежды",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    description: "Магазин женской одежды с каталогом 500+ товаров.",
    client: "MODA Store",
    year: "2024",
    duration: "6 недель",
    task: "Создать современный интернет-магазин женской одежды с удобным каталогом, фильтрацией, корзиной и онлайн-оплатой. Важны скорость загрузки и мобильная версия, так как 70% трафика — с телефонов.",
    solution: [
      "Спроектировали UX с фокусом на mobile-first",
      "Реализовали умные фильтры и поиск с автодополнением",
      "Интегрировали ЮKassa для онлайн-оплаты",
      "Настроили Telegram-уведомления о заказах",
      "Оптимизировали изображения и добавили lazy loading",
    ],
    results: [
      { value: "3.2 сек", label: "LCP" },
      { value: "+65%", label: "Конверсия" },
      { value: "500+", label: "Товаров" },
      { value: "92", label: "Lighthouse" },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "ЮKassa", "Telegram API"],
    screenshots: [],
  },
  "landing-saas": {
    slug: "landing-saas",
    title: "Лендинг SaaS-продукта",
    category: "landing",
    categoryLabel: "Лендинг",
    description: "Конверсионная страница для облачного сервиса аналитики.",
    client: "DataFlow Analytics",
    year: "2024",
    duration: "2 недели",
    task: "Создать высококонверсионный лендинг для SaaS-продукта в сфере бизнес-аналитики. Страница должна объяснять сложный продукт простым языком и мотивировать на регистрацию бесплатного trial.",
    solution: [
      "Разработали структуру с прогрессивным раскрытием информации",
      "Создали анимированные демо-блоки продукта",
      "Добавили социальные доказательства и отзывы",
      "Реализовали A/B тестирование CTA-блоков",
      "Интегрировали с CRM для лид-трекинга",
    ],
    results: [
      { value: "8.5%", label: "Конверсия" },
      { value: "1.8 сек", label: "LCP" },
      { value: "97", label: "Lighthouse" },
      { value: "-40%", label: "Bounce Rate" },
    ],
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Vercel Analytics"],
    screenshots: [],
  },
  "expert-psychologist": {
    slug: "expert-psychologist",
    title: "Сайт психолога",
    category: "expert",
    categoryLabel: "Эксперт",
    description: "Персональный сайт с онлайн-записью и интеграцией с календарём.",
    client: "Елена Волкова, психолог",
    year: "2024",
    duration: "3 недели",
    task: "Разработать сайт для практикующего психолога с возможностью онлайн-записи. Дизайн должен создавать ощущение спокойствия и доверия. Важна конфиденциальность и простота записи.",
    solution: [
      "Создали спокойный, минималистичный дизайн",
      "Интегрировали систему онлайн-бронирования",
      "Добавили раздел с направлениями работы",
      "Реализовали форму первичной консультации",
      "Настроили email-уведомления о записях",
    ],
    results: [
      { value: "+240%", label: "Рост записей" },
      { value: "2.4 сек", label: "LCP" },
      { value: "91", label: "Lighthouse" },
      { value: "60%", label: "Запись онлайн" },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Cal.com", "Resend"],
    screenshots: [],
  },
  "ecommerce-cosmetics": {
    slug: "ecommerce-cosmetics",
    title: "Магазин косметики",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    description: "Интернет-магазин натуральной косметики с подпиской.",
    client: "NaturaCare",
    year: "2024",
    duration: "5 недель",
    task: "Создать premium интернет-магазин натуральной косметики с акцентом на визуал и storytelling. Добавить возможность подписки на регулярную доставку.",
    solution: [
      "Разработали визуально богатый дизайн с акцентом на фото",
      "Реализовали систему подписок с гибкими интервалами",
      "Интегрировали рекомендательную систему",
      "Добавили программу лояльности",
      "Оптимизировали для SEO в нише косметики",
    ],
    results: [
      { value: "95", label: "Lighthouse" },
      { value: "+120%", label: "Подписки" },
      { value: "4.2%", label: "Конверсия" },
      { value: "35%", label: "Повторные покупки" },
    ],
    technologies: ["Next.js", "TypeScript", "Stripe Subscriptions", "Algolia"],
    screenshots: [],
  },
  "landing-event": {
    slug: "landing-event",
    title: "Промо-страница мероприятия",
    category: "landing",
    categoryLabel: "Лендинг",
    description: "Лендинг для бизнес-конференции с онлайн-регистрацией.",
    client: "TechConf 2024",
    year: "2024",
    duration: "10 дней",
    task: "Создать промо-страницу для IT-конференции с возможностью онлайн-регистрации и оплаты билетов. Страница должна создавать ажиотаж и FOMO-эффект.",
    solution: [
      "Создали динамичный дизайн с countdown-таймером",
      "Реализовали разные типы билетов с ценами",
      "Интегрировали онлайн-оплату",
      "Добавили программу и спикеров",
      "Настроили email-маркетинг для зарегистрированных",
    ],
    results: [
      { value: "1200+", label: "Регистраций" },
      { value: "12%", label: "Конверсия" },
      { value: "1.5 сек", label: "LCP" },
      { value: "98", label: "Lighthouse" },
    ],
    technologies: ["Next.js", "TypeScript", "Stripe", "Resend", "Vercel"],
    screenshots: [],
  },
  "expert-lawyer": {
    slug: "expert-lawyer",
    title: "Сайт юридической практики",
    category: "expert",
    categoryLabel: "Эксперт",
    description: "Корпоративный сайт юриста с портфолио дел и записью.",
    client: "Адвокат Петров И.С.",
    year: "2024",
    duration: "4 недели",
    task: "Разработать представительский сайт для адвоката, который демонстрирует опыт и экспертизу. Важны доверие, профессионализм и возможность быстрой связи.",
    solution: [
      "Создали строгий, профессиональный дизайн",
      "Структурировали услуги по направлениям права",
      "Добавили раздел с выигранными делами (анонимно)",
      "Реализовали форму экстренной консультации",
      "Интегрировали онлайн-чат для быстрой связи",
    ],
    results: [
      { value: "+150%", label: "Обращений" },
      { value: "2.8 сек", label: "LCP" },
      { value: "89", label: "Lighthouse" },
      { value: "70%", label: "Из поиска" },
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Tawk.to"],
    screenshots: [],
  },
  "ecommerce-electronics": {
    slug: "ecommerce-electronics",
    title: "Магазин электроники",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    description: "Интернет-магазин гаджетов с умным поиском и фильтрами.",
    client: "GadgetHub",
    year: "2024",
    duration: "7 недель",
    task: "Создать современный интернет-магазин электроники с акцентом на UX и быстрый поиск. Каталог 2000+ товаров с множеством характеристик.",
    solution: [
      "Реализовали Algolia для мгновенного поиска",
      "Создали систему фасетных фильтров",
      "Добавили сравнение товаров",
      "Интегрировали с 1С для синхронизации остатков",
      "Реализовали wishlist и уведомления о снижении цен",
    ],
    results: [
      { value: "+85%", label: "Конверсия" },
      { value: "2.9 сек", label: "LCP" },
      { value: "90", label: "Lighthouse" },
      { value: "2000+", label: "Товаров" },
    ],
    technologies: ["Next.js", "TypeScript", "Algolia", "1С интеграция", "Redis"],
    screenshots: [],
  },
  "landing-app": {
    slug: "landing-app",
    title: "Лендинг мобильного приложения",
    category: "landing",
    categoryLabel: "Лендинг",
    description: "Промо-страница для fitness-приложения с App Store ссылками.",
    client: "FitLife App",
    year: "2024",
    duration: "2 недели",
    task: "Создать лендинг для мобильного fitness-приложения, который мотивирует на установку. Показать функционал и преимущества, интегрировать ссылки на App Store и Google Play.",
    solution: [
      "Создали яркий, энергичный дизайн",
      "Добавили интерактивные демо-скриншоты",
      "Реализовали видео-превью функций",
      "Интегрировали smart app banners",
      "Добавили отзывы пользователей и рейтинги",
    ],
    results: [
      { value: "12K", label: "Установок" },
      { value: "15%", label: "Конверсия" },
      { value: "1.2 сек", label: "LCP" },
      { value: "99", label: "Lighthouse" },
    ],
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Smart Banners"],
    screenshots: [],
  },
};

/**
 * Генерация статических путей
 */
export function generateStaticParams() {
  return Object.keys(casesData).map((slug) => ({ slug }));
}

/**
 * Динамические metadata
 */
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const caseData = casesData[slug];

    if (!caseData) {
      return {
        title: "Кейс не найден | WebStudio",
      };
    }

    return {
      title: `${caseData.title} | Кейсы WebStudio`,
      description: caseData.description,
      openGraph: {
        title: `${caseData.title} | WebStudio`,
        description: caseData.description,
        type: "article",
      },
    };
  });
}

/**
 * Case Detail Page
 */
export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseData = casesData[slug];

  if (!caseData) {
    notFound();
  }

  // Получаем другие кейсы для блока внизу
  const otherCases = Object.values(casesData)
    .filter((c) => c.slug !== slug)
    .slice(0, 3);

  return (
    <main>
      <TrackPageView event="case_view" params={{ case_slug: slug }} />

      {/* Hero */}
      <HeroSection caseData={caseData} />

      {/* Preview Image */}
      <PreviewSection />

      {/* Task */}
      <TaskSection task={caseData.task} />

      {/* Solution */}
      <SolutionSection solution={caseData.solution} />

      {/* Results */}
      <ResultsSection results={caseData.results} />

      {/* Technologies */}
      <TechnologiesSection technologies={caseData.technologies} />

      {/* Screenshots Gallery */}
      {caseData.screenshots.length > 0 && (
        <GallerySection screenshots={caseData.screenshots} />
      )}

      {/* Other Cases */}
      <OtherCasesSection cases={otherCases} />

      {/* CTA */}
      <CTASection />
    </main>
  );
}

/**
 * Hero Section
 */
function HeroSection({ caseData }: { caseData: CaseData }) {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up">
          <Link
            href="/cases"
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
            Все кейсы
          </Link>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.1}>
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            {caseData.categoryLabel}
          </span>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.2}>
          <h1 className="text-h1 font-display font-bold text-[var(--color-text-primary)] mb-6">
            {caseData.title}
          </h1>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.3}>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-8">
            {caseData.description}
          </p>
        </RevealOnScroll>

        {/* Meta info */}
        <RevealOnScroll direction="up" delay={0.4}>
          <div className="flex flex-wrap gap-8 text-body-sm">
            <div>
              <span className="text-[var(--color-text-muted)] block">Клиент</span>
              <span className="text-[var(--color-text-primary)] font-medium">
                {caseData.client}
              </span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] block">Год</span>
              <span className="text-[var(--color-text-primary)] font-medium">
                {caseData.year}
              </span>
            </div>
            <div>
              <span className="text-[var(--color-text-muted)] block">Срок</span>
              <span className="text-[var(--color-text-primary)] font-medium">
                {caseData.duration}
              </span>
            </div>
            {caseData.liveUrl && (
              <div>
                <span className="text-[var(--color-text-muted)] block">Сайт</span>
                <a
                  href={caseData.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-primary)] font-medium hover:underline"
                >
                  Открыть →
                </a>
              </div>
            )}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * Preview Section
 */
function PreviewSection() {
  return (
    <section className="pb-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up">
          <div className="aspect-[16/9] bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm overflow-hidden">
            {/* Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 border border-[var(--color-line)] rounded-sm" />
                <span className="text-caption text-[var(--color-text-muted)]">
                  Превью проекта
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * Task Section
 */
function TaskSection({ task }: { task: string }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <div className="max-w-3xl">
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              01
            </span>
            <h2 className="mb-6">
              <BrokenText
                text="ЗАДАЧА"
                spaced
                mixPattern={[2, 4]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
              {task}
            </p>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

/**
 * Solution Section
 */
function SolutionSection({ solution }: { solution: string[] }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <div className="max-w-3xl">
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              02
            </span>
            <h2 className="mb-8">
              <BrokenText
                text="РЕШЕНИЕ"
                spaced
                mixPattern={[3, 5]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </RevealOnScroll>

          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {solution.map((item, index) => (
              <StaggerItem key={index}>
                <div className="flex gap-4">
                  <span className="text-h4 font-display font-bold text-[var(--color-line)] leading-none flex-shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-body text-[var(--color-text-secondary)]">
                    {item}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}

/**
 * Results Section
 */
function ResultsSection({
  results,
}: {
  results: { value: string; label: string }[];
}) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-text-primary)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12 text-center">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            03
          </span>
          <h2>
            <BrokenText
              text="РЕЗУЛЬТАТЫ"
              spaced
              mixPattern={[3, 7]}
              className="text-h2 font-display font-bold text-[var(--color-background)]"
            />
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          staggerDelay={0.1}
        >
          {results.map((result, index) => (
            <StaggerItem key={index}>
              <div className="text-center">
                <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-background)] leading-none block mb-2">
                  {result.value}
                </span>
                <span className="text-body-sm text-[var(--color-text-light)]">
                  {result.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * Technologies Section
 */
function TechnologiesSection({ technologies }: { technologies: string[] }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up" className="text-center">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            Технологии
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm text-body-sm text-[var(--color-text-secondary)]"
              >
                {tech}
              </span>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * Gallery Section
 */
function GallerySection({ screenshots }: { screenshots: string[] }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12">
          <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)]">
            Галерея
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          staggerDelay={0.1}
        >
          {screenshots.map((src, index) => (
            <StaggerItem key={index}>
              <div className="aspect-[4/3] bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm overflow-hidden">
                <Image
                  src={src}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * Other Cases Section
 */
function OtherCasesSection({ cases }: { cases: CaseData[] }) {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12">
          <h2>
            <BrokenText
              text="ДРУГИЕ КЕЙСЫ"
              spaced
              mixPattern={[2, 8]}
              className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          staggerDelay={0.1}
        >
          {cases.map((caseItem) => (
            <StaggerItem key={caseItem.slug}>
              <Link
                href={`/cases/${caseItem.slug}`}
                className="group block p-6 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
              >
                <span className="text-caption text-[var(--color-text-muted)] block mb-2">
                  {caseItem.categoryLabel}
                </span>
                <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-secondary)] transition-colors">
                  {caseItem.title}
                </h3>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * CTA Section
 */
function CTASection() {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll direction="up">
            <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
              Хотите такой же результат?
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body text-[var(--color-text-muted)] mb-8">
              Расскажите о вашем проекте — обсудим, как достичь ваших целей.
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <Button variant="primary" size="lg" as="a" href="/#contact">
              Обсудить проект
            </Button>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
