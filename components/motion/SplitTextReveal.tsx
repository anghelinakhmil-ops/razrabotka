"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease, duration as durationTokens, stagger as staggerTokens } from "@/lib/motion";

interface SplitTextRevealProps {
  /** Текст для анимации */
  text: string;
  /** HTML тег обёртки */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** CSS классы для обёртки */
  className?: string;
  /** CSS классы для каждого слова */
  wordClassName?: string;
  /** Задержка перед началом анимации (секунды) */
  delay?: number;
  /** Длительность анимации одного слова (секунды) */
  duration?: number;
  /** Задержка между словами (секунды) */
  staggerDelay?: number;
  /** Направление: слова появляются снизу или слева */
  direction?: "up" | "left";
  /** Порог видимости для срабатывания (0-1) */
  threshold?: number;
  /** Анимировать только один раз */
  once?: boolean;
}

/**
 * SplitTextReveal — пословная анимация текста
 *
 * Разбивает текст на слова и анимирует каждое с stagger-эффектом.
 * Аналог SplitType + GSAP из референса THE BRIDGE,
 * реализованный через Framer Motion.
 *
 * @example
 * <SplitTextReveal
 *   text="ПРЕИМУЩЕСТВА НАШЕЙ СТУДИИ"
 *   as="h2"
 *   className="text-h2"
 *   direction="up"
 * />
 */
export function SplitTextReveal({
  text,
  as: Component = "div",
  className,
  wordClassName,
  delay = 0,
  duration = durationTokens.normal,
  staggerDelay = staggerTokens.normal,
  direction = "up",
  threshold = 0.3,
  once = true,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const words = text.split(" ");

  const getWordVariants = () => {
    const offset = direction === "left" ? { x: -30, y: 0 } : { x: 0, y: 20 };
    return {
      hidden: {
        opacity: 0,
        ...offset,
      },
      visible: (i: number) => ({
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          ease,
          delay: delay + i * staggerDelay,
        },
      }),
    };
  };

  const wordVariants = getWordVariants();

  // Use motion component for the wrapper
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
        >
          <motion.span
            className={`inline-block ${wordClassName || ""}`}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            aria-hidden="true"
          >
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span className="inline-block" aria-hidden="true">
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </MotionComponent>
  );
}

export default SplitTextReveal;
