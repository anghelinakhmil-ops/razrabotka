"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrokenText } from "@/components/ui/BrokenText";
import { ease, duration } from "@/lib/motion";

interface PreloaderProps {
  /** Минимальная длительность показа (мс) */
  minDuration?: number;
  /** Callback после завершения */
  onComplete?: () => void;
}

/**
 * Preloader — полноэкранный прелоадер с счётчиком
 *
 * Показывается при первой загрузке страницы.
 * Отображает логотип и счётчик 0% → 100%.
 */
export function Preloader({
  minDuration = 2000,
  onComplete,
}: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Инкремент счётчика
  useEffect(() => {
    if (!isVisible || isExiting) return;

    const startTime = Date.now();
    const targetDuration = minDuration;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(Math.floor((elapsed / targetDuration) * 100), 100);

      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Добавляем небольшую задержку перед исчезновением
        setTimeout(() => {
          setIsExiting(true);
        }, 300);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [isVisible, isExiting, minDuration]);

  // Обработка завершения анимации выхода
  const handleExitComplete = () => {
    setIsVisible(false);
    onComplete?.();
  };

  // Форматирование числа с ведущим нулём
  const formatProgress = (num: number): string => {
    return num.toString().padStart(3, " ");
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className={`
            fixed inset-0 z-[9999]
            flex flex-col items-center justify-center
            bg-[var(--color-text-primary)]
            ${isExiting ? "pointer-events-none" : ""}
          `}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: {
              duration: duration.normal,
              ease,
            },
          }}
        >
          {/* Контейнер контента */}
          <div className="flex flex-col items-center gap-8 lg:gap-12">
            {/* Логотип */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: duration.normal,
                  ease,
                  delay: 0.1,
                }
              }}
            >
              <BrokenText
                text="WEBSTUDIO"
                spaced
                as="div"
                className="text-[var(--color-background)] text-2xl lg:text-4xl"
              />
            </motion.div>

            {/* Счётчик процентов */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: duration.fast,
                  ease,
                  delay: 0.3,
                }
              }}
            >
              <span
                className="
                  font-display font-bold
                  text-6xl sm:text-7xl lg:text-8xl xl:text-9xl
                  text-[var(--color-background)]
                  tracking-tight
                  tabular-nums
                "
                aria-live="polite"
                aria-label={`Загрузка: ${progress}%`}
              >
                {formatProgress(progress)}%
              </span>
            </motion.div>

            {/* Прогресс-бар (опционально) */}
            <motion.div
              className="w-48 lg:w-64 h-[2px] bg-[var(--color-text-muted)] overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: 1,
                scaleX: 1,
                transition: {
                  duration: duration.fast,
                  ease,
                  delay: 0.4,
                }
              }}
            >
              <motion.div
                className="h-full bg-[var(--color-background)] origin-left"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
