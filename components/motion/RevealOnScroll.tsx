"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease, duration as durationTokens, translateY } from "@/lib/motion";

/** Направление появления */
type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealOnScrollProps {
  /** Дочерние элементы */
  children: React.ReactNode;
  /** Направление появления */
  direction?: RevealDirection;
  /** Задержка перед анимацией (секунды) */
  delay?: number;
  /** Длительность анимации (секунды) */
  duration?: number;
  /** Порог видимости для срабатывания (0-1) */
  threshold?: number;
  /** Анимировать только один раз */
  once?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * Получает начальное смещение для направления
 */
function getInitialOffset(direction: RevealDirection): { x: number; y: number } {
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
 * RevealOnScroll — компонент для анимации появления при скролле
 *
 * Использует Intersection Observer через framer-motion useInView.
 * Анимирует элементы когда они входят в область видимости.
 *
 * @example
 * // Появление снизу вверх
 * <RevealOnScroll direction="up">
 *   <h2>Заголовок секции</h2>
 * </RevealOnScroll>
 *
 * @example
 * // Появление слева с задержкой
 * <RevealOnScroll direction="left" delay={0.2}>
 *   <p>Текст контента</p>
 * </RevealOnScroll>
 *
 * @example
 * // Только fade без смещения
 * <RevealOnScroll direction="none" duration={0.8}>
 *   <img src="..." alt="..." />
 * </RevealOnScroll>
 */
export function RevealOnScroll({
  children,
  direction = "up",
  delay = 0,
  duration = durationTokens.normal,
  threshold = 0.2,
  once = true,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const initialOffset = getInitialOffset(direction);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: initialOffset.x,
        y: initialOffset.y,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              x: initialOffset.x,
              y: initialOffset.y,
            }
      }
      transition={{
        duration,
        ease,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default RevealOnScroll;
