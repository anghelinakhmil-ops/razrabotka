"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { quickLeadSchema, type QuickLeadFormData } from "@/lib/validation";

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

  // Success state
  if (formState === "success") {
    return (
      <div
        className={`
          p-6 rounded-sm text-center
          ${inverted
            ? "bg-[var(--color-background)] text-[var(--color-text-primary)]"
            : "bg-[var(--color-background-alt)] text-[var(--color-text-primary)]"
          }
        `}
      >
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center">
          <svg
            width="24"
            height="24"
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
        <h4 className="text-h4 font-display font-bold mb-2">
          Заявка отправлена!
        </h4>
        <p className="text-body-sm text-[var(--color-text-muted)]">
          Мы свяжемся с вами в ближайшее время
        </p>
      </div>
    );
  }

  // Compact variant (inline)
  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
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
        {formState === "error" && errorMessage && (
          <p className="text-body-sm text-red-500 mt-2">{errorMessage}</p>
        )}
      </form>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {formState === "error" && errorMessage && (
          <p className="text-body-sm text-red-500 text-center">{errorMessage}</p>
        )}

        <p className="text-caption text-[var(--color-text-muted)] text-center">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a href="/privacy" className="underline hover:no-underline">
            политикой конфиденциальности
          </a>
        </p>
      </form>
    );
  }

  // Default variant
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {showName && (
        <Input
          label="Имя"
          placeholder="Как к вам обращаться"
          error={errors.name?.message}
          disabled={formState === "loading"}
          {...register("name")}
        />
      )}

      <PhoneInput
        label="Телефон"
        value={phoneValue || ""}
        onChange={handlePhoneChange}
        onBlur={handlePhoneBlur}
        placeholder="+7 (___) ___-__-__"
        error={errors.phone?.message}
        disabled={formState === "loading"}
      />

      {showEmail && (
        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          error={errors.email?.message}
          disabled={formState === "loading"}
          helperText="Или укажите email вместо телефона"
          {...register("email")}
        />
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={formState === "loading"}
      >
        {submitText}
      </Button>

      {formState === "error" && errorMessage && (
        <p className="text-body-sm text-red-500 text-center">{errorMessage}</p>
      )}

      <p className="text-caption text-[var(--color-text-muted)] text-center">
        Нажимая кнопку, вы соглашаетесь с{" "}
        <a href="/privacy" className="underline hover:no-underline">
          политикой конфиденциальности
        </a>
      </p>
    </form>
  );
}

export default QuickLeadForm;
