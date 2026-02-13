import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { LeadFormSection } from "@/components/sections";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Пакеты услуг: сайт для эксперта, интернет-магазин, лендинг. Фиксированные сроки, прозрачные цены. Узнайте, что входит в каждый пакет.",
  openGraph: {
    title: "Услуги | NAKO Agency",
    description: "Пакеты услуг: сайт для эксперта, интернет-магазин, лендинг.",
    type: "website",
  },
};

/**
 * Данные пакетов услуг
 */
const packages = [
  {
    id: "expert",
    number: "01",
    title: "Сайт для эксперта",
    subtitle: "Персональный бренд",
    description:
      "Для специалистов, коучей, консультантов, психологов. Продаёт вашу экспертизу и конвертирует посетителей в клиентов.",
    price: "от 80 000 ₽",
    timeline: "14–21 день",
    features: [
      "До 7 страниц",
      "Уникальный дизайн",
      "Адаптивная вёрстка",
      "Форма записи на консультацию",
      "Интеграция с календарём",
      "Блог (опционально)",
      "Базовое SEO",
      "30 дней поддержки",
    ],
    idealFor: [
      "Коучи и консультанты",
      "Психологи и терапевты",
      "Юристы и бухгалтеры",
      "Преподаватели и репетиторы",
    ],
  },
  {
    id: "ecommerce",
    number: "02",
    title: "Интернет-магазин",
    subtitle: "E-commerce решение",
    description:
      "Полноценный онлайн-магазин с каталогом, корзиной, оплатой и интеграциями. Автоматизация продаж и аналитика.",
    price: "от 150 000 ₽",
    timeline: "21–45 дней",
    features: [
      "Каталог товаров",
      "Корзина и checkout",
      "Онлайн-оплата (ЮKassa)",
      "Личный кабинет",
      "CRM интеграция",
      "Telegram-уведомления",
      "Фильтры и поиск",
      "Административная панель",
      "Базовое SEO",
      "30 дней поддержки",
    ],
    idealFor: [
      "Магазины одежды и обуви",
      "Косметика и уход",
      "Товары для дома",
      "Электроника и гаджеты",
    ],
  },
  {
    id: "landing",
    number: "03",
    title: "Лендинг / промо",
    subtitle: "Конверсионная страница",
    description:
      "Одностраничный сайт с фокусом на конверсию. Идеален для запуска продукта, услуги или рекламной кампании.",
    price: "от 50 000 ₽",
    timeline: "7–14 дней",
    features: [
      "1 страница",
      "Уникальный дизайн",
      "Адаптивная вёрстка",
      "Форма заявки",
      "A/B тестирование",
      "Интеграция с аналитикой",
      "Быстрая загрузка",
      "Базовое SEO",
      "14 дней поддержки",
    ],
    idealFor: [
      "Запуск нового продукта",
      "Рекламные кампании",
      "Мероприятия и вебинары",
      "Тестирование гипотез",
    ],
  },
];

/**
 * Данные для сравнительной таблицы
 */
const comparisonData = {
  rows: [
    { label: "Количество страниц", expert: "До 7", ecommerce: "Неограниченно", landing: "1" },
    { label: "Уникальный дизайн", expert: "✓", ecommerce: "✓", landing: "✓" },
    { label: "Адаптив (mobile)", expert: "✓", ecommerce: "✓", landing: "✓" },
    { label: "Каталог товаров", expert: "—", ecommerce: "✓", landing: "—" },
    { label: "Онлайн-оплата", expert: "—", ecommerce: "✓", landing: "—" },
    { label: "Форма заявки", expert: "✓", ecommerce: "✓", landing: "✓" },
    { label: "CRM интеграция", expert: "Опционально", ecommerce: "✓", landing: "Опционально" },
    { label: "Блог", expert: "Опционально", ecommerce: "Опционально", landing: "—" },
    { label: "SEO базовое", expert: "✓", ecommerce: "✓", landing: "✓" },
    { label: "Аналитика", expert: "✓", ecommerce: "✓", landing: "✓" },
    { label: "Сроки", expert: "14–21 день", ecommerce: "21–45 дней", landing: "7–14 дней" },
    { label: "Поддержка", expert: "30 дней", ecommerce: "30 дней", landing: "14 дней" },
  ],
};

/**
 * Services Page — страница услуг
 */
export default function ServicesPage() {
  const services = packages.map((pkg) => ({
    name: pkg.title,
    description: pkg.description,
    price: pkg.price.replace("от ", ""),
  }));

  return (
    <main>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(services)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Главная", url: "/" },
            { name: "Услуги", url: "/services" },
          ])),
        }}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Quick Navigation */}
      <QuickNavSection />

      {/* Package Sections */}
      {packages.map((pkg) => (
        <PackageSection key={pkg.id} {...pkg} />
      ))}

      {/* Comparison Table */}
      <ComparisonSection />

      {/* Lead Form */}
      <LeadFormSection
        title="ОБСУДИТЬ ПРОЕКТ"
        subtitle="Не уверены, какой пакет подходит? Расскажите о задаче — поможем выбрать."
      />
    </main>
  );
}

/**
 * Hero Section
 */
function HeroSection() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            Пакеты
          </span>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.1}>
          <h1 className="mb-6">
            <BrokenText
              text="УСЛУГИ"
              spaced
              mixPattern={[2, 4]}
              className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h1>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.2}>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
            Три пакета под разные задачи. Фиксированные сроки, понятные цены,
            прозрачный процесс. Выберите подходящий или обсудим индивидуальное решение.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * Quick Navigation Section
 */
