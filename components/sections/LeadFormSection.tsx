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
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";

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
  });

  type QuickFormData = z.infer<typeof quickFormSchema>;

  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
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
    setErrorMessage("");

    try {
      const contactFields = parseContact(data.contact);

      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quick",
          source,
          name: data.name,
          ...contactFields,
          timestamp: new Date().toISOString(),
          ...getUtmData(),
        }),
      });

      if (!response.ok) {
        throw new Error("send_error");
      }

      setFormState("success");
      trackFormSubmit("quick");
      trackConversion("quick", "quick");
    } catch (error) {
      setFormState("error");
      const msg = t("errorMessage");
      setErrorMessage(msg);
      trackFormError("quick", msg);
    }
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
                text={title || t("title")}
                spaced
                mixPattern={[3, 7]}
                className="text-h2 font-display font-bold text-[var(--color-background)]"
              />
            </h2>
          </RevealOnScroll>

          {/* Подзаголовок */}
          <RevealOnScroll direction="up" delay={0.1}>
            <p className="text-body text-[var(--color-text-light)] mb-10 lg:mb-12">
              {subtitle || t("subtitle")}
            </p>
          </RevealOnScroll>

          {/* Форма или Success/Error State */}
          <RevealOnScroll direction="up" delay={0.2}>
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
                    className="bg-transparent border-[var(--color-line-dark)] text-[var(--color-background)] placeholder:text-[var(--color-text-muted)]"
                    {...register("name")}
                  />
                  <Input
                    placeholder={t("contactPlaceholder")}
                    error={errors.contact?.message}
                    disabled={formState === "loading"}
                    className="bg-transparent border-[var(--color-line-dark)] text-[var(--color-background)] placeholder:text-[var(--color-text-muted)]"
                    {...register("contact")}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={formState === "loading"}
                  className="w-full md:w-auto md:min-w-[200px] bg-[var(--color-background)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-alt)]"
                >
                  {t("submit")}
                </Button>

                {/* Privacy notice */}
                <p className="text-caption text-[var(--color-text-muted)]">
                  {t("privacy")}{" "}
                  <Link
                    href="/privacy"
                    className="underline hover:text-[var(--color-background)] transition-colors"
                  >
                    {t("privacyLink")}
                  </Link>
                </p>
              </form>
            )}
          </RevealOnScroll>

          {/* Альтернативный CTA */}
          <RevealOnScroll direction="up" delay={0.3}>
            <div className="mt-10 pt-10 border-t border-[var(--color-line-dark)]">
              <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
                {t("briefCta")}
              </p>
              <Button
                variant="outline"
                size="md"
                as={Link}
                href="/brief"
                className="border-[var(--color-background)] text-[var(--color-background)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]"
              >
                {t("briefButton")}
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
