# WebStudio — Разработка сайтов под ключ

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-purple?logo=framer)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

> Premium-minimal веб-студия для экспертов, e-commerce и бизнесов

## О проекте

Коммерческий сайт веб-студии, продающий услугу разработки сайтов под ключ. Визуальный стиль — premium-minimal / architectural, вдохновлённый [THE BRIDGE](https://www.thebridge.kyiv.ua).

### Целевая аудитория

- **Эксперты** — личные бренды, консультации, курсы
- **E-commerce** — интернет-магазины с интеграциями
- **Бизнесы** — лендинги и промо-страницы

### KPI

| Метрика | Цель |
|---------|------|
| Время до понимания оффера | 10–15 сек |
| Core Web Vitals (LCP) | < 2.5 сек |
| Конверсия в заявку | 3–7% |
| Lighthouse Performance | > 90 |

## Технологии

| Категория | Технология | Назначение |
|-----------|------------|------------|
| Framework | Next.js 16 (App Router) | SSR/SSG, SEO, маршрутизация |
| Language | TypeScript 5 | Типобезопасность |
| Styling | Tailwind CSS 4 | Утилитарные классы, `@theme inline` |
| Animation | Framer Motion | Reveal, overlay, preloader |
| Content | MDX + gray-matter | Блог и кейсы без CMS |
| Forms | React Hook Form + Zod | Валидация client/server |
| Email | Resend | Отправка уведомлений о заявках |
| Telegram | Bot API | Мгновенные уведомления |
| Analytics | GA4 + Vercel Analytics | Отслеживание конверсий |
| Deploy | Vercel | Auto-deploy при push |

## Структура проекта

```
├── app/
│   ├── layout.tsx              # Root layout (шрифты, meta, providers)
│   ├── page.tsx                # Главная (10 секций)
│   ├── globals.css             # Дизайн-токены + Tailwind
│   ├── about/page.tsx          # Про нас
│   ├── services/page.tsx       # Услуги (пакеты)
│   ├── cases/
│   │   ├── page.tsx            # Листинг кейсов
│   │   └── [slug]/page.tsx     # Детальный кейс
│   ├── blog/
│   │   ├── page.tsx            # Листинг статей
│   │   └── [slug]/page.tsx     # Статья
│   ├── contacts/page.tsx       # Контакты
│   ├── brief/page.tsx          # Бриф-форма
│   ├── privacy/page.tsx        # Политика конфиденциальности
│   ├── terms/page.tsx          # Условия использования
│   ├── not-found.tsx           # 404 страница
│   ├── error.tsx               # Error boundary
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml (26 URL)
│   ├── opengraph-image.tsx     # Динамические OG-изображения
│   ├── twitter-image.tsx       # Динамические Twitter-карточки
│   └── api/
│       └── lead/route.ts       # POST — обработка заявок
│
├── components/
│   ├── layout/                 # Header, Footer, MobileMenu, Preloader, CookieConsent
│   ├── ui/                     # Button, Card, Input, Modal, Accordion... (25 компонентов)
│   ├── sections/               # Hero, Benefits, Services, FAQ... (10 секций)
│   ├── motion/                 # RevealOnScroll, StaggerChildren
│   ├── forms/                  # QuickLeadForm, BriefForm, CallbackModal
│   ├── analytics/              # GoogleAnalytics, TrackPageView
│   └── mdx/                    # MDXComponents (кастомные HTML-маппинги)
│
├── content/
│   ├── blog/                   # MDX статьи блога
│   └── cases/                  # MDX кейсы
│
├── lib/
│   ├── motion.ts               # Motion-токены и Framer Motion пресеты
│   ├── validation.ts           # Zod-схемы валидации
│   ├── schema.ts               # Schema.org генераторы
│   ├── analytics.ts            # GA4 event tracking
│   ├── content.ts              # MDX парсер (gray-matter)
│   ├── email.ts                # Resend интеграция
│   ├── telegram.ts             # Telegram Bot интеграция
│   ├── leads.ts                # Логирование заявок
│   └── utils.ts                # cn() — Tailwind class merge
│
├── docs/
│   ├── content-guide.md        # Гайд по управлению контентом
│   └── developer-guide.md      # Гайд для разработчика
│
├── public/images/              # Статические изображения
├── CLAUDE.md                   # Инструкции для AI-разработки (PVZ v3.0)
└── TODO.md                     # Трекинг задач (16 фаз)
```

## Установка и запуск

### Требования

- Node.js 18+
- npm 9+

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/anghelinakhmil-ops/razrabotka.git
cd razrabotka

# Установить зависимости
npm install

# Создать файл окружения
cp .env.example .env.local
# Заполнить переменные в .env.local (см. ниже)
```

### Environment Variables

| Переменная | Описание | Обязательная |
|------------|----------|:------------:|
| `RESEND_API_KEY` | API ключ [Resend](https://resend.com) | Да |
| `NOTIFICATION_EMAIL` | Email для получения заявок | Да |
| `FROM_EMAIL` | Адрес отправителя (верифицирован в Resend) | Да |
| `TELEGRAM_BOT_TOKEN` | Токен бота от [@BotFather](https://t.me/BotFather) | Нет |
| `TELEGRAM_CHAT_ID` | ID чата для уведомлений | Нет |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID | Нет |
| `LOG_LEADS_TO_FILE` | Логировать заявки в JSON (`true`/`false`) | Нет |

### Команды

```bash
npm run dev        # Запуск dev-сервера (http://localhost:3000)
npm run build      # Production сборка (проверка TypeScript)
npm run lint       # ESLint проверка
npm run start      # Запуск production-сервера
```

## Деплой

### Vercel (рекомендуется)

1. Подключить GitHub репозиторий в [Vercel Dashboard](https://vercel.com)
2. Framework Preset: **Next.js** (определяется автоматически)
3. Добавить Environment Variables в Settings → Environment Variables
4. Деплой происходит автоматически при push в `main`

### Ручной деплой

```bash
npm run build      # Убедиться что билд проходит
npm run start      # Запустить production-сервер
```

## Карта сайта

| Маршрут | Описание |
|---------|----------|
| `/` | Главная (hero, benefits, services, cases, testimonials, FAQ, lead form) |
| `/about` | Про нас (команда, ценности) |
| `/services` | Услуги (пакеты, цены) |
| `/cases` | Портфолио кейсов |
| `/cases/[slug]` | Детальная страница кейса |
| `/blog` | Блог (статьи) |
| `/blog/[slug]` | Статья блога |
| `/contacts` | Контакты |
| `/brief` | Расширенная бриф-форма |
| `/privacy` | Политика конфиденциальности |
| `/terms` | Условия использования |

## Документация

- [Гайд по контенту](./docs/content-guide.md) — как добавлять статьи, кейсы, обновлять FAQ
- [Гайд для разработчика](./docs/developer-guide.md) — архитектура, компоненты, API
- [CLAUDE.md](./CLAUDE.md) — инструкции для AI-разработки (PVZ v3.0)
- [TODO.md](./TODO.md) — трекинг задач (16 фаз)

## Лицензия

Проприетарный проект. Все права защищены.
