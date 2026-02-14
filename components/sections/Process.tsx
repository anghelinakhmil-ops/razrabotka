"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { StaggerContainer, StaggerItem, SplitTextReveal } from "@/components/motion";
import { ease, duration, sectionPresets } from "@/lib/motion";

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
 * Process — секция «Как мы работаем»
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Timeline layout с соединительными линиями
 * - Горизонтальный на desktop, вертикальный на mobile
 * - Нумерация шагов
 * - Reveal анимации
 */
export function Process({ steps }: ProcessProps) {
  const t = useTranslations("process");

  const translatedSteps: ProcessStepData[] = (t.raw("steps") as Array<{
    number: string; title: string; description: string;
  }>).map((step) => ({
    number: step.number,
    title: step.title,
    description: step.description,
  }));

  const items = steps || translatedSteps;

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
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </motion.h2>
          </div>
        </div>

        {/* Единый адаптивный grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          staggerDelay={sectionPresets.denseGrid.stagger}
        >
          {items.map((step) => (
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
