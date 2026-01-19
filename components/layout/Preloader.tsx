"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrokenText } from "@/components/ui/BrokenText";
import { ease, duration } from "@/lib/motion";

/** Ключ для sessionStorage */
const PRELOADER_SHOWN_KEY = "webstudio_preloader_shown";

interface PreloaderProps {
  /** Минимальная длительность показа (мс) */
  minDuration?: number;
  /** Синхронизировать с реальной загрузкой страницы */
  syncWithPageLoad?: boolean;
  /** Принудительно показать (игнорирует sessionStorage) */
  forceShow?: boolean;
  /** Callback после завершения */
  onComplete?: () => void;
}

/**
 * Проверяет, был ли прелоадер уже показан в этой сессии
 */
function wasPreloaderShown(): boolean {
  if (typeof window === "undefined") return false;

  try {
    return sessionStorage.getItem(PRELOADER_SHOWN_KEY) === "true";
  } catch {
    // sessionStorage может быть недоступен (приватный режим и т.д.)
    return false;
  }
}

/**
 * Сохраняет флаг что прелоадер был показан
 */
function markPreloaderAsShown(): void {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(PRELOADER_SHOWN_KEY, "true");
  } catch {
    // Игнорируем ошибки sessionStorage
  }
}

/**
 * Preloader — полноэкранный прелоадер с счётчиком
 *
 * Показывается только при первой загрузке страницы в сессии.
 * Не показывается при навигации между страницами (SPA).
 *
 * Особенности:
 * - Показывается только один раз за сессию (sessionStorage)
 * - Не блокирует SEO (рендерится только на клиенте)
 * - Синхронизируется с реальной загрузкой страницы (опционально)
 * - Плавная анимация с easing для счётчика
 * - Задержка перед исчезновением для лучшего UX
 */
export function Preloader({
  minDuration = 2000,
  syncWithPageLoad = true,
  forceShow = false,
  onComplete,
}: PreloaderProps) {
  // Начальное состояние: проверяем sessionStorage
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Проверка sessionStorage при монтировании
  useEffect(() => {
    // Если forceShow — всегда показываем
    if (forceShow) {
      setShouldShow(true);
      return;
    }

    // Проверяем, был ли прелоадер уже показан
    const alreadyShown = wasPreloaderShown();
    setShouldShow(!alreadyShown);

    // Если уже показывали — вызываем onComplete сразу
    if (alreadyShown) {
      onComplete?.();
    }
  }, [forceShow, onComplete]);

  // Отслеживание реальной загрузки страницы
  useEffect(() => {
    if (!shouldShow || !syncWithPageLoad) {
      setIsPageLoaded(true);
      return;
    }

    // Проверяем текущее состояние документа
    if (document.readyState === "complete") {
      setIsPageLoaded(true);
      return;
    }

    // Слушаем событие загрузки
    const handleLoad = () => {
      setIsPageLoaded(true);
    };

    window.addEventListener("load", handleLoad);

    // Также слушаем readystatechange для надёжности
    const handleReadyStateChange = () => {
      if (document.readyState === "complete") {
        setIsPageLoaded(true);
      }
    };

    document.addEventListener("readystatechange", handleReadyStateChange);

    return () => {
      window.removeEventListener("load", handleLoad);
      document.removeEventListener("readystatechange", handleReadyStateChange);
    };
  }, [shouldShow, syncWithPageLoad]);

  // Easing функция для более плавного счётчика (замедление к концу)
  const easeOutQuart = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  }, []);

  // Инкремент счётчика с easing
  useEffect(() => {
    if (!shouldShow || !isVisible || isExiting) return;

    const startTime = Date.now();
    const targetDuration = minDuration;
    let animationId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / targetDuration, 1);

      // Применяем easing для более плавного ощущения
      const easedProgress = easeOutQuart(linearProgress);
      const displayProgress = Math.floor(easedProgress * 100);

      setProgress(displayProgress);

      // Условие завершения: таймер закончился И страница загружена (если syncWithPageLoad)
      const timerComplete = linearProgress >= 1;
      const loadComplete = !syncWithPageLoad || isPageLoaded;

      if (timerComplete && loadComplete) {
        // Добавляем задержку перед исчезновением
        setTimeout(() => {
          setIsExiting(true);
        }, 300);
      } else {
        animationId = requestAnimationFrame(updateProgress);
      }
    };

    animationId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [shouldShow, isVisible, isExiting, minDuration, syncWithPageLoad, isPageLoaded, easeOutQuart]);

  // Обработка завершения анимации выхода
  const handleExitComplete = () => {
    setIsVisible(false);
    // Сохраняем в sessionStorage что прелоадер был показан
    markPreloaderAsShown();
    onComplete?.();
  };

  // Форматирование числа с ведущим пробелом для выравнивания
  const formatProgress = (num: number): string => {
    return num.toString().padStart(3, " ");
  };

  // Пока не определили shouldShow — ничего не рендерим (избегаем flash)
  if (shouldShow === null) {
    return null;
  }

  // Если не нужно показывать — ничего не рендерим
  if (!shouldShow) {
    return null;
  }

  // Рендерим прелоадер
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
            y: -30,
            transition: {
              duration: duration.normal,
              ease,
            },
          }}
          // Для SEO: aria-hidden чтобы скринридеры не читали оверлей
          aria-hidden="true"
          role="presentation"
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
                },
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: duration.fast,
                  ease,
                  delay: 0.2,
                },
              }}
            >
              <span
                className="
                  font-display font-bold
                  text-6xl sm:text-7xl lg:text-8xl xl:text-9xl
                  text-[var(--color-background)]
                  tracking-tight
                  tabular-nums
                  select-none
                "
                aria-live="polite"
                aria-label={`Загрузка: ${progress}%`}
              >
                {formatProgress(progress)}%
              </span>
            </motion.div>

            {/* Прогресс-бар */}
            <motion.div
              className="w-48 lg:w-64 h-[2px] bg-[var(--color-text-muted)]/30 overflow-hidden rounded-full"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: 1,
                scaleX: 1,
                transition: {
                  duration: duration.fast,
                  ease,
                  delay: 0.3,
                },
              }}
            >
              <motion.div
                className="h-full bg-[var(--color-background)] origin-left rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 0.1,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Индикатор синхронизации (если страница ещё грузится после 100%) */}
            {progress >= 100 && !isPageLoaded && syncWithPageLoad && (
              <motion.p
                className="text-[var(--color-text-muted)] text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Загрузка ресурсов...
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
