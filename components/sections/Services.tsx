"use client";

import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { StaggerContainer, StaggerItem, SplitTextReveal } from "@/components/motion";
import { ease, duration, sectionPresets } from "@/lib/motion";

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
 * Services — секция услуг
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Сетка карточек (1 → 2 → 3 колонки)
 * - Hover эффекты
 * - CTA на каждую услугу
 */
export function Services({ services }: ServicesProps) {
  const t = useTranslations("services");

  const SERVICE_HREFS = ["/services#expert", "/services#ecommerce", "/services#landing"];

  const translatedServices: ServiceData[] = (t.raw("items") as Array<{
    title: string; description: string; features: string[]; ctaText: string;
  }>).map((item, i) => ({
    title: item.title,
    description: item.description,
    features: item.features,
    ctaText: item.ctaText,
    ctaHref: SERVICE_HREFS[i],
    icon: String(i + 1).padStart(2, "0"),
  }));

  const items = services || translatedServices;
  return (
    <section
      id="services"
      className="py-[var(--section-gap)] bg-[var(--color-background)]"
    >
      <Container>
        {/* Заголовок секции */}
        <div className="mb-16 lg:mb-24">
          <div className="flex flex-col gap-4">
            <SplitTextReveal
              text={t("caption")}
              as="span"
              className="text-caption text-[var(--color-text-muted)]"
              direction="up"
              staggerDelay={sectionPresets.heading.captionStagger}
            />
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: sectionPresets.heading.titleDuration, ease, delay: sectionPresets.heading.titleDelay }}
            >
              <BrokenText
                text={t("title")}
                spaced
                mixPattern="every-3"
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </motion.h2>
          </div>
        </div>

        {/* Сетка услуг */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          staggerDelay={sectionPresets.grid.stagger}
        >
          {items.map((service, index) => (
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
  ctaText,
  ctaHref = "/services",
  icon,
}: ServiceData) {
  return (
    <div className="group flex flex-col h-full p-6 lg:p-8 bg-[var(--color-background-alt)] border border-[var(--color-line)] hover:border-[var(--color-line-dark)] transition-colors duration-300 hover-card">
      {/* Номер/иконка */}
      {icon && (
        <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-text-primary)]/10 mb-6 leading-none select-none group-hover:text-[var(--color-text-primary)]/20 transition-colors">
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
        variant="link"
        size="md"
        as={Link}
        href={ctaHref || "/services"}
        className="mt-auto"
      >
        {ctaText}
      </Button>
    </div>
  );
}

export default Services;
