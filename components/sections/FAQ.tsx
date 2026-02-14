"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { RevealOnScroll, SplitTextReveal } from "@/components/motion";
import { ease, duration, sectionPresets } from "@/lib/motion";
import { faqSchema } from "@/lib/schema";

/**
 * Данные для одного вопроса FAQ
 */
export interface FAQItem {
  /** Вопрос */
  question: string;
  /** Ответ */
  answer: string;
}

interface FAQProps {
  /** Массив вопросов и ответов */
  items?: FAQItem[];
}

/**
 * FAQ — секция часто задаваемых вопросов
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Accordion с плавными анимациями
 * - Два столбца на desktop
 * - Reveal анимации
 */
export function FAQ({ items }: FAQProps) {
  const t = useTranslations("faq");

  const translatedItems: FAQItem[] = (t.raw("items") as Array<{
    question: string; answer: string;
  }>).map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  const faqItems = items || translatedItems;

  // Разбиваем на две колонки для desktop
  const midpoint = Math.ceil(faqItems.length / 2);
  const leftColumn = faqItems.slice(0, midpoint);
  const rightColumn = faqItems.slice(midpoint);

  return (
    <section
      id="faq"
      className="py-[var(--section-gap)] bg-[var(--color-background-alt)]"
    >
      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqItems)),
        }}
      />

      <Container>
        {/* Заголовок секции */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col gap-4">
            <SplitTextReveal
              text={t("caption")}
              as="span"
              className="text-caption text-[var(--color-text-muted)]"
              direction="up"
              staggerDelay={sectionPresets.heading.captionStagger}
            />
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: sectionPresets.heading.titleDuration, ease, delay: sectionPresets.heading.titleDelay }}
            >
              <BrokenText
                text={t("title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-text-primary)]"
              />
            </motion.h2>
          </div>
        </div>

        {/* FAQ Grid - две колонки на desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
          {/* Левая колонка */}
          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <Accordion allowMultiple>
              {leftColumn.map((item, index) => (
                <AccordionItem
                  key={index}
                  id={`faq-left-${index}`}
                  title={item.question}
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>

          {/* Правая колонка */}
          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
            <Accordion allowMultiple>
              {rightColumn.map((item, index) => (
                <AccordionItem
                  key={index}
                  id={`faq-right-${index}`}
                  title={item.question}
                >
                  {item.answer}
                </AccordionItem>
              ))}
            </Accordion>
          </RevealOnScroll>
        </div>

        {/* CTA после FAQ */}
        <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 3}>
          <div className="mt-16 lg:mt-20 pt-12 border-t border-[var(--color-line)] text-center">
            <p className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-3">
              {t("ctaTitle")}
            </p>
            <p className="text-body text-[var(--color-text-muted)] mb-6">
              {t("ctaSubtitle")}
            </p>
            <Button variant="primary" size="lg" as={Link} href="/brief">
              {t("ctaButton")}
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}

export default FAQ;
