"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { getUtmData } from "@/lib/utm";
import { callbackFormSchema, type CallbackFormData } from "@/lib/validation";
import { trackFormStart, trackFormSubmit, trackFormError, trackConversion } from "@/lib/analytics";

/**
 * Состояния формы
 */
type FormState = "idle" | "loading" | "success" | "error";

/**
 * Props для CallbackModal
 */
interface CallbackModalProps {
  /** Состояние открытия */
  isOpen: boolean;
  /** Callback при закрытии */
  onClose: () => void;
  /** Callback при успешной отправке */
  onSuccess?: (data: CallbackFormData) => void;
  /** Источник формы (для аналитики) */
  source?: string;
}

/**
 * CallbackModal — модальное окно «Заказать звонок»
 *
 * Используется для быстрого сбора контактных данных.
 * Минимальная форма: имя (опционально) и телефон.
 */
export function CallbackModal({
  isOpen,
  onClose,
  onSuccess,
  source = "callback_modal",
}: CallbackModalProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formStarted, setFormStarted] = useState(false);

  const handleFormFocus = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackFormStart("callback");
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
  } = useForm<CallbackFormData>({
    resolver: zodResolver(callbackFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  const phoneValue = watch("phone");

  const onSubmit = async (data: CallbackFormData) => {
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
          type: "callback",
          timestamp: new Date().toISOString(),
          ...getUtmData(),
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка отправки. Попробуйте позже.");
      }

      setFormState("success");
      trackFormSubmit("callback");
      trackConversion("callback", "callback");
      onSuccess?.(data);
    } catch (error) {
      setFormState("error");
      const msg = error instanceof Error ? error.message : "Произошла ошибка. Попробуйте позже.";
      setErrorMessage(msg);
      trackFormError("callback", msg);
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

  const handleClose = () => {
    // Сбрасываем форму при закрытии
    if (formState === "success") {
      reset();
      setFormState("idle");
    }
    onClose();
  };

  const handleNewRequest = () => {
    reset();
    setFormState("idle");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Заказать звонок"
      size="sm"
    >
      {/* Success state */}
      {formState === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-text-primary)] flex items-center justify-center"
          >
            <svg
              width="32"
              height="32"
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
          <h3 className="text-h4 font-display font-bold text-[var(--color-text-primary)] mb-2">
            Заявка отправлена!
          </h3>
          <p className="text-body-sm text-[var(--color-text-muted)] mb-6">
            Мы перезвоним вам в ближайшее время
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" size="md" onClick={handleClose}>
              Закрыть
            </Button>
            <Button variant="ghost" size="md" onClick={handleNewRequest}>
              Новая заявка
            </Button>
          </div>
        </motion.div>
      ) : formState === "error" ? (
        /* Error state */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center"
          >
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
          </motion.div>
          <h3 className="text-h4 font-display font-bold text-red-600 mb-2">
            Ошибка отправки
          </h3>
          <p className="text-body-sm text-[var(--color-text-muted)] mb-6">
            {errorMessage}
          </p>
          <Button variant="primary" size="md" onClick={handleRetry}>
            Попробовать снова
          </Button>
        </motion.div>
      ) : (
        /* Form state */
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          onFocus={handleFormFocus}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          <p className="text-body-sm text-[var(--color-text-muted)] mb-2">
            Оставьте номер телефона, и мы перезвоним вам в ближайшее время для обсуждения вашего проекта.
          </p>

          <Input
            label="Имя"
            placeholder="Как к вам обращаться"
            error={errors.name?.message}
            disabled={formState === "loading"}
            {...register("name")}
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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={formState === "loading"}
          >
            Заказать звонок
          </Button>

          <p className="text-caption text-[var(--color-text-muted)] text-center">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/privacy" className="underline hover:no-underline">
              политикой конфиденциальности
            </a>
          </p>
        </motion.form>
      )}
    </Modal>
  );
}

export default CallbackModal;
