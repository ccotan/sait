import { players as demoPlayers } from "@/data/players";
import type { Player } from "@/lib/types";

/**
 * Источник игроков. Сейчас — demo data из data/players.ts.
 * Для подключения реальной базы замените тело функций на запрос к вашему API
 * (например, экспорт статистики из world/stats/*.json или сервис-агент на сервере).
 */
export async function getPlayers(): Promise<Player[]> {
  return demoPlayers;
}

export async function getPlayer(nick: string): Promise<Player | undefined> {
  return demoPlayers.find((p) => p.nick.toLowerCase() === nick.toLowerCase());
}

export const playersSource = "demo" as const;

/** Аватар по UUID/нику. mc-heads.net отдаёт голову скина; для demo используется локальный fallback. */
export function avatarUrl(player: Pick<Player, "nick" | "uuid">, size = 64) {
  return `https://mc-heads.net/avatar/${encodeURIComponent(player.nick)}/${size}`;
}
