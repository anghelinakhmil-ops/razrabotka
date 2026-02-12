"use client";

import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";

/**
 * Данные для одного отзыва
 */
export interface TestimonialData {
  /** Имя клиента */
  name: string;
  /** Должность / компания */
  role: string;
  /** Текст отзыва */
  quote: string;
  /** URL аватара (опционально) */
  avatarSrc?: string;
  /** Проект (опционально) */
  project?: string;
}

interface TestimonialsProps {
  /** Массив отзывов */
  testimonials?: TestimonialData[];
}

/**
 * Отзывы по умолчанию
 */
const defaultTestimonials: TestimonialData[] = [
  {
    name: "Анна Ковалёва",
    role: "Психолог, частная практика",
    quote:
      "Сайт окупился за первый месяц. Записей стало в 3 раза больше, и клиенты приходят уже «тёплые» — они прочитали обо мне всё на сайте.",
    project: "Сайт психолога",
  },
  {
    name: "Максим Петров",
    role: "Основатель, FLAVOR cosmetics",
    quote:
      "Наконец-то магазин работает быстро. Раньше клиенты уходили из-за медленной загрузки. Сейчас конверсия выросла на 40%.",
    project: "Интернет-магазин",
  },
  {
    name: "Елена Соколова",
    role: "Бизнес-коуч",
    quote:
      "Очень понравился подход — не просто красивая картинка, а продуманная структура. Каждый блок работает на конверсию.",
    project: "Персональный сайт",
  },
  {
    name: "Дмитрий Волков",
    role: "CEO, TechStart",
    quote:
      "Запустили лендинг за 2 недели. Качество на уровне топовых агентств, но без их бюджетов и бюрократии.",
    project: "Лендинг SaaS",
  },
  {
    name: "Ольга Миронова",
    role: "Владелец, студия йоги",
    quote:
      "Сайт передаёт атмосферу студии идеально. Минимализм, воздух, спокойствие — именно то, что нужно было.",
    project: "Сайт студии",
  },
];

/**
 * Testimonials — секция отзывов
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Карточки отзывов с цитатами
 * - Сетка 1 → 2 → 3 колонки
 * - Reveal анимации
 */
export function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  return (
    <section
      id="testimonials"
      className="py-[var(--section-gap)] bg-[var(--color-background)]"
    >
      <Container>
        {/* Заголовок секции */}
        <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-caption text-[var(--color-text-muted)]">
              Клиенты
            </span>
            <h2>
              <BrokenText
                text="ОТЗЫВЫ"
                spaced
                mixPattern={[2, 4]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </div>
        </RevealOnScroll>

        {/* Сетка отзывов */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <TestimonialCard {...testimonial} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * TestimonialCard — карточка отзыва
 */
function TestimonialCard({
  name,
  role,
  quote,
  project,
}: TestimonialData) {
  return (
    <div className="flex flex-col h-full p-6 lg:p-8 bg-[var(--color-background-alt)] border border-[var(--color-line)]">
      {/* Кавычка */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        className="mb-6 text-[var(--color-line)]"
      >
        <path
          d="M12 8H4V16H10C10 20 8 22 4 22V26C12 26 16 22 16 14V8H12ZM28 8H20V16H26C26 20 24 22 20 22V26C28 26 32 22 32 14V8H28Z"
          fill="currentColor"
        />
      </svg>

      {/* Цитата */}
      <blockquote className="text-body text-[var(--color-text-secondary)] leading-relaxed mb-6 flex-grow">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Автор */}
      <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-line)]">
        {/* Аватар placeholder */}
        <div className="w-12 h-12 rounded-full bg-[var(--color-line)] flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-display font-bold text-[var(--color-text-muted)]">
            {name.charAt(0)}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-body font-medium text-[var(--color-text-primary)]">
            {name}
          </span>
          <span className="text-body-sm text-[var(--color-text-muted)]">
            {role}
          </span>
          {project && (
            <span className="text-caption text-[var(--color-text-light)] mt-1">
              Проект: {project}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
