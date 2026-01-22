"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RevealOnScroll, StaggerContainer, StaggerItem } from "@/components/motion";

/**
 * Контактная информация
 */
const contactInfo = {
  email: "hello@webstudio.dev",
  phone: "+7 (999) 123-45-67",
  phoneRaw: "+79991234567",
  address: "Москва, ул. Примерная, д. 1, офис 100",
  workingHours: "Пн — Пт: 10:00 — 19:00",
  telegram: "@webstudio_dev",
  telegramUrl: "https://t.me/webstudio_dev",
  whatsapp: "+79991234567",
  whatsappUrl: "https://wa.me/79991234567",
  instagram: "@webstudio.dev",
  instagramUrl: "https://instagram.com/webstudio.dev",
  mapUrl: "https://maps.google.com/?q=Москва,+ул.+Примерная,+д.+1",
};

/**
 * Contacts Page — страница контактов
 */
export default function ContactsPage() {
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
                      href={`mailto:${contactInfo.email}`}
                      className="text-h4 font-display font-bold text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      {contactInfo.email}
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
                      href={`tel:${contactInfo.phoneRaw}`}
                      className="text-h4 font-display font-bold text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </ContactBlock>
                </StaggerItem>

                {/* Address */}
                <StaggerItem>
                  <ContactBlock
                    number="03"
                    title="Адрес"
                    description="Офис для встреч"
                  >
                    <a
                      href={contactInfo.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-lg text-[var(--color-text-primary)] hover:text-[var(--color-text-secondary)] transition-colors"
                    >
                      {contactInfo.address}
                      <span className="block text-body-sm text-[var(--color-text-muted)] mt-1">
                        Открыть в Google Maps →
                      </span>
                    </a>
                  </ContactBlock>
                </StaggerItem>

                {/* Working Hours */}
                <StaggerItem>
                  <ContactBlock
                    number="04"
                    title="Режим работы"
                    description="Время для связи"
                  >
                    <p className="text-body-lg text-[var(--color-text-primary)]">
                      {contactInfo.workingHours}
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
                        href={contactInfo.telegramUrl}
                        label="Telegram"
                        icon={<TelegramIcon />}
                      />
                      <SocialLink
                        href={contactInfo.whatsappUrl}
                        label="WhatsApp"
                        icon={<WhatsAppIcon />}
                      />
                      <SocialLink
                        href={contactInfo.instagramUrl}
                        label="Instagram"
                        icon={<InstagramIcon />}
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

      {/* Map Section */}
      <section className="bg-[var(--color-background-alt)]">
        <RevealOnScroll direction="up">
          <div className="w-full h-[400px] lg:h-[500px] bg-[var(--color-line)] flex items-center justify-center">
            <div className="text-center">
              <p className="text-body text-[var(--color-text-muted)] mb-4">
                Карта Google Maps
              </p>
              <a
                href={contactInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-[var(--color-text-secondary)] underline hover:no-underline"
              >
                Открыть в новой вкладке
              </a>
            </div>
          </div>
        </RevealOnScroll>
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success
    setFormState("success");

    // Reset after 3 seconds
    setTimeout(() => {
      setFormState("idle");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
          <p className="text-body text-[var(--color-text-muted)]">
            Мы свяжемся с вами в ближайшее время
          </p>
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

      <form onSubmit={handleSubmit} className="space-y-6">
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
          />
        </div>

        <Textarea
          label="Сообщение"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Расскажите о вашем проекте..."
          rows={5}
          required
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

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
    </svg>
  );
}
