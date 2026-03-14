/**
 * Email — модуль для отправки email уведомлений
 *
 * Использует Resend API (HTTP) для отправки писем о новых заявках.
 * Совместим с Vercel serverless.
 */

import { Resend } from "resend";

/**
 * Email адрес для получения уведомлений
 */
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "leads@nakoagency.com";

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
          ${typeName}
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
              <span style="color: #1a1a1a; font-size: 16px;">${escapeHtml(data.name)}</span>
            </td>
          </tr>
          ` : ""}
          ${data.phone ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Телефон:</strong><br>
              <a href="tel:${escapeHtml(data.phone)}" style="color: #1a1a1a; font-size: 16px; text-decoration: none;">${escapeHtml(data.phone)}</a>
            </td>
          </tr>
          ` : ""}
          ${data.email ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Email:</strong><br>
              <a href="mailto:${escapeHtml(data.email)}" style="color: #1a1a1a; font-size: 16px; text-decoration: none;">${escapeHtml(data.email)}</a>
            </td>
          </tr>
          ` : ""}
          ${data.message ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Сообщение:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px; white-space: pre-wrap;">${escapeHtml(data.message)}</span>
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Источник:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${escapeHtml(data.source)} (${escapeHtml(data.sourcePage)})</span>
            </td>
          </tr>
          ${data.utm_source ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">UTM:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${[data.utm_source, data.utm_medium, data.utm_campaign].filter((v): v is string => Boolean(v)).map(escapeHtml).join(" / ")}</span>
              ${data.utm_term ? `<br><span style="color: #999999; font-size: 14px;">Keyword: ${escapeHtml(data.utm_term)}</span>` : ""}
              ${data.utm_content ? `<br><span style="color: #999999; font-size: 14px;">Content: ${escapeHtml(data.utm_content)}</span>` : ""}
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
          NAKO Agency
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
          Новый бриф
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
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
              <span style="color: #1a1a1a; margin-left: 10px;">${escapeHtml(data.name || "—")}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Телефон:</strong>
              <a href="tel:${escapeHtml(data.phone || "")}" style="color: #1a1a1a; margin-left: 10px;">${escapeHtml(data.phone || "—")}</a>
            </td>
          </tr>
          ${data.telegram ? `
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Telegram:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${escapeHtml(data.telegram)}</span>
            </td>
          </tr>
          ` : ""}
        </table>

        ${data.comment ? `
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          Комментарий
        </h2>
        <p style="color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.comment)}</p>
        ` : ""}

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 5px 0;">
              <span style="color: #999999; font-size: 12px;">Источник: ${escapeHtml(data.source)} (${escapeHtml(data.sourcePage)})</span>
            </td>
          </tr>
          ${data.utm_source ? `
          <tr>
            <td style="padding: 5px 0;">
              <span style="color: #999999; font-size: 12px;">UTM: ${[data.utm_source, data.utm_medium, data.utm_campaign].filter((v): v is string => Boolean(v)).map(escapeHtml).join(" / ")}</span>
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
          NAKO Agency
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

  if (data.type === "brief" && data.comment) {
    text += `\nКомментарий:\n${data.comment}\n`;
  }

  text += `\n${"-".repeat(40)}\n`;
  text += `Источник: ${data.source} (${data.sourcePage})\n`;
  if (data.utm_source) {
    text += `UTM: ${[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ")}\n`;
    if (data.utm_term) text += `Keyword: ${data.utm_term}\n`;
  }
  text += `Время: ${new Date(data.timestamp).toLocaleString("ru-RU")}\n`;

  return text;
}

/**
 * Экранирование HTML для предотвращения XSS
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Отправка email уведомления о новой заявке
 */
export async function sendLeadNotification(data: LeadEmailData): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY not configured, skipping email");
    return {
      success: false,
      error: "Email service not configured",
    };
  }

  const resend = new Resend(apiKey);

  const typeName = getLeadTypeName(data.type);
  const subject = `[NAKO] ${typeName}: ${data.name || data.phone || data.email || "Новая заявка"}`;

  const html = data.type === "brief"
    ? generateBriefEmail(data)
    : generateQuickLeadEmail(data);

  const text = generatePlainTextEmail(data);

  try {
    const result = await resend.emails.send({
      from: "NAKO Agency <hello@nakoagency.com>",
      to: [NOTIFICATION_EMAIL],
      subject,
      html,
      text,
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    console.log(`✉️ Email sent via Resend: ${result.data?.id}`);

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Failed to send email via Resend:", errorMessage);

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
  return !!process.env.RESEND_API_KEY;
}
