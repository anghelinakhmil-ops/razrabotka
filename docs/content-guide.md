# Гайд по управлению контентом

Руководство по добавлению и редактированию контента на сайте WebStudio.

---

## Блог — добавление статьи

### 1. Создать MDX файл

Создайте файл в `content/blog/` с расширением `.mdx`:

```
content/blog/my-new-article.mdx
```

### 2. Заполнить frontmatter

В начале файла добавьте метаданные:

```mdx
---
title: "Заголовок статьи"
description: "Краткое описание до 160 символов (для SEO)"
date: "2026-02-06"
category: "development"
author: "WebStudio"
published: true
featured: false
readingTime: "5 мин"
---

Текст статьи в формате Markdown...
```

**Поля frontmatter:**

| Поле | Тип | Обязательное | Описание |
|------|-----|:------------:|----------|
| `title` | string | Да | Заголовок статьи |
| `description` | string | Да | Описание для SEO (до 160 символов) |
| `date` | string | Да | Дата публикации (`YYYY-MM-DD`) |
| `category` | string | Да | Категория: `development`, `design`, `marketing`, `business` |
| `author` | string | Да | Автор статьи |
| `published` | boolean | Да | `true` — опубликована, `false` — черновик |
| `featured` | boolean | Нет | `true` — показывать в избранных |
| `readingTime` | string | Нет | Время чтения (например: `"5 мин"`) |

### 3. Написать контент

Используйте стандартный Markdown:

```mdx
## Подзаголовок

Текст параграфа с **жирным** и *курсивом*.

### Подподзаголовок

- Элемент списка
- Ещё элемент

> Цитата

![Alt текст](/images/blog/my-image.jpg)

[Текст ссылки](https://example.com)
```

### 4. Добавить slug в sitemap

Откройте `app/sitemap.ts` и добавьте slug в массив `blogSlugs`:

```typescript
const blogSlugs = [
  "why-nextjs-for-business",
  // ... существующие
  "my-new-article",  // <-- добавить
];
```

### 5. Проверить

```bash
npm run dev
# Открыть http://localhost:3000/blog/my-new-article
```

---

## Кейсы — добавление кейса

### 1. Создать MDX файл

```
content/cases/my-new-case.mdx
```

### 2. Заполнить frontmatter

```mdx
---
title: "Название проекта"
description: "Краткое описание проекта"
client: "Название клиента"
type: "expert"
year: "2026"
duration: "4 недели"
image: "/images/cases/my-case/cover.jpg"
gallery:
  - "/images/cases/my-case/screen-1.jpg"
  - "/images/cases/my-case/screen-2.jpg"
results:
  - "Конверсия выросла на 40%"
  - "Время загрузки < 2 сек"
task: "Описание задачи клиента"
solution:
  - "Разработали дизайн в стиле premium-minimal"
  - "Реализовали на Next.js"
technologies:
  - "Next.js"
  - "TypeScript"
  - "Tailwind CSS"
url: "https://example.com"
published: true
featured: false
order: 10
readingTime: "3 мин"
---

Детальное описание проекта...
```

**Поля frontmatter:**

| Поле | Тип | Обязательное | Описание |
|------|-----|:------------:|----------|
| `title` | string | Да | Название проекта |
| `description` | string | Да | Краткое описание |
| `client` | string | Да | Имя клиента |
| `type` | string | Да | Тип: `expert`, `ecommerce`, `landing`, `corporate`, `portfolio` |
| `year` | string | Да | Год выполнения |
| `duration` | string | Нет | Сроки (например: `"4 недели"`) |
| `image` | string | Да | Путь к обложке |
| `gallery` | string[] | Нет | Массив путей к скриншотам |
| `results` | string[] | Нет | Результаты проекта |
| `task` | string | Нет | Описание задачи |
| `solution` | string[] | Нет | Как решали задачу |
| `technologies` | string[] | Нет | Использованные технологии |
| `url` | string | Нет | Ссылка на сайт |
| `published` | boolean | Да | `true` — опубликован |
| `featured` | boolean | Нет | Показывать в избранных |
| `order` | number | Нет | Порядок сортировки (меньше = раньше) |

### 3. Добавить slug в sitemap

В `app/sitemap.ts` добавьте slug в `caseSlugs`:

```typescript
const caseSlugs = [
  "expert-coach",
  // ... существующие
  "my-new-case",  // <-- добавить
];
```

---

## FAQ — обновление вопросов

FAQ расположен в компоненте `components/sections/FAQ.tsx`.

### Найти массив вопросов

Откройте файл и найдите массив `FAQ_ITEMS`:

```typescript
const FAQ_ITEMS = [
  {
    question: "Сколько стоит разработка сайта?",
    answer: "Стоимость зависит от...",
  },
  // ... добавить новый вопрос:
  {
    question: "Новый вопрос?",
    answer: "Ответ на вопрос.",
  },
];
```

---

## Контактная информация

Контактные данные расположены в нескольких местах:

| Что | Где | Файл |
|-----|-----|------|
| Телефон, email | Footer | `components/layout/Footer.tsx` |
| Телефон, email | Mobile Menu | `components/layout/MobileMenu.tsx` |
| Телефон, email, адрес | Страница контактов | `app/contacts/page.tsx` |
| Email отправителя | Env переменная | `.env.local` → `FROM_EMAIL` |
| Email получателя | Env переменная | `.env.local` → `NOTIFICATION_EMAIL` |

### Обновление

1. Откройте соответствующий файл
2. Найдите текущий номер/email (например: `+7 (800) 123-45-67`)
3. Замените на новый
4. Проверьте все файлы из таблицы выше

---

## Формат MDX файлов

MDX — это Markdown с поддержкой JSX-компонентов.

### Поддерживаемые элементы

| Элемент | Синтаксис |
|---------|-----------|
| Заголовки | `## H2`, `### H3`, `#### H4` |
| Жирный | `**текст**` |
| Курсив | `*текст*` |
| Ссылка | `[текст](url)` |
| Изображение | `![alt](/path/to/image.jpg)` |
| Список | `- элемент` или `1. элемент` |
| Цитата | `> текст` |
| Код inline | `` `код` `` |
| Код блок | ```` ```язык ... ``` ```` |
| Разделитель | `---` |

### Кастомные MDX-компоненты

Определены в `components/mdx/MDXComponents.tsx`:

- **Заголовки** (`h1`–`h6`) — стилизованы по дизайн-системе
- **Ссылки** (`a`) — внешние открываются в новой вкладке
- **Изображения** (`img`) — через `next/image` с оптимизацией
- **Код** (`pre`, `code`) — стилизованные блоки кода

### Изображения

Размещайте изображения в `public/images/`:

```
public/images/blog/article-name/cover.jpg
public/images/cases/case-name/cover.jpg
```

Рекомендации:
- Формат: WebP или AVIF
- Обложки: до 200 KB
- Скриншоты: до 150 KB
- Используйте информативный alt-текст
