"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { ease, duration } from "@/lib/motion";

/**
 * Данные для одного преимущества
 */
export interface BenefitData {
  /** Номер преимущества (01, 02, ...) */
  number: string;
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  subtitle: string;
  /** Описание (текст или ReactNode) */
  description: ReactNode;
  /** URL изображения */
  imageSrc?: string;
  /** Alt текст для изображения */
  imageAlt?: string;
  /** Blur placeholder */
  blurDataURL?: string;
}

interface BenefitsProps {
  /** Массив преимуществ */
  benefits?: BenefitData[];
}

/**
 * Преимущества по умолчанию
 */
const defaultBenefits: BenefitData[] = [
  {
    number: "01",
    title: "СТРАТЕГИЯ",
    subtitle: "Стратегия и структура",
    description:
      "Начинаем с глубокого анализа вашего бизнеса, целевой аудитории и конкурентов. Разрабатываем структуру сайта, которая ведёт посетителя к целевому действию.",
  },
  {
    number: "02",
    title: "ДИЗАЙН",
    subtitle: "Дизайн «премиум-минимал»",
    description:
      "Создаём уникальный визуальный стиль без шаблонов. Много воздуха, чёткая типографика, продуманная анимация — сайт, который выделяется и запоминается.",
  },
  {
    number: "03",
    title: "СКОРОСТЬ",
    subtitle: "Скорость и SEO",
    description:
      "Оптимизируем каждую страницу для Core Web Vitals. Быстрая загрузка, правильная семантика, техническое SEO — ваш сайт будет любить и Google, и пользователи.",
  },
  {
    number: "04",
    title: "ИНТЕГРАЦИИ",
    subtitle: "Интеграции (оплаты/CRM/Telegram)",
    description:
      "Подключаем платёжные системы, CRM, аналитику, Telegram-уведомления и любые другие сервисы, необходимые для автоматизации вашего бизнеса.",
  },
  {
    number: "05",
    title: "ПОДДЕРЖКА",
    subtitle: "Поддержка после запуска",
    description:
      "Не бросаем после сдачи проекта. Техническая поддержка, мелкие доработки, консультации — мы рядом, когда вам нужно.",
  },
];

/**
 * Benefits — секция преимуществ
 *
 * Стиль: Premium-minimal / Architectural (референс: THE BRIDGE)
 * Особенности:
 * - Чередующийся layout (изображение слева/справа)
 * - Крупные номера как «каркас»
 * - Stagger анимации
 */
export function Benefits({ benefits = defaultBenefits }: BenefitsProps) {
  return (
    <section
      id="benefits"
      className="py-[var(--section-gap)] bg-[var(--color-background)]"
    >
      <Container>
        {/* Заголовок секции */}
        <RevealOnScroll direction="up" className="mb-16 lg:mb-24">
          <div className="flex flex-col gap-4">
            <span className="text-caption text-[var(--color-text-muted)]">
              Почему мы
            </span>
            <h2>
              <BrokenText
                text="ПРЕИМУЩЕСТВА"
                spaced
                mixPattern={[4, 8]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </div>
        </RevealOnScroll>

        {/* Список преимуществ */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={benefit.number}
              {...benefit}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * Props для BenefitItem
 */
interface BenefitItemProps extends BenefitData {
  /** Развернуть layout (изображение слева) */
  reversed?: boolean;
}

/**
 * BenefitItem — один блок преимущества
 */
function BenefitItem({
  number,
  title,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  blurDataURL,
  reversed = false,
}: BenefitItemProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        reversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Текстовый блок */}
      <div className={`flex flex-col gap-6 ${reversed ? "lg:order-2" : "lg:order-1"}`}>
        <StaggerContainer className="flex flex-col gap-4">
          {/* Номер */}
          <StaggerItem>
            <motion.span
              className="text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-[var(--color-line)] leading-none select-none"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: duration.slow, ease }}
            >
              {number}
            </motion.span>
          </StaggerItem>

          {/* Заголовок */}
          <StaggerItem>
            <h3>
              <BrokenText
                text={title}
                spaced
                mixPattern={[1]}
                className="text-h3 font-display font-bold text-[var(--color-text-primary)] tracking-wide"
              />
            </h3>
          </StaggerItem>

          {/* Подзаголовок */}
          <StaggerItem>
            <p className="text-body-lg text-[var(--color-text-secondary)] font-medium">
              {subtitle}
            </p>
          </StaggerItem>

          {/* Описание */}
          <StaggerItem>
            <div className="text-body text-[var(--color-text-muted)] max-w-md">
              {description}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>

      {/* Визуальный блок */}
      <div className={`${reversed ? "lg:order-1" : "lg:order-2"}`}>
        <RevealOnScroll
          direction={reversed ? "right" : "left"}
          delay={0.2}
          duration={0.8}
        >
          <div className="relative aspect-[4/3] bg-[var(--color-background-alt)] rounded-sm overflow-hidden">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt || `${title} — ${subtitle}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
              />
            ) : (
              /* Геометрический placeholder */
              <BenefitPlaceholder number={number} />
            )}
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}

/**
 * BenefitPlaceholder — декоративный placeholder для изображения
 */
function BenefitPlaceholder({ number }: { number: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-2/3 h-2/3">
        {/* Рамки */}
        <motion.div
          className="absolute inset-0 border border-[var(--color-line)]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease, delay: 0.3 }}
        />
        <motion.div
          className="absolute inset-4 border border-[var(--color-line-dark)]"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease, delay: 0.4 }}
        />
        {/* Номер внутри */}
        <motion.div
          className="absolute inset-8 bg-[var(--color-text-primary)] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration.normal, ease, delay: 0.5 }}
        >
          <span className="text-5xl lg:text-6xl font-display font-bold text-[var(--color-background)]">
            {number}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export default Benefits;
