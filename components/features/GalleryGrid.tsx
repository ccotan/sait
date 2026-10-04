"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { GalleryImage, GalleryTag } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import { ArrowLeft, ArrowRight, MapPin } from "@/components/ui/icons";
import { cn } from "@/lib/format";

const tags: (GalleryTag | "все")[] = ["все", "постройки", "природа", "подземелья", "события"];

/** Masonry-галерея (CSS columns) с фильтром и лайтбоксом: стрелки ←/→, Esc, свайп. */
export function GalleryGrid({ images, filter = true, limit }: { images: GalleryImage[]; filter?: boolean; limit?: number }) {
  const [tag, setTag] = useState<(typeof tags)[number]>("все");
  const [index, setIndex] = useState<number | null>(null);
  const list = useMemo(() => {
    const l = tag === "все" ? images : images.filter((i) => i.tag === tag);
    return limit ? l.slice(0, limit) : l;
  }, [images, tag, limit]);

  const go = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const current = index !== null ? list[index] : null;
  const [touchX, setTouchX] = useState<number | null>(null);

  return (
    <div>
      {filter && (
        <div role="group" aria-label="Фильтр по категориям" className="mb-8 flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tag === t}
              onClick={() => setTag(t)}
              className={cn("min-h-10 rounded-md border px-4 text-[15px] font-medium capitalize transition-colors", tag === t ? "border-ink bg-ink text-paper" : "border-line-strong text-ink-2 hover:border-ink/40 hover:text-ink")}
            >
              {t}
            </button>
          ))}
          <span className="ml-auto self-center font-mono text-[13px] text-ink-2" aria-live="polite">{list.length} кадров</span>
        </div>
      )}

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
        {list.map((img, i) => (
          <li key={img.id} className="break-inside-avoid">
            <button type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-md bg-paper-2 text-left" aria-label={`Открыть: ${img.title}`}>
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col bg-gradient-to-t from-night/85 to-transparent px-4 pt-10 pb-3.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="font-semibold">{img.title}</span>
                <span className="text-sm text-white/80">{img.author}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Modal open={current !== null} onClose={() => setIndex(null)} label={current ? `Просмотр: ${current.title}` : "Просмотр"} variant="media">
        {current && (
          <figure onTouchStart={(e) => setTouchX(e.touches[0].clientX)} onTouchEnd={(e) => { if (touchX !== null) { const dx = e.changedTouches[0].clientX - touchX; if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1); setTouchX(null); } }}>
            <div className="relative mx-auto flex max-h-[76dvh] justify-center">
              <Image key={current.id} src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="(min-width: 1280px) 1280px, 100vw" className="h-auto max-h-[76dvh] w-auto max-w-full animate-[fade-in_.35s] rounded-md object-contain" priority />
            </div>
            <figcaption className="mt-4 flex flex-col gap-3 text-[#e9e3d6] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl text-white">{current.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#c9c1b1]">
                  <span>Автор: {current.author}</span>
                  {current.coords && <span className="inline-flex items-center gap-1 font-mono"><MapPin width={14} height={14} /> {current.coords}</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="mr-2 font-mono text-sm text-[#c9c1b1]">{(index ?? 0) + 1} / {list.length}</span>
                <button type="button" onClick={() => go(-1)} aria-label="Предыдущее изображение" className="grid size-11 place-items-center rounded-md border border-white/25 text-white hover:bg-white/10"><ArrowLeft /></button>
                <button type="button" onClick={() => go(1)} aria-label="Следующее изображение" className="grid size-11 place-items-center rounded-md border border-white/25 text-white hover:bg-white/10"><ArrowRight /></button>
              </div>
            </figcaption>
          </figure>
        )}
      </Modal>
    </div>
  );
}
