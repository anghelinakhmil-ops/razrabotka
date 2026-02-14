/**
 * Email — модуль для отправки email уведомлений
 *
 * Использует Fastmail JMAP API (HTTP) для отправки писем о новых заявках.
 * JMAP работает через HTTPS (порт 443) — совместим с Vercel serverless.
 */

const JMAP_SESSION_URL = "https://api.fastmail.com/.well-known/jmap";

/**
 * Email адрес для получения уведомлений
 */
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "leads@nakoagency.com";

/**
 * Кэш JMAP сессии (accountId + apiUrl)
 */
let cachedSession: { apiUrl: string; accountId: string } | null = null;

/**
 * Получить JMAP сессию (accountId и apiUrl) от Fastmail
 */
async function getJmapSession(): Promise<{ apiUrl: string; accountId: string }> {
  if (cachedSession) return cachedSession;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) throw new Error("Fastmail credentials not configured");

  const auth = Buffer.from(`${user}:${pass}`).toString("base64");

  const res = await fetch(JMAP_SESSION_URL, {
    headers: { Authorization: `Basic ${auth}` },
  });

  if (!res.ok) {
    throw new Error(`JMAP session failed: ${res.status} ${res.statusText}`);
  }

  const session = await res.json();
  const accountId = session.primaryAccounts?.["urn:ietf:params:jmap:mail"];

  if (!accountId) {
    throw new Error("JMAP: no mail account found");
  }

  cachedSession = { apiUrl: session.apiUrl, accountId };
  return cachedSession;
}

/**
 * Отправить email через Fastmail JMAP API
 */
