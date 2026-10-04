import "server-only";
import { site } from "@/lib/site";
import type { ServerStatus } from "@/lib/types";

/**
 * Получение статуса сервера.
 *
 * Если задан MC_SERVER_HOST — используется публичный API mcstatus.io (Server List Ping).
 * Его можно заменить на собственный эндпоинт (например, плагин/мод-агент или RCON-прокси),
 * сохранив форму ServerStatus.
 *
 * Без MC_SERVER_HOST возвращаются демо-данные с source: "demo" — интерфейс явно помечает их.
 */
export async function getServerStatus(): Promise<ServerStatus> {
  const host = process.env.MC_SERVER_HOST;
  if (!host) return demoStatus();

  const port = process.env.MC_SERVER_PORT ?? "25565";
  const started = performance.now();
  try {
    const res = await fetch(`https://api.mcstatus.io/v2/status/java/${host}:${port}`, {
      next: { revalidate: 30 },
      signal: AbortSignal.timeout(5000),
    });
    const latencyMs = Math.round(performance.now() - started);
    if (!res.ok) throw new Error(`mcstatus ${res.status}`);
    const data = (await res.json()) as McStatusResponse;

    return {
      online: data.online,
      playersOnline: data.players?.online ?? 0,
      playersMax: data.players?.max ?? 0,
      version: data.version?.name_clean ?? site.server.version,
      host: site.server.ip,
      motd: data.motd?.clean,
      latencyMs,
      startedAt: null, // Server List Ping не сообщает аптайм — нужен собственный агент
      checkedAt: new Date().toISOString(),
      samplePlayers: data.players?.list?.map((p) => p.name_clean),
      source: "live",
    };
  } catch {
    return {
      online: false,
      playersOnline: 0,
      playersMax: 0,
      version: site.server.version,
      host: site.server.ip,
      latencyMs: null,
      startedAt: null,
      checkedAt: new Date().toISOString(),
      source: "live",
    };
  }
}

function demoStatus(): ServerStatus {
  // Детерминированное «дыхание» онлайна, чтобы демо выглядело правдоподобно, но стабильно
  const now = new Date();
  const hour = now.getUTCHours() + 3; // МСК
  const base = [4, 3, 2, 2, 1, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 14, 17, 21, 23, 22, 18, 12, 7][hour % 24];
  return {
    online: true,
    playersOnline: base,
    playersMax: 60,
    version: site.server.version,
    host: site.server.ip,
    motd: "Тихолесье · ванильный survival",
    latencyMs: 38,
    startedAt: new Date(now.getTime() - (3 * 86_400_000 + 7 * 3_600_000)).toISOString(),
    checkedAt: now.toISOString(),
    samplePlayers: ["Ольха", "kestrel_", "Moroshka"].slice(0, Math.min(3, base)),
    source: "demo",
  };
}

interface McStatusResponse {
  online: boolean;
  version?: { name_clean?: string };
  players?: { online: number; max: number; list?: { name_clean: string }[] };
  motd?: { clean?: string };
}
