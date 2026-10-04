import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { PlayerAvatar } from "@/components/features/PlayerAvatar";
import { achievements, communityStats, events } from "@/data/community";
import { gallery } from "@/data/gallery";
import { getPlayers } from "@/lib/services/players";
import { getDiscordSummary } from "@/lib/services/discord";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/format";
import { ArrowRight, Discord, MapPin } from "@/components/ui/icons";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Сообщество",
  description: "Discord, события, достижения игроков и снимки сообщества Тихолесья.",
  path: "/community",
});

const channels = [
  ["#новости", "анонсы и обновления"],
  ["#заявка", "вход на сервер"],
  ["#скриншоты", "ваши кадры"],
  ["#торговля", "обмен и заказы"],
  ["#поддержка", "вопросы к администрации"],
];

export default async function CommunityPage() {
  const [players, discord] = await Promise.all([getPlayers(), getDiscordSummary()]);
  const upcoming = events.filter((e) => e.status === "upcoming");
  const past = events.filter((e) => e.status === "past");
  const shots = gallery.filter((g) => ["valley-cottage", "village-lantern", "sakura-pond", "caves-bridge"].includes(g.id));

  return (
    <>
      <PageHeader crumbs={[{ label: "Сообщество" }]} eyebrow="Сообщество" title="Люди, ради которых стоит заходить" intro="Сервер — это не только мир, но и вечера в голосовом канале, общие стройки и истории, которые потом пересказывают новичкам." />

      {/* Discord */}
      <Section labelledBy="discord" className="pt-12 sm:pt-16">
        <div className="container-site">
          <Reveal className="on-dark grid overflow-hidden rounded-lg bg-moss-deep lg:grid-cols-[1.1fr_1fr]">
            <div className="p-7 sm:p-10 lg:p-12">
              <span className="grid size-12 place-items-center rounded-md bg-[#5865f2] text-white"><Discord width={24} height={24} /></span>
              <h2 id="discord" className="mt-6 text-[30px] text-[#f4efe6] sm:text-[36px]">Discord — наш общий дом</h2>
              <p className="mt-3 max-w-[460px] text-[17px] text-[#c9c1b1]">Заявки, новости, поддержка и голосовые каналы. Большинство событий рождаются именно там.</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-light"><Discord /> Присоединиться</a>
                {discord.presenceCount !== null && (
                  <span className="text-[15px] text-[#c9c1b1]"><b className="text-white">{discord.presenceCount}</b> сейчас в сети {discord.source === "demo" && <Badge tone="dark" className="ml-1">демо</Badge>}</span>
                )}
              </div>
            </div>
            <ul className="divide-y divide-white/10 border-t border-white/10 lg:border-t-0 lg:border-l">
              {channels.map(([c, d]) => (
                <li key={c} className="flex items-center justify-between gap-4 px-7 py-4 sm:px-10">
                  <span className="font-mono text-[15px] text-[#f4efe6]">{c}</span>
                  <span className="text-right text-sm text-[#a9a294]">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {communityStats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse border-t border-line pt-4">
                <dt className="text-sm text-ink-2">{s.label}</dt>
                <dd className="font-display text-[28px] sm:text-[34px]">{s.value}</dd>
              </div>
            ))}
          </dl>
          <DemoNotice className="mt-4" />
        </div>
      </Section>

      {/* Events */}
      <Section tone="muted" labelledBy="events">
        <div className="container-site">
          <SectionHeading id="events" eyebrow="События" title="Что мы делаем вместе" intro="События организуют игроки и администрация. Предложить своё можно в #идеи." />
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="eyebrow mb-4">Скоро</h3>
              <ul className="space-y-4">
                {upcoming.map((e) => (
                  <li key={e.title} className="card p-6">
                    <div className="flex flex-wrap items-center gap-3"><Badge tone="ok">Скоро</Badge><time dateTime={e.date} className="text-sm text-ink-2">{formatDate(e.date)}</time></div>
                    <h4 className="mt-3 font-display text-[22px]">{e.title}</h4>
                    <p className="mt-2 text-ink-2">{e.description}</p>
                    <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-ink-2"><MapPin width={15} height={15} /> {e.place}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow mb-4">Прошли</h3>
              <ul className="divide-y divide-line border-y border-line">
                {past.map((e) => (
                  <li key={e.title} className="py-5">
                    <time dateTime={e.date} className="text-sm text-ink-2">{formatDate(e.date)}</time>
                    <h4 className="mt-1 font-display text-[20px]">{e.title}</h4>
                    <p className="mt-1 text-[15px] text-ink-2">{e.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Achievements */}
      <Section labelledBy="achievements">
        <div className="container-site">
          <SectionHeading id="achievements" eyebrow="Летопись" title="Достижения игроков" intro="То, о чём будут рассказывать в конце сезона." />
          <ol className="grid gap-4 md:grid-cols-3">
            {achievements.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 70} className="card flex flex-col p-6">
                <span className="font-mono text-sm text-ember">#{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[21px]">{a.title}</h3>
                <p className="mt-2 flex-1 text-[15px] text-ink-2">{a.detail}</p>
                <p className="mt-5 border-t border-line pt-4 text-sm"><span className="font-semibold">{a.who}</span> <span className="text-ink-2">· {formatDate(a.date)}</span></p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* People + Photos */}
      <Section tone="muted" labelledBy="people">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <h2 id="people" className="text-[28px] sm:text-[32px]">Жители</h2>
            <p className="mt-2 text-ink-2">Несколько лиц сервера. Полный список и статистика — на странице игроков.</p>
            <ul className="mt-6 space-y-2">
              {players.slice(0, 5).map((p) => (
                <li key={p.uuid} className="flex items-center gap-3 rounded-md bg-card px-3 py-2.5">
                  <PlayerAvatar nick={p.nick} size={36} />
                  <span className="font-mono">{p.nick}</span>
                  <span className="ml-auto truncate text-sm text-ink-2">{p.settlement}</span>
                </li>
              ))}
            </ul>
            <DemoNotice className="mt-4" />
            <Link href="/players" className="link-arrow mt-6 flex">Все игроки <ArrowRight width={18} height={18} /></Link>
          </div>
          <div>
            <h2 className="text-[28px] sm:text-[32px]">Снимки сообщества</h2>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {shots.map((s) => (
                <li key={s.id} className="relative aspect-square overflow-hidden rounded-md">
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 320px, 50vw" className="object-cover" />
                </li>
              ))}
            </ul>
            <Link href="/gallery" className="link-arrow mt-6 flex">Открыть галерею <ArrowRight width={18} height={18} /></Link>
          </div>
        </div>
      </Section>
    </>
  );
}
