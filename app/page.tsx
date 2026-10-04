import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServerStatus } from "@/lib/services/status";
import { getAllNews } from "@/lib/services/news";
import { events, communityStats } from "@/data/community";
import { regions } from "@/data/world";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CopyIp } from "@/components/ui/CopyIp";
import { StatusDot, Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/features/NewsCard";
import { CtaBand } from "@/components/features/CtaBand";
import { ArrowRight, Calendar, Discord, Leaf, Shield, Users, Compass } from "@/components/ui/icons";
import { formatShortDate } from "@/lib/format";

export const revalidate = 30;

const principles = [
  { icon: Leaf, title: "Чистая ваниль", text: "Никаких плагинов, меняющих геймплей: ни /home, ни приватов, ни экономики. Только Minecraft таким, каким его сделали." },
  { icon: Shield, title: "Без доната", text: "Ничего нельзя купить. Все равны — новичок и игрок с первого дня различаются только опытом." },
  { icon: Users, title: "Своё сообщество", text: "Вход по короткой заявке. Сотня людей, которые знают друг друга по никам и помогают соседям." },
  { icon: Compass, title: "Мир надолго", text: "Сезон длится минимум год, без вайпов. Можно строить большое и не бояться потерять." },
];

export default async function HomePage() {
  const [status, news] = await Promise.all([getServerStatus(), getAllNews()]);
  const [featured, ...rest] = news;
  const upcoming = events.filter((e) => e.status === "upcoming");

  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="on-dark relative isolate overflow-hidden bg-night">
        <Image src="/images/valley.webp" alt="Вечерняя долина с рекой и деревянным домиком у костра" fill priority sizes="100vw" className="-z-10 object-cover object-[60%_50%]" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night/95 via-night/25 to-night/0" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night/65 via-night/15 to-transparent" />
        <div className="container-site flex min-h-[min(calc(100svh-64px),820px)] flex-col justify-end pt-24 pb-14 sm:pb-20">
          <p className="eyebrow animate-[page-in_.7s_var(--ease-out-soft)_both] text-[#e3d8c3]">
            Java Edition {site.server.version} · Vanilla Survival
          </p>
          <h1 id="hero-title" className="mt-4 max-w-[760px] animate-[page-in_.8s_.08s_var(--ease-out-soft)_both] text-[44px] leading-[1.05] text-[#fbf7ef] sm:text-[60px] lg:text-[72px]">
            Тихий мир, который строят вместе
          </h1>
          <p className="mt-5 max-w-[540px] animate-[page-in_.8s_.16s_var(--ease-out-soft)_both] text-[17px] leading-relaxed text-[#e6dfd1] sm:text-lg">
            {site.name} — ванильный survival без доната и спешки. Дома у реки, общие экспедиции и соседи, которых знаешь по нику.
          </p>
          <div className="mt-8 flex animate-[page-in_.8s_.24s_var(--ease-out-soft)_both] flex-wrap items-center gap-3">
            <Link href="/how-to-play" className="btn btn-light">Начать играть <ArrowRight width={18} height={18} /></Link>
            <Link href="/about" className="btn btn-outline-light">О сервере</Link>
          </div>
          <div className="mt-10 flex animate-[page-in_.8s_.32s_var(--ease-out-soft)_both] flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:gap-8">
            <CopyIp tone="dark" />
            <Link href="/status" className="inline-flex min-h-11 items-center gap-2.5 text-[15px] text-[#e6dfd1] hover:text-white">
              <StatusDot state={status.online ? "online" : "offline"} />
              {status.online ? <span><b className="font-semibold text-white">{status.playersOnline}</b> из {status.playersMax} игроков онлайн</span> : "Сервер сейчас недоступен"}
              {status.source === "demo" && <Badge tone="dark">демо</Badge>}
            </Link>
          </div>
        </div>
      </section>

      {/* SERVER OVERVIEW */}
      <Section labelledBy="overview-title">
        <div className="container-site grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">О сервере</p>
            <h2 id="overview-title" className="text-[30px] leading-[1.2] sm:text-[38px]">
              Здесь не нужно торопиться. Мир не сбросят, ресурсы не продают, а лучший дом — тот, что строили всё лето.
            </h2>
            <Link href="/about" className="link-arrow mt-8">Философия и принципы <ArrowRight width={18} height={18} /></Link>
          </Reveal>
          <Reveal delay={100}>
            <dl className="divide-y divide-line border-y border-line">
              {[
                ["Версия", `Java Edition ${site.server.version}`],
                ["Режим", "Survival, сложная"],
                ["Доступ", "Whitelist по заявке"],
                ["Донат", "Нет и не будет"],
                ["Сезон", "Первый, с сентября 2026"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-ink-2">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* PRINCIPLES */}
      <Section tone="muted" labelledBy="principles-title">
        <div className="container-site">
          <SectionHeading id="principles-title" eyebrow="Особенности" title="Что делает Тихолесье другим" link={{ href: "/rules", label: "Правила сервера" }} />
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 70}>
                <span className="grid size-11 place-items-center rounded-md bg-moss text-white"><p.icon /></span>
                <h3 className="mt-5 text-[21px]">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* WORLD */}
      <Section labelledBy="world-title">
        <div className="container-site">
          <SectionHeading id="world-title" eyebrow="Мир" title="Четыре региона и много пустого горизонта" intro="Долина у спавна, торговый посёлок, морская гавань и суровый север. Остальное — ждёт первопроходцев." link={{ href: "/world", label: "Исследовать мир" }} />
          <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] lg:grid-rows-2">
            {[regions[2], regions[3], regions[1]].map((r, i) => (
              <Reveal key={r.slug} delay={i * 80} className={i === 0 ? "lg:row-span-2" : ""}>
                <Link href={`/world#${r.slug}`} className="group relative block h-full overflow-hidden rounded-lg bg-night">
                  <div className={i === 0 ? "relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px]" : "relative aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[250px]"}>
                    <Image src={r.image} alt={r.imageAlt} fill sizes={i === 0 ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 440px, 100vw"} className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/90 via-night/40 to-transparent p-5 pt-16 sm:p-6 sm:pt-20">
                    <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#d8cfbe]">{r.biome}</p>
                    <p className="mt-1 flex items-center justify-between gap-4 font-display text-[22px] text-white sm:text-[26px]">
                      {r.name}
                      <ArrowRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-ink-2">
            Ещё больше кадров — в <Link href="/gallery" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4 hover:decoration-moss">галерее игроков</Link>.
          </p>
        </div>
      </Section>

      {/* NEWS */}
      <Section tone="muted" labelledBy="news-title">
        <div className="container-site">
          <SectionHeading id="news-title" eyebrow="Новости" title="Что происходит на сервере" link={{ href: "/news", label: "Все новости" }} />
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            <Reveal><NewsCard post={featured} /></Reveal>
            <Reveal delay={100} className="flex flex-col">
              {rest.slice(0, 3).map((p) => <NewsCard key={p.slug} post={p} variant="compact" />)}
              <div className="border-t border-line" />
            </Reveal>
          </div>
        </div>
      </Section>

      {/* COMMUNITY */}
      <Section tone="dark" labelledBy="community-title">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4 text-[#b9b2a3]">Сообщество</p>
            <h2 id="community-title" className="text-[30px] text-[#f4efe6] sm:text-[38px]">Жизнь сервера — в Discord</h2>
            <p className="mt-4 max-w-[480px] text-[17px] leading-relaxed text-[#c9c1b1]">
              Заявки, анонсы, голосовые вечера, обмен координатами и фото построек. Заходите познакомиться ещё до первого входа в игру.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-light"><Discord /> Открыть Discord</a>
              <Link href="/community" className="btn btn-outline-light">О сообществе</Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/12 pt-6">
              {communityStats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-[#a9a294]">{s.label}</dt>
                  <dd className="font-display text-[28px] text-white sm:text-[32px]">{s.value}</dd>
                </div>
              ))}
            </dl>
            {site.demoMode && <p className="mt-4 font-mono text-[12px] text-[#a9a294]">* демонстрационные значения</p>}
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4 text-[#b9b2a3]">Ближайшие события</p>
            <ul className="divide-y divide-white/12 border-y border-white/12">
              {upcoming.map((e) => (
                <li key={e.title} className="flex gap-5 py-5">
                  <div className="w-16 shrink-0 text-center">
                    <Calendar className="mx-auto text-[#d9c9a8]" />
                    <p className="mt-1 font-mono text-[13px] text-[#e9e3d6]">{formatShortDate(e.date)}</p>
                  </div>
                  <div>
                    <h3 className="text-[20px] text-[#f4efe6]">{e.title}</h3>
                    <p className="mt-1 text-[15px] text-[#c9c1b1]">{e.description}</p>
                    <p className="mt-2 text-sm text-[#a9a294]">{e.place}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/players" className="link-arrow mt-6 text-[#d9c9a8]">Кто здесь живёт <ArrowRight width={18} height={18} /></Link>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
