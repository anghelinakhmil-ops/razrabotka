# CLAUDE.md — Веб-студия: Разработка сайтов под ключ

> **Референс:** [THE BRIDGE](https://www.thebridge.kyiv.ua)
> **Стиль:** Premium-minimal / Architectural
> **Стек:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, MDX

---

# 📋 GP (GENERAL PROTOCOLS) — ГЛОБАЛЬНЫЕ ПРАВИЛА

> **Версия:** 1.0 | **Статус:** ОБЯЗАТЕЛЬНО К ИСПОЛНЕНИЮ
> **Полный GP:** [`GP-RU-CLAUDE.md`](./GP-RU-CLAUDE.md) (~820 строк) | **23 протокола:** [`PROTOCOLS-RU.md`](./PROTOCOLS-RU.md)
> **Последнее обновление:** 15.02.2026

---

## 🔒 АБСОЛЮТНЫЕ ЗАПРЕТЫ (НУЛЕВАЯ ТОЛЕРАНТНОСТЬ)

| Запрет | Уровень |
|--------|---------|
| `any` в TypeScript | ПОЛНАЯ БЛОКИРОВКА |
| `@ts-ignore`, `@ts-nocheck` | ПОЛНАЯ БЛОКИРОВКА |
| Секреты/credentials в git | КРИТИЧЕСКАЯ БЛОКИРОВКА |
| Inline styles (только Tailwind) | ЗАПРЕЩЕНО |
| `console.log` в production | ЗАПРЕЩЕНО |
| Хаки/workarounds/quick fix | ЗАПРЕЩЕНО |
| Хардкод контента (выносить в константы/MDX/i18n) | ЗАПРЕЩЕНО |
| Закомментированный код | ЗАПРЕЩЕНО |
| Анимации без `motionConfig.ease` | ЗАПРЕЩЕНО |
| Страницы без CTA | ЗАПРЕЩЕНО |
| Забыть alt для изображений | ЗАПРЕЩЕНО |
| Забыть про mobile версию | ЗАПРЕЩЕНО |
| Начинать/переходить к задаче без подтверждения | ЗАПРЕЩЕНО |
| Коммитить код с ошибками билда | ЗАПРЕЩЕНО |

---

## 🔴 ANTI-SKIP ПРОТОКОЛ — АВТОБЛОКИРОВКИ

| Триггер | Действие | Блокировка |
|---------|----------|------------|
| 🆕 Новая задача | Анализ → План → Ждать одобрения | Выполнение без плана |
| 📁 Новые файлы/папки | Обновить CLAUDE.md ПЕРВЫМ ДЕЛОМ | Создание без CLAUDE.md |
| 🎨 UI-изменения | Реализовать → OPA → СТОП → Ждать скриншот | Коммит без одобрения |
| 📸 Скриншот от пользователя | Чеклист STEP 1-6 → Отчёт EXPLICIT | Коммит без отчёта |
| 💾 Коммит | OPA → 100% SUCCESS | Коммит без OPA pass |

---

## ⚙️ WORKFLOW — ОДНА ПОДЭТАПА ЗА РАЗ

### Порядок выполнения:
```
1. Получаю задачу → АНАЛИЗ (тип, сложность, риск)
2. Определяю применимые протоколы (из 23)
3. Составляю ПЛАН → Жду подтверждения ✋
4. Создаю чеклист со ВСЕМИ шагами
5. Выполняю СТРОГО пошагово (step by step)
6. После каждого шага → верификация (Task-Verify-Fix)
7. Quality Gates (OPA: build + lint)
8. ОТЧЁТ → Жду подтверждения ✋
```

### Task-Verify-Fix цикл:
```
Задача завершена → СБОРКА/ТЕСТЫ немедленно!
  → Ошибки? → ИСПРАВИТЬ → повторная верификация → УСПЕХ
  → ЗАПРЕЩЕНО 3+ задачи без верификации!
```

### При ошибках — WEI/CALL:
| Ситуация | Протокол | Действие |
|----------|----------|----------|
| 1-я неудача | **WEI** (04) | Полная диагностика: проблема, контекст, код, логи, root cause |
| 2-я неудача | **CALL** (05) | Исследование 20+ источников: docs, GitHub Issues, SO |
| 3-я неудача | **ЭСКАЛАЦИЯ** | СТОП → Уведомить пользователя → Варианты решения |

---

## ⚠️ ЧЕКЛИСТ ВЕРИФИКАЦИИ ПЕРЕД ПЛАНОМ

Перед созданием ПЛАНА для ЛЮБОЙ задачи:

- [ ] Задача включает **новые файлы/папки?** → Обновить структуру в CLAUDE.md ПЕРВЫМ
- [ ] Задача включает **UI-изменения?** → Скриншот ОБЯЗАТЕЛЕН
- [ ] Задача включает **изменения бэкенда?** → OPA (build + lint + тесты)
- [ ] Задача включает **API-ключи/credentials?** → Проверка: нет секретов в git

---

## ✅ QUALITY GATES (OPA) — ПЕРЕД КАЖДЫМ КОММИТОМ

### Обязательные проверки:
```bash
npm run build    # НОЛЬ ошибок TypeScript
npm run lint     # НОЛЬ ошибок ESLint
```

### Пре-коммит чеклист (8 проверок):
1. Исходная проблема решена ПОЛНОСТЬЮ
2. ВСЕ задачи "completed"
3. OPA: build + lint = 100% SUCCESS
4. НОЛЬ активных ошибок
5. UI верифицирован (если применимо)
6. Новые файлы одобрены (если применимо)
7. Breaking changes документированы (если применимо)
8. TODO файл обновлён (если применимо)

---

## 🔍 ЧЕКЛИСТЫ КАЧЕСТВА

### Код
- [ ] `npm run build` — нет ошибок TypeScript
- [ ] `npm run lint` — нет ошибок ESLint
- [ ] Нет `any` типов (ЗАПРЕЩЕНО)
- [ ] Нет `console.log` (кроме dev)
- [ ] Нет закомментированного кода
- [ ] Понятные имена переменных/функций
- [ ] Нет inline styles (только Tailwind)
- [ ] Контент не захардкожен (константы/MDX/i18n)

### Функциональность
- [ ] Работает как ожидалось
- [ ] Нет ошибок в консоли браузера
- [ ] Edge cases обработаны

### UI/UX
- [ ] Соответствует дизайн-системе
- [ ] **Responsive обязательно:**
  - [ ] Mobile: 320px, 375px, 414px
  - [ ] Tablet: 768px, 1024px
  - [ ] Desktop: 1280px, 1440px, 1920px+
- [ ] Анимации плавные (60fps)
- [ ] Нет CLS (Cumulative Layout Shift)
- [ ] Все состояния: default, hover, focus, active, disabled, loading

### Безопасность
- [ ] Нет XSS уязвимостей
- [ ] Нет секретов в коде (только .env)
- [ ] `.env` в `.gitignore`
- [ ] Inputs валидируются (client + server)
- [ ] Данные санитизируются
- [ ] Перед коммитом: `git diff` — проверить на секреты

### Accessibility (a11y)
- [ ] Семантический HTML (nav, main, footer, section, article)
- [ ] Правильная иерархия заголовков (h1 → h2 → h3)
- [ ] Alt для ВСЕХ изображений (информативных), alt="" для декоративных
- [ ] ARIA атрибуты: aria-label, aria-expanded, aria-hidden, role="dialog", aria-live, aria-describedby
- [ ] Keyboard navigation: focusable, tab order, focus trap, Escape, Enter/Space
- [ ] Контраст WCAG AA (4.5:1 текст, 3:1 крупный)
- [ ] Не полагаться только на цвет для информации

### Производительность
- [ ] Изображения через `next/image` с `width`, `height`
- [ ] `placeholder="blur"` для LCP, `priority` для hero
- [ ] Размер изображений < 200KB, формат WebP/AVIF
- [ ] Оптимальные импорты (no barrel imports)
- [ ] Lazy loading где нужно

### Для страниц (дополнительно)
- [ ] SEO meta теги (title, description, OG)
- [ ] Schema.org разметка (если применимо)
- [ ] CTA элементы присутствуют (коммерческий проект!)
- [ ] Lighthouse score >= 90

### Для форм (дополнительно)
- [ ] Client-side валидация (Zod)
- [ ] Server-side валидация
- [ ] Error/Loading/Success states
- [ ] Отправка работает (email/Telegram)

### Для анимаций (дополнительно)
- [ ] Использует `motionConfig.ease` (ОБЯЗАТЕЛЬНО)
- [ ] Не вызывает CLS
- [ ] Плавная работа на мобильных
- [ ] Respects `prefers-reduced-motion`

---

## 💾 GIT COMMITS — CONVENTIONAL COMMITS

**Правила:**
- Атомарные коммиты: 1 задача = 1 коммит
- Push после КАЖДОЙ завершённой задачи
- НИКОГДА не коммитить код с ошибками билда

**Формат:**
```bash
git add [files]
git commit -m "$(cat <<'EOF'
type(scope): краткое описание

[Детали если нужно]

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
git push origin main
```

**Типы коммитов:**
| Type | Описание | Пример |
|------|----------|--------|
| `feat` | Новый функционал | `feat(hero): add parallax animation` |
| `fix` | Исправление бага | `fix(menu): mobile menu not closing` |
| `style` | Изменения стилей | `style(typography): update heading sizes` |
| `refactor` | Рефакторинг | `refactor(motion): extract presets` |
| `docs` | Документация | `docs: update TODO.md` |
| `chore` | Прочее | `chore: update dependencies` |

---

## 🗣️ КОММУНИКАЦИЯ

- **Язык общения:** Русский (ВСЕГДА)
- **Код:** Английский (переменные, функции, комментарии)
- **Исключения:** README для GitHub, техническая документация — английский допустим

---

## 📊 ОТЧЁТ О ВЫПОЛНЕНИИ

```markdown
## ✅ ОТЧЁТ: [Название задачи]

**Статус:** Выполнено / Частично / Заблокировано

### Что сделано:
- [Пункт 1]

### Файлы:
| Файл | Действие |
|------|----------|
| `path/file.tsx` | Создан / Изменён |

### Проверка качества:
| Категория | Статус |
|-----------|--------|
| Код | ✅ |
| Функциональность | ✅ |
| UI/UX | ✅ / N/A |
| Безопасность | ✅ |
| Accessibility | ✅ / N/A |
| Производительность | ✅ / N/A |

### Деплой:
- Статус: Успешно ✅

---
⛔ **Переход к следующей задаче ЗАБЛОКИРОВАН до подтверждения.**

Ответьте:
- `следующая` / `дальше` / `продолжай` — перейти к следующей задаче
- `повторить` — переделать текущую задачу
- `вопрос: ...` — уточнить детали
- `стоп` — остановить работу
---
```

---

## 📋 ИНДЕКС 23 ПРОТОКОЛОВ

> Полные тексты: [`PROTOCOLS-RU.md`](./PROTOCOLS-RU.md)

**Критические (всегда):**
`01` Инициализация | `02` Структура | `03` UI-верификация | `20` Анализ скриншотов | `21` Anti-Skip | `22` План vs Отчёт | `23` Пост-структура

**Диагностика (при ошибках):**
`04` WEI (1-й провал) | `05` CALL (2-й провал) | `06` Управление фазами

**Quality Gates (pre-commit):**
`07` OPA | `08` Веб-тестирование | `09` CI/CD

**Разработка (по типу задачи):**
`10` Git Commits | `11` Дебаггинг | `12` Рефакторинг | `13` Зависимости | `14` Секреты | `15` Breaking Changes | `16` Производительность | `17` Hotfix | `18` Rollback | `19` Quick Wins

---

> 📌 **GP v1.0** — Этот протокол обязателен. Полный GP: [`GP-RU-CLAUDE.md`](./GP-RU-CLAUDE.md). При упоминании "GP" — следовать этим правилам.

---
---

## 📋 Содержание документа

1. [GP — General Protocols](#-gp-general-protocols--глобальные-правила) ⬆️
2. [О проекте](#-о-проекте)
3. [Технический стек](#-технический-стек)
4. [Структура проекта](#-структура-проекта)
5. [Дизайн-система](#-дизайн-система)
6. [Motion-дизайн](#-motion-дизайн)
7. [SEO требования](#-seo-требования)
8. [Аналитика](#-аналитика-ga4-события)
9. [Полезные команды](#-полезные-команды)

---

## 🎯 О проекте

### Цель
Коммерческий сайт веб-студии, продающий услугу разработки сайтов под ключ для:
- **Экспертов** — личные бренды, консультации, курсы
- **E-commerce** — интернет-магазины с интеграциями
- **Бизнесов** — лендинги и промо-страницы

### UX-метрики (KPI)
| Метрика | Целевое значение |
|---------|------------------|
| Время до понимания оффера | 10–15 секунд |
| Core Web Vitals (LCP) | < 2.5 секунд |
| Конверсия в заявку | 3–7% |
| Bounce Rate | < 50% |
| Lighthouse Performance | > 90 |

### Карта сайта
```
/                   — Главная (лендинг-галерея)
/about              — Про нас
/services           — Услуги (пакеты)
/cases              — Кейсы (портфолио)
/cases/[slug]       — Детальная страница кейса
/blog               — Блог
/blog/[slug]        — Статья
/contacts           — Контакты
/brief              — Бриф-форма (расширенная заявка)
/privacy            — Политика конфиденциальности
/terms              — Условия использования
```

---

## 🛠️ Технический стек

| Категория | Технология | Обоснование |
|-----------|------------|-------------|
| Framework | Next.js 14+ (App Router) | SSR/SSG, SEO, производительность |
| Language | TypeScript | Типобезопасность, DX |
| Styling | Tailwind CSS v4 | Утилитарный CSS, @theme inline |
| Animation | Framer Motion | Reveal, overlay, loader |
| Content | MDX / Contentlayer2 | Блог/кейсы без внешнего CMS |
| Forms | React Hook Form + Zod | Валидация |
| Email | Resend | Отправка заявок |
| Code Quality | ESLint | Консистентность |
| Deployment | Vercel | Автодеплой |

### Установленные зависимости
```bash
# Основные
next, react, react-dom, typescript

# Анимации
framer-motion

# Контент
@mdx-js/react, @mdx-js/loader, @next/mdx
contentlayer2, next-contentlayer2

# Формы
react-hook-form, zod, @hookform/resolvers

# Email
resend

# Утилиты
clsx, tailwind-merge
```

---

## 📁 Структура проекта

```
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Главная
│   ├── globals.css             # Tailwind + дизайн-токены
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── cases/
│   │   ├── page.tsx            # Листинг кейсов
│   │   └── [slug]/page.tsx     # Детальный кейс
│   ├── blog/
│   │   ├── page.tsx            # Листинг статей
│   │   └── [slug]/page.tsx     # Статья
│   ├── contacts/page.tsx
│   ├── brief/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── api/
│       └── lead/route.ts       # Обработка заявок
│
├── components/
│   ├── layout/                 # Header, Footer, MobileMenu, Preloader
│   ├── ui/                     # Button, Card, Input, Modal...
│   ├── sections/               # Hero, Benefits, FAQ...
│   └── motion/                 # RevealOnScroll, StaggerChildren...
│
├── content/
│   ├── blog/                   # MDX статьи
│   └── cases/                  # MDX кейсы
│
├── lib/                        # Утилиты, хелперы
│
├── public/
│   └── images/                 # Статические изображения
│
├── CLAUDE.md                   # Этот файл (с GP)
├── GP-RU-CLAUDE.md             # Полный GP (~820 строк)
├── PROTOCOLS-RU.md             # 23 протокола (~3200 строк)
└── TODO.md                     # Трекинг задач
```

---

## 🎨 Дизайн-система

### Визуальный стиль (DNA)
- **Стиль:** Premium-minimal / Architectural
- **Ощущение:** Галерея, много воздуха, спокойный ритм
- **Акцент:** Типографика + фото, минимум цветов

### Цветовые токены (globals.css)
```css
:root {
  --color-background: #FFFFFF;
  --color-background-alt: #FAFAFA;
  --color-text-primary: #1a2a32;
  --color-text-secondary: #333333;
  --color-text-muted: #666666;
  --color-text-light: #737373;
  --color-line: #E5E5E5;
  --color-line-dark: #CCCCCC;
  --color-accent: #1a2a32;
  --color-accent-hover: #2a3a42;
}
```

### Типографика

#### Фирменный приём: «Ломаная» типографика
Смешение кириллицы и латиницы + увеличенная разрядка:
```
Примеры референса: «П R ИРОДА», «O РЕНДИ», «THE B RIDGE»
Наши варианты:     «С A Й Т Ы», «П O Д К Л Ю Ч», «W E B S T U D I O»
```

#### Иерархия
| Элемент | Стиль | Применение |
|---------|-------|------------|
| H1 / Бренд | Display, 64–120px, uppercase, tracking широкий | Hero, заголовки секций |
| H2 Секций | 48–64px, uppercase, tracking средний | Названия секций |
| H3 | 24–32px, mixed case | Подзаголовки |
| Body | 16–18px | Основной текст |
| Нумерация | 48–80px, light | 01–05 как «каркас» |

### Сетка
- **Desktop:** 12-колоночная сетка
- **Боковые поля:** Крупные (ощущение «галереи»)
- **Контейнер:** `max-w-7xl mx-auto px-6 lg:px-12`
- **Вертикальные отступы:** Большие между секциями (120px desktop, 80px mobile)

---

## 🎬 Motion-дизайн

### Прелоадер
```typescript
// components/layout/Preloader.tsx
// - Fullscreen overlay
// - Счётчик: 0% → 100%
// - Исчезновение: fade-out + translateY
// - НЕ блокирует SEO
```

### Motion Tokens (Framer Motion)
```typescript
// lib/motion.ts
export const motionConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
  },
  ease: [0.2, 0.8, 0.2, 1], // cubic-bezier — ИСПОЛЬЗОВАТЬ ВСЕГДА
  stagger: {
    fast: 0.08,
    normal: 0.12,
    slow: 0.14,
  },
  translateY: {
    small: 12,
    normal: 20,
    large: 24,
  }
};

export const revealVariants = {
  hidden: { opacity: 0, y: motionConfig.translateY.normal },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionConfig.duration.normal,
      ease: motionConfig.ease,
    }
  }
};
```

### Reveal on Scroll — порядок появления
1. Номер секции (01–05)
2. Заголовок
3. Изображение
4. Текстовый блок

### Hover-эффекты
- **CTA кнопки:** underline-animate или смена заливки/обводки
- **Навигация:** аккуратный hover, без кислотных эффектов
- **Карточки:** микро-сдвиг 2–4px или subtle scale

### Mobile Menu Overlay
- Открытие/закрытие: slide-in + fade
- Блокировка скролла: `overflow: hidden` на body
- Escape закрывает меню
- Явная кнопка «Закрыть»

---

## 📊 SEO требования

### Meta теги (на каждой странице)
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Заголовок страницы | NAKO Agency',
  description: 'Описание страницы до 160 символов',
  openGraph: {
    title: 'Заголовок для соцсетей',
    description: 'Описание для соцсетей',
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

### robots.txt
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://your-domain.com/sitemap.xml
```

---

## 📈 Аналитика (GA4 события)

```tsx
// lib/analytics.ts
export const trackEvent = (
  eventName: string,
  params: Record<string, string>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
};
```

### События
- `cta_click` — клик по CTA (location, text, page)
- `form_start` — начало заполнения формы
- `form_submit` — отправка формы
- `form_error` — ошибка формы
- `section_view` — просмотр секции

---

## 🔧 Полезные команды

```bash
npm run dev        # Разработка
npm run build      # Сборка (проверка TypeScript)
npm run lint       # Проверка ESLint
npm run start      # Production превью
```

---

> 📌 **Этот файл — источник истины для проекта. GP v1.0 обязателен к исполнению.**
