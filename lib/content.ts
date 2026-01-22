import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

/**
 * Метаданные статьи блога
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category: "development" | "design" | "marketing" | "business";
  author: string;
  published: boolean;
  featured: boolean;
  readingTime: number;
  content: string;
}

/**
 * Метаданные кейса
 */
export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  client: string;
  type: "expert" | "ecommerce" | "landing" | "corporate" | "portfolio";
  year: number;
  duration?: string;
  image?: string;
  gallery?: string[];
  results?: Array<{ label: string; value: string }>;
  task?: string;
  solution?: string[];
  technologies?: string[];
  url?: string;
  published: boolean;
  featured: boolean;
  order: number;
  readingTime: number;
  content: string;
}

/**
 * Вычисление времени чтения (~200 слов/мин для русского)
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Получение всех MDX файлов из директории
 */
function getMdxFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir);
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));
}

/**
 * Парсинг MDX файла
 */
function parseMdxFile<T>(filePath: string): T | null {
  try {
    const fullPath = path.join(contentDirectory, filePath);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const slug = path.basename(filePath, path.extname(filePath));
    const readingTime = calculateReadingTime(content);

    return {
      ...data,
      slug,
      readingTime,
      content,
    } as T;
  } catch {
    return null;
  }
}

/**
 * Получение всех статей блога
 */
export function getAllBlogPosts(): BlogPost[] {
  const files = getMdxFiles("blog");

  const posts = files
    .map((file) => parseMdxFile<BlogPost>(`blog/${file}`))
    .filter((post): post is BlogPost => post !== null && post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

/**
 * Получение статьи по slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const filePath = `blog/${slug}.mdx`;
  const post = parseMdxFile<BlogPost>(filePath);

  if (!post || post.published === false) {
    // Попробуем .md
    const mdPath = `blog/${slug}.md`;
    return parseMdxFile<BlogPost>(mdPath);
  }

  return post;
}

/**
 * Получение всех slug для статей (для generateStaticParams)
 */
export function getAllBlogSlugs(): string[] {
  const files = getMdxFiles("blog");
  return files.map((file) => path.basename(file, path.extname(file)));
}

/**
 * Получение всех кейсов
 */
export function getAllCases(): CaseStudy[] {
  const files = getMdxFiles("cases");

  const cases = files
    .map((file) => parseMdxFile<CaseStudy>(`cases/${file}`))
    .filter((c): c is CaseStudy => c !== null && c.published !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return cases;
}

/**
 * Получение кейса по slug
 */
export function getCaseBySlug(slug: string): CaseStudy | null {
  const filePath = `cases/${slug}.mdx`;
  const caseStudy = parseMdxFile<CaseStudy>(filePath);

  if (!caseStudy || caseStudy.published === false) {
    const mdPath = `cases/${slug}.md`;
    return parseMdxFile<CaseStudy>(mdPath);
  }

  return caseStudy;
}

/**
 * Получение всех slug для кейсов (для generateStaticParams)
 */
export function getAllCaseSlugs(): string[] {
  const files = getMdxFiles("cases");
  return files.map((file) => path.basename(file, path.extname(file)));
}

/**
 * Получение статей по категории
 */
export function getBlogPostsByCategory(
  category: BlogPost["category"]
): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category);
}

/**
 * Получение кейсов по типу
 */
export function getCasesByType(type: CaseStudy["type"]): CaseStudy[] {
  return getAllCases().filter((c) => c.type === type);
}

/**
 * Получение избранных статей
 */
export function getFeaturedBlogPosts(limit = 3): BlogPost[] {
  return getAllBlogPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

/**
 * Получение избранных кейсов
 */
export function getFeaturedCases(limit = 6): CaseStudy[] {
  return getAllCases()
    .filter((c) => c.featured)
    .slice(0, limit);
}
