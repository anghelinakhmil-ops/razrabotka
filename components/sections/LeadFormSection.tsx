"use client";

import { useState, FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RevealOnScroll } from "@/components/motion";

interface LeadFormSectionProps {
  /** Заголовок секции */
  title?: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Callback при успешной отправке */
  onSubmit?: (data: LeadFormData) => void;
}

export interface LeadFormData {
  name: string;
  contact: string;
}

/**
 * LeadFormSection — секция с формой заявки
 *
 * Стиль: Premium-minimal / Architectural
 * Особенности:
 * - Акцентный блок (инвертированные цвета)
 * - Быстрая форма (имя + контакт)
 * - Альтернативный CTA на бриф
 * - Reveal анимации
 */
export function LeadFormSection({
  title = "ОБСУДИТЬ ПРОЕКТ",
  subtitle = "Оставьте контакты — свяжемся в течение 2 часов в рабочее время",
  onSubmit,
}: LeadFormSectionProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    contact: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.contact.trim()) return;

    setIsSubmitting(true);

    // Имитация отправки (заменится на реальный API в Фазе 8)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (onSubmit) {
      onSubmit(formData);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-[var(--section-gap)] bg-[var(--color-text-primary)]"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* Заголовок */}
          <RevealOnScroll direction="up">
            <h2 className="mb-4">
              <BrokenText
                text={title}
                spaced
                mixPattern={[3, 7]}
                className="text-h2 font-display font-bold text-[var(--color-background)]"
              />
            </h2>
          </RevealOnScroll>

          {/* Подзаголовок */}
          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body text-[var(--color-text-light)] mb-10 lg:mb-12">
              {subtitle}
            </p>
          </RevealOnScroll>

          {/* Форма или Success State */}
          <RevealOnScroll direction="up" delay={0.2}>
            {isSubmitted ? (
              <SuccessMessage />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Поля формы */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    disabled={isSubmitting}
                    className="bg-transparent border-[var(--color-line-dark)] text-[var(--color-background)] placeholder:text-[var(--color-text-muted)]"
                  />
                  <Input
                    name="contact"
                    placeholder="Телефон или Telegram"
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, contact: e.target.value }))
                    }
                    required
                    disabled={isSubmitting}
                    className="bg-transparent border-[var(--color-line-dark)] text-[var(--color-background)] placeholder:text-[var(--color-text-muted)]"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="w-full md:w-auto min-w-[200px] bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]"
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>

                {/* Privacy notice */}
                <p className="text-caption text-[var(--color-text-muted)]">
                  Нажимая кнопку, вы соглашаетесь с{" "}
                  <a
                    href="/privacy"
                    className="underline hover:text-[var(--color-background)] transition-colors"
                  >
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            )}
          </RevealOnScroll>

          {/* Альтернативный CTA */}
          <RevealOnScroll direction="up" delay={0.3}>
            <div className="mt-10 pt-10 border-t border-[var(--color-line-dark)]">
              <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
                Хотите рассказать подробнее о проекте?
              </p>
              <Button
                variant="outline"
                size="md"
                as="a"
                href="/brief"
                className="border-[var(--color-background)] text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
              >
                Заполнить бриф
              </Button>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  );
}

/**
 * SuccessMessage — сообщение об успешной отправке
 */
function SuccessMessage() {
  return (
    <div className="py-8">
      {/* Checkmark icon */}
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-[var(--color-background)] flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[var(--color-background)]"
        >
          <path
            d="M5 12L10 17L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3 className="text-h3 font-display font-bold text-[var(--color-background)] mb-3">
        Заявка отправлена!
      </h3>
      <p className="text-body text-[var(--color-text-muted)]">
        Свяжемся с вами в ближайшее время для обсуждения проекта.
      </p>
    </div>
  );
}

export default LeadFormSection;
