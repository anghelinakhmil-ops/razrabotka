"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ease,
  duration as durationTokens,
  stagger as staggerTokens,
  translateY,
} from "@/lib/motion";

/** Направление появления для дочерних элементов */
type StaggerDirection = "up" | "down" | "left" | "right" | "none";

// ============================================================================
// StaggerContainer — контейнер для stagger анимации
// ============================================================================

interface StaggerContainerProps {
  /** Дочерние элементы (должны быть StaggerItem) */
  children: React.ReactNode;
  /** Задержка между появлением элементов (секунды) */
  staggerDelay?: number;
  /** Задержка перед началом всей анимации (секунды) */
  delayChildren?: number;
  /** Порог видимости для срабатывания (0-1) */
  threshold?: number;
  /** Анимировать только один раз */
  once?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * StaggerContainer — контейнер для последовательной анимации элементов
 *
 * Используется вместе с StaggerItem для создания эффекта
 * последовательного появления элементов.
 *
 * @example
 * <StaggerContainer staggerDelay={0.1}>
 *   <StaggerItem>Элемент 1</StaggerItem>
 *   <StaggerItem>Элемент 2</StaggerItem>
 *   <StaggerItem>Элемент 3</StaggerItem>
 * </StaggerContainer>
 */
export function StaggerContainer({
  children,
  staggerDelay = staggerTokens.normal,
  delayChildren = 0,
  threshold = 0.2,
  once = true,
  className,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// StaggerItem — дочерний элемент для stagger анимации
// ============================================================================

interface StaggerItemProps {
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Направление появления */
  direction?: StaggerDirection;
  /** Длительность анимации (секунды) */
  duration?: number;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Получает начальное смещение для направления
 */
function getInitialOffset(direction: StaggerDirection): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: translateY.normal };
    case "down":
      return { x: 0, y: -translateY.normal };
    case "left":
      return { x: translateY.large, y: 0 };
    case "right":
      return { x: -translateY.large, y: 0 };
    case "none":
    default:
      return { x: 0, y: 0 };
  }
}

/**
 * StaggerItem — элемент внутри StaggerContainer
 *
 * Автоматически анимируется с задержкой относительно
 * предыдущего элемента.
 *
 * @example
 * <StaggerItem direction="up">
 *   <h2>Заголовок</h2>
 * </StaggerItem>
 */
export function StaggerItem({
  children,
  direction = "up",
  duration = durationTokens.normal,
  className,
}: StaggerItemProps) {
  const initialOffset = getInitialOffset(direction);

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: initialOffset.x,
      y: initialOffset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease,
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

// ============================================================================
// Готовые пресеты для типичных паттернов
// ============================================================================

/**
 * Пресет для секции Benefits: номер → заголовок → изображение → текст
 */
export const benefitStaggerPreset = {
  container: {
    staggerDelay: staggerTokens.normal,
    delayChildren: 0.1,
  },
  items: {
    number: { direction: "up" as const, duration: durationTokens.fast },
    title: { direction: "up" as const, duration: durationTokens.normal },
    image: { direction: "none" as const, duration: durationTokens.slow },
    text: { direction: "up" as const, duration: durationTokens.normal },
  },
};

/**
 * Пресет для карточек услуг
 */
export const cardStaggerPreset = {
  container: {
    staggerDelay: staggerTokens.fast,
    delayChildren: 0,
  },
  item: {
    direction: "up" as const,
    duration: durationTokens.normal,
  },
};

/**
 * Пресет для навигации
 */
export const navStaggerPreset = {
  container: {
    staggerDelay: staggerTokens.fast,
    delayChildren: 0.2,
  },
  item: {
    direction: "down" as const,
    duration: durationTokens.fast,
  },
};

export default StaggerContainer;
