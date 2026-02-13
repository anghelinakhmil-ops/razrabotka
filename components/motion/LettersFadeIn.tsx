"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease, duration as durationTokens } from "@/lib/motion";

interface LettersFadeInProps {
  /** Текст для побуквенной анимации */
  text: string;
  /** HTML тег обёртки */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  /** CSS классы для обёртки */
  className?: string;
  /** Задержка перед началом (секунды) */
  delay?: number;
  /** Длительность fade одной буквы */
  duration?: number;
  /** Задержка между буквами */
  staggerDelay?: number;
  /** Порог видимости (0-1) */
  threshold?: number;
  /** Анимировать один раз */
  once?: boolean;
}

/**
 * LettersFadeIn — побуквенный fade-in текста
 *
 * Каждая буква появляется с opacity 0→1, stagger между буквами.
 * Аналог `letters-fade-in` из THE BRIDGE.
 *
 * @example
 * <LettersFadeIn
 *   text="NAKO"
 *   as="span"
 *   className="text-h2 font-display"
 *   staggerDelay={0.04}
 * />
 */
export function LettersFadeIn({
  text,
  as: Component = "div",
  className,
  delay = 0,
  duration = durationTokens.fast,
  staggerDelay = 0.04,
  threshold = 0.3,
  once = true,
}: LettersFadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const letters = text.split("");

  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      ref={ref}
      className={className}
      aria-label={text}
    >
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration,
            ease,
            delay: delay + i * staggerDelay,
          }}
          aria-hidden="true"
          style={letter === " " ? { width: "0.3em" } : undefined}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </MotionComponent>
  );
}

export default LettersFadeIn;
