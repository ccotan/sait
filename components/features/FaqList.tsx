import Link from "next/link";
import type { FaqItem } from "@/lib/types";
import { ChevronDown } from "@/components/ui/icons";

/** Аккордеон на нативных <details>: работает без JS и с клавиатуры. */
export function FaqList({ items, openFirst = false }: { items: FaqItem[]; openFirst?: boolean }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <div className="border-t border-line">
      {items.map((item, i) => (
        <details key={item.q} open={openFirst && i === 0} className="group border-b border-line">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[20px] leading-snug sm:text-[22px]">{item.q}</span>
            <span className="grid size-9 shrink-0 place-items-center rounded-md border border-line-strong transition-colors group-open:border-moss group-open:bg-moss group-open:text-white">
              <ChevronDown width={18} height={18} className="transition-transform duration-300 group-open:rotate-180" />
            </span>
          </summary>
          <div className="max-w-[680px] pb-6 text-[16px] leading-relaxed text-ink-2">
            <p>{item.a}</p>
            {item.links && (
              <p className="mt-3 flex flex-wrap gap-4">
                {item.links.map((l) => <Link key={l.href} href={l.href} className="font-semibold text-moss underline decoration-moss/40 underline-offset-4 hover:decoration-moss">{l.label}</Link>)}
              </p>
            )}
          </div>
        </details>
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
