"use client";

import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";

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
 * Метрики по умолчанию
 */
const defaultMetrics: MetricData[] = [
  {
    value: "7–21",
    label: "день до запуска",
  },
  {
    value: "30–120",
    label: "к конверсии",
    prefix: "+",
    suffix: "%",
  },
  {
    value: "90+",
    label: "Lighthouse Score",
  },
  {
    value: "0",
    label: "шаблонности",
  },
];

/**
 * Metrics — секция с ключевыми метриками
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Крупные числа как визуальный акцент
 * - Горизонтальная сетка на desktop
 * - Вертикальные разделители
 */
export function Metrics({ metrics = defaultMetrics }: MetricsProps) {
  return (
    <section
      id="metrics"
      className="py-[var(--section-gap)] bg-[var(--color-background-alt)]"
    >
      <Container>
        {/* Заголовок секции */}
        <RevealOnScroll direction="up" className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-4">
            <span className="text-caption text-[var(--color-text-muted)]">
              В цифрах
            </span>
            <h2>
              <BrokenText
                text="РЕЗУЛЬТАТЫ"
                spaced
                mixPattern={[2, 6]}
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h2>
          </div>
        </RevealOnScroll>

        {/* Сетка метрик */}
        <StaggerContainer
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0"
          staggerDelay={0.1}
        >
          {metrics.map((metric, index) => (
            <StaggerItem key={index}>
              <MetricItem
                {...metric}
                showDivider={index < metrics.length - 1}
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
        <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-[var(--color-text-primary)] leading-none">
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