async function sendViaJmap(options: {
  from: string;
  fromName: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ messageId: string }> {
  const { apiUrl, accountId } = await getJmapSession();

  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const auth = Buffer.from(`${user}:${pass}`).toString("base64");

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      using: [
        "urn:ietf:params:jmap:core",
        "urn:ietf:params:jmap:mail",
        "urn:ietf:params:jmap:submission",
      ],
      methodCalls: [
        [
          "Email/set",
          {
            accountId,
            create: {
              draft: {
                from: [{ email: options.from, name: options.fromName }],
                to: [{ email: options.to }],
                subject: options.subject,
                htmlBody: [{ partId: "html", type: "text/html" }],
                textBody: [{ partId: "text", type: "text/plain" }],
                bodyValues: {
                  html: { value: options.html },
                  text: { value: options.text },
                },
              },
            },
          },
          "0",
        ],
        [
          "EmailSubmission/set",
          {
            accountId,
            create: {
              send: {
                emailId: "#draft",
                envelope: {
                  mailFrom: { email: options.from },
                  rcptTo: [{ email: options.to }],
                },
              },
            },
          },
          "1",
        ],
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`JMAP send failed: ${res.status} — ${body}`);
  }

  const result = await res.json();

  // Проверяем ошибки в ответах JMAP
  const emailSetResponse = result.methodResponses?.[0];
  const submissionResponse = result.methodResponses?.[1];

  if (emailSetResponse?.[1]?.notCreated) {
    throw new Error(
      `JMAP Email/set failed: ${JSON.stringify(emailSetResponse[1].notCreated)}`
    );
  }

  if (submissionResponse?.[1]?.notCreated) {
    throw new Error(
      `JMAP EmailSubmission failed: ${JSON.stringify(submissionResponse[1].notCreated)}`
    );
  }

  const emailId = emailSetResponse?.[1]?.created?.draft?.id || "unknown";
  return { messageId: emailId };
}

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
    "600-1000": "€500 – €1 000",
    "1000-2500": "€1 000 – €2 500",
    "2500-5000": "€2 500 – €5 000",
    "5000+": "From €5 000",
    discuss: "Let's discuss",
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
          ${typeName}
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">ID zajavki:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${data.id}</span>
            </td>
          </tr>
          ${data.name ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Imja:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${data.name}</span>
            </td>
          </tr>
          ` : ""}
          ${data.phone ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Telefon:</strong><br>
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
              <strong style="color: #666666;">Soobshhenije:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px; white-space: pre-wrap;">${data.message}</span>
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">Istochnik:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${data.source} (${data.sourcePage})</span>
            </td>
          </tr>
          ${data.utm_source ? `
          <tr>
            <td style="padding: 15px 0; border-bottom: 1px solid #e5e5e5;">
              <strong style="color: #666666;">UTM:</strong><br>
              <span style="color: #1a1a1a; font-size: 16px;">${[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ")}</span>
              ${data.utm_term ? `<br><span style="color: #999999; font-size: 14px;">Keyword: ${data.utm_term}</span>` : ""}
              ${data.utm_content ? `<br><span style="color: #999999; font-size: 14px;">Content: ${data.utm_content}</span>` : ""}
            </td>
          </tr>
          ` : ""}
          <tr>
            <td style="padding: 15px 0;">
              <strong style="color: #666666;">Vremja:</strong><br>
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
  <title>Novyj brif</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="padding: 40px 30px; background-color: #1a1a1a;">
        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
          Novyj brif
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          Kontaktnye dannye
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
              <strong style="color: #666666;">Imja:</strong>
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
              <strong style="color: #666666;">Telefon:</strong>
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

        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          O projekte
        </h2>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Tip sajta:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${getSiteTypeName(data.siteType)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Cel':</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${getGoalName(data.goal)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Sroki:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${getTimelineName(data.timeline)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0;">
              <strong style="color: #666666;">Bjudzhet:</strong>
              <span style="color: #1a1a1a; margin-left: 10px;">${getBudgetName(data.budget)}</span>
            </td>
          </tr>
        </table>

        ${data.references ? `
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          Referensy / Konkurenty
        </h2>
        <p style="color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${data.references}</p>
        ` : ""}

        ${data.comment ? `
        <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 18px; font-weight: 600; border-bottom: 2px solid #1a1a1a; padding-bottom: 10px;">
          Kommentarij
        </h2>
        <p style="color: #1a1a1a; line-height: 1.6; white-space: pre-wrap;">${data.comment}</p>
        ` : ""}

        <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 5px 0;">
              <span style="color: #999999; font-size: 12px;">Istochnik: ${data.source} (${data.sourcePage})</span>
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
              <span style="color: #999999; font-size: 12px;">Vremja: ${new Date(data.timestamp).toLocaleString("ru-RU")}</span>
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
  if (data.name) text += `Imja: ${data.name}\n`;
  if (data.phone) text += `Telefon: ${data.phone}\n`;
  if (data.email) text += `Email: ${data.email}\n`;
  if (data.message) text += `\nSoobshhenije:\n${data.message}\n`;
  if (data.telegram) text += `Telegram: ${data.telegram}\n`;

  if (data.type === "brief") {
    text += `\nO projekte:\n${"-".repeat(20)}\n`;
    text += `Tip sajta: ${getSiteTypeName(data.siteType)}\n`;
    text += `Cel': ${getGoalName(data.goal)}\n`;
    text += `Sroki: ${getTimelineName(data.timeline)}\n`;
    text += `Bjudzhet: ${getBudgetName(data.budget)}\n`;

    if (data.references) {
      text += `\nReferensy:\n${data.references}\n`;
    }
    if (data.comment) {
      text += `\nKommentarij:\n${data.comment}\n`;
    }
  }

  text += `\n${"-".repeat(40)}\n`;
  text += `Istochnik: ${data.source} (${data.sourcePage})\n`;
  if (data.utm_source) {
    text += `UTM: ${[data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ")}\n`;
    if (data.utm_term) text += `Keyword: ${data.utm_term}\n`;
  }
  text += `Vremja: ${new Date(data.timestamp).toLocaleString("ru-RU")}\n`;

  return text;
}

/**
 * Отправка email уведомления о новой заявке
 */
export async function sendLeadNotification(data: LeadEmailData): Promise<EmailResult> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn("⚠️ Fastmail credentials not configured, skipping email");
    return {
      success: false,
      error: "Email service not configured",
    };
  }

  const typeName = getLeadTypeName(data.type);
  const subject = `[NAKO Agency] ${typeName}: ${data.name || data.phone || data.email || "Novaja zajavka"}`;

  const html = data.type === "brief"
    ? generateBriefEmail(data)
    : generateQuickLeadEmail(data);

  const text = generatePlainTextEmail(data);

  // Парсим FROM_EMAIL: "NAKO Agency <hello@nakoagency.com>" -> name + email
  const fromRaw = process.env.FROM_EMAIL || "NAKO Agency <hello@nakoagency.com>";
  const fromMatch = fromRaw.match(/^(.+?)\s*<(.+?)>$/);
  const fromName = fromMatch ? fromMatch[1].trim() : "NAKO Agency";
  const fromEmail = fromMatch ? fromMatch[2].trim() : user;

  try {
    const result = await sendViaJmap({
      from: fromEmail,
      fromName,
      to: NOTIFICATION_EMAIL,
      subject,
      html,
      text,
    });

    console.log(`✉️ Email sent via JMAP: ${result.messageId}`);

    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Failed to send email via JMAP:", errorMessage);

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
  return !!(process.env.SMTP_USER && process.env.SMTP_PASS);
}
