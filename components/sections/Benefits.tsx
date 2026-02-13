"use client";

import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { RevealOnScroll, StaggerContainer, StaggerItem, SplitTextReveal, ScrollScrubText } from "@/components/motion";
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
  /** Паттерн для «ломаной» типографики заголовка */
  mixPattern?: number[];
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
    mixPattern: [3, 6], // СТР A ТЕГ I Я
    description:
      "Начинаем с глубокого анализа вашего бизнеса, целевой аудитории и конкурентов. Разрабатываем структуру сайта, которая ведёт посетителя к целевому действию.",
    imageSrc: "/images/benefits/benefit-01-strategy.jpg",
    imageAlt: "Стратегическое планирование структуры сайта",
  },
  {
    number: "02",
    title: "ДИЗАЙН",
    subtitle: "Дизайн «премиум-минимал»",
    mixPattern: [1, 4], // Д I ЗА Y Н
    description:
      "Создаём уникальный визуальный стиль без шаблонов. Много воздуха, чёткая типографика, продуманная анимация — сайт, который выделяется и запоминается.",
    imageSrc: "/images/benefits/benefit-02-design.jpg",
    imageAlt: "Премиум-минимал дизайн интерфейса",
  },
  {
    number: "03",
    title: "СКОРОСТЬ",
    subtitle: "Скорость и SEO",
    mixPattern: [2, 5], // СК O РО C ТЬ
    description:
      "Оптимизируем каждую страницу для Core Web Vitals. Быстрая загрузка, правильная семантика, техническое SEO — ваш сайт будет любить и Google, и пользователи.",
    imageSrc: "/images/benefits/benefit-03-speed.jpg",
    imageAlt: "Высокая скорость загрузки и оптимизация",
  },
  {
    number: "04",
    title: "ИНТЕГРАЦИИ",
    subtitle: "Интеграции (оплаты/CRM/Telegram)",
    mixPattern: [0, 5], // I НТЕГР A ЦИИ
    description:
      "Подключаем платёжные системы, CRM, аналитику, Telegram-уведомления и любые другие сервисы, необходимые для автоматизации вашего бизнеса.",
    imageSrc: "/images/benefits/benefit-04-integrations.jpg",
    imageAlt: "Интеграции с платёжными системами и CRM",
  },
  {
    number: "05",
    title: "ПОДДЕРЖКА",
    subtitle: "Поддержка после запуска",
    mixPattern: [1, 6], // П O ДДЕРЖ K А
    description:
      "Не бросаем после сдачи проекта. Техническая поддержка, мелкие доработки, консультации — мы рядом, когда вам нужно.",
    imageSrc: "/images/benefits/benefit-05-support.jpg",
    imageAlt: "Команда поддержки всегда на связи",
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
        <div className="mb-20 lg:mb-32">
          <div className="flex flex-col gap-4">
            <SplitTextReveal
              text="Почему мы"
              as="span"
              className="text-caption text-[var(--color-text-muted)]"
              direction="up"
              staggerDelay={0.06}
            />
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: duration.slow, ease, delay: 0.3 }}
            >
              <BrokenText
                text="ПРЕИМУЩЕСТВА"
                spaced
                mixPattern={[4, 8]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </motion.h2>
          </div>
        </div>

        {/* Список преимуществ */}
        <div className="flex flex-col gap-16 sm:gap-24 lg:gap-40">
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
  mixPattern,
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
              className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-[var(--color-text-primary)]/10 leading-none select-none"
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
                mixPattern={mixPattern}
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

          {/* Описание — scrub-эффект при скролле */}
          <StaggerItem>
            {typeof description === "string" ? (
              <ScrollScrubText
                text={description}
                className="text-body text-[var(--color-text-muted)] max-w-md"
              />
            ) : (
              <div className="text-body text-[var(--color-text-muted)] max-w-md">
                {description}
              </div>
            )}
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
          <div className="relative aspect-[4/3] bg-[var(--color-background-alt)] overflow-hidden">
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
