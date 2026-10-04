import type { Metadata } from "next";
import { site } from "@/lib/site";

/** Единый помощник metadata для страниц: title, description, canonical, Open Graph. */
export function pageMetadata({ title, description, path, image = "/og.jpg" }: { title: string; description: string; path: string; image?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} · ${site.name}`, description, url: path, siteName: site.name, locale: site.locale, type: "website", images: [{ url: image }] },
  };
}
