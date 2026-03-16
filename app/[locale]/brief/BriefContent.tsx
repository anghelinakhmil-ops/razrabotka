"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { getUtmData } from "@/lib/utm";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { briefFormSchema, type BriefFormData } from "@/lib/validation";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";
import { ConsentCheckbox } from "@/components/ui/ConsentCheckbox";
import { MarketingCheckbox } from "@/components/ui/MarketingCheckbox";
import { useRegion } from "@/components/providers/RegionProvider";
import { RussianConsentModal } from "@/components/ui/RussianConsentModal";

/**
 * Brief Page — страница брифа
 */
export default function BriefContent() {
  const t = useTranslations("pages.brief");

  const steps = t.raw("steps") as Array<{ title: string; description: string }>;

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

      {/* Steps Section */}
      <section className="py-12 bg-[var(--color-background-alt)] border-y border-[var(--color-line)]">
        <Container>
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            staggerDelay={0.1}
          >
            {steps.map((step, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4">
                  <span className="text-h2 font-display font-bold text-[var(--color-line-dark)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-body-lg font-bold text-[var(--color-text-primary)] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-body-sm text-[var(--color-text-muted)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container size="sm">
          <RevealOnScroll direction="up">
            <BriefForm />
          </RevealOnScroll>
        </Container>
      </section>

      {/* Alternative Contact Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background-alt)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <RevealOnScroll direction="up">
              <h2 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-4">
                {t("directContact")}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.1}>
              <p className="text-body text-[var(--color-text-muted)] mb-8">
                {t("directContactDescription")}
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.2}>
              <p className="text-body-sm text-[var(--color-text-muted)] mb-6">
                {t("directContactEmail")}{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[var(--color-text-primary)] underline hover:no-underline"
                >
                  {CONTACT.email}
                </a>
              </p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-line)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-colors text-[13px] font-medium uppercase tracking-wider"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Telegram
                </a>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[var(--color-line)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)] transition-colors text-[13px] font-medium uppercase tracking-wider"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </section>
    </main>
  );
}

/**
 * BriefForm — расширенная форма брифа
 */
function BriefForm() {
  const t = useTranslations("pages.brief");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);
  const [showRuConsent, setShowRuConsent] = useState(false);
  const { regionCode } = useRegion();
  const isRussia = regionCode === "RU";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      telegram: "",
      comment: "",
    },
  });

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("brief");
    }
  };

  const onSubmit = async (data: BriefFormData) => {
    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "brief",
          source: "brief_form",
          ...data,
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
      trackFormSubmit("brief");
      trackConversion("brief_form", "brief");
    } catch {
      setFormState("error");
      setErrorMessage(t("errorTitle"));
      trackFormError("brief", "submission_failed");
    }
  };

  if (formState === "success") {
    return (
      <div className="p-4 sm:p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center">
            <svg
              width="40"
              height="40"
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
          <h3 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
            {t("successTitle")}
          </h3>
          <p className="text-body text-[var(--color-text-muted)] mb-2">
            {t("successText1")}
          </p>
          <p className="text-body text-[var(--color-text-muted)] mb-8">
            {t("successText2")}
          </p>
          <Button variant="outline" size="md" as={Link} href="/">
            {t("successHome")}
          </Button>
        </div>
      </div>
    );
  }

  if (formState === "error") {
    return (
      <div className="p-4 sm:p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              width="40"
              height="40"
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
          <h3 className="text-h2 font-display font-bold text-red-600 mb-4">
            {t("errorTitle")}
          </h3>
          <p className="text-body text-[var(--color-text-muted)] mb-8">
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
    <div className="p-4 sm:p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
      <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} className="space-y-8">
        {/* Section 1: Контакты */}
        <div>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            {t("sectionContacts")}
          </h3>
          <div className="space-y-6">
            <Input
              label={t("name")}
              placeholder={t("namePlaceholder")}
              error={errors.name?.message}
              disabled={formState === "loading"}
              {...register("name")}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  label={t("phone")}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={errors.phone?.message}
                  disabled={formState === "loading"}
/>
              )}
            />

            <Input
              label={t("telegram")}
              placeholder={t("telegramPlaceholder")}
              helperText={t("telegramHelper")}
              error={errors.telegram?.message}
              disabled={formState === "loading"}
              {...register("telegram")}
            />
          </div>
        </div>

        {/* Section 3: Дополнительно */}
        <div>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            {t("sectionAdditional")}
          </h3>
          <Textarea
            label={t("comment")}
            placeholder={t("commentPlaceholder")}
            rows={5}
            error={errors.comment?.message}
            disabled={formState === "loading"}
            {...register("comment")}
          />
        </div>

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

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={formState === "loading"}
          >
            {t("submit")}
          </Button>
        </div>

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
