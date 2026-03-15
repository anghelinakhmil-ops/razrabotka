"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getUtmData } from "@/lib/utm";
import { RevealOnScroll } from "@/components/motion";
import { sectionPresets } from "@/lib/motion";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";

interface LeadFormSectionProps {
  /** Заголовок секции */
  title?: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Источник формы (для аналитики) */
  source?: string;
}

export interface LeadFormData {
  name: string;
  contact: string;
}

/**
 * Определяет тип контакта (email или phone)
 */
function parseContact(contact: string): { phone?: string; email?: string } {
  const trimmed = contact.trim();
  if (trimmed.includes("@") && trimmed.includes(".")) {
    return { email: trimmed };
  }
  return { phone: trimmed };
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
  title,
  subtitle,
  source = "lead_form",
}: LeadFormSectionProps) {
  const t = useTranslations("leadForm");

  const quickFormSchema = z.object({
    name: z.string().min(2, t("validation.nameMin")),
    contact: z.string().min(3, t("validation.contactMin")),
    consent: z.literal(true, { message: t("validation.consentRequired") }),
  });

  type QuickFormData = z.infer<typeof quickFormSchema>;

  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuickFormData>({
    resolver: zodResolver(quickFormSchema),
    mode: "onBlur",
  });

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("quick");
    }
  };

  const onSubmit = async (data: QuickFormData) => {
    setFormState("loading");

    try {
      const contactFields = parseContact(data.contact);

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quick",
          source,
          name: data.name,
          ...contactFields,
          timestamp: new Date().toISOString(),
          consentGiven: true,
          consentTimestamp: new Date().toISOString(),
          ...getUtmData(),
        }),
      });

      if (!response.ok) {
        throw new Error("send_error");
      }

      setFormState("success");
      trackFormSubmit("quick");
      trackConversion("quick", "quick");
    } catch {
      setFormState("error");
      trackFormError("quick", t("errorMessage"));
    }
  };

  return (
    <section
      id="contact"
      className="py-[var(--section-gap)] bg-[var(--color-bg-dark)]"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* Заголовок */}
          <RevealOnScroll direction="up">
            <h2 className="mb-4">
              <BrokenText
                text={title || t("title")}
                spaced
                className="text-h2 font-display font-bold text-[var(--color-background)]"
              />
            </h2>
          </RevealOnScroll>

          {/* Подзаголовок */}
          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step}>
            <p className="text-body text-[var(--color-text-light)] mb-10 lg:mb-12">
              {subtitle || t("subtitle")}
            </p>
          </RevealOnScroll>

          {/* Форма или Success/Error State */}
          <RevealOnScroll direction="up" delay={sectionPresets.cascade.step * 2}>
            {formState === "success" ? (
              <SuccessMessage />
            ) : formState === "error" ? (
              <ErrorMessage onRetry={() => setFormState("idle")} />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} className="space-y-6">
                {/* Поля формы */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder={t("namePlaceholder")}
                    error={errors.name?.message}
                    disabled={formState === "loading"}
                    className="bg-transparent border-[#D9D4CB] text-[#F9F7F2] placeholder:text-[#D9D4CB]"
                    {...register("name")}
                  />
                  <Input
                    placeholder={t("contactPlaceholder")}
                    error={errors.contact?.message}
                    disabled={formState === "loading"}
                    className="bg-transparent border-[#D9D4CB] text-[#F9F7F2] placeholder:text-[#D9D4CB]"
                    {...register("contact")}
                  />
                </div>

                {/* GDPR Consent */}
                <ConsentCheckbox
                  error={errors.consent?.message}
                  disabled={formState === "loading"}
                  inverted
                  {...register("consent")}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={formState === "loading"}
                  className="w-full md:w-auto md:min-w-[200px] !bg-[#F9F7F2] !text-[#1A1A1A] hover:!bg-[#EFEBE0]"
                >
                  {t("submit")}
                </Button>
              </form>
            )}
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
  const t = useTranslations("leadForm");

  return (
    <div className="py-8">
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
        {t("successTitle")}
      </h3>
      <p className="text-body text-[var(--color-text-muted)]">
        {t("successText")}
      </p>
    </div>
  );
}

/**
 * ErrorMessage — сообщение об ошибке
 */
function ErrorMessage({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations("leadForm");

  return (
    <div className="py-8">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-red-400 flex items-center justify-center">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          className="text-red-400"
        >
          <path
            d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3 className="text-h3 font-display font-bold text-red-400 mb-3">
        {t("errorTitle")}
      </h3>
      <p className="text-body text-[var(--color-text-muted)] mb-6">
        {t("errorMessage")}
      </p>
      <Button
        variant="outline"
        size="md"
        onClick={onRetry}
        className="border-[var(--color-background)] text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
      >
        {t("retry")}
      </Button>
    </div>
  );
}

export default LeadFormSection;
