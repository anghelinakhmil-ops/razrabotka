"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";

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
export default function BriefPage() {
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
                  href="https://t.me/webstudio_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
                >
                  <TelegramIcon />
                  <span className="text-body-sm font-medium">Telegram</span>
                </a>
                <a
                  href="https://wa.me/79991234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
                >
                  <WhatsAppIcon />
                  <span className="text-body-sm font-medium">WhatsApp</span>
                </a>
                <a
                  href="tel:+79991234567"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-background)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] transition-colors"
                >
                  <PhoneIcon />
                  <span className="text-body-sm font-medium">Позвонить</span>
                </a>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.3}>
              <p className="text-body-sm text-[var(--color-text-muted)] mt-8">
                Или напишите на{" "}
                <a
                  href="mailto:hello@webstudio.dev"
                  className="text-[var(--color-text-primary)] underline hover:no-underline"
                >
                  hello@webstudio.dev
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
  const [formData, setFormData] = useState({
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success
    setFormState("success");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  return (
    <div className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: О проекте */}
        <div>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            О проекте
          </h3>
          <div className="space-y-6">
            <Select
              label="Тип сайта"
              value={formData.siteType}
              onChange={handleSelectChange("siteType")}
              options={siteTypeOptions}
              required
            />

            <Select
              label="Основная цель"
              value={formData.goal}
              onChange={handleSelectChange("goal")}
              options={goalOptions}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Select
                label="Сроки"
                value={formData.timeline}
                onChange={handleSelectChange("timeline")}
                options={timelineOptions}
              />

              <Select
                label="Бюджет"
                value={formData.budget}
                onChange={handleSelectChange("budget")}
                options={budgetOptions}
              />
            </div>

            <Textarea
              label="Референсы / конкуренты"
              name="references"
              value={formData.references}
              onChange={handleChange}
              placeholder="Ссылки на сайты, которые вам нравятся, или сайты конкурентов..."
              rows={3}
              helperText="Необязательно, но поможет нам лучше понять ваши ожидания"
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Как к вам обращаться"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />

              <Input
                label="Телефон"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (___) ___-__-__"
                required
              />
            </div>

            <Input
              label="Telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              placeholder="@username"
              helperText="Необязательно — для быстрой связи"
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
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Расскажите подробнее о проекте, особых пожеланиях или вопросах..."
            rows={5}
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

/**
 * Icons
 */
function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
