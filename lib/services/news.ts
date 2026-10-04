import { news } from "@/data/news";
import type { NewsPost } from "@/lib/types";

/** Новости хранятся в data/news.ts. Позже можно заменить на CMS (Notion, Sanity, MDX) без изменения страниц. */
export async function getAllNews(): Promise<NewsPost[]> {
  return [...news].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug);
}

export async function getAdjacentNews(slug: string) {
  const all = await getAllNews();
  const i = all.findIndex((n) => n.slug === slug);
  return { newer: i > 0 ? all[i - 1] : undefined, older: i >= 0 ? all[i + 1] : undefined };
}

export const newsCategoryLabel: Record<NewsPost["category"], string> = {
  update: "Обновление",
  event: "Событие",
  world: "Мир",
  community: "Сообщество",
};
