/**
 * Telegram — модуль для отправки уведомлений в Telegram
 *
 * Использует Telegram Bot API для отправки сообщений о новых заявках.
 *
 * Настройка:
 * 1. Создайте бота через @BotFather в Telegram
 * 2. Получите TELEGRAM_BOT_TOKEN
 * 3. Добавьте бота в группу/канал или начните диалог
 * 4. Получите TELEGRAM_CHAT_ID (можно через @userinfobot или API)
 */

/**
 * Конфигурация Telegram
 */
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Базовый URL Telegram API
 */
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

/**
 * Типы заявок
 */
type LeadType = "quick" | "brief" | "callback";

/**
 * Данные заявки для Telegram
 */
interface LeadTelegramData {
  id: string;
  type: LeadType;
  source: string;
  sourcePage: string;
  timestamp: string;
  name?: string;
  phone?: string;
  email?: string;
  // Brief specific
  siteType?: string;
  goal?: string;
  timeline?: string;
  budget?: string;
  references?: string;
  telegram?: string;
  comment?: string;
}

/**
 * Результат отправки в Telegram
 */
interface TelegramResult {
  success: boolean;
  messageId?: number;
  error?: string;
}

/**
 * Получить emoji для типа заявки
 */
function getLeadTypeEmoji(type: LeadType): string {
  switch (type) {
    case "quick":
      return "📩";
    case "callback":
      return "📞";
    case "brief":
      return "📋";
    default:
      return "📨";
  }
}

/**
 * Получить название типа заявки
 */
function getLeadTypeName(type: LeadType): string {
  switch (type) {
    case "quick":
      return "Быстрая заявка";
    case "callback":
      return "Заказ звонка";
    case "brief":
      return "Бриф";
    default:
      return "Заявка";
  }
}

/**
 * Получить название типа сайта
 */
function getSiteTypeName(siteType?: string): string {
  const types: Record<string, string> = {
    expert: "Эксперт / личный бренд",
    ecommerce: "Интернет-магазин",
    landing: "Лендинг",
    corporate: "Корпоративный",
    portfolio: "Портфолио",
    other: "Другое",
  };
  return siteType ? types[siteType] || siteType : "—";
}

/**
 * Получить название цели
 */
function getGoalName(goal?: string): string {
  const goals: Record<string, string> = {
    sales: "Продажи",
    leads: "Заявки",
    brand: "Имидж",
    info: "Информирование",
    community: "Сообщество",
    other: "Другое",
  };
  return goal ? goals[goal] || goal : "—";
}

/**
 * Получить название сроков
 */
function getTimelineName(timeline?: string): string {
  const timelines: Record<string, string> = {
    urgent: "Срочно",
    normal: "2–4 недели",
    relaxed: "1–2 месяца",
    flexible: "Гибко",
  };
  return timeline ? timelines[timeline] || timeline : "—";
}

/**
 * Получить название бюджета
 */
function getBudgetName(budget?: string): string {
  const budgets: Record<string, string> = {
    "50-100": "50–100 тыс",
    "100-200": "100–200 тыс",
    "200-500": "200–500 тыс",
    "500+": "500+ тыс",
    discuss: "Обсудим",
  };
  return budget ? budgets[budget] || budget : "—";
}

/**
 * Экранирование специальных символов для MarkdownV2
 */
