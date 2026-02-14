"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { getUtmData } from "@/lib/utm";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { CONTACT } from "@/lib/constants";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";

/**
 * Contacts Page — страница контактов
 */
export default function ContactsContent() {
  const t = useTranslations("pages.contacts");

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              {t("caption")}
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="mb-6">
              <BrokenText
                text={t("title")}
                spaced
                mixPattern="every-3"
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
              {t("description")}
            </p>
          </RevealOnScroll>
        </Container>
      </section>

      {/* Contact Info + Form Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Contact Info */}
            <div>
              <StaggerContainer staggerDelay={0.1}>
                {/* Email */}
                <StaggerItem>
                  <ContactBlock
                    number="01"
                    title={t("emailTitle")}
                    description={t("emailDescription")}
                  >
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-h4 font-display font-bold text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                  </ContactBlock>
                </StaggerItem>

                {/* Response time */}
                <StaggerItem>
                  <ContactBlock
                    number="02"
                    title={t("responseTitle")}
                    description={t("responseDescription")}
                  >
                    <p className="text-body-lg text-[var(--color-text-primary)]">
                      {t("responseTime")}
                    </p>
                    <p className="text-body-sm text-[var(--color-text-muted)] mt-1">
                      {t("responseNote")}
                    </p>
                  </ContactBlock>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <RevealOnScroll direction="up" delay={0.2}>
                <ContactForm />
              </RevealOnScroll>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <RevealOnScroll direction="up">
              <h2 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
                {t("briefTitle")}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.1}>
              <p className="text-body text-[var(--color-text-muted)] mb-8">
                {t("briefDescription")}
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.2}>
              <Button variant="primary" size="lg" as={Link} href="/brief">
                {t("briefButton")}
              </Button>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </main>
  );
}

/**
 * ContactBlock — блок контактной информации
 */
function ContactBlock({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-6 border-b border-[var(--color-line)] first:pt-0">
      <div className="flex items-start gap-4">
        <span className="text-h3 font-display font-bold text-[var(--color-line-dark)]">
          {number}
        </span>
        <div className="flex-1">
          <p className="text-caption text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-body-sm text-[var(--color-text-muted)] mb-3">
            {description}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * ContactForm — форма обратной связи
 */
function ContactForm() {
  const t = useTranslations("pages.contacts");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("contact");
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quick",
          source: "contact_form",
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          message: data.message,
          timestamp: new Date().toISOString(),
          ...getUtmData(),
        }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      setFormState("success");
      trackFormSubmit("contact");
      trackConversion("contact", "quick");
    } catch {
      setFormState("error");
      setErrorMessage(t("errorTitle"));
      trackFormError("contact", "submission_failed");
    }
  };

  if (formState === "success") {
    return (
      <div className="p-4 sm:p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[var(--color-background)]"
            >
              <path
                d="M5 13L9 17L19 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
            {t("successTitle")}
          </h3>
          <p className="text-body text-[var(--color-text-muted)] mb-6">
            {t("successText")}
          </p>
          <Button variant="ghost" size="md" onClick={() => { reset(); setFormState("idle"); }}>
            {t("successRetry")}
          </Button>
        </div>
      </div>
    );
  }

  if (formState === "error") {
    return (
      <div className="p-4 sm:p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-red-500"
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
          <h3 className="text-h3 font-display font-bold text-red-600 mb-2">
            {t("errorTitle")}
          </h3>
          <p className="text-body text-[var(--color-text-muted)] mb-6">
            {errorMessage}
          </p>
          <Button variant="primary" size="md" onClick={() => setFormState("idle")}>
            {t("errorRetry")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
      <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
        {t("formTitle")}
      </h3>
      <p className="text-body text-[var(--color-text-muted)] mb-8">
        {t("formDescription")}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} className="space-y-6">
        <Input
          label={t("formName")}
          placeholder={t("formNamePlaceholder")}
          error={errors.name?.message}
          disabled={formState === "loading"}
          {...register("name")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input
            label={t("formEmail")}
            type="email"
            placeholder={t("formEmailPlaceholder")}
            error={errors.email?.message}
            disabled={formState === "loading"}
            {...register("email")}
          />
          <Input
            label={t("formPhone")}
            type="tel"
            placeholder={t("formPhonePlaceholder")}
            error={errors.phone?.message}
            disabled={formState === "loading"}
            {...register("phone")}
          />
        </div>

        <Textarea
          label={t("formMessage")}
          placeholder={t("formMessagePlaceholder")}
          rows={5}
          error={errors.message?.message}
          disabled={formState === "loading"}
          {...register("message")}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={formState === "loading"}
        >
          {t("formSubmit")}
        </Button>

        <p className="text-caption text-[var(--color-text-muted)] text-center">
          {t("formPrivacy")}{" "}
          <Link href="/privacy" className="underline hover:no-underline">
            {t("formPrivacyLink")}
          </Link>
        </p>
      </form>
    </div>
  );
}
