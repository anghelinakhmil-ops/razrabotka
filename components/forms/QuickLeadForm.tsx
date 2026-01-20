"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { quickLeadSchema, type QuickLeadFormData } from "@/lib/validation";

/**
 * Анимации для переходов состояний
 */
const stateAnimations = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] as const },
};

/**
 * Состояния формы
 */
type FormState = "idle" | "loading" | "success" | "error";

/**
 * Props для QuickLeadForm
 */
interface QuickLeadFormProps {
  /** Вариант отображения */
  variant?: "default" | "compact" | "inline";
  /** Показывать поле имени */
  showName?: boolean;
  /** Показывать поле email */
  showEmail?: boolean;
  /** Текст кнопки */
  submitText?: string;
  /** Callback при успешной отправке */
  onSuccess?: (data: QuickLeadFormData) => void;
  /** Источник формы (для аналитики) */
  source?: string;
  /** Инвертированные цвета (для тёмного фона) */
  inverted?: boolean;
}

/**
 * QuickLeadForm — компонент быстрой формы заявки
 *
 * Используется для сбора контактных данных посетителей.
 * Поддерживает валидацию через Zod и React Hook Form.
 */
export function QuickLeadForm({
  variant = "default",
  showName = true,
  showEmail = true,
  submitText = "Оставить заявку",
  onSuccess,
  source = "quick_lead",
  inverted = false,
}: QuickLeadFormProps) {
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
  } = useForm<QuickLeadFormData>({
    resolver: zodResolver(quickLeadSchema),
    mode: "onBlur", // Валидация при потере фокуса
    reValidateMode: "onChange", // Повторная валидация при изменении
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const phoneValue = watch("phone");

  const onSubmit = async (data: QuickLeadFormData) => {
    setFormState("loading");
    setErrorMessage("");

    try {
      // API call to submit lead
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          source,
          type: "quick",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки. Попробуйте позже.");
      }

      setFormState("success");
      onSuccess?.(data);

      // Reset form after delay
      setTimeout(() => {
        setFormState("idle");
        reset();
      }, 5000);
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

  // Обработчик повторной попытки
  const handleRetry = () => {
    setFormState("idle");
    setErrorMessage("");
  };

  // Success state
  if (formState === "success") {
    return (
      <motion.div
        key="success"
        initial={stateAnimations.initial}
        animate={stateAnimations.animate}
        exit={stateAnimations.exit}
        transition={stateAnimations.transition}
        className={`
          p-6 rounded-sm text-center
          ${inverted
            ? "bg-[var(--color-background)] text-[var(--color-text-primary)]"
            : "bg-[var(--color-background-alt)] text-[var(--color-text-primary)]"
          }
        `}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
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
              transition={{ delay: 0.2, duration: 0.4 }}
            />
          </svg>
        </motion.div>
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-h4 font-display font-bold mb-2"
        >
          Заявка отправлена!
        </motion.h4>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-body-sm text-[var(--color-text-muted)]"
        >
          Мы свяжемся с вами в ближайшее время
        </motion.p>
      </motion.div>
    );
  }

  // Error state (полноэкранный вариант для default)
  if (formState === "error" && variant === "default") {
    return (
      <motion.div
        key="error"
        initial={stateAnimations.initial}
        animate={stateAnimations.animate}
        exit={stateAnimations.exit}
        transition={stateAnimations.transition}
        className={`
          p-6 rounded-sm text-center
          ${inverted
            ? "bg-[var(--color-background)] text-[var(--color-text-primary)]"
            : "bg-[var(--color-background-alt)] text-[var(--color-text-primary)]"
          }
        `}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
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
        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-h4 font-display font-bold mb-2 text-red-600"
        >
          Ошибка отправки
        </motion.h4>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-body-sm text-[var(--color-text-muted)] mb-4"
        >
          {errorMessage}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="outline" size="md" onClick={handleRetry}>
            Попробовать снова
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  // Compact variant (inline)
  if (variant === "inline") {
    return (
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <PhoneInput
              value={phoneValue || ""}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              placeholder="Ваш телефон"
              error={errors.phone?.message}
              disabled={formState === "loading"}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={formState === "loading"}
            className="shrink-0"
          >
            {submitText}
          </Button>
        </div>
        <AnimatePresence mode="wait">
          {formState === "error" && errorMessage && (
            <motion.div
              key="error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between gap-2 mt-2"
            >
              <p className="text-body-sm text-red-500">{errorMessage}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="text-body-sm text-[var(--color-text-secondary)] underline hover:no-underline shrink-0"
              >
                Повторить
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <PhoneInput
          value={phoneValue || ""}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder="Ваш телефон"
          error={errors.phone?.message}
          disabled={formState === "loading"}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={formState === "loading"}
        >
          {submitText}
        </Button>

        <AnimatePresence mode="wait">
          {formState === "error" && errorMessage && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <p className="text-body-sm text-red-500 mb-2">{errorMessage}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="text-body-sm text-[var(--color-text-secondary)] underline hover:no-underline"
              >
                Попробовать снова
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-caption text-[var(--color-text-muted)] text-center">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a href="/privacy" className="underline hover:no-underline">
            политикой конфиденциальности
          </a>
        </p>
      </motion.form>
    );
  }

  // Default variant
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {showName && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            label="Имя"
            placeholder="Как к вам обращаться"
            error={errors.name?.message}
            disabled={formState === "loading"}
            {...register("name")}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: showName ? 0.15 : 0.1 }}
      >
        <PhoneInput
          label="Телефон"
          value={phoneValue || ""}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder="+7 (___) ___-__-__"
          error={errors.phone?.message}
          disabled={formState === "loading"}
        />
      </motion.div>

      {showEmail && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            label="Email"
            type="email"
            placeholder="email@example.com"
            error={errors.email?.message}
            disabled={formState === "loading"}
            helperText="Или укажите email вместо телефона"
            {...register("email")}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={formState === "loading"}
        >
          {submitText}
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-caption text-[var(--color-text-muted)] text-center"
      >
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a href="/privacy" className="underline hover:no-underline">
          политикой конфиденциальности
        </a>
      </motion.p>
    </motion.form>
  );
}

export default QuickLeadForm;
