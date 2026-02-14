/**
 * Email — модуль для отправки email уведомлений
 *
 * Использует Fastmail SMTP (nodemailer) для отправки писем о новых заявках.
 */

import nodemailer from "nodemailer";

/**
 * Инициализация SMTP транспорта (Fastmail)
 */
const transporter =
  process.env.SMTP_HOST && process.env.SMTP_PASS
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : null;

/**
 * Email адрес для получения уведомлений
 */
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "leads@nakoagency.com";

/**
 * Email адрес отправителя
 */
const FROM_EMAIL = process.env.FROM_EMAIL || "NAKO Agency <hello@nakoagency.com>";

/**
 * Типы заявок для email
 */
type LeadType = "quick" | "brief" | "callback";

/**
 * Данные заявки для email
 */
interface LeadEmailData {
  id: string;
  type: LeadType;
  source: string;
  sourcePage: string;
  timestamp: string;
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
  // Brief specific
  siteType?: string;
  goal?: string;
  timeline?: string;
  budget?: string;
  references?: string;
  telegram?: string;
  comment?: string;
  // UTM
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Результат отправки email
 */
interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Получить название типа заявки на русском
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
    expert: "Сайт для эксперта / личный бренд",
    ecommerce: "Интернет-магазин",
    landing: "Лендинг / промо-страница",
    corporate: "Корпоративный сайт",
    portfolio: "Портфолио",
    other: "Другое",
  };
  return siteType ? types[siteType] || siteType : "Не указан";
}

/**
 * Получить название цели
 */
function getGoalName(goal?: string): string {
  const goals: Record<string, string> = {
    sales: "Продажи товаров/услуг",
    leads: "Сбор заявок и лидов",
    brand: "Имидж и узнаваемость",
    info: "Информирование аудитории",
    community: "Создание сообщества",
    other: "Другое",
  };
  return goal ? goals[goal] || goal : "Не указана";
}

/**
 * Получить название сроков
 */
function getTimelineName(timeline?: string): string {
  const timelines: Record<string, string> = {
    urgent: "Срочно (до 2 недель)",
    normal: "2–4 недели",
    relaxed: "1–2 месяца",
    flexible: "Не срочно, гибко",
  };
  return timeline ? timelines[timeline] || timeline : "Не указаны";
}

/**
 * Получить название бюджета
 */
function getBudgetName(budget?: string): string {
  const budgets: Record<string, string> = {
    "50-100": "50 000 – 100 000 ₽",
    "100-200": "100 000 – 200 000 ₽",
    "200-500": "200 000 – 500 000 ₽",
    "500+": "От 500 000 ₽",
    discuss: "Обсудим",
  };
  return budget ? budgets[budget] || budget : "Не указан";
}

/**
 * Генерация HTML письма для быстрой заявки / заказа звонка
 */
