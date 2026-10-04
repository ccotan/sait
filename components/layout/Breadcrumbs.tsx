import Link from "next/link";
import { site } from "@/lib/site";
import { ChevronRight } from "@/components/ui/icons";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, tone = "default" }: { items: Crumb[]; tone?: "default" | "dark" }) {
  const all: Crumb[] = [{ href: "/", label: "Главная" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: c.href ? `${site.url}${c.href}` : undefined })),
  };
  const muted = tone === "dark" ? "text-[#c9c1b1] hover:text-white" : "text-ink-2 hover:text-ink";
  const current = tone === "dark" ? "text-white" : "text-ink";
  return (
    <nav aria-label="Хлебные крошки" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1">
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {c.href && !last ? (
                <Link href={c.href} className={`rounded-sm py-1 transition-colors ${muted}`}>{c.label}</Link>
              ) : (
                <span aria-current="page" className={`py-1 font-medium ${current}`}>{c.label}</span>
              )}
              {!last && <ChevronRight width={14} height={14} className={tone === "dark" ? "text-[#c9c1b1]" : "text-ink-2/60"} />}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
