"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { quickLeadSchema, type QuickLeadFormData } from "@/lib/validation";
import { getUtmData } from "@/lib/utm";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";

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
  /** Текст кнопки (переопределяет перевод) */
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
  submitText,
  onSuccess,
  source = "quick_lead",
  inverted = false,
}: QuickLeadFormProps) {
  const t = useTranslations("leadForm");
  const resolvedSubmitText = submitText ?? t("submit");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formStarted, setFormStarted] = useState(false);

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("quick_lead");
    }
  };

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
          ...getUtmData(),
        }),
      });

      if (!response.ok) {
        throw new Error(t("errorMessage"));
      }

      setFormState("success");
      trackFormSubmit("quick_lead");
      trackConversion("quick_lead", "quick");
      onSuccess?.(data);

      // Reset form after delay
      setTimeout(() => {
        setFormState("idle");
        reset();
      }, 5000);
    } catch (error) {
      setFormState("error");
      const msg = error instanceof Error ? error.message : t("errorMessage");
      setErrorMessage(msg);
      trackFormError("quick_lead", msg);
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
          {t("successTitle")}
        </motion.h4>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-body-sm text-[var(--color-text-muted)]"
        >
          {t("successText")}
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
          {t("errorTitle")}
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
            {t("retry")}
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
        onFocus={handleFormFocus}
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
              placeholder={t("phonePlaceholder")}
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
            {resolvedSubmitText}
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
                {t("retry")}
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
        onFocus={handleFormFocus}
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <PhoneInput
          value={phoneValue || ""}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder={t("phonePlaceholder")}
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
          {resolvedSubmitText}
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
                {t("retry")}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-caption text-[var(--color-text-muted)] text-center">
          {t("privacy")}{" "}
          <Link href="/privacy" className="underline hover:no-underline">
            {t("privacyLink")}
          </Link>
        </p>
      </motion.form>
    );
  }

  // Default variant
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFormFocus}
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
            label={t("name")}
            placeholder={t("namePlaceholder")}
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
          label={t("phone")}
          value={phoneValue || ""}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder={t("phonePlaceholder")}
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
            label={t("email")}
            type="email"
            placeholder="email@example.com"
            error={errors.email?.message}
            disabled={formState === "loading"}
            helperText={t("emailHelper")}
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
          {resolvedSubmitText}
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-caption text-[var(--color-text-muted)] text-center"
      >
        {t("privacy")}{" "}
        <Link href="/privacy" className="underline hover:no-underline">
          {t("privacyLink")}
        </Link>
      </motion.p>
    </motion.form>
  );
}

export default QuickLeadForm;
