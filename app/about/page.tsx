import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { CtaButton } from "@/components/ui/CtaButton";
import { RevealOnScroll, StaggerContainer, StaggerItem, ScrollScrubText } from "@/components/motion";

export const metadata: Metadata = {
  title: "О нас | NAKO Agency — Разработка сайтов под ключ",
  description:
    "Веб-студия с фокусом на результат. Создаём сайты для экспертов, e-commerce и бизнеса. Узнайте о нашем подходе, ценностях и принципах работы.",
  openGraph: {
    title: "О нас | NAKO Agency",
    description: "Веб-студия с фокусом на результат. Создаём сайты для экспертов, e-commerce и бизнеса.",
    type: "website",
  },
};

/**
 * About Page — страница «О нас»
 */
export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Наш подход */}
      <ApproachSection />

      {/* Ценности */}
      <ValuesSection />

      {/* Принципы работы */}
      <PrinciplesSection />

      {/* Достижения */}
      <AchievementsSection />

      {/* CTA Section */}
      <CTASection />
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
            Знакомство
          </span>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.1}>
          <h1 className="mb-6">
            <BrokenText
              text="О НАС"
              spaced
              mixPattern={[1, 3]}
              className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h1>
        </RevealOnScroll>

        <ScrollScrubText
          text="Мы — веб-студия, которая создаёт сайты с фокусом на результат. Не просто красивые страницы, а инструменты для роста вашего бизнеса."
          className="text-body-lg text-[var(--color-text-muted)] max-w-2xl"
        />
      </Container>
    </section>
  );
}

/**
 * Approach Section — Наш подход
 */
function ApproachSection() {
  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Текст */}
          <div>
            <RevealOnScroll direction="up">
              <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
                Философия
              </span>
              <h2 className="mb-6">
                <BrokenText
                  text="ПОДХОД"
                  spaced
                  mixPattern={[2, 4]}
                  className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
                />
              </h2>
            </RevealOnScroll>

            <div className="space-y-4 text-body">
              <ScrollScrubText
                text="Каждый проект начинается с понимания ваших целей. Мы не делаем сайты «как у всех» — мы создаём решения под конкретные задачи."
                className="text-[var(--color-text-muted)]"
              />
              <ScrollScrubText
                text="Стратегия → Дизайн → Разработка → Результат. Каждый этап согласовывается, каждое решение обосновано."
                className="text-[var(--color-text-muted)]"
              />
              <ScrollScrubText
                text="Минимализм не ради минимализма. Убираем лишнее, чтобы оставить главное — то, что конвертирует посетителей в клиентов."
                className="text-[var(--color-text-muted)]"
              />
            </div>
          </div>

          {/* Визуал placeholder */}
          <RevealOnScroll direction="up" delay={0.2}>
            <div className="aspect-[4/3] bg-[var(--color-background)] border border-[var(--color-line)] flex items-center justify-center">
              <div className="text-center">
                <span className="text-8xl font-display font-bold text-[var(--color-line)]">
                  01
                </span>
                <p className="text-caption text-[var(--color-text-muted)] mt-4">
                  Стратегия первична
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

/**
 * Values Section — Ценности
 */