function escapeMarkdown(text: string): string {
  return text.replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

/**
 * Форматирование сообщения для быстрой заявки / заказа звонка
 */
function formatQuickLeadMessage(data: LeadTelegramData): string {
  const emoji = getLeadTypeEmoji(data.type);
  const typeName = getLeadTypeName(data.type);

  let message = `${emoji} *${escapeMarkdown(typeName)}*\n\n`;

  if (data.name) {
    message += `👤 *Имя:* ${escapeMarkdown(data.name)}\n`;
  }
  if (data.phone) {
    message += `📱 *Телефон:* ${escapeMarkdown(data.phone)}\n`;
  }
  if (data.email) {
    message += `📧 *Email:* ${escapeMarkdown(data.email)}\n`;
  }

  message += `\n`;
  message += `🔗 *Источник:* ${escapeMarkdown(data.source)}\n`;
  message += `📄 *Страница:* ${escapeMarkdown(data.sourcePage)}\n`;
  message += `🕐 *Время:* ${escapeMarkdown(new Date(data.timestamp).toLocaleString("ru-RU"))}\n`;
  message += `\n`;
  message += `🆔 \`${data.id}\``;

  return message;
}

/**
 * Форматирование сообщения для брифа
 */
function formatBriefMessage(data: LeadTelegramData): string {
  let message = `📋 *Новый бриф*\n\n`;

  // Контакты
  message += `*👤 Контакты:*\n`;
  message += `• Имя: ${escapeMarkdown(data.name || "—")}\n`;
  message += `• Телефон: ${escapeMarkdown(data.phone || "—")}\n`;
  message += `• Email: ${escapeMarkdown(data.email || "—")}\n`;
  if (data.telegram) {
    message += `• Telegram: ${escapeMarkdown(data.telegram)}\n`;
  }

  // О проекте
  message += `\n*📊 О проекте:*\n`;
  message += `• Тип: ${escapeMarkdown(getSiteTypeName(data.siteType))}\n`;
  message += `• Цель: ${escapeMarkdown(getGoalName(data.goal))}\n`;
  message += `• Сроки: ${escapeMarkdown(getTimelineName(data.timeline))}\n`;
  message += `• Бюджет: ${escapeMarkdown(getBudgetName(data.budget))}\n`;

  // Референсы
  if (data.references) {
    const refs = data.references.length > 200
      ? data.references.substring(0, 200) + "..."
      : data.references;
    message += `\n*🔗 Референсы:*\n${escapeMarkdown(refs)}\n`;
  }

  // Комментарий
  if (data.comment) {
    const comment = data.comment.length > 300
      ? data.comment.substring(0, 300) + "..."
      : data.comment;
    message += `\n*💬 Комментарий:*\n${escapeMarkdown(comment)}\n`;
  }

  // Мета
  message += `\n`;
  message += `🔗 ${escapeMarkdown(data.source)} \\| ${escapeMarkdown(data.sourcePage)}\n`;
  message += `🕐 ${escapeMarkdown(new Date(data.timestamp).toLocaleString("ru-RU"))}\n`;
  message += `🆔 \`${data.id}\``;

  return message;
}

/**
 * Отправка сообщения в Telegram
 */
async function sendMessage(text: string, parseMode: "MarkdownV2" | "HTML" = "MarkdownV2"): Promise<TelegramResult> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("⚠️ Telegram not configured, skipping notification");
    return {
      success: false,
      error: "Telegram not configured",
    };
  }

  try {
    const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.description || "Unknown Telegram API error");
    }

    console.log(`📱 Telegram message sent: ${result.result.message_id}`);

    return {
      success: true,
      messageId: result.result.message_id,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Failed to send Telegram message:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Отправка уведомления о новой заявке в Telegram
 */
export async function sendLeadTelegramNotification(data: LeadTelegramData): Promise<TelegramResult> {
  // Формируем сообщение в зависимости от типа
  const message = data.type === "brief"
    ? formatBriefMessage(data)
    : formatQuickLeadMessage(data);

  return sendMessage(message);
}

/**
 * Проверка конфигурации Telegram
 */
export function isTelegramConfigured(): boolean {
  return !!(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
}

/**
 * Отправка тестового сообщения
 */
export async function sendTestMessage(): Promise<TelegramResult> {
  const testMessage = `🧪 *Тестовое сообщение*\n\nЕсли вы видите это сообщение, значит Telegram интеграция работает\\!\n\n🕐 ${escapeMarkdown(new Date().toLocaleString("ru-RU"))}`;
  return sendMessage(testMessage);
}
