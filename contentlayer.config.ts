import { defineDocumentType, makeSource } from "contentlayer2/source-files";

/**
 * Вычисление времени чтения
 * ~200 слов в минуту для русского текста
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
}

/**
 * Тип документа: Blog (Статья блога)
 */
export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
      description: "Заголовок статьи",
    },
    description: {
      type: "string",
      required: true,
      description: "Краткое описание для превью и SEO",
    },
    date: {
      type: "date",
      required: true,
      description: "Дата публикации",
    },
    image: {
      type: "string",
      required: false,
      description: "Путь к изображению превью",
    },
    category: {
      type: "enum",
      options: ["development", "design", "marketing", "business"],
      required: true,
      description: "Категория статьи",
    },
    author: {
      type: "string",
      required: false,
      default: "WebStudio",
      description: "Автор статьи",
    },
    published: {
      type: "boolean",
      required: false,
      default: true,
      description: "Опубликована ли статья",
    },
    featured: {
      type: "boolean",
      required: false,
      default: false,
      description: "Показывать в избранных",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("blog/", ""),
    },
    readingTime: {
      type: "number",
      resolve: (doc) => calculateReadingTime(doc.body.raw),
    },
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace("blog/", "")}`,
    },
  },
}));

/**
 * Тип документа: Case (Кейс портфолио)
 */
export const Case = defineDocumentType(() => ({
  name: "Case",
  filePathPattern: "cases/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
      description: "Название проекта",
    },
    description: {
      type: "string",
      required: true,
      description: "Краткое описание проекта",
    },
    client: {
      type: "string",
      required: true,
      description: "Имя клиента или компания",
    },
    type: {
      type: "enum",
      options: ["expert", "ecommerce", "landing", "corporate", "portfolio"],
      required: true,
      description: "Тип сайта",
    },
    year: {
      type: "number",
      required: true,
      description: "Год реализации",
    },
    duration: {
      type: "string",
      required: false,
      description: "Срок реализации (например, '3 недели')",
    },
    image: {
      type: "string",
      required: false,
      description: "Главное изображение кейса",
    },
    gallery: {
      type: "list",
      of: { type: "string" },
      required: false,
      description: "Галерея изображений",
    },
    results: {
      type: "list",
      of: { type: "json" },
      required: false,
      description: "Результаты проекта (метрики)",
    },
    task: {
      type: "string",
      required: false,
      description: "Описание задачи клиента",
    },
    solution: {
      type: "list",
      of: { type: "string" },
      required: false,
      description: "Список решений",
    },
    technologies: {
      type: "list",
      of: { type: "string" },
      required: false,
      description: "Использованные технологии",
    },
    url: {
      type: "string",
      required: false,
      description: "Ссылка на готовый сайт",
    },
    published: {
      type: "boolean",
      required: false,
      default: true,
      description: "Опубликован ли кейс",
    },
    featured: {
      type: "boolean",
      required: false,
      default: false,
      description: "Показывать в избранных",
    },
    order: {
      type: "number",
      required: false,
      default: 0,
      description: "Порядок сортировки",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("cases/", ""),
    },
    readingTime: {
      type: "number",
      resolve: (doc) => calculateReadingTime(doc.body.raw),
    },
    caseUrl: {
      type: "string",
      resolve: (doc) => `/cases/${doc._raw.flattenedPath.replace("cases/", "")}`,
    },
  },
}));

/**
 * Конфигурация Contentlayer
 */
export default makeSource({
  contentDirPath: "content",
  documentTypes: [Blog, Case],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
