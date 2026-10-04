export type DataSource = "live" | "demo";

export interface ServerStatus {
  online: boolean;
  playersOnline: number;
  playersMax: number;
  version: string;
  host: string;
  motd?: string;
  latencyMs: number | null;
  /** ISO-строка момента запуска; null, если источник не сообщает аптайм */
  startedAt: string | null;
  checkedAt: string;
  samplePlayers?: string[];
  source: DataSource;
}

export type PlayerStatus = "online" | "away" | "offline";
export type PlayerRole = "admin" | "moderator" | "builder" | "resident" | "newcomer";

export interface PlayerStats {
  playtimeHours: number;
  blocksPlaced: number;
  distanceKm: number;
  deaths: number;
  advancements: number;
}

export interface Player {
  uuid: string;
  nick: string;
  role: PlayerRole;
  status: PlayerStatus;
  joinedAt: string;
  bio: string;
  settlement?: string;
  stats: PlayerStats;
}

export type NewsCategory = "update" | "event" | "world" | "community";

export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: NewsCategory;
  cover: string;
  coverAlt: string;
  author: string;
  readingMinutes: number;
  body: NewsBlock[];
}

export type GalleryTag = "постройки" | "природа" | "подземелья" | "события";

export interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  title: string;
  author: string;
  tag: GalleryTag;
  coords?: string;
}

export interface Region {
  slug: string;
  name: string;
  biome: string;
  coords: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
}

export interface CommunityEvent {
  title: string;
  date: string;
  description: string;
  place: string;
  status: "upcoming" | "past";
}

export interface Rule {
  id: string;
  text: string;
  note?: string;
}

export interface RuleCategory {
  id: string;
  title: string;
  summary: string;
  rules: Rule[];
}

export interface FaqItem {
  q: string;
  a: string;
  links?: { href: string; label: string }[];
}
