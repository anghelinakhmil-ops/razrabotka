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
import { getUtmData } from "@/lib/utm";
import { Select } from "@/components/ui/Select";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { CONTACT } from "@/lib/constants";
import { briefFormSchema, type BriefFormData } from "@/lib/validation";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";

/**
 * Brief Page — страница брифа
 */
export default function BriefContent() {
  const t = useTranslations("pages.brief");

  const steps = t.raw("steps") as Array<{ title: string; description: string }>;
  const siteTypeOptions = (t.raw("siteTypeOptions") as string[]).map((label, i) => ({
    value: i === 0 ? "" : ["expert", "ecommerce", "landing", "corporate", "other"][i - 1],
    label,
  }));
  const goalOptions = (t.raw("goalOptions") as string[]).map((label, i) => ({
    value: i === 0 ? "" : ["sales", "leads", "brand", "info", "other"][i - 1],
    label,
  }));
  const timelineOptions = (t.raw("timelineOptions") as string[]).map((label, i) => ({
    value: i === 0 ? "" : ["urgent", "normal", "relaxed", "flexible"][i - 1],
    label,
  }));
  const budgetOptions = (t.raw("budgetOptions") as string[]).map((label, i) => ({
    value: i === 0 ? "" : ["50-100", "100-200", "200-500", "500+", "discuss"][i - 1],
    label,
  }));

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
            <BriefForm
              siteTypeOptions={siteTypeOptions}
              goalOptions={goalOptions}
              timelineOptions={timelineOptions}
              budgetOptions={budgetOptions}
            />
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
              <p className="text-body-sm text-[var(--color-text-muted)]">
                {t("directContactEmail")}{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[var(--color-text-primary)] underline hover:no-underline"
                >
                  {CONTACT.email}
                </a>
              </p>
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
function BriefForm({
  siteTypeOptions,
  goalOptions,
  timelineOptions,
  budgetOptions,
}: {
  siteTypeOptions: Array<{ value: string; label: string }>;
  goalOptions: Array<{ value: string; label: string }>;
  timelineOptions: Array<{ value: string; label: string }>;
  budgetOptions: Array<{ value: string; label: string }>;
}) {
  const t = useTranslations("pages.brief");
  const [formState, setFormState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefFormSchema),
    mode: "onBlur",
    defaultValues: {
      siteType: "",
      goal: "",
      timeline: "",
      budget: "",
      references: "",
      name: "",
      email: "",
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
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "brief",
          source: "brief_form",
          ...data,
          timestamp: new Date().toISOString(),
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
        {/* Section 1: О проекте */}
        <div>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            {t("sectionProject")}
          </h3>
          <div className="space-y-6">
            <Controller
              name="siteType"
              control={control}
              render={({ field }) => (
                <Select
                  label={t("siteType")}
                  value={field.value}
                  onChange={field.onChange}
                  options={siteTypeOptions}
                  error={errors.siteType?.message}
                  required
                />
              )}
            />

            <Controller
              name="goal"
              control={control}
              render={({ field }) => (
                <Select
                  label={t("goal")}
                  value={field.value}
                  onChange={field.onChange}
                  options={goalOptions}
                  error={errors.goal?.message}
                  required
                />
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Controller
                name="timeline"
                control={control}
                render={({ field }) => (
                  <Select
                    label={t("timeline")}
                    value={field.value || ""}
                    onChange={field.onChange}
                    options={timelineOptions}
                  />
                )}
              />

              <Controller
                name="budget"
                control={control}
                render={({ field }) => (
                  <Select
                    label={t("budget")}
                    value={field.value || ""}
                    onChange={field.onChange}
                    options={budgetOptions}
                  />
                )}
              />
            </div>

            <Textarea
              label={t("references")}
              placeholder={t("referencesPlaceholder")}
              rows={3}
              helperText={t("referencesHelper")}
              error={errors.references?.message}
              disabled={formState === "loading"}
              {...register("references")}
            />
          </div>
        </div>

        {/* Section 2: Контакты */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label={t("email")}
                type="email"
                placeholder={t("emailPlaceholder")}
                error={errors.email?.message}
                disabled={formState === "loading"}
                {...register("email")}
              />

              <Input
                label={t("phone")}
                type="tel"
                placeholder={t("phonePlaceholder")}
                error={errors.phone?.message}
                disabled={formState === "loading"}
                {...register("phone")}
              />
            </div>

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

          <p className="text-caption text-[var(--color-text-muted)] text-center mt-4">
            {t("privacy")}{" "}
            <Link href="/privacy" className="underline hover:no-underline">
              {t("privacyLink")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
