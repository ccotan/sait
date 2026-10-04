# Тихолесье — сайт ванильного Minecraft-сервера

Многостраничный сайт на **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Маршруты

| Маршрут | Страница |
| --- | --- |
| `/` | Главная — обзор и переходы в разделы |
| `/about` | Философия, vanilla, принципы, для кого |
| `/how-to-play` | Пошаговая инструкция для новичков |
| `/rules` | Правила по категориям + наказания |
| `/world` | Регионы, карта (BlueMap/Dynmap), кадры |
| `/community` | Discord, события, достижения, жители |
| `/news`, `/news/[slug]` | Список новостей и статьи (SSG + metadata) |
| `/players` | Игроки: поиск, сортировка, статистика |
| `/gallery` | Masonry-галерея с фильтром и лайтбоксом |
| `/status` | Статус сервера (SSR + автообновление) |
| `/faq`, `/support` | Вопросы и ответы, контакты и форма |
| `/api/status` | JSON-статус сервера |

## Структура

```
app/            маршруты, layout, template (переходы), sitemap, robots, icon, api/
components/
  layout/       Header (dropdown + мобильное меню), Footer, PageHeader, Breadcrumbs
  ui/           Badge, Alert, Modal, Section, Reveal, CopyIp, DemoNotice, Logo, icons
  features/     NewsCard, GalleryGrid, StatusPanel, PlayersDirectory, FaqList, SupportForm, CtaBand…
lib/
  site.ts       ← название, IP, версия, ссылки, навигация, флаг demoMode
  services/     источники данных: status, players, news, discord (точки подключения API)
  hooks/        useServerStatus — клиентский опрос /api/status
data/           контент и demo data: news, players, gallery, world, rules, faq, community
public/images   изображения (сейчас — сгенерированные концепт-кадры)
```

## Что заменить перед запуском

1. `lib/site.ts` — IP, ссылка на Discord, email, `links.mapUrl`.
2. `.env` (см. `.env.example`):
   - `MC_SERVER_HOST` — включает реальный статус через api.mcstatus.io;
   - `DISCORD_GUILD_ID` — онлайн из Discord-виджета;
   - `NEXT_PUBLIC_SITE_URL` — для canonical, sitemap и Open Graph.
3. `data/*` — правила, новости, события, FAQ. Правила — разумные placeholder'ы.
4. `public/images` — замените концепт-кадры реальными скриншотами (данные — в `data/gallery.ts`).
5. Игроки: `lib/services/players.ts` → замените demo data запросом к своему API.
   Для реальных аватаров используйте `avatarUrl()` (mc-heads.net) вместо `PlayerAvatar`.
6. Форма поддержки: `components/features/SupportForm.tsx` → создайте `app/api/support/route.ts`
   (например, пересылка в Discord webhook).
7. После подключения API установите `demoMode: false` — плашки «Демо-данные» исчезнут.

## Дизайн-система

Токены в `app/globals.css` (`@theme`): бумажная палитра (`paper`, `card`, `ink`), мох (`moss`) как основной акцент,
`ember` — только для внимания, `night` для тёмных секций. Шрифты: Literata (заголовки), Manrope (текст),
JetBrains Mono (технические данные: IP, координаты, ники). Компонентные классы: `.btn-*`, `.card`, `.card-link`,
`.badge`, `.field`, `.eyebrow`, `.prose-site`, `.pixel-rule`. Анимации уважают `prefers-reduced-motion`.
