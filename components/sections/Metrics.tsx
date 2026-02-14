"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { StaggerContainer, StaggerItem, SplitTextReveal } from "@/components/motion";
import { ease, duration, sectionPresets } from "@/lib/motion";

/**
 * Данные для одной метрики
 */
export interface MetricData {
  /** Значение метрики (число или текст) */
  value: string;
  /** Подпись к метрике */
  label: string;
  /** Суффикс (%, +, и т.д.) */
  suffix?: string;
  /** Префикс */
  prefix?: string;
}

interface MetricsProps {
  /** Массив метрик */
  metrics?: MetricData[];
}

/**
 * Metrics — секция с ключевыми метриками
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Крупные числа как визуальный акцент
 * - Горизонтальная сетка на desktop
 * - Вертикальные разделители
 */
export function Metrics({ metrics }: MetricsProps) {
  const t = useTranslations("metrics");

  const translatedMetrics: MetricData[] = (t.raw("items") as Array<{
    value: string; label: string; prefix?: string; suffix?: string;
  }>).map((item) => ({
    value: item.value,
    label: item.label,
    prefix: item.prefix,
    suffix: item.suffix,
  }));

  const items = metrics || translatedMetrics;

  return (
    <section
      id="metrics"
      className="py-[var(--section-gap)] bg-[var(--color-background-alt)]"
    >
      <Container>
        {/* Заголовок секции */}
        <div className="mb-12 lg:mb-16">
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

        {/* Сетка метрик */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-0"
          staggerDelay={sectionPresets.denseGrid.stagger}
        >
          {items.map((metric, index) => (
            <StaggerItem key={index}>
              <MetricItem
                {...metric}
                showDivider={index < items.length - 1}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}

/**
 * Props для MetricItem
 */
interface MetricItemProps extends MetricData {
  /** Показывать разделитель справа */
  showDivider?: boolean;
}

/**
 * MetricItem — один блок метрики
 */
function MetricItem({
  value,
  label,
  prefix,
  suffix,
  showDivider = false,
}: MetricItemProps) {
  return (
    <div
      className={`
        flex flex-col items-center text-center py-8 lg:py-12
        ${showDivider ? "lg:border-r lg:border-[var(--color-line)]" : ""}
      `}
    >
      {/* Значение */}
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="text-2xl lg:text-3xl font-display font-medium text-[var(--color-text-muted)]">
            {prefix}
          </span>
        )}
        <span className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-[var(--color-text-primary)] leading-none">
          {value}
        </span>
        {suffix && (
          <span className="text-2xl lg:text-3xl font-display font-medium text-[var(--color-text-muted)]">
            {suffix}
          </span>
        )}
      </div>

      {/* Подпись */}
      <p className="mt-4 text-body text-[var(--color-text-muted)] max-w-[150px]">
        {label}
      </p>
    </div>
  );
}

export default Metrics;
