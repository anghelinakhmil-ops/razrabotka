/**
 * Validation Schemas — Zod схемы валидации форм
 */

import { z } from "zod";

/**
 * Базовые валидаторы
 */

/** Валидация имени */
export const nameSchema = z
  .string()
  .min(2, "Имя должно содержать минимум 2 символа")
  .max(50, "Имя не должно превышать 50 символов")
  .regex(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s\-']+$/, "Имя содержит недопустимые символы");

/** Валидация телефона */
export const phoneSchema = z
  .string()
  .min(10, "Номер телефона слишком короткий")
  .max(20, "Номер телефона слишком длинный")
  .regex(
    /^[\d\s\-\+\(\)]+$/,
    "Некорректный формат телефона"
  )
  .refine(
    (val) => {
      // Убираем все нецифровые символы и проверяем длину
      const digits = val.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    },
    { message: "Введите корректный номер телефона" }
  );

/** Валидация email */
export const emailSchema = z
  .string()
  .email("Введите корректный email")
  .min(5, "Email слишком короткий")
  .max(100, "Email слишком длинный");

/** Валидация Telegram username */
export const telegramSchema = z
  .string()
  .regex(/^@?[a-zA-Z][a-zA-Z0-9_]{4,31}$/, "Некорректный Telegram username")
  .optional()
  .or(z.literal(""));

/** Валидация URL (для референсов) */
export const urlSchema = z
  .string()
  .url("Введите корректный URL")
  .optional()
  .or(z.literal(""));

/** Валидация комментария/сообщения */
export const messageSchema = z
  .string()
  .max(2000, "Сообщение слишком длинное (максимум 2000 символов)")
  .optional()
  .or(z.literal(""));

/**
 * Схемы форм
 */

/** Схема быстрой формы заявки */
export const quickLeadSchema = z
  .object({
    name: nameSchema.optional().or(z.literal("")),
    phone: phoneSchema.optional().or(z.literal("")),
    email: emailSchema.optional().or(z.literal("")),
  })
  .refine((data) => data.phone || data.email, {
    message: "Укажите телефон или email для связи",
    path: ["phone"],
  });

export type QuickLeadFormData = z.infer<typeof quickLeadSchema>;

/** Схема формы обратной связи */
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(2000, "Сообщение слишком длинное"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/** Схема формы брифа */
export const briefFormSchema = z.object({
  // О проекте
  siteType: z.string().min(1, "Выберите тип сайта"),
  goal: z.string().min(1, "Выберите основную цель"),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  references: messageSchema,

  // Контакты
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  telegram: telegramSchema,

  // Дополнительно
  comment: messageSchema,
});

export type BriefFormData = z.infer<typeof briefFormSchema>;

/** Схема формы заказа звонка */
export const callbackFormSchema = z.object({
  name: nameSchema.optional().or(z.literal("")),
  phone: phoneSchema,
});

export type CallbackFormData = z.infer<typeof callbackFormSchema>;

/**
 * Хелперы валидации
 */

/** Проверка валидности телефона */
export function isValidPhone(phone: string): boolean {
  try {
    phoneSchema.parse(phone);
    return true;
  } catch {
    return false;
  }
}

/** Проверка валидности email */
export function isValidEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

/** Форматирование телефона для отображения */
export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("7")) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`;
  }
  if (digits.length === 10) {
    return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
  }
  return phone;
}

/** Нормализация телефона (только цифры с +) */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+7${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("7")) {
    return `+${digits}`;
  }
  if (digits.length === 11 && digits.startsWith("8")) {
    return `+7${digits.slice(1)}`;
  }
  return `+${digits}`;
}
