"use client";

import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";

/**
 * Данные для одной услуги
 */
export interface ServiceData {
  /** Заголовок услуги */
  title: string;
  /** Описание */
  description: string;
  /** Ключевые особенности (список) */
  features: string[];
  /** Текст CTA кнопки */
  ctaText?: string;
  /** Ссылка CTA */
  ctaHref?: string;
  /** Иконка или номер */
  icon?: ReactNode;
}

interface ServicesProps {
  /** Массив услуг */
  services?: ServiceData[];
}

/**
 * Услуги по умолчанию
 */
const defaultServices: ServiceData[] = [
  {
    title: "Сайт для эксперта",
    description:
      "Персональный сайт для специалистов, коучей, консультантов. Продаёт вашу экспертизу и привлекает клиентов.",
    features: [
      "Личный бренд",
      "Портфолио работ",
      "Запись на консультацию",
      "Интеграция с календарём",
    ],
    ctaText: "Подробнее",
    ctaHref: "/services#expert",
    icon: "01",
  },
  {
    title: "Интернет-магазин",
    description:
      "Полноценный e-commerce с каталогом, корзиной и оплатой. Автоматизация продаж и интеграции.",
    features: [
      "Каталог товаров",
      "Онлайн-оплата",
      "CRM интеграция",
      "Telegram-уведомления",
    ],
    ctaText: "Подробнее",
    ctaHref: "/services#ecommerce",
    icon: "02",
  },
  {
    title: "Лендинг / промо",
    description:
      "Одностраничный сайт с высокой конверсией для запуска продукта, услуги или рекламной кампании.",
    features: [
      "Высокая конверсия",
      "A/B тестирование",
      "Быстрый запуск",
      "Аналитика",
    ],
    ctaText: "Подробнее",
    ctaHref: "/services#landing",
    icon: "03",
  },
];

/**
 * Services — секция услуг
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Сетка карточек (1 → 2 → 3 колонки)
 * - Hover эффекты
 * - CTA на каждую услугу
 */
export function Services({ services = defaultServices }: ServicesProps) {
  return (
    <section
      id="services"
      className="py-[var(--section-gap)] bg-[var(--color-background)]"
    >
      <Container>
        {/* Заголовок секции */}
        <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-caption text-[var(--color-text-muted)]">
              Направления
            </span>
            <h2>
              <BrokenText
                text="УСЛУГИ"
                spaced
                mixPattern={[2, 4]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </div>
        </RevealOnScroll>

        {/* Сетка услуг */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {services.map((service, index) => (
            <StaggerItem key={index}>
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * ServiceCard — карточка услуги
 */
function ServiceCard({
  title,
  description,
  features,
  ctaText = "Подробнее",
  ctaHref = "/services",
  icon,
}: ServiceData) {
  return (
    <div className="group flex flex-col h-full p-6 lg:p-8 bg-[var(--color-background-alt)] rounded-sm border border-[var(--color-line)] hover:border-[var(--color-line-dark)] transition-colors duration-300 hover-card">
      {/* Номер/иконка */}
      {icon && (
        <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-line)] mb-6 leading-none select-none group-hover:text-[var(--color-line-dark)] transition-colors">
          {icon}
        </span>
      )}

      {/* Заголовок */}
      <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-3">
        {title}
      </h3>

      {/* Описание */}
      <p className="text-body text-[var(--color-text-muted)] mb-6">
        {description}
      </p>

      {/* Особенности */}
      <ul className="flex flex-col gap-2 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-3 text-body-sm text-[var(--color-text-secondary)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        variant="outline"
        size="md"
        as="a"
        href={ctaHref}
        className="w-full hover-lift"
      >
        {ctaText}
      </Button>
    </div>
  );
}

export default Services;