function QuickNavSection() {
  return (
    <section className="py-8 bg-[var(--color-background-alt)] border-y border-[var(--color-line)]">
      <Container>
        <RevealOnScroll direction="up">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {packages.map((pkg) => (
              <a
                key={pkg.id}
                href={`#${pkg.id}`}
                className="flex items-center gap-2 text-body text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                <span className="text-caption text-[var(--color-text-muted)]">
                  {pkg.number}
                </span>
                {pkg.title}
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

/**
 * Package Section — детальное описание пакета
 */
interface PackageSectionProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  timeline: string;
  features: string[];
  idealFor: string[];
}

function PackageSection({
  id,
  number,
  title,
  subtitle,
  description,
  price,
  timeline,
  features,
  idealFor,
}: PackageSectionProps) {
  const isEven = parseInt(number) % 2 === 0;

  return (
    <section
      id={id}
      className={`py-[var(--section-gap)] ${isEven ? "bg-[var(--color-background-alt)]" : "bg-[var(--color-background)]"}`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <div className={isEven ? "lg:order-2" : ""}>
            <RevealOnScroll direction="up">
              <span className="text-6xl sm:text-8xl lg:text-9xl font-display font-bold text-[var(--color-line)] leading-none block mb-6">
                {number}
              </span>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.1}>
              <span className="text-caption text-[var(--color-text-muted)] mb-2 block">
                {subtitle}
              </span>
              <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
                {title}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.2}>
              <p className="text-body text-[var(--color-text-secondary)] mb-8">
                {description}
              </p>
            </RevealOnScroll>

            {/* Price & Timeline */}
            <RevealOnScroll direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <span className="text-caption text-[var(--color-text-muted)] block mb-1">
                    Стоимость
                  </span>
                  <span className="text-h3 font-display font-bold text-[var(--color-text-primary)]">
                    {price}
                  </span>
                </div>
                <div>
                  <span className="text-caption text-[var(--color-text-muted)] block mb-1">
                    Сроки
                  </span>
                  <span className="text-h3 font-display font-bold text-[var(--color-text-primary)]">
                    {timeline}
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            {/* CTA */}
            <RevealOnScroll direction="up" delay={0.4}>
              <CtaButton
                variant="primary"
                size="lg"
                className="hover-lift"
              >
                Заказать {title.toLowerCase()}
              </CtaButton>
            </RevealOnScroll>
          </div>

          {/* Right: Features & Ideal For */}
          <div className={isEven ? "lg:order-1" : ""}>
            {/* Features Checklist */}
            <RevealOnScroll direction="up" delay={0.2}>
              <div className="mb-10">
                <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6">
                  Что входит
                </h3>
                <StaggerContainer className="space-y-3" staggerDelay={0.05}>
                  {features.map((feature, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[var(--color-text-primary)] flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-body text-[var(--color-text-secondary)]">
                          {feature}
                        </span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </RevealOnScroll>

            {/* Ideal For */}
            <RevealOnScroll direction="up" delay={0.3}>
              <div className="p-6 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm">
                <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-4">
                  Подходит для
                </h3>
                <ul className="space-y-2">
                  {idealFor.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-body-sm text-[var(--color-text-muted)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Comparison Section — сравнительная таблица
 */
function ComparisonSection() {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12 lg:mb-16 text-center">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            Сравнение
          </span>
          <h2>
            <BrokenText
              text="ПАКЕТЫ"
              spaced
              mixPattern={[2, 4]}
              className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h2>
        </RevealOnScroll>

        {/* Table - Desktop */}
        <RevealOnScroll direction="up" delay={0.1}>
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 border-b border-[var(--color-line)]" />
                  {packages.map((pkg) => (
                    <th
                      key={pkg.id}
                      className="text-center p-4 border-b border-[var(--color-line)]"
                    >
                      <span className="text-caption text-[var(--color-text-muted)] block mb-1">
                        {pkg.number}
                      </span>
                      <span className="text-h4 font-display font-bold text-[var(--color-text-primary)]">
                        {pkg.title}
                      </span>
                      <span className="text-body-sm text-[var(--color-text-muted)] block mt-1">
                        {pkg.price}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-[var(--color-background-alt)]" : ""}
                  >
                    <td className="p-4 text-body text-[var(--color-text-secondary)] border-b border-[var(--color-line)]">
                      {row.label}
                    </td>
                    <td className="p-4 text-center text-body text-[var(--color-text-primary)] border-b border-[var(--color-line)]">
                      {row.expert}
                    </td>
                    <td className="p-4 text-center text-body text-[var(--color-text-primary)] border-b border-[var(--color-line)]">
                      {row.ecommerce}
                    </td>
                    <td className="p-4 text-center text-body text-[var(--color-text-primary)] border-b border-[var(--color-line)]">
                      {row.landing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile */}
          <div className="lg:hidden space-y-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm"
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-caption text-[var(--color-text-muted)]">
                    {pkg.number}
                  </span>
                  <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)]">
                    {pkg.title}
                  </h3>
                </div>
                <p className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-4">
                  {pkg.price}
                </p>
                <div className="space-y-2 text-body-sm">
                  {comparisonData.rows.slice(0, 6).map((row, index) => {
                    const value =
                      pkg.id === "expert"
                        ? row.expert
                        : pkg.id === "ecommerce"
                          ? row.ecommerce
                          : row.landing;
                    return (
                      <div key={index} className="flex justify-between">
                        <span className="text-[var(--color-text-muted)]">{row.label}</span>
                        <span className="text-[var(--color-text-primary)]">{value}</span>
                      </div>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="md"
                  as="a"
                  href={`#${pkg.id}`}
                  className="w-full mt-6"
                >
                  Подробнее
                </Button>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
