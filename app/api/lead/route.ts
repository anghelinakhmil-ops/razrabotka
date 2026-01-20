import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logLead } from "@/lib/leads";
import { sendLeadNotification } from "@/lib/email";

/**
 * Типы заявок
 */
type LeadType = "quick" | "brief" | "callback";

/**
 * Базовая схема для всех заявок
 */
const baseLeadSchema = z.object({
  source: z.string().optional(),
  type: z.enum(["quick", "brief", "callback"]),
  timestamp: z.string().optional(),
});

/**
 * Схема быстрой заявки
 */
const quickLeadSchema = baseLeadSchema.extend({
  type: z.literal("quick"),
  name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
}).refine((data) => data.phone || data.email, {
  message: "Требуется телефон или email",
});

/**
 * Схема заявки на звонок
 */
const callbackLeadSchema = baseLeadSchema.extend({
  type: z.literal("callback"),
  name: z.string().optional(),
  phone: z.string().min(10, "Некорректный телефон"),
});

/**
 * Схема брифа
 */
const briefLeadSchema = baseLeadSchema.extend({
  type: z.literal("brief"),
  siteType: z.string().min(1, "Выберите тип сайта"),
  goal: z.string().min(1, "Выберите цель"),
  timeline: z.string().optional(),
  budget: z.string().optional(),
  references: z.string().optional(),
  name: z.string().min(2, "Введите имя"),
  email: z.string().email("Некорректный email"),
  phone: z.string().min(10, "Некорректный телефон"),
  telegram: z.string().optional(),
  comment: z.string().optional(),
});

/**
 * Объединённая схема для определения типа
 */
const leadSchema = z.discriminatedUnion("type", [
  quickLeadSchema,
  callbackLeadSchema,
  briefLeadSchema,
]);

/**
 * Тип данных заявки
 */
type LeadData = z.infer<typeof leadSchema>;

/**
 * Интерфейс ответа API
 */
interface ApiResponse {
  success: boolean;
  message: string;
  leadId?: string;
  errors?: Array<{ field: string; message: string }>;
}

/**
 * Генерация уникального ID заявки
 */
function generateLeadId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `lead_${timestamp}_${random}`;
}

/**
 * Форматирование данных заявки для логирования
 */
function formatLeadForLog(data: LeadData, leadId: string): object {
  return {
    id: leadId,
    ...data,
    receivedAt: new Date().toISOString(),
  };
}

/**
 * POST /api/lead
 *
 * Обработка заявок с форм сайта.
 * Поддерживает типы: quick, brief, callback
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Парсим тело запроса
    const body = await request.json();

    // Валидируем данные
    const validationResult = leadSchema.safeParse(body);

    if (!validationResult.success) {
      // Форматируем ошибки валидации
      const errors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          success: false,
          message: "Ошибка валидации данных",
          errors,
        },
        { status: 400 }
      );
    }

    const leadData = validationResult.data;
    const leadId = generateLeadId();

    // Получаем страницу-источник из referer
    const referer = request.headers.get("referer") || "";
    const sourcePage = referer ? new URL(referer).pathname : "unknown";

    // Логируем и сохраняем заявку
    await logLead(
      leadId,
      leadData.type,
      leadData.source || "unknown",
      leadData as Record<string, unknown>,
      sourcePage
    );

    // Отправляем email уведомление
    const emailResult = await sendLeadNotification({
      id: leadId,
      type: leadData.type,
      source: leadData.source || "unknown",
      sourcePage,
      timestamp: leadData.timestamp || new Date().toISOString(),
      name: "name" in leadData ? leadData.name : undefined,
      phone: "phone" in leadData ? leadData.phone : undefined,
      email: "email" in leadData ? leadData.email : undefined,
      // Brief specific fields
      ...("siteType" in leadData && {
        siteType: leadData.siteType,
        goal: leadData.goal,
        timeline: leadData.timeline,
        budget: leadData.budget,
        references: leadData.references,
        telegram: leadData.telegram,
        comment: leadData.comment,
      }),
    });

    // Логируем результат отправки email (но не блокируем ответ)
    if (!emailResult.success) {
      console.warn(`⚠️ Email not sent for lead ${leadId}: ${emailResult.error}`);
    }

    // TODO: Phase 8.12 - Отправка в Telegram

    // Возвращаем успешный ответ
    return NextResponse.json(
      {
        success: true,
        message: getSuccessMessage(leadData.type),
        leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    // Логируем ошибку
    console.error("❌ Lead API error:", error);

    // Определяем тип ошибки
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: "Некорректный формат данных",
        },
        { status: 400 }
      );
    }

    // Общая ошибка сервера
    return NextResponse.json(
      {
        success: false,
        message: "Внутренняя ошибка сервера. Попробуйте позже.",
      },
      { status: 500 }
    );
  }
}

/**
 * Получение сообщения успеха в зависимости от типа заявки
 */
function getSuccessMessage(type: LeadType): string {
  switch (type) {
    case "quick":
      return "Заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.";
    case "callback":
      return "Спасибо! Мы перезвоним вам в ближайшее время.";
    case "brief":
      return "Бриф успешно отправлен. Мы изучим информацию и свяжемся с вами.";
    default:
      return "Заявка успешно отправлена.";
  }
}

/**
 * OPTIONS /api/lead
 *
 * CORS preflight handler
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}
