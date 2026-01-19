"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BrokenText } from "@/components/ui/BrokenText";
import { Container } from "@/components/ui/Container";
import { RevealOnScroll } from "@/components/motion";
import { ease, duration } from "@/lib/motion";

interface HeroProps {
  /** Callback для CTA кнопки */
  onCtaClick?: () => void;
}

/**
 * Hero — главная секция лендинга
 *
 * Полноэкранная секция с заголовком, подзаголовком и CTA.
 * Стиль: Premium-minimal / Architectural (референс: THE BRIDGE)
 */
export function Hero({ onCtaClick }: HeroProps) {
  const handleScrollToNext = () => {
    const nextSection = document.getElementById("benefits");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Фоновый градиент/паттерн */}
      <div className="absolute inset-0 bg-[var(--color-background)]">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-background)] via-[var(--color-background)] to-[var(--color-background-alt)] opacity-50" />

        {/* Декоративные линии */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]">
          <div className="absolute top-1/4 right-1/4 w-[1px] h-1/2 bg-[var(--color-text-primary)]" />
          <div className="absolute top-1/3 right-1/3 w-[1px] h-1/3 bg-[var(--color-text-primary)]" />
        </div>
      </div>

      {/* Контент */}
      <Container className="relative z-10 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-144px)] lg:min-h-0">
          {/* Левая часть — Текст */}
          <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
            {/* Надзаголовок */}
            <RevealOnScroll direction="up" delay={0.1}>
              <p className="text-caption text-[var(--color-text-muted)]">
                Веб-студия полного цикла
              </p>
            </RevealOnScroll>

            {/* Заголовок H1 */}
            <RevealOnScroll direction="up" delay={0.2}>
              <h1 className="flex flex-col gap-2">
                <BrokenText
                  text="РАЗРАБОТКА"
                  spaced
                  mixPattern={[1, 5]}
                  className="text-[var(--color-text-primary)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight"
                />
                <BrokenText
                  text="САЙТОВ"
                  spaced
                  mixPattern={[1]}
                  className="text-[var(--color-text-primary)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight"
                />
                <span className="text-[var(--color-text-muted)] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-medium mt-2">
                  под ключ
                </span>
              </h1>
            </RevealOnScroll>

            {/* Подзаголовок */}
            <RevealOnScroll direction="up" delay={0.3}>
              <p className="text-body-lg text-[var(--color-text-secondary)] max-w-md">
                Создаём сайты для{" "}
                <span className="text-[var(--color-text-primary)] font-medium">экспертов</span>,{" "}
                <span className="text-[var(--color-text-primary)] font-medium">e-commerce</span> и{" "}
                <span className="text-[var(--color-text-primary)] font-medium">бизнесов</span>.
                <br />
                Premium-minimal дизайн, скорость, SEO.
              </p>
            </RevealOnScroll>

            {/* CTA кнопки */}
            <RevealOnScroll direction="up" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onCtaClick}
                  className="hover-lift"
                >
                  Обсудить проект
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  as="a"
                  href="/cases"
                  className="hover-lift"
                >
                  Смотреть кейсы
                </Button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Правая часть — Визуал */}
          <div className="relative order-1 lg:order-2 flex items-center justify-center lg:justify-end">
            <RevealOnScroll direction="left" delay={0.3} duration={0.8}>
              <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl aspect-[4/5]">
                {/* Placeholder для изображения */}
                <div className="absolute inset-0 bg-[var(--color-background-alt)] rounded-sm overflow-hidden">
                  {/* Декоративный элемент вместо изображения */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-3/4 h-3/4">
                      {/* Геометрические фигуры */}
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full border border-[var(--color-line)]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: duration.slow, ease, delay: 0.5 }}
                      />
                      <motion.div
                        className="absolute top-4 left-4 right-4 bottom-4 border border-[var(--color-line-dark)]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: duration.slow, ease, delay: 0.6 }}
                      />
                      <motion.div
                        className="absolute top-8 left-8 right-8 bottom-8 bg-[var(--color-text-primary)]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: duration.slow, ease, delay: 0.7 }}
                      >
                        {/* Текст внутри */}
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
                </div>

                {/* Декоративный номер */}
                <motion.span
                  className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 text-8xl lg:text-9xl font-display font-bold text-[var(--color-line)] select-none"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: duration.slow, ease, delay: 0.8 }}
                >
                  01
                </motion.span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.normal, ease, delay: 1 }}
        aria-label="Прокрутить к следующей секции"
      >
        <span className="text-caption">Скролл</span>
        <motion.div
          className="w-[1px] h-8 bg-current"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>
    </section>
  );
}

export default Hero;
