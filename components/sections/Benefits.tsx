"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { SplitTextReveal } from "@/components/motion";
import { ease, duration, sectionPresets } from "@/lib/motion";

/**
 * Benefits — секция преимуществ (6 карточек, 3×2 grid)
 *
 * Стиль: Premium-minimal / Architectural
 * Номер → Заголовок → Описание, без изображений.
 */
export function Benefits() {
  const t = useTranslations("benefits");

  const items = t.raw("items") as Array<{
    number: string;
    title: string;
    subtitle: string;
    description: string;
  }>;

  return (
    <section
      id="benefits"
      className="py-[var(--section-gap)] bg-[var(--color-background)]"
    >
      <Container>
        {/* Section header */}
        <div className="mb-16 lg:mb-24">
          <div className="flex items-center gap-6">
            <SplitTextReveal
              text={t("caption")}
              as="span"
              className="text-caption text-[var(--color-accent)]"
              direction="up"
              staggerDelay={sectionPresets.heading.captionStagger}
            />
            <motion.div
              className="flex-1 h-[1px] bg-[var(--color-line)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: duration.slow, ease, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </div>
        </div>

        {/* 3×2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-x-16 lg:gap-y-20">
          {items.map((item, index) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: duration.normal,
                ease,
                delay: 0.1 + (index % 3) * 0.15,
              }}
            >
              {/* Number */}
              <span className="block text-5xl lg:text-6xl font-display font-bold text-[var(--color-text-primary)]/10 leading-none select-none mb-6">
                {item.number}
              </span>

              {/* Title */}
              <h3 className="mb-4">
                <BrokenText
                  text={item.title}
                  className="text-[20px] lg:text-[24px] font-display font-bold text-[var(--color-text-primary)]"
                />
              </h3>

              {/* Description */}
              <p className="text-[15px] lg:text-[16px] text-[var(--color-text-muted)] leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Benefits;
