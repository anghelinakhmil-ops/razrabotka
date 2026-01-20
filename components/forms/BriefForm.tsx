"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { briefFormSchema, type BriefFormData } from "@/lib/validation";

/**
 * Опции для селекта «Тип сайта»
 */
const siteTypeOptions = [
  { value: "", label: "Выберите тип сайта" },
  { value: "expert", label: "Сайт для эксперта / личный бренд" },
  { value: "ecommerce", label: "Интернет-магазин" },
  { value: "landing", label: "Лендинг / промо-страница" },
  { value: "corporate", label: "Корпоративный сайт" },
  { value: "portfolio", label: "Портфолио" },
  { value: "other", label: "Другое" },
];

/**
 * Опции для селекта «Цель»
 */
const goalOptions = [
  { value: "", label: "Основная цель сайта" },
  { value: "sales", label: "Продажи товаров/услуг" },
  { value: "leads", label: "Сбор заявок и лидов" },
  { value: "brand", label: "Имидж и узнаваемость" },
  { value: "info", label: "Информирование аудитории" },
  { value: "community", label: "Создание сообщества" },
  { value: "other", label: "Другое" },
];

/**
 * Опции для селекта «Сроки»
 */
const timelineOptions = [
  { value: "", label: "Желаемые сроки" },
  { value: "urgent", label: "Срочно (до 2 недель)" },
  { value: "normal", label: "2–4 недели" },
  { value: "relaxed", label: "1–2 месяца" },
  { value: "flexible", label: "Не срочно, гибко" },
];

/**
 * Опции для селекта «Бюджет»
 */
const budgetOptions = [
  { value: "", label: "Примерный бюджет" },
  { value: "50-100", label: "50 000 – 100 000 ₽" },
  { value: "100-200", label: "100 000 – 200 000 ₽" },
  { value: "200-500", label: "200 000 – 500 000 ₽" },
  { value: "500+", label: "От 500 000 ₽" },
  { value: "discuss", label: "Обсудим" },
];

/**
 * Состояния формы
 */
type FormState = "idle" | "loading" | "success" | "error";

/**
 * Props для BriefForm
 */
interface BriefFormProps {
  /** Callback при успешной отправке */
  onSuccess?: (data: BriefFormData) => void;
  /** Источник формы (для аналитики) */
  source?: string;
}

/**
 * Анимации
 */
const sectionAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const },
};

/**
 * BriefForm — расширенная форма брифа
 *
 * Используется для сбора детальной информации о проекте.
 * Включает секции: О проекте, Контакты, Дополнительно.
 */
export function BriefForm({ onSuccess, source = "brief" }: BriefFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, touchedFields },
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
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

  const phoneValue = watch("phone");

  const onSubmit = async (data: BriefFormData) => {
    setFormState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          source,
          type: "brief",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки. Попробуйте позже.");
      }

      setFormState("success");
      onSuccess?.(data);
    } catch (error) {
      setFormState("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Произошла ошибка. Попробуйте позже."
      );
    }
  };

  const handlePhoneChange = (value: string) => {
    setValue("phone", value, { shouldValidate: touchedFields.phone });
  };

  const handlePhoneBlur = () => {
    trigger("phone");
  };

  const handleSelectChange = (name: keyof BriefFormData) => (value: string) => {
    setValue(name, value, { shouldValidate: true });
  };

  const handleRetry = () => {
    setFormState("idle");
    setErrorMessage("");
  };

  const handleReset = () => {
    reset();
    setFormState("idle");
  };

  // Success state
  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[var(--color-background)]"
          >
            <motion.path
              d="M5 13L9 17L19 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
          </svg>
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4"
        >
          Бриф отправлен!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-body text-[var(--color-text-muted)] mb-2"
        >
          Спасибо за заявку. Мы изучим ваш проект и свяжемся
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-body text-[var(--color-text-muted)] mb-8"
        >
          в течение <strong className="text-[var(--color-text-primary)]">2 рабочих часов</strong>.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline" size="md" as="a" href="/">
            На главную
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // Error state
  if (formState === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center"
        >
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
        </motion.div>
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-h3 font-display font-bold text-red-600 mb-4"
        >
          Ошибка отправки
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-body text-[var(--color-text-muted)] mb-6"
        >
          {errorMessage}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <Button variant="primary" size="md" onClick={handleRetry}>
            Попробовать снова
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // Form
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-8 lg:p-12 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        {/* Section 1: О проекте */}
        <motion.section {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.1 }}>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            О проекте
          </h3>
          <div className="space-y-6">
            <Select
              label="Тип сайта"
              value={watch("siteType")}
              onChange={handleSelectChange("siteType")}
              options={siteTypeOptions}
              error={errors.siteType?.message}
              required
            />

            <Select
              label="Основная цель"
              value={watch("goal")}
              onChange={handleSelectChange("goal")}
              options={goalOptions}
              error={errors.goal?.message}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Select
                label="Сроки"
                value={watch("timeline") || ""}
                onChange={handleSelectChange("timeline")}
                options={timelineOptions}
                error={errors.timeline?.message}
              />

              <Select
                label="Бюджет"
                value={watch("budget") || ""}
                onChange={handleSelectChange("budget")}
                options={budgetOptions}
                error={errors.budget?.message}
              />
            </div>

            <Textarea
              label="Референсы / конкуренты"
              placeholder="Ссылки на сайты, которые вам нравятся, или сайты конкурентов..."
              error={errors.references?.message}
              disabled={formState === "loading"}
              helperText="Необязательно, но поможет нам лучше понять ваши ожидания"
              {...register("references")}
            />
          </div>
        </motion.section>

        {/* Section 2: Контактные данные */}
        <motion.section {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.2 }}>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            Контактные данные
          </h3>
          <div className="space-y-6">
            <Input
              label="Имя"
              placeholder="Как к вам обращаться"
              error={errors.name?.message}
              disabled={formState === "loading"}
              required
              {...register("name")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Email"
                type="email"
                placeholder="email@example.com"
                error={errors.email?.message}
                disabled={formState === "loading"}
                required
                {...register("email")}
              />

              <PhoneInput
                label="Телефон"
                value={phoneValue || ""}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder="+7 (___) ___-__-__"
                error={errors.phone?.message}
                disabled={formState === "loading"}
                required
              />
            </div>

            <Input
              label="Telegram"
              placeholder="@username"
              error={errors.telegram?.message}
              disabled={formState === "loading"}
              helperText="Необязательно — для быстрой связи"
              {...register("telegram")}
            />
          </div>
        </motion.section>

        {/* Section 3: Дополнительно */}
        <motion.section {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.3 }}>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            Дополнительно
          </h3>
          <Textarea
            label="Комментарий"
            placeholder="Расскажите подробнее о проекте, особых пожеланиях или вопросах..."
            error={errors.comment?.message}
            disabled={formState === "loading"}
            rows={5}
            {...register("comment")}
          />
        </motion.section>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="pt-4"
        >
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
        </motion.div>
      </form>
    </motion.div>
  );
}

export default BriefForm;
