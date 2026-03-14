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
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { MarketingCheckbox } from "@/components/ui/MarketingCheckbox";
import { useRegion } from "@/components/providers/RegionProvider";
import { RussianConsentModal } from "@/components/ui/RussianConsentModal";

/**
 * Contacts Page — страница контактов
 */
export default function ContactsContent() {
  const t = useTranslations("pages.contacts");

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
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

                {/* Social links */}
                <StaggerItem>
                  <ContactBlock
                    number="03"
                    title={t("socialTitle")}
                    description={t("socialDescription")}
                  >
                    <div className="flex items-center gap-5">
                      <a
                        href={SOCIAL_LINKS.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                        </svg>
                      </a>
                      <a
                        href={SOCIAL_LINKS.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                      </a>
                      <a
                        href={SOCIAL_LINKS.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg>
                      </a>
                    </div>
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" as={Link} href="/brief">
                  {t("briefButton")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  as={Link}
                  href="/services"
                >
                  {t("ctaServices")}
                </Button>
              </div>
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
  const [showRuConsent, setShowRuConsent] = useState(false);
  const { regionCode } = useRegion();
  const isRussia = regionCode === "RU";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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
      const response = await fetch("/api/submit", {
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
          consentGiven: true,
          consentTimestamp: new Date().toISOString(),
          marketingConsent: data.marketing || false,
          region: regionCode,
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

        {/* GDPR Consent Checkboxes */}
        <div className="space-y-3">
          <ConsentCheckbox
            error={errors.consent?.message}
            disabled={formState === "loading"}
            {...register("consent")}
          />
          <MarketingCheckbox
            disabled={formState === "loading"}
            {...register("marketing")}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={formState === "loading"}
        >
          {t("formSubmit")}
        </Button>

        {/* Russian 152-FZ separate consent modal */}
        {isRussia && (
          <RussianConsentModal
            isOpen={showRuConsent}
            onClose={() => setShowRuConsent(false)}
            onAccept={() => {
              setValue("consent", true, { shouldValidate: true });
              setShowRuConsent(false);
            }}
          />
        )}
      </form>
    </div>
  );
}
