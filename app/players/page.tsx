import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { PlayersDirectory } from "@/components/features/PlayersDirectory";
import { getPlayers } from "@/lib/services/players";
import { pageMetadata } from "@/lib/metadata";
import { formatNumber } from "@/lib/format";

export const metadata = pageMetadata({
  title: "Игроки",
  description: "Жители Тихолесья: ники, статусы, поселения и игровая статистика.",
  path: "/players",
});

export default async function PlayersPage() {
  const players = await getPlayers();
  const totals = {
    count: players.length,
    online: players.filter((p) => p.status === "online").length,
    hours: players.reduce((s, p) => s + p.stats.playtimeHours, 0),
    blocks: players.reduce((s, p) => s + p.stats.blocksPlaced, 0),
  };
  return (
    <>
      <PageHeader crumbs={[{ label: "Игроки" }]} eyebrow="Игроки" title="Жители сервера" intro="Кто где живёт, чем занимается и сколько уже успел. Статистика обновляется из игровых данных сервера." aside={<DemoNotice />} />
      <Section className="pt-10 sm:pt-12">
        <div className="container-site">
          <dl className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[["Жителей", formatNumber(totals.count)], ["Сейчас в игре", formatNumber(totals.online)], ["Часов вместе", formatNumber(totals.hours)], ["Блоков поставлено", formatNumber(totals.blocks)]].map(([k, v]) => (
              <div key={k} className="card p-5"><dt className="text-sm text-ink-2">{k}</dt><dd className="mt-1 font-display text-[28px]">{v}</dd></div>
            ))}
          </dl>
          <PlayersDirectory players={players} />
        </div>
      </Section>
    </>
  );
}
