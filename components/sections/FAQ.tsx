"use client";

import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { RevealOnScroll } from "@/components/motion";
import { faqSchema } from "@/lib/schema";

/**
 * Данные для одного вопроса FAQ
 */
export interface FAQItem {
  /** Вопрос */
  question: string;
  /** Ответ */
  answer: string;
}

interface FAQProps {
  /** Массив вопросов и ответов */
  items?: FAQItem[];
}

/**
 * Вопросы по умолчанию
 */
const defaultFAQItems: FAQItem[] = [
  {
    question: "Сколько времени занимает разработка?",
    answer:
      "Сроки зависят от сложности проекта. Лендинг — 7–14 дней, сайт эксперта — 14–21 день, интернет-магазин — 21–45 дней. Точные сроки обсуждаем после заполнения брифа.",
  },
  {
    question: "Сколько стоит сайт? Что влияет на цену?",
    answer:
      "Стоимость зависит от типа сайта, количества страниц, сложности дизайна и интеграций. Лендинг — от 50 000 ₽, сайт эксперта — от 80 000 ₽, интернет-магазин — от 150 000 ₽. Точную стоимость рассчитываем индивидуально.",
  },
  {
    question: "Что входит в разработку «под ключ»?",
    answer:
      "Полный цикл: бриф и аналитика, прототипирование, уникальный дизайн, адаптивная вёрстка, базовое SEO, настройка аналитики, тестирование и запуск. Вы получаете готовый к работе сайт.",
  },
  {
    question: "Нужен ли мне домен и хостинг?",
    answer:
      "Домен нужно зарегистрировать заранее или мы поможем с выбором и регистрацией. Хостинг — используем современные платформы (Vercel, Netlify) с бесплатным тарифом для большинства проектов.",
  },
  {
    question: "Сколько правок входит в стоимость?",
    answer:
      "На каждом этапе предусмотрен раунд правок: прототип, дизайн, вёрстка. Мелкие корректировки — без ограничений. Крупные изменения концепции оцениваются отдельно.",
  },
  {
    question: "Есть ли поддержка после запуска?",
    answer:
      "Да, 30 дней бесплатной поддержки после запуска: исправление багов, мелкие правки, консультации. Далее — по договору на техподдержку или разово.",
  },
  {
    question: "Будет ли сайт оптимизирован для SEO?",
    answer:
      "Базовое SEO входит в стоимость: семантическая вёрстка, метатеги, sitemap, robots.txt, оптимизация изображений, скорость загрузки. Продвижение и контент-маркетинг — отдельная услуга.",
  },
  {
    question: "Какие интеграции возможны?",
    answer:
      "Любые: CRM (amoCRM, Bitrix24), платёжные системы (ЮKassa, Stripe), email-рассылки, Telegram-боты, календари бронирования, аналитика (GA4, Яндекс.Метрика) и другие по запросу.",
  },
  {
    question: "Как происходит оплата?",
    answer:
      "Поэтапно: 50% предоплата перед началом работ, 50% после завершения и приёмки. Для крупных проектов возможна разбивка на 3 этапа. Работаем по договору.",
  },
  {
    question: "Что если мне не понравится дизайн?",
    answer:
      "Мы согласовываем каждый этап до перехода к следующему. Если после первой итерации дизайн не устраивает — предлагаем 2 альтернативных концепции. При полном несогласии — возврат по договору.",
  },
];

/**
 * FAQ — секция часто задаваемых вопросов
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Accordion с плавными анимациями
 * - Два столбца на desktop
 * - Reveal анимации
 */
export function FAQ({ items = defaultFAQItems }: FAQProps) {
  // Разбиваем на две колонки для desktop
  const midpoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midpoint);
  const rightColumn = items.slice(midpoint);

  return (
    <section
      id="faq"
      className="py-[var(--section-gap)] bg-[var(--color-background-alt)]"
    >
      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(items)),
        }}
      />

      <Container>
        {/* Заголовок секции */}
        <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-caption text-[var(--color-text-muted)]">
              Ответы
            </span>
            <h2>
              <BrokenText
                text="ВОПРОСЫ"
                spaced
                mixPattern={[2, 5]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </div>
        </RevealOnScroll>

        {/* FAQ Grid - две колонки на desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
          {/* Левая колонка */}
          <RevealOnScroll direction="up" delay={0.1}>
            <Accordion allowMultiple>
              {leftColumn.map((item, index) => (
                <AccordionItem
                  key={index}
                  id={`faq-left-${index}`}
                  title={item.question}
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>

          {/* Правая колонка */}
          <RevealOnScroll direction="up" delay={0.2}>
            <Accordion allowMultiple>
              {rightColumn.map((item, index) => (
                <AccordionItem
                  key={index}
                  id={`faq-right-${index}`}
                  title={item.question}
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;
