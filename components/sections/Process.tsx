"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { StaggerContainer, StaggerItem, SplitTextReveal } from "@/components/motion";
import { ease, duration } from "@/lib/motion";

/**
 * Данные для одного шага процесса
 */
export interface ProcessStepData {
  /** Номер шага */
  number: string;
  /** Название шага */
  title: string;
  /** Описание шага */
  description: string;
  /** Иконка (опционально) */
  icon?: ReactNode;
}

interface ProcessProps {
  /** Массив шагов */
  steps?: ProcessStepData[];
}

/**
 * Шаги по умолчанию
 */
const defaultSteps: ProcessStepData[] = [
  {
    number: "01",
    title: "Бриф",
    description:
      "Обсуждаем цели, аудиторию и задачи проекта. Заполняем бриф и определяем ключевые метрики успеха.",
  },
  {
    number: "02",
    title: "Прототип",
    description:
      "Создаём структуру сайта, wireframes и пользовательские сценарии. Согласовываем логику до дизайна.",
  },
  {
    number: "03",
    title: "Дизайн",
    description:
      "Разрабатываем уникальный визуальный стиль. Каждый экран — отдельная композиция с вниманием к деталям.",
  },
  {
    number: "04",
    title: "Разработка",
    description:
      "Верстаем на Next.js с фокусом на производительность. Чистый код, SEO-оптимизация, быстрая загрузка.",
  },
  {
    number: "05",
    title: "Контент",
    description:
      "Наполняем сайт текстами и медиа. Помогаем с копирайтингом и подбором визуального контента.",
  },
  {
    number: "06",
    title: "Тестирование",
    description:
      "Проверяем на всех устройствах и браузерах. Тестируем формы, интеграции и пользовательские сценарии.",
  },
  {
    number: "07",
    title: "Запуск",
    description:
      "Разворачиваем на production, настраиваем домен, SSL, аналитику. Передаём доступы и документацию.",
  },
  {
    number: "08",
    title: "Поддержка",
    description:
      "Остаёмся на связи после запуска. Техническая поддержка, обновления и развитие проекта.",
  },
];

/**
 * Process — секция «Как мы работаем»
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Timeline layout с соединительными линиями
 * - Горизонтальный на desktop, вертикальный на mobile
 * - Нумерация шагов
 * - Reveal анимации
 */
export function Process({ steps = defaultSteps }: ProcessProps) {
  return (
    <section
      id="process"
      className="py-[var(--section-gap)] bg-[var(--color-background)]"
    >
      <Container>
        {/* Заголовок секции */}
        <div className="mb-12 lg:mb-20">
          <div className="flex flex-col gap-4">
            <SplitTextReveal
              text="Этапы"
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
                text="ПРОЦЕСС"
                spaced
                mixPattern={[2, 5]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </motion.h2>
          </div>
        </div>

        {/* Единый адаптивный grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          staggerDelay={0.08}
        >
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <ProcessStep {...step} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * ProcessStep — один шаг процесса (адаптивный)
 */
function ProcessStep({
  number,
  title,
  description,
}: ProcessStepData) {
  return (
    <div>
      {/* Номер */}
      <span className="block text-5xl sm:text-6xl xl:text-7xl font-display font-bold text-[var(--color-line)] mb-4 leading-none">
        {number}
      </span>

      {/* Заголовок */}
      <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
        {title}
      </h3>

      {/* Описание */}
      <p className="text-body-sm text-[var(--color-text-muted)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default Process;
