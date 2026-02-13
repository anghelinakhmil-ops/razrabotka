"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { getUtmData } from "@/lib/utm";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";
import { CONTACT, MESSENGERS, SOCIAL_ICONS } from "@/lib/constants";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";

/**
 * Contacts Page — страница контактов
 */
export default function ContactsContent() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container>
          <RevealOnScroll direction="up">
            <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
              Связаться с нами
            </span>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="mb-6">
              <BrokenText
                text="КОНТАКТЫ"
                spaced
                mixPattern={[2, 5]}
                className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
              />
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
              Готовы обсудить ваш проект? Свяжитесь с нами любым удобным способом
              или оставьте заявку — мы ответим в течение 2 часов.
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
                    title="Email"
                    description="Для запросов и предложений"
                  >
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-h4 font-display font-bold text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      {CONTACT.email}
                    </a>
                  </ContactBlock>
                </StaggerItem>

                {/* Phone */}
                <StaggerItem>
                  <ContactBlock
                    number="02"
                    title="Телефон"
                    description="Звоните в рабочее время"
                  >
                    <a
                      href={`tel:${CONTACT.phoneRaw}`}
                      className="text-h4 font-display font-bold text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      {CONTACT.phone}
                    </a>
                  </ContactBlock>
                </StaggerItem>

                {/* Working Hours */}
                <StaggerItem>
                  <ContactBlock
                    number="03"
                    title="Режим работы"
                    description="Время для связи"
                  >
                    <p className="text-body-lg text-[var(--color-text-primary)]">
                      {CONTACT.workingHours}
                    </p>
                    <p className="text-body-sm text-[var(--color-text-muted)] mt-1">
                      Заявки обрабатываем в течение 2 часов
                    </p>
                  </ContactBlock>
                </StaggerItem>

                {/* Social Links */}
                <StaggerItem>
                  <div className="pt-8 border-t border-[var(--color-line)]">
                    <p className="text-caption text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                      Мессенджеры и соцсети
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <SocialLink
                        href={MESSENGERS.telegram.url}
                        label="Telegram"
                        icon={SOCIAL_ICONS.telegram("w-5 h-5")}
                      />
                      <SocialLink
                        href={MESSENGERS.whatsapp.url}
                        label="WhatsApp"
                        icon={SOCIAL_ICONS.whatsapp("w-5 h-5")}
                      />
                      <SocialLink
                        href={MESSENGERS.instagram.url}
                        label="Instagram"
                        icon={SOCIAL_ICONS.instagram("w-5 h-5")}
                      />
                    </div>
                  </div>
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
                Предпочитаете детальный бриф?
              </h2>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.1}>
              <p className="text-body text-[var(--color-text-muted)] mb-8">
                Заполните расширенную форму с описанием проекта —
                так мы сможем подготовить персональное предложение.
              </p>
            </RevealOnScroll>

            <RevealOnScroll direction="up" delay={0.2}>
              <Button variant="primary" size="lg" as="a" href="/brief">
                Заполнить бриф
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
 * SocialLink — ссылка на соцсеть
 */
function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-4 py-2 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm hover:border-[var(--color-line-dark)] hover:bg-[var(--color-line)] transition-colors"
    >
      {icon}
      <span className="text-body-sm font-medium text-[var(--color-text-primary)]">
        {label}
      </span>
    </a>
  );
}

/**
 * ContactForm — форма обратной связи
 */
function ContactForm() {
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
        throw new Error("Ошибка отправки. Попробуйте позже.");
      }

      setFormState("success");
      trackFormSubmit("contact");
      trackConversion("contact", "quick");
    } catch (error) {
      setFormState("error");
      const msg = error instanceof Error ? error.message : "Произошла ошибка. Попробуйте позже.";
      setErrorMessage(msg);
      trackFormError("contact", msg);
    }
  };

  if (formState === "success") {
    return (
      <div className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
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
            Сообщение отправлено
          </h3>
          <p className="text-body text-[var(--color-text-muted)] mb-6">
            Мы свяжемся с вами в ближайшее время
          </p>
          <Button variant="ghost" size="md" onClick={() => { reset(); setFormState("idle"); }}>
            Отправить ещё
          </Button>
        </div>
      </div>
    );
  }

  if (formState === "error") {
    return (
      <div className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm">
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
            Ошибка отправки
          </h3>
          <p className="text-body text-[var(--color-text-muted)] mb-6">
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
      <h3 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-2">
        Напишите нам
      </h3>
      <p className="text-body text-[var(--color-text-muted)] mb-8">
        Опишите ваш проект — мы ответим в течение 2 часов
      </p>

      <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} className="space-y-6">
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

        <Textarea
          label="Сообщение"
          placeholder="Расскажите о вашем проекте..."
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
          Отправить сообщение
        </Button>

        <p className="text-caption text-[var(--color-text-muted)] text-center">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a href="/privacy" className="underline hover:no-underline">
            политикой конфиденциальности
          </a>
        </p>
      </form>
    </div>
  );
}