function ValuesSection() {
  const values = [
    {
      number: "01",
      title: "Результат",
      description:
        "Сайт — это инструмент. Красота без конверсии не имеет смысла. Мы создаём то, что работает.",
    },
    {
      number: "02",
      title: "Прозрачность",
      description:
        "Фиксированные сроки, понятные этапы, регулярные отчёты. Вы всегда знаете, на каком этапе проект.",
    },
    {
      number: "03",
      title: "Качество",
      description:
        "Чистый код, быстрая загрузка, SEO из коробки. Делаем так, чтобы не переделывать.",
    },
    {
      number: "04",
      title: "Партнёрство",
      description:
        "Не исполнители, а партнёры. Советуем, предлагаем, спорим — если это в интересах проекта.",
    },
  ];

  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            Во что верим
          </span>
          <h2>
            <BrokenText
              text="ЦЕННОСТИ"
              spaced
              mixPattern={[3, 6]}
              className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          staggerDelay={0.1}
        >
          {values.map((value) => (
            <StaggerItem key={value.number}>
              <div className="flex gap-6">
                <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-line)] leading-none flex-shrink-0">
                  {value.number}
                </span>
                <div>
                  <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-body text-[var(--color-text-muted)]">
                    {value.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * Principles Section — Принципы работы
 */
function PrinciplesSection() {
  const principles = [
    {
      title: "Сначала стратегия",
      description: "Не начинаем дизайн, пока не поняли цели и аудиторию.",
    },
    {
      title: "Меньше — лучше",
      description: "Каждый элемент должен работать. Декор ради декора — не наш путь.",
    },
    {
      title: "Mobile-first",
      description: "60%+ трафика — мобильные. Сначала телефон, потом desktop.",
    },
    {
      title: "Скорость критична",
      description: "Lighthouse 90+ — стандарт. Быстрый сайт = больше конверсий.",
    },
    {
      title: "SEO с первого дня",
      description: "Не «потом допилим», а сразу: семантика, метатеги, структура.",
    },
    {
      title: "Поддержка включена",
      description: "30 дней после запуска. Баги, правки, вопросы — решаем.",
    },
  ];

  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            Как работаем
          </span>
          <h2>
            <BrokenText
              text="ПРИНЦИПЫ"
              spaced
              mixPattern={[2, 5]}
              className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.08}
        >
          {principles.map((principle, index) => (
            <StaggerItem key={index}>
              <div className="p-6 bg-[var(--color-background)] border border-[var(--color-line)] h-full">
                <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-2">
                  {principle.title}
                </h3>
                <p className="text-body-sm text-[var(--color-text-muted)]">
                  {principle.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * Achievements Section — Достижения в цифрах
 */
function AchievementsSection() {
  const achievements = [
    { value: "50+", label: "Проектов" },
    { value: "3", label: "Года опыта" },
    { value: "95%", label: "Довольных клиентов" },
    { value: "90+", label: "Lighthouse Score" },
  ];

  return (
    <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
      <Container>
        <RevealOnScroll direction="up" className="mb-12 lg:mb-16 text-center">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            В цифрах
          </span>
          <h2>
            <BrokenText
              text="ДОСТИЖЕНИЯ"
              spaced
              mixPattern={[3, 7]}
              className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h2>
        </RevealOnScroll>

        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0"
          staggerDelay={0.1}
        >
          {achievements.map((item, index) => (
            <StaggerItem key={index}>
              <div
                className={`
                  flex flex-col items-center text-center py-8 lg:py-12
                  ${index < achievements.length - 1 ? "lg:border-r lg:border-[var(--color-line)]" : ""}
                `}
              >
                <span className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-[var(--color-text-primary)] leading-none">
                  {item.value}
                </span>
                <p className="mt-4 text-body text-[var(--color-text-muted)]">
                  {item.label}
                </p>
              </div>
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
    <section className="py-[var(--section-gap)] bg-[var(--color-text-primary)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <RevealOnScroll direction="up">
            <h2 className="mb-4">
              <BrokenText
                text="НАЧНЁМ?"
                spaced
                mixPattern={[2, 5]}
                className="text-h2 font-display font-bold text-[var(--color-background)]"
              />
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body text-[var(--color-text-light)] mb-8">
              Расскажите о вашем проекте — обсудим, как можем помочь.
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButton
                variant="primary"
                size="lg"
                source="about_cta"
                className="bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]"
              >
                Обсудить проект
              </CtaButton>
              <Button
                variant="outline"
                size="lg"
                as="a"
                href="/cases"
                className="border-[var(--color-background)] text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
              >
                Смотреть кейсы
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}
