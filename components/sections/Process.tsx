"use client";

import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";

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
        <RevealOnScroll direction="up" className="mb-12 lg:mb-20">
          <div className="flex flex-col gap-4">
            <span className="text-caption text-[var(--color-text-muted)]">
              Этапы
            </span>
            <h2>
              <BrokenText
                text="ПРОЦЕСС"
                spaced
                mixPattern={[2, 5]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </div>
        </RevealOnScroll>

        {/* Timeline - Desktop (горизонтальный, 2 ряда по 4) */}
        <div className="hidden lg:block">
          <StaggerContainer staggerDelay={0.08}>
            {/* Первый ряд: шаги 1-4 */}
            <div className="grid grid-cols-4 gap-0 mb-12">
              {steps.slice(0, 4).map((step, index) => (
                <StaggerItem key={step.number}>
                  <ProcessStep
                    {...step}
                    isLast={index === 3}
                    showConnector={index < 3}
                  />
                </StaggerItem>
              ))}
            </div>

            {/* Вертикальный коннектор между рядами */}
            <div className="flex justify-end pr-[12.5%] mb-12">
              <div className="w-px h-12 bg-[var(--color-line)]" />
            </div>

            {/* Второй ряд: шаги 5-8 (в обратном порядке для визуального flow) */}
            <div className="grid grid-cols-4 gap-0">
              {steps.slice(4, 8).reverse().map((step, index) => (
                <StaggerItem key={step.number}>
                  <ProcessStep
                    {...step}
                    isLast={index === 3}
                    showConnector={index < 3}
                    reverse
                  />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        {/* Timeline - Mobile/Tablet (вертикальный) */}
        <div className="lg:hidden">
          <StaggerContainer
            className="relative"
            staggerDelay={0.1}
          >
            {/* Вертикальная линия */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--color-line)]" />

            {steps.map((step, index) => (
              <StaggerItem key={step.number}>
                <ProcessStepMobile
                  {...step}
                  isLast={index === steps.length - 1}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}

/**
 * Props для ProcessStep
 */
interface ProcessStepProps extends ProcessStepData {
  /** Последний шаг в ряду */
  isLast?: boolean;
  /** Показывать коннектор */
  showConnector?: boolean;
  /** Обратное направление (для второго ряда) */
  reverse?: boolean;
}

/**
 * ProcessStep — один шаг (Desktop)
 */
function ProcessStep({
  number,
  title,
  description,
  isLast: _isLast = false,
  showConnector = true,
  reverse = false,
}: ProcessStepProps) {
  void _isLast; // Reserved for future use
  return (
    <div className="relative">
      {/* Контент */}
      <div className="pr-8">
        {/* Номер */}
        <span className="block text-6xl xl:text-7xl font-display font-bold text-[var(--color-line)] mb-4 leading-none">
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

      {/* Горизонтальный коннектор */}
      {showConnector && (
        <div
          className={`absolute top-8 ${reverse ? "left-0 -translate-x-full" : "right-0"} w-8 h-px bg-[var(--color-line)]`}
        />
      )}
    </div>
  );
}

/**
 * ProcessStepMobile — один шаг (Mobile)
 */
function ProcessStepMobile({
  number,
  title,
  description,
  isLast: _isLast = false,
}: ProcessStepData & { isLast?: boolean }) {
  void _isLast; // Reserved for future use
  return (
    <div className="relative pl-12 pb-10">
      {/* Точка на линии */}
      <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-[var(--color-text-primary)] border-2 border-[var(--color-background)]" />

      {/* Номер и заголовок */}
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-3xl font-display font-bold text-[var(--color-line)] leading-none">
          {number}
        </span>
        <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)]">
          {title}
        </h3>
      </div>

      {/* Описание */}
      <p className="text-body-sm text-[var(--color-text-muted)] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default Process;
