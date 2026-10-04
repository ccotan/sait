/**
 * Центральная конфигурация сайта.
 * Всё, что относится к конкретному серверу (название, IP, ссылки), меняется здесь.
 */
export const site = {
  name: "Тихолесье",
  nameLatin: "Tiholesye",
  tagline: "Ванильный survival без спешки",
  description:
    "Тихолесье — ванильный survival-сервер Minecraft Java Edition 26.1.2. Строительство, исследование и спокойное сообщество без доната и плагинов, меняющих игру.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://tiholesye.example",
  locale: "ru_RU",

  server: {
    ip: "play.tiholesye.example", // TODO: заменить на настоящий адрес
    version: "26.1.2",
    edition: "Java Edition",
    mode: "Vanilla Survival",
    difficulty: "Сложная",
    whitelist: true,
    region: "Европа (Франкфурт)", // placeholder
    seasonStart: "2026-09-01",
  },

  links: {
    discord: "https://discord.gg/your-invite", // TODO: заменить на приглашение
    mapUrl: null as string | null, // например, "https://map.tiholesye.example" (BlueMap / Dynmap / squaremap)
    minecraftBuy: "https://www.minecraft.net/ru-ru/store/minecraft-java-bedrock-edition-pc",
    launcher: "https://www.minecraft.net/ru-ru/download",
  },

  contacts: {
    email: "admin@tiholesye.example", // placeholder
  },

  /**
   * Пока сайт не подключён к реальным API, часть блоков показывает демонстрационные данные.
   * Флаг управляет плашками «Демо-данные» по всему сайту — отключите после подключения API.
   */
  demoMode: true,
} as const;

export type NavItem = { href: string; label: string; description?: string };
export type NavGroup = { label: string; items: NavItem[] };
export type NavEntry = NavItem | NavGroup;

export const navigation: NavEntry[] = [
  { href: "/about", label: "О сервере" },
  {
    label: "Мир",
    items: [
      { href: "/world", label: "Мир сервера", description: "Регионы, постройки и карта" },
      { href: "/gallery", label: "Галерея", description: "Скриншоты игроков" },
    ],
  },
  {
    label: "Сообщество",
    items: [
      { href: "/community", label: "Сообщество", description: "Discord, события, достижения" },
      { href: "/players", label: "Игроки", description: "Жители и их статистика" },
      { href: "/news", label: "Новости", description: "Обновления и анонсы" },
    ],
  },
  { href: "/rules", label: "Правила" },
  {
    label: "Помощь",
    items: [
      { href: "/how-to-play", label: "Как начать играть", description: "Пошагово для новичков" },
      { href: "/faq", label: "Вопросы и ответы", description: "Частые вопросы" },
      { href: "/status", label: "Статус сервера", description: "Онлайн и доступность" },
      { href: "/support", label: "Поддержка", description: "Связаться с администрацией" },
    ],
  },
];

export const footerNav: NavGroup[] = [
  {
    label: "Сервер",
    items: [
      { href: "/about", label: "О сервере" },
      { href: "/rules", label: "Правила" },
      { href: "/status", label: "Статус" },
      { href: "/how-to-play", label: "Как начать" },
    ],
  },
  {
    label: "Мир",
    items: [
      { href: "/world", label: "Мир сервера" },
      { href: "/gallery", label: "Галерея" },
      { href: "/news", label: "Новости" },
    ],
  },
  {
    label: "Люди",
    items: [
      { href: "/community", label: "Сообщество" },
      { href: "/players", label: "Игроки" },
      { href: "/faq", label: "FAQ" },
      { href: "/support", label: "Поддержка" },
    ],
  },
];

export function isGroup(entry: NavEntry): entry is NavGroup {
  return "items" in entry;
}
