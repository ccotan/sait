import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { news } from "@/data/news";

const routes = ["", "/about", "/how-to-play", "/rules", "/world", "/community", "/news", "/players", "/gallery", "/status", "/faq", "/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 })),
    ...news.map((n) => ({ url: `${site.url}/news/${n.slug}`, lastModified: n.date, priority: 0.6 })),
  ];
}
