/**
 * Leads — модуль для работы с заявками
 *
 * Функции для логирования и сохранения заявок в файл.
 * Используется для development и в качестве fallback.
 */

import { promises as fs } from "fs";
import path from "path";

/**
 * Путь к файлу с заявками
 */
const LEADS_FILE_PATH = path.join(process.cwd(), "data", "leads.json");

/**
 * Интерфейс записи заявки
 */
export interface LeadRecord {
  id: string;
  type: "quick" | "brief" | "callback";
  source: string;
  sourcePage: string;
  timestamp: string;
  receivedAt: string;
  data: Record<string, unknown>;
}

/**
 * Интерфейс файла с заявками
 */
interface LeadsFile {
  leads: LeadRecord[];
  lastUpdated: string;
}

/**
 * Убедиться, что директория data существует
 */
async function ensureDataDirectory(): Promise<void> {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

/**
 * Прочитать файл с заявками
 */
async function readLeadsFile(): Promise<LeadsFile> {
  try {
    const content = await fs.readFile(LEADS_FILE_PATH, "utf-8");
    return JSON.parse(content) as LeadsFile;
  } catch {
    // Файл не существует или пустой — возвращаем пустую структуру
    return {
      leads: [],
      lastUpdated: new Date().toISOString(),
    };
  }
}

/**
 * Записать файл с заявками
 */
async function writeLeadsFile(data: LeadsFile): Promise<void> {
  await ensureDataDirectory();
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(LEADS_FILE_PATH, content, "utf-8");
}

/**
 * Логирование заявки
 *
 * Сохраняет заявку в JSON файл и выводит в консоль.
 *
 * @param leadId - Уникальный ID заявки
 * @param type - Тип заявки (quick, brief, callback)
 * @param source - Источник формы (для аналитики)
 * @param data - Данные заявки
 * @param sourcePage - Страница, с которой отправлена заявка
 */
export async function logLead(
  leadId: string,
  type: "quick" | "brief" | "callback",
  source: string,
  data: Record<string, unknown>,
  sourcePage?: string
): Promise<void> {
  const now = new Date();
  const receivedAt = now.toISOString();

  // Формируем запись
  const record: LeadRecord = {
    id: leadId,
    type,
    source: source || "unknown",
    sourcePage: sourcePage || "unknown",
    timestamp: (data.timestamp as string) || receivedAt,
    receivedAt,
    data,
  };

  // Логируем в консоль
  console.log("📩 New lead received:");
  console.log(`   ID: ${record.id}`);
  console.log(`   Type: ${record.type}`);
  console.log(`   Source: ${record.source}`);
  console.log(`   Page: ${record.sourcePage}`);
  console.log(`   Time: ${record.receivedAt}`);
  console.log(`   Data:`, JSON.stringify(record.data, null, 2));

  // Сохраняем в файл ТОЛЬКО в development (GDPR/152-FZ: на production ПД не хранятся)
  if (process.env.NODE_ENV === "development") {
    try {
      const leadsFile = await readLeadsFile();
      leadsFile.leads.push(record);
      leadsFile.lastUpdated = receivedAt;
      await writeLeadsFile(leadsFile);
      console.log(`   ✅ Saved to file: ${LEADS_FILE_PATH}`);
    } catch (error) {
      console.error("   ⚠️ Failed to save lead to file:", error);
    }
  }
}

/**
 * Получить все заявки из файла
 */
export async function getAllLeads(): Promise<LeadRecord[]> {
  const leadsFile = await readLeadsFile();
  return leadsFile.leads;
}

/**
 * Получить заявки по типу
 */
export async function getLeadsByType(
  type: "quick" | "brief" | "callback"
): Promise<LeadRecord[]> {
  const leadsFile = await readLeadsFile();
  return leadsFile.leads.filter((lead) => lead.type === type);
}

/**
 * Получить заявки за период
 */
export async function getLeadsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<LeadRecord[]> {
  const leadsFile = await readLeadsFile();
  return leadsFile.leads.filter((lead) => {
    const leadDate = new Date(lead.receivedAt);
    return leadDate >= startDate && leadDate <= endDate;
  });
}

/**
 * Получить статистику по заявкам
 */
export async function getLeadsStats(): Promise<{
  total: number;
  byType: Record<string, number>;
  lastLead: LeadRecord | null;
}> {
  const leadsFile = await readLeadsFile();
  const leads = leadsFile.leads;

  const byType: Record<string, number> = {
    quick: 0,
    brief: 0,
    callback: 0,
  };

  leads.forEach((lead) => {
    byType[lead.type] = (byType[lead.type] || 0) + 1;
  });

  return {
    total: leads.length,
    byType,
    lastLead: leads.length > 0 ? leads[leads.length - 1] : null,
  };
}
