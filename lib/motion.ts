/**
 * Motion Configuration — токены анимаций для Framer Motion
 *
 * Используется для единообразных анимаций по всему проекту.
 * Основано на дизайн-системе из CLAUDE.md
 */

import type { Variants } from "framer-motion";

// ============================================================================
// Duration — длительность анимаций
// ============================================================================

export const duration = {
  /** Быстрая анимация — hover, микроинтеракции */
  fast: 0.3,
  /** Нормальная анимация — появление элементов */
  normal: 0.6,
  /** Медленная анимация — hero, большие элементы */
  slow: 0.9,
} as const;

// ============================================================================
// Ease — кривая анимации (cubic-bezier)
// ============================================================================

/** Основная ease кривая — плавное ускорение и замедление */
export const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/** Дополнительные ease кривые */
export const easePresets = {
  /** Стандартная плавная кривая */
  default: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
  /** Быстрый старт, плавное завершение */
  out: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
  /** Плавный старт, быстрое завершение */
  in: [0.4, 0.0, 1, 1] as [number, number, number, number],
  /** Упругая кривая */
  bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
} as const;

// ============================================================================
// Stagger — задержка между элементами в группе
// ============================================================================

export const stagger = {
  /** Быстрый stagger — списки, мелкие элементы */
  fast: 0.08,
  /** Нормальный stagger — карточки, секции */
  normal: 0.12,
  /** Медленный stagger — hero элементы */
  slow: 0.14,
} as const;

// ============================================================================
// TranslateY — смещение по Y для reveal анимаций
// ============================================================================

export const translateY = {
  /** Малое смещение — текст, мелкие элементы */
  small: 12,
  /** Нормальное смещение — карточки, блоки */
  normal: 20,
  /** Большое смещение — hero, крупные секции */
  large: 24,
} as const;

// ============================================================================
// Motion Variants — готовые варианты анимаций для Framer Motion
// ============================================================================

/** Fade In — простое появление */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease,
    },
  },
};

/** Fade Up — появление снизу вверх */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: translateY.normal,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease,
    },
  },
};

/** Fade Down — появление сверху вниз */
export const fadeDown: Variants = {
  hidden: {
    opacity: 0,
    y: -translateY.normal,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease,
    },
  },
};

/** Slide Left — появление справа налево */
export const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: translateY.large,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.normal,
      ease,
    },
  },
};

/** Slide Right — появление слева направо */
export const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: -translateY.large,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.normal,
      ease,
    },
  },
};

/** Scale — появление с масштабированием */
export const scale: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease,
    },
  },
};

/** Все варианты анимаций */
export const variants = {
  fadeIn,
  fadeUp,
  fadeDown,
  slideLeft,
  slideRight,
  scale,
} as const;

// ============================================================================
// Motion Config — объединённая конфигурация
// ============================================================================

export const motionConfig = {
  duration,
  ease,
  easePresets,
  stagger,
  translateY,
  variants,
} as const;

// ============================================================================
// Transition Presets — готовые transition объекты
// ============================================================================

export const transitions = {
  /** Быстрый transition */
  fast: {
    duration: duration.fast,
    ease,
  },
  /** Нормальный transition */
  normal: {
    duration: duration.normal,
    ease,
  },
  /** Медленный transition */
  slow: {
    duration: duration.slow,
    ease,
  },
} as const;

// ============================================================================
// Default Export
// ============================================================================

export default motionConfig;
