# Гайд для разработчика

Техническая документация проекта NAKO Agency.

---

## Архитектура

### Стек

- **Next.js 16** (App Router) — SSR/SSG, file-based routing
- **TypeScript 5** — strict mode
- **Tailwind CSS 4** — `@theme inline` для дизайн-токенов
- **Framer Motion** — анимации и переходы

### Рендеринг

| Страница | Тип | Описание |
|----------|-----|----------|
| `/`, `/about`, `/services`... | Static (SSG) | Статические страницы |
| `/cases/[slug]`, `/blog/[slug]` | SSG + `generateStaticParams` | Генерируются при билде |
| `/api/lead` | Dynamic (Server) | API Route |
| `/opengraph-image`, `/twitter-image` | Dynamic (Server) | Генерируются по запросу |

### Дизайн-токены

Все токены определены в `app/globals.css` как CSS Custom Properties:

```css
:root {
  --color-background: #FFFFFF;
  --color-text-primary: #1A1A1A;
  --color-accent: #1A1A1A;
  --spacing-md: 16px;
  --section-gap: 120px;
  /* ... */
}
```

Интегрированы в Tailwind через `@theme inline` блок. Используются как `var(--color-text-primary)` в inline стилях Tailwind.

---

## Компоненты

### UI Kit (`components/ui/`)

25 компонентов. Все экспортируются через `components/ui/index.ts`.

#### Button

```tsx
import { Button } from "@/components/ui";

<Button variant="primary" size="lg">Текст</Button>
<Button variant="outline" size="md">Текст</Button>
<Button variant="ghost" size="sm">Текст</Button>
<Button as="a" href="/cases">Ссылка</Button>
<Button loading>Загрузка...</Button>
<Button fullWidth>На всю ширину</Button>
```

**Props:**
- `variant`: `"primary"` | `"outline"` | `"ghost"` (default: `"primary"`)
- `size`: `"sm"` | `"md"` | `"lg"` (default: `"md"`)
- `as`: `"button"` | `"a"` — рендерит как кнопку или ссылку
- `href`: string — URL (только с `as="a"`)
- `loading`: boolean — состояние загрузки
- `fullWidth`: boolean — ширина 100%
- `disabled`: boolean

#### Input

```tsx
import { Input } from "@/components/ui";

<Input
  label="Имя"
  placeholder="Введите имя"
  error="Обязательное поле"
  helperText="Минимум 2 символа"
/>
```

#### Modal

```tsx
import { Modal } from "@/components/ui";

<Modal isOpen={isOpen} onClose={onClose} title="Заголовок">
  <p>Контент модала</p>
</Modal>
```

Включает: overlay, escape для закрытия, focus trap, блокировка скролла body.

#### Accordion

```tsx
import { Accordion } from "@/components/ui";

<Accordion
  items={[
    { question: "Вопрос?", answer: "Ответ" },
  ]}
/>
```

### Layout (`components/layout/`)

| Компонент | Описание |
|-----------|----------|
| `Header` | Навигация, логотип, CTA кнопка, бургер-меню |
| `Footer` | Навигация, контакты, соцсети, копирайт |
| `MobileMenu` | Fullscreen меню (slide-in, escape, focus trap) |
| `Preloader` | Fullscreen прелоадер (0%–100%) |
| `LayoutClient` | Client wrapper (Preloader + CallbackModal + children) |
| `CookieConsent` | Cookie-баннер (accept/decline, localStorage) |

### Секции (`components/sections/`)

| Компонент | Описание |
|-----------|----------|
| `Hero` | Заголовок + CTA + статистика |
| `HeroVisual` | Визуальная часть hero |
| `Benefits` | 6 преимуществ с нумерацией |
| `Metrics` | Метрики/статистика |
| `Services` | 3 пакета услуг с ценами |
| `Process` | 5 шагов процесса |
| `Testimonials` | Отзывы клиентов |
| `CasesPreview` | Превью кейсов |
| `FAQ` | Аккордеон вопросов |
| `LeadFormSection` | Секция с формой заявки |

---

## Motion система

### Файл: `lib/motion.ts`

Все анимации строятся на единой системе токенов:

```typescript
import { motionConfig, variants } from "@/lib/motion";

// Токены
motionConfig.duration.fast    // 0.3s
motionConfig.duration.normal  // 0.6s
motionConfig.duration.slow    // 0.9s
motionConfig.ease             // [0.2, 0.8, 0.2, 1]
motionConfig.stagger.normal   // 0.12s

// Готовые варианты
variants.fadeUp      // opacity 0→1, y 20→0
variants.fadeIn      // opacity 0→1
variants.slideLeft   // opacity 0→1, x 20→0
variants.scale       // opacity 0→1, scale 0.95→1
```

### Компоненты анимации

#### RevealOnScroll

Анимация при появлении в viewport:

```tsx
import { RevealOnScroll } from "@/components/motion";

<RevealOnScroll direction="up" delay={0.2}>
  <h2>Заголовок</h2>
</RevealOnScroll>
```

**Props:**
- `direction`: `"up"` | `"down"` | `"left"` | `"right"` | `"none"` (default: `"up"`)
- `delay`: number — задержка в секундах
- `duration`: number — длительность
- `once`: boolean — анимировать один раз (default: `true`)

#### StaggerChildren

Последовательная анимация дочерних элементов:

```tsx
import { StaggerChildren, StaggerItem } from "@/components/motion";

<StaggerChildren stagger={0.08}>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
  <StaggerItem><Card /></StaggerItem>
</StaggerChildren>
```

### Правила