function generateQuickLeadEmail(data: LeadEmailData): string {
  const typeName = getLeadTypeName(data.type);

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${typeName}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; background-color: #1a1a1a;">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
          📩 ${typeName}
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">ID заявки:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${data.id}</span>
            </td>
          </tr>
          ${data.name ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Имя:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${data.name}</span>
            </td>
          </tr>
          ` : ""}
          ${data.phone ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Телефон:</strong><br>
              <a href="tel:${data.phone}" style="color: #1a1a1a; font-size: 16px; text-decoration: none;">${data.phone}</a>
            </td>
          </tr>
          ` : ""}
          ${data.email ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Email:</strong><br>
              <a href="mailto:${data.email}" style="color: #1a1a1a; font-size: 16px; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          ` : ""}
          ${data.message ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Сообщение:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px; white-space: pre-wrap;">${data.message}</span>
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Источник:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${data.source} (${data.sourcePage})</span>
            </td>
          </tr>
          ${data.utm_source ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Рекламный канал (UTM):</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ")}</span>
              ${data.utm_term ? `<br><span style="color: #999999; font-size: 14px;">Ключевое слово: ${data.utm_term}</span>` : ""}
              ${data.utm_content ? `<br><span style="color: #999999; font-size: 14px;">Контент: ${data.utm_content}</span>` : ""}
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 15px 0;">
              <strong style="color: #666666;">Время:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${new Date(data.timestamp).toLocaleString("ru-RU")}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0; color: #999999; font-size: 12px;">
          NAKO Agency — Разработка сайтов под ключ
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Генерация HTML письма для брифа
 */
function generateBriefEmail(data: LeadEmailData): string {
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Новый бриф</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; background-color: #1a1a1a;">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
          📋 Новый бриф
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <!-- Контактные данные -->
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          Контактные данные
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">ID:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${data.id}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Имя:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${data.name || "—"}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Email:</strong>
              <a href="mailto:${data.email}" style="color: #1a1a1a; margin-left: 10px;">${data.email || "—"}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Телефон:</strong>
              <a href="tel:${data.phone}" style="color: #1a1a1a; margin-left: 10px;">${data.phone || "—"}</a>
            </td>
          </tr>
          ${data.telegram ? `
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Telegram:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${data.telegram}</span>
            </td>
          </tr>
          ` : ""}
        </table>

        <!-- О проекте -->
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          О проекте
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Тип сайта:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${getSiteTypeName(data.siteType)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Цель:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${getGoalName(data.goal)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Сроки:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${getTimelineName(data.timeline)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Бюджет:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${getBudgetName(data.budget)}</span>
            </td>
          </tr>
        </table>

        ${data.references ? `
        <!-- Референсы -->
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          Референсы / Конкуренты
        </h2>
        <p style="color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${data.references}</p>
        ` : ""}

        ${data.comment ? `
        <!-- Комментарий -->
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          Комментарий
        </h2>
        <p style="color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${data.comment}</p>
        ` : ""}

        <!-- Мета -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 5px 0;">
              <span style="color: #999999; font-size: 12px;">Источник: ${data.source} (${data.sourcePage})</span>
            </td>
          </tr>
          ${data.utm_source ? `
          <tr>
            <td style="padding: 5px 0;">
              <span style="color: #999999; font-size: 12px;">UTM: ${[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ")}</span>
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 5px 0;">
              <span style="color: #999999; font-size: 12px;">Время: ${new Date(data.timestamp).toLocaleString("ru-RU")}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 30px; background-color: #f5f5f5; text-align: center;">
        <p style="margin: 0; color: #999999; font-size: 12px;">
          NAKO Agency — Разработка сайтов под ключ
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Генерация текстовой версии письма
 */
function generatePlainTextEmail(data: LeadEmailData): string {
  const typeName = getLeadTypeName(data.type);
  let text = `${typeName}\n${"=".repeat(40)}\n\n`;

  text += `ID: ${data.id}\n`;
  if (data.name) text += `Имя: ${data.name}\n`;
  if (data.phone) text += `Телефон: ${data.phone}\n`;
  if (data.email) text += `Email: ${data.email}\n`;
  if (data.message) text += `\nСообщение:\n${data.message}\n`;
  if (data.telegram) text += `Telegram: ${data.telegram}\n`;

  if (data.type === "brief") {
    text += `\nО проекте:\n${"-".repeat(20)}\n`;
    text += `Тип сайта: ${getSiteTypeName(data.siteType)}\n`;
    text += `Цель: ${getGoalName(data.goal)}\n`;
    text += `Сроки: ${getTimelineName(data.timeline)}\n`;
    text += `Бюджет: ${getBudgetName(data.budget)}\n`;

    if (data.references) {
      text += `\nРеференсы:\n${data.references}\n`;
    }
    if (data.comment) {
      text += `\nКомментарий:\n${data.comment}\n`;
    }
  }

  text += `\n${"-".repeat(40)}\n`;
  text += `Источник: ${data.source} (${data.sourcePage})\n`;
  if (data.utm_source) {
    text += `UTM: ${[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ")}\n`;
    if (data.utm_term) text += `Ключевое слово: ${data.utm_term}\n`;
  }
  text += `Время: ${new Date(data.timestamp).toLocaleString("ru-RU")}\n`;

  return text;
}

/**
 * Отправка email уведомления о новой заявке
 */
export async function sendLeadNotification(data: LeadEmailData): Promise<EmailResult> {
  if (!transporter) {
    console.warn("⚠️ SMTP not configured, skipping email");
    return {
      success: false,
      error: "Email service not configured",
    };
  }

  const typeName = getLeadTypeName(data.type);
  const subject = `[NAKO Agency] ${typeName}: ${data.name || data.phone || data.email || "Новая заявка"}`;

  const html = data.type === "brief"
    ? generateBriefEmail(data)
    : generateQuickLeadEmail(data);

  const text = generatePlainTextEmail(data);

  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: NOTIFICATION_EMAIL,
      subject,
      html,
      text,
    });

    console.log(`✉️ Email sent successfully: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Failed to send email:", errorMessage);

    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Проверка конфигурации email
 */
export function isEmailConfigured(): boolean {
  return !!transporter;
}
