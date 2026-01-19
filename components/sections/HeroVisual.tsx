"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BrokenText } from "@/components/ui/BrokenText";
import { ease, duration } from "@/lib/motion";

interface HeroVisualProps {
  /** URL изображения */
  imageSrc?: string;
  /** Alt текст для изображения */
  imageAlt?: string;
  /** Blur placeholder (base64 или URL) */
  blurDataURL?: string;
  /** Показывать геометрический fallback */
  showFallback?: boolean;
}

/**
 * HeroVisual — визуальный блок Hero секции
 *
 * Поддерживает:
 * - Оптимизированное изображение через next/image
 * - Blur placeholder для плавной загрузки
 * - Геометрический fallback в стиле premium-minimal
 */
export function HeroVisual({
  imageSrc,
  imageAlt = "Разработка сайтов под ключ — веб-студия",
  blurDataURL,
  showFallback = true,
}: HeroVisualProps) {
  const hasImage = !!imageSrc;

  return (
    <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[4/5]">
      {/* Контейнер изображения/визуала */}
      <div className="absolute inset-0 bg-[var(--color-background-alt)] rounded-sm overflow-hidden">
        {hasImage ? (
          /* Оптимизированное изображение */
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
            className="object-cover"
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            priority
          />
        ) : showFallback ? (
          /* Геометрический fallback */
          <GeometricFallback />
        ) : null}
      </div>

      {/* Декоративный номер */}
      <motion.span
        className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 text-8xl lg:text-9xl font-display font-bold text-[var(--color-line)] select-none"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: duration.slow, ease, delay: 0.8 }}
        aria-hidden="true"
      >
        01
      </motion.span>
    </div>
  );
}

/**
 * GeometricFallback — декоративный элемент вместо изображения
 * Стиль: Premium-minimal / Architectural
 */
function GeometricFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-3/4 h-3/4">
        {/* Внешняя рамка */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full border border-[var(--color-line)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: duration.slow, ease, delay: 0.5 }}
        />
        {/* Средняя рамка */}
        <motion.div
          className="absolute top-4 left-4 right-4 bottom-4 border border-[var(--color-line-dark)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: duration.slow, ease, delay: 0.6 }}
        />
        {/* Внутренний блок с логотипом */}
        <motion.div
          className="absolute top-8 left-8 right-8 bottom-8 bg-[var(--color-text-primary)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: duration.slow, ease, delay: 0.7 }}
        >
          {/* Текст логотипа */}
          <div className="absolute inset-0 flex items-center justify-center">
            <BrokenText
              text="WS"
              spaced
              className="text-[var(--color-background)] text-6xl lg:text-8xl font-display font-bold"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroVisual;
