"use client";

import type { ServerStatus } from "@/lib/types";
import { useServerStatus } from "@/lib/hooks/useServerStatus";
import { formatDuration } from "@/lib/format";
import { Badge, StatusDot } from "@/components/ui/Badge";
import { CopyIp } from "@/components/ui/CopyIp";
import { Refresh } from "@/components/ui/icons";
import { cn } from "@/lib/format";

/** Полная панель статуса для /status. Данные: SSR + клиентский опрос /api/status каждые 30 с. */
export function StatusPanel({ initial }: { initial: ServerStatus }) {
  const { status = initial, loading, error, refresh } = useServerStatus(initial, 30_000);
  const pct = status.playersMax ? Math.min(100, Math.round((status.playersOnline / status.playersMax) * 100)) : 0;
  const checked = new Date(status.checkedAt).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="space-y-4">
      <div className="card overflow-hidden">
        <div className={cn("flex flex-col gap-6 border-b border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8", status.online ? "bg-ok-soft/50" : "bg-danger-soft/60")}>
          <div className="flex items-center gap-4">
            <span className={cn("grid size-14 place-items-center rounded-md", status.online ? "bg-ok text-white" : "bg-danger text-white")} aria-hidden>
              <StatusDot state={status.online ? "online" : "offline"} className="size-3 bg-white" />
            </span>
            <div>
              <p className="eyebrow">Состояние</p>
              <p className="font-display text-[30px] leading-tight">{status.online ? "Сервер работает" : "Сервер недоступен"}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {status.source === "demo" ? <Badge tone="ember">Демо-данные</Badge> : <Badge tone="ok">Live</Badge>}
            <button type="button" onClick={refresh} disabled={loading} className="btn btn-secondary btn-sm" aria-label="Обновить статус">
              <Refresh width={16} height={16} className={cn(loading && "animate-spin")} /> Обновить
            </button>
          </div>
        </div>

        <dl className="grid grid-cols-2 lg:grid-cols-4">
          <Metric label="Игроков онлайн" value={status.online ? String(status.playersOnline) : "—"} />
          <Metric label="Максимум" value={status.online ? String(status.playersMax) : "—"} />
          <Metric label="Задержка" value={status.latencyMs !== null ? `${status.latencyMs} мс` : "—"} hint="время ответа API статуса" />
          <Metric label="Время работы" value={status.startedAt ? formatDuration(status.startedAt) : "—"} hint={status.startedAt ? undefined : "источник не сообщает"} />
        </dl>

        {status.online && (
          <div className="border-t border-line px-6 py-5 sm:px-8">
            <div className="flex justify-between text-sm text-ink-2"><span>Заполненность</span><span className="font-mono">{pct}%</span></div>
            <div className="mt-2 h-2 overflow-hidden rounded-sm bg-paper-2" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Заполненность сервера">
              <div className="h-full bg-moss transition-[width] duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-6">
          <p className="eyebrow">Подключение</p>
          <dl className="mt-4 space-y-3 text-[15px]">
            <Row k="Версия" v={status.version} />
            <Row k="Издание" v="Java Edition" />
            <Row k="Адрес" v={status.host} mono />
          </dl>
          <CopyIp className="mt-5 w-full" />
        </div>
        <div className="card p-6">
          <p className="eyebrow">Сейчас в игре</p>
          {status.samplePlayers && status.samplePlayers.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {status.samplePlayers.map((n) => <li key={n} className="rounded-sm bg-paper-2 px-2.5 py-1 font-mono text-sm">{n}</li>)}
            </ul>
          ) : (
            <p className="mt-4 text-ink-2">Сервер не передаёт список игроков или сейчас никого нет.</p>
          )}
          <p className="mt-6 text-sm text-ink-2" aria-live="polite">
            Проверено в <span className="font-mono">{checked}</span>{error && " · не удалось обновить, показаны последние данные"}
          </p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="border-line p-6 not-last:border-r max-lg:nth-2:border-r-0 max-lg:nth-[-n+2]:border-b sm:p-8">
      <dt className="text-sm text-ink-2">{label}</dt>
      <dd className="mt-1 font-display text-[28px] leading-tight sm:text-[32px]">{value}</dd>
      {hint && <dd className="mt-1 text-[13px] text-ink-2">{hint}</dd>}
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-3 last:border-0">
      <dt className="text-ink-2">{k}</dt>
      <dd className={cn("text-right font-medium", mono && "font-mono text-[14px] break-all")}>{v}</dd>
    </div>
  );
}
