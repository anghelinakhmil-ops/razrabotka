"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { getUtmData } from "@/lib/utm";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { briefFormSchema, type BriefFormData } from "@/lib/validation";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";

/**
 * Ключ для хранения черновика в localStorage
 */
const DRAFT_STORAGE_KEY = "brief_form_draft";

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
/**
 * Загрузить черновик из localStorage
 */
function loadDraft(): Partial<BriefFormData> | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Игнорируем ошибки парсинга
  }
  return null;
}

/**
 * Сохранить черновик в localStorage
 */
function saveDraft(data: Partial<BriefFormData>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Игнорируем ошибки записи
  }
}

/**
 * Очистить черновик из localStorage
 */
function clearDraft(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // Игнорируем ошибки
  }
}

export function BriefForm({ onSuccess, source = "brief" }: BriefFormProps) {
  const t = useTranslations("pages.brief");

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("brief");
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors, touchedFields },
  } = useForm<BriefFormData>({
    resolver: zodResolver(briefFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      telegram: "",
      comment: "",
    },
  });

  // Загрузка черновика при монтировании
  useEffect(() => {
    const draft = loadDraft();
    if (draft && !draftLoaded) {
      // Восстанавливаем значения из черновика
      Object.entries(draft).forEach(([key, value]) => {
        if (value) {
          setValue(key as keyof BriefFormData, value);
        }
      });
      setDraftLoaded(true);
    }
  }, [setValue, draftLoaded]);

  // Следим за всеми полями формы
  const formValues = watch();

  // Сохранение черновика при изменении полей
  const saveDraftDebounced = useCallback(() => {
    // Не сохраняем, если форма отправлена успешно
    if (formState === "success") return;

    // Проверяем, есть ли данные для сохранения
    const hasData = Object.values(formValues).some((v) => v && v.trim() !== "");
    if (hasData) {
      saveDraft(formValues);
    }
  }, [formValues, formState]);

  // Сохраняем черновик с дебаунсом
  useEffect(() => {
    if (!draftLoaded) return;

    const timeoutId = setTimeout(saveDraftDebounced, 500);
    return () => clearTimeout(timeoutId);
  }, [formValues, draftLoaded, saveDraftDebounced]);

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
          ...getUtmData(),
        }),
      });

      if (!response.ok) {
        throw new Error(t("errorRetry"));
      }

      // Очищаем черновик после успешной отправки
      clearDraft();
      setFormState("success");
      trackFormSubmit("brief");
      trackConversion("brief", "brief");
      onSuccess?.(data);
    } catch (error) {
      setFormState("error");
      const msg = error instanceof Error ? error.message : t("errorRetry");
      setErrorMessage(msg);
      trackFormError("brief", msg);
    }
  };

  const handlePhoneChange = (value: string) => {
    setValue("phone", value, { shouldValidate: touchedFields.phone });
  };

  const handlePhoneBlur = () => {
    trigger("phone");
  };

  const handleRetry = () => {
    setFormState("idle");
    setErrorMessage("");
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
          {t("successTitle")}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-body text-[var(--color-text-muted)] mb-2"
        >
          {t("successText1")}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="text-body text-[var(--color-text-muted)] mb-8"
        >
          <strong className="text-[var(--color-text-primary)]">{t("successText2")}</strong>
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="outline" size="md" as="a" href="/">
            {t("successHome")}
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
          {t("errorTitle")}
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
            {t("errorRetry")}
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
      <form onSubmit={handleSubmit(onSubmit)} onFocus={handleFormFocus} className="space-y-10">
        {/* Section 1: Контактные данные */}
        <motion.section {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.1 }}>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            {t("sectionContacts")}
          </h3>
          <div className="space-y-6">
            <Input
              label={t("name")}
              placeholder={t("namePlaceholder")}
              error={errors.name?.message}
              disabled={formState === "loading"}
              required
              {...register("name")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label={t("email")}
                type="email"
                placeholder={t("emailPlaceholder")}
                error={errors.email?.message}
                disabled={formState === "loading"}
                required
                {...register("email")}
              />

              <PhoneInput
                label={t("phone")}
                value={phoneValue || ""}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder={t("phonePlaceholder")}
                error={errors.phone?.message}
                disabled={formState === "loading"}
                required
              />
            </div>

            <Input
              label={t("telegram")}
              placeholder={t("telegramPlaceholder")}
              error={errors.telegram?.message}
              disabled={formState === "loading"}
              helperText={t("telegramHelper")}
              {...register("telegram")}
            />
          </div>
        </motion.section>

        {/* Section 2: Дополнительно */}
        <motion.section {...sectionAnimation} transition={{ ...sectionAnimation.transition, delay: 0.2 }}>
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-6 pb-4 border-b border-[var(--color-line)]">
            {t("sectionAdditional")}
          </h3>
          <Textarea
            label={t("comment")}
            placeholder={t("commentPlaceholder")}
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
          transition={{ delay: 0.3, duration: 0.4 }}
          className="pt-4"
        >
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
        </motion.div>
      </form>
    </motion.div>
  );
}

export default BriefForm;