1. Всегда использовать `motionConfig.ease` — никогда не хардкодить bezier
2. `prefers-reduced-motion` уважается через CSS (`globals.css`)
3. Анимации используют только `transform` и `opacity` (без CLS)

---

## Формы и валидация

### Три типа форм

| Форма | Файл | Назначение |
|-------|------|------------|
| `QuickLeadForm` | `components/forms/QuickLeadForm.tsx` | Быстрая заявка (имя, телефон, email) |
| `CallbackModal` | `components/forms/CallbackModal.tsx` | Заказ звонка (имя, телефон) |
| `BriefForm` | `components/forms/BriefForm.tsx` | Расширенный бриф (10+ полей) |

### Стек валидации

```
React Hook Form (UI state) → Zod schemas (client) → Zod schemas (server API)
```

### Zod-схемы (`lib/validation.ts`)

```typescript
import { quickLeadSchema, briefFormSchema, callbackFormSchema } from "@/lib/validation";

// Типы выводятся автоматически
type QuickLeadFormData = z.infer<typeof quickLeadSchema>;
type BriefFormData = z.infer<typeof briefFormSchema>;
type CallbackFormData = z.infer<typeof callbackFormSchema>;
```

### Поток отправки

1. Пользователь заполняет форму
2. React Hook Form валидирует через Zod (client)
3. `fetch("/api/lead", { method: "POST", body })` — отправка
4. API Route валидирует повторно (server)
5. Параллельно: сохранение в файл + email (Resend) + Telegram
6. Ответ клиенту → success/error state

### Варианты QuickLeadForm

```tsx
<QuickLeadForm variant="default" />   // Полная форма
<QuickLeadForm variant="compact" />   // Компактная (без имени)
<QuickLeadForm variant="inline" />    // Inline (одна строка)
```

---

## API Routes

### POST `/api/lead`

Единый endpoint для всех форм.

**Request:**

```typescript
// Тип определяется полем "type"
{
  type: "quick" | "callback" | "brief",
  source?: string,     // Источник формы
  sourcePage?: string,  // URL страницы
  // + поля формы (зависят от type)
}
```

**Response:**

```json
{
  "success": true,
  "message": "Заявка принята",
  "leadId": "lead_1706000000000_abc123"
}
```

**Ошибки:**

```json
{
  "success": false,
  "message": "Ошибка валидации",
  "errors": [
    { "field": "phone", "message": "Укажите корректный номер телефона" }
  ]
}
```

**Интеграции (параллельно):**
- `lib/leads.ts` — логирование в `/data/leads.json` (dev)
- `lib/email.ts` — Resend API → `NOTIFICATION_EMAIL`
- `lib/telegram.ts` — Bot API → `TELEGRAM_CHAT_ID`

---

## Environment Variables

| Переменная | Где используется | Тип |
|------------|------------------|-----|
| `RESEND_API_KEY` | `lib/email.ts` | Server-only |
| `NOTIFICATION_EMAIL` | `lib/email.ts` | Server-only |
| `FROM_EMAIL` | `lib/email.ts` | Server-only |
| `TELEGRAM_BOT_TOKEN` | `lib/telegram.ts` | Server-only |
| `TELEGRAM_CHAT_ID` | `lib/telegram.ts` | Server-only |
| `LOG_LEADS_TO_FILE` | `lib/leads.ts` | Server-only |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `components/analytics/GoogleAnalytics.tsx`, `lib/analytics.ts` | Public (client) |

Переменные с префиксом `NEXT_PUBLIC_` доступны на клиенте. Остальные — только на сервере.

Файл `.env.example` содержит шаблон с описаниями. Скопируйте в `.env.local`:

```bash
cp .env.example .env.local
```

---

## SEO

### Metadata

Каждая страница экспортирует объект `metadata`:

```typescript
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заголовок | NAKO Agency",
  description: "Описание до 160 символов",
  openGraph: {
    title: "OG Заголовок",
    description: "OG Описание",
  },
};
```

`metadataBase` задан в `app/layout.tsx`.

### Schema.org (`lib/schema.ts`)

Генераторы структурированных данных:

```typescript
import { organizationSchema, articleSchema, faqSchema } from "@/lib/schema";
```

### Генерируемые файлы

- `robots.txt` — `app/robots.ts` (allow `/`, disallow `/api/`)
- `sitemap.xml` — `app/sitemap.ts` (26 URL: статические + кейсы + блог)
- OG images — `app/opengraph-image.tsx` (динамическая генерация)

---

## Аналитика (`lib/analytics.ts`)

### GA4 события

```typescript
import { trackCtaClick, trackFormSubmit } from "@/lib/analytics";

trackCtaClick("hero", "Обсудить проект", "/");
trackFormSubmit("quick_lead");
```

| Событие | Функция | Когда |
|---------|---------|-------|
| `cta_click` | `trackCtaClick(location, text, page)` | Клик по CTA |
| `form_start` | `trackFormStart(formName)` | Фокус на поле формы |
| `form_submit` | `trackFormSubmit(formName)` | Успешная отправка |
| `form_error` | `trackFormError(formName, error)` | Ошибка отправки |
| `case_view` | `trackCaseView(slug)` | Просмотр кейса |
| `blog_read` | `trackBlogRead(slug)` | Чтение статьи |

### Cookie Consent

GA4 загружается только если пользователь принял cookies. Статус хранится в `localStorage` (ключ: `cookie_consent`, значения: `accepted` / `declined`).

### Vercel Analytics

`@vercel/analytics` подключён в `app/layout.tsx` — Web Vitals отправляются автоматически.
