"use client";

import { useMemo, useState } from "react";
import type { Player } from "@/lib/types";
import { roleLabel, statusLabel } from "@/data/players";
import { PlayerAvatar } from "./PlayerAvatar";
import { Badge, StatusDot } from "@/components/ui/Badge";
import { Search } from "@/components/ui/icons";
import { formatNumber, formatDate } from "@/lib/format";
import { cn } from "@/lib/format";

type Sort = "playtime" | "blocks" | "distance" | "joined";
const sorts: { id: Sort; label: string }[] = [
  { id: "playtime", label: "Время в игре" },
  { id: "blocks", label: "Блоков поставлено" },
  { id: "distance", label: "Пройдено" },
  { id: "joined", label: "Дата прихода" },
];

export function PlayersDirectory({ players }: { players: Player[] }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("playtime");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return players
      .filter((p) => (!term || p.nick.toLowerCase().includes(term) || p.settlement?.toLowerCase().includes(term)) && (!onlineOnly || p.status === "online"))
      .sort((a, b) => {
        if (sort === "playtime") return b.stats.playtimeHours - a.stats.playtimeHours;
        if (sort === "blocks") return b.stats.blocksPlaced - a.stats.blocksPlaced;
        if (sort === "distance") return b.stats.distanceKm - a.stats.distanceKm;
        return a.joinedAt.localeCompare(b.joinedAt);
      });
  }, [players, q, sort, onlineOnly]);

  return (
    <div>
      <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
        <div>
          <label htmlFor="player-search" className="field-label">Поиск</label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-2" width={18} height={18} />
            <input id="player-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ник или поселение" className="field pl-10" />
          </div>
        </div>
        <div>
          <label htmlFor="player-sort" className="field-label">Сортировка</label>
          <select id="player-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="field pr-9">
            {sorts.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <label className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border border-line-strong bg-card px-3.5 text-[15px]">
          <input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} className="size-4 accent-moss" />
          Только в игре
        </label>
      </div>

      <p className="sr-only" aria-live="polite">Найдено игроков: {list.length}</p>

      {list.length === 0 ? (
        <div className="card p-10 text-center text-ink-2">Никого не нашли. Попробуйте другой ник.</div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {list.map((p) => (
            <li key={p.uuid} className="card flex flex-col p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <PlayerAvatar nick={p.nick} size={56} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="truncate font-mono text-lg font-medium">{p.nick}</h3>
                    <Badge tone={p.role === "admin" || p.role === "moderator" ? "ember" : p.role === "newcomer" ? "neutral" : "moss"}>{roleLabel[p.role]}</Badge>
                  </div>
                  <p className="mt-1 flex items-center gap-2 text-sm text-ink-2">
                    <StatusDot state={p.status} /> {statusLabel[p.status]}
                    {p.settlement && <><span aria-hidden>·</span> {p.settlement}</>}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[15px] text-ink-2">{p.bio}</p>
              <dl className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-line bg-line text-center">
                <Stat label="В игре" value={`${p.stats.playtimeHours} ч`} active={sort === "playtime"} />
                <Stat label="Блоков" value={formatNumber(p.stats.blocksPlaced)} active={sort === "blocks"} />
                <Stat label="Пройдено" value={`${p.stats.distanceKm} км`} active={sort === "distance"} />
              </dl>
              <p className="mt-4 text-[13px] text-ink-2">
                На сервере с {formatDate(p.joinedAt)} · {p.stats.advancements} достижений · смертей: {p.stats.deaths}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Stat({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className={cn("bg-card px-2 py-3", active && "bg-moss-soft/60")}>
      <dt className="text-[12px] text-ink-2">{label}</dt>
      <dd className="mt-0.5 font-mono text-[15px] font-medium">{value}</dd>
    </div>
  );
}
