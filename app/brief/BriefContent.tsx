"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { CONTACT, MESSENGERS, SOCIAL_ICONS } from "@/lib/constants";
import { briefFormSchema, type BriefFormData } from "@/lib/validation";
import { trackFormStart, trackFormSubmit, trackFormError } from "@/lib/analytics";

/**
 * Опции для селектов
 */
const siteTypeOptions = [
  { value: "", label: "Выберите тип сайта" },
  { value: "expert", label: "Сайт для эксперта / личный бренд" },
  { value: "ecommerce", label: "Интернет-магазин" },
  { value: "landing", label: "Лендинг / промо-страница" },
  { value: "corporate", label: "Корпоративный сайт" },
  { value: "other", label: "Другое" },
];

const goalOptions = [
  { value: "", label: "Основная цель сайта" },
  { value: "sales", label: "Продажи товаров/услуг" },
  { value: "leads", label: "Сбор заявок/лидов" },
  { value: "brand", label: "Имидж и узнаваемость" },
  { value: "info", label: "Информирование аудитории" },
  { value: "other", label: "Другое" },
];

const timelineOptions = [
  { value: "", label: "Желаемые сроки" },
  { value: "urgent", label: "Срочно (до 2 недель)" },
  { value: "normal", label: "2–4 недели" },
  { value: "relaxed", label: "1–2 месяца" },
  { value: "flexible", label: "Не срочно, гибко" },
];

const budgetOptions = [
  { value: "", label: "Примерный бюджет" },
  { value: "50-100", label: "50 000 – 100 000 ₽" },
  { value: "100-200", label: "100 000 – 200 000 ₽" },
  { value: "200-500", label: "200 000 – 500 000 ₽" },
  { value: "500+", label: "От 500 000 ₽" },
  { value: "discuss", label: "Обсудим" },
];

/**
 * Шаги заполнения брифа
 */
const briefSteps = [
  {
    number: "01",
    title: "Заполните бриф",
    description: "Расскажите о проекте, целях и пожеланиях",
  },
  {
    number: "02",
    title: "Обсудим детали",
    description: "Свяжемся в течение 2 часов для уточнений",
  },
  {
    number: "03",
    title: "Получите предложение",
    description: "Подготовим персональное КП с ценами и сроками",
  },
];

/**
 * Brief Page — страница брифа
 */
export default function BriefContent() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              Оставить заявку
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="mb-6">
              <BrokenText
                text="БРИФ"
                spaced
                mixPattern={[1, 3]}
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
              Расскажите о вашем проекте — мы подготовим персональное
              коммерческое предложение с точными сроками и стоимостью.
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
            {briefSteps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="flex items-start gap-4">
                  <span className="text-h2 font-display font-bold text-[var(--color-line-dark)]">
                    {step.number}
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
                Предпочитаете общение напрямую?
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.1}>
              <p className="text-body text-[var(--color-text-muted)] mb-8">
                Свяжитесь с нами любым удобным способом —
                мы всегда на связи и готовы обсудить ваш проект.
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={MESSENGERS.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
                >
                  {SOCIAL_ICONS.telegram("w-5 h-5")}
                  <span className="text-body-sm font-medium">Telegram</span>
                </a>
                <a
                  href={MESSENGERS.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
                >
                  {SOCIAL_ICONS.whatsapp("w-5 h-5")}
                  <span className="text-body-sm font-medium">WhatsApp</span>
                </a>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
                >
                  {SOCIAL_ICONS.phone("w-5 h-5")}
                  <span className="text-body-sm font-medium">Позвонить</span>
                </a>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.3}>
              <p className="text-body-sm text-[var(--color-text-muted)] mt-8">
                Или напишите на{" "}
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
function BriefForm() {
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
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки. Попробуйте позже.");
      }

      setFormState("success");
      trackFormSubmit("brief");
    } catch (error) {
      setFormState("error");
      const msg = error instanceof Error ? error.message : "Произошла ошибка. Попробуйте позже.";
      setErrorMessage(msg);
      trackFormError("brief", msg);
    }
  };

  if (formState === "success") {
    return (
      <div className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
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
            Бриф отправлен!
          </h3>
          <p className="text-body text-[var(--color-text-muted)] mb-2">
            Спасибо за заявку. Мы изучим ваш проект и свяжемся
          </p>
          <p className="text-body text-[var(--color-text-muted)] mb-8">
            в течение <strong>2 рабочих часов</strong>.
          </p>
          <Button variant="outline" size="md" as="a" href="/">
            На главную
          </Button>
        </div>
      </div>
    );
  }

  if (formState === "error") {
    return (
      <div className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
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
            Ошибка отправки
          </h3>
          <p className="text-body text-[var(--color-text-muted)] mb-8">
            {errorMessage}
          </p>
          <Button variant="primary" size="md" onClick={() => setFormState("idle")}>
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
      <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} className="space-y-8">
        {/* Section 1: О проекте */}
        <div>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            О проекте
          </h3>
          <div className="space-y-6">
            <Controller
              name="siteType"
              control={control}
              render={({ field }) => (
                <Select
                  label="Тип сайта"
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
                  label="Основная цель"
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
                    label="Сроки"
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
                    label="Бюджет"
                    value={field.value || ""}
                    onChange={field.onChange}
                    options={budgetOptions}
                  />
                )}
              />
            </div>

            <Textarea
              label="Референсы / конкуренты"
              placeholder="Ссылки на сайты, которые вам нравятся, или сайты конкурентов..."
              rows={3}
              helperText="Необязательно, но поможет нам лучше понять ваши ожидания"
              error={errors.references?.message}
              disabled={formState === "loading"}
              {...register("references")}
            />
          </div>
        </div>

        {/* Section 2: Контакты */}
        <div>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            Контактные данные
          </h3>
          <div className="space-y-6">
            <Input
              label="Имя"
              placeholder="Как к вам обращаться"
              error={errors.name?.message}
              disabled={formState === "loading"}
              {...register("name")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
                error={errors.email?.message}
                disabled={formState === "loading"}
                {...register("email")}
              />

              <Input
                label="Телефон"
                type="tel"
                placeholder="+7 (___) ___-__-__"
                error={errors.phone?.message}
                disabled={formState === "loading"}
                {...register("phone")}
              />
            </div>

            <Input
              label="Telegram"
              placeholder="@username"
              helperText="Необязательно — для быстрой связи"
              error={errors.telegram?.message}
              disabled={formState === "loading"}
              {...register("telegram")}
            />
          </div>
        </div>

        {/* Section 3: Дополнительно */}
        <div>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            Дополнительно
          </h3>
          <Textarea
            label="Комментарий"
            placeholder="Расскажите подробнее о проекте, особых пожеланиях или вопросах..."
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
            Отправить бриф
          </Button>

          <p className="text-caption text-[var(--color-text-muted)] text-center mt-4">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/privacy" className="underline hover:no-underline">
              политикой конфиденциальности
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

