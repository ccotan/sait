import type { ReactNode } from "react";
import Image from "next/image";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { cn } from "@/lib/format";

/**
 * Шапка внутренней страницы. Два варианта:
 *  - plain: спокойный текстовый заголовок на бумажном фоне;
 *  - image: изображение с затемнением (для визуальных страниц — Мир, Галерея).
 */
export function PageHeader({ title, intro, eyebrow, crumbs, image, imageAlt = "", aside, className }: {
  title: string; intro?: ReactNode; eyebrow?: string; crumbs: Crumb[]; image?: string; imageAlt?: string; aside?: ReactNode; className?: string;
}) {
  if (image) {
    return (
      <header className={cn("on-dark relative isolate overflow-hidden bg-night", className)}>
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-10 object-cover opacity-80" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/55 to-night/10" />
        <div className="container-site flex min-h-[420px] flex-col justify-end pt-28 pb-12 sm:min-h-[480px] sm:pb-16">
          <Breadcrumbs items={crumbs} tone="dark" />
          {eyebrow && <p className="eyebrow mt-8 text-[#d9cfbc]">{eyebrow}</p>}
          <h1 className="mt-3 max-w-[760px] text-[40px] text-[#f8f4ec] sm:text-[52px]">{title}</h1>
          {intro && <p className="mt-4 max-w-[600px] text-[17px] leading-relaxed text-[#e1d9c9] sm:text-lg">{intro}</p>}
        </div>
      </header>
    );
  }
  return (
    <header className={cn("border-b border-line", className)}>
      <div className="container-site pt-10 pb-12 sm:pt-12 sm:pb-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            <h1 className="text-[38px] sm:text-[48px]">{title}</h1>
            {intro && <p className="mt-4 text-[17px] leading-relaxed text-ink-2 sm:text-lg">{intro}</p>}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
