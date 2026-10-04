import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryGrid } from "@/components/features/GalleryGrid";
import { regions, worldFacts } from "@/data/world";
import { gallery } from "@/data/gallery";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { MapPin, External } from "@/components/ui/icons";
import { cn } from "@/lib/format";

export const metadata = pageMetadata({
  title: "Мир сервера",
  description: "Регионы, постройки и карта мира Тихолесья: Тихая долина, Торговая улица, Гавань Маяка и Северная застава.",
  path: "/world",
  image: "/images/harbor.webp",
});

export default function WorldPage() {
  return (
    <>
      <PageHeader image="/images/harbor.webp" imageAlt="Гавань с пирсом и маяком в утреннем тумане" crumbs={[{ label: "Мир" }]} eyebrow="Мир сервера · Сезон 1" title="Мир, который растёт с каждым вечером" intro="Один мир на весь сезон. Здесь — регионы, которые уже обжиты, и направление, где ещё никто не бывал." />

      <div className="border-b border-line bg-card">
        <dl className="container-site grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {worldFacts.map((f) => (
            <div key={f.label} className="py-6 lg:px-6 lg:first:pl-0">
              <dt className="text-sm text-ink-2">{f.label}</dt>
              <dd className="mt-1 font-display text-[24px]">{f.value}</dd>
              <dd className="text-[13px] text-ink-2">{f.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section labelledBy="regions">
        <div className="container-site">
          <SectionHeading id="regions" eyebrow="Регионы" title="Обжитые земли" intro="Границы условные: строить можно где угодно, соблюдая дистанцию до соседей." />
          <div className="space-y-20 lg:space-y-28">
            {regions.map((r, i) => (
              <article key={r.slug} id={r.slug} className="grid scroll-mt-24 gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
                <Reveal className={cn("relative aspect-[3/2] overflow-hidden rounded-lg", i % 2 === 1 && "lg:order-2")}>
                  <Image src={r.image} alt={r.imageAlt} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
                </Reveal>
                <Reveal delay={80}>
                  <p className="font-mono text-[13px] uppercase tracking-[0.1em] text-ink-2">{r.biome}</p>
                  <h3 className="mt-2 text-[30px] sm:text-[34px]">{r.name}</h3>
                  <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-sm text-moss"><MapPin width={16} height={16} /> {r.coords}</p>
                  <p className="mt-4 text-[17px] leading-relaxed text-ink-2">{r.description}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {r.highlights.map((h) => <li key={h} className="flex gap-3 border-t border-line pt-2 text-[15px]"><span aria-hidden className="mt-[9px] size-1.5 shrink-0 bg-moss" />{h}</li>)}
                  </ul>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted" labelledBy="map">
        <div className="container-site">
          <SectionHeading id="map" eyebrow="Карта" title="Карта мира" intro="Живая карта в браузере покажет весь мир с высоты. Подключим вместе с запуском BlueMap." />
          {site.links.mapUrl ? (
            <div className="overflow-hidden rounded-lg border border-line">
              <iframe src={site.links.mapUrl} title="Интерактивная карта мира" className="aspect-[16/9] w-full" loading="lazy" />
              <a href={site.links.mapUrl} target="_blank" rel="noopener noreferrer" className="link-arrow p-4">Открыть на весь экран <External width={16} height={16} /></a>
            </div>
          ) : (
            <div className="relative grid min-h-[340px] place-items-center overflow-hidden rounded-lg border border-dashed border-line-strong bg-card p-8 text-center">
              <div aria-hidden className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="relative max-w-[440px]">
                <p className="eyebrow">Скоро</p>
                <p className="mt-2 font-display text-[24px]">Карта ещё рисуется</p>
                <p className="mt-2 text-ink-2">Когда запустим веб-карту, она появится здесь. А пока координаты регионов указаны выше, а бумажные карты лежат у спавна.</p>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section labelledBy="shots">
        <div className="container-site">
          <SectionHeading id="shots" eyebrow="Кадры" title="Как это выглядит" link={{ href: "/gallery", label: "Вся галерея" }} />
          <GalleryGrid images={gallery} filter={false} limit={6} />
          <p className="mt-6 text-sm text-ink-2">Изображения на сайте — концепт-кадры. Замените их скриншотами игроков.</p>
        </div>
      </Section>

      <Section tone="muted" className="py-14 sm:py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-[26px]">Хотите поселиться?</h2>
            <p className="mt-1 text-ink-2">Пять шагов от покупки игры до первого дома.</p>
          </div>
          <Link href="/how-to-play" className="btn btn-primary">Как начать играть</Link>
        </div>
      </Section>
    </>
  );
}
