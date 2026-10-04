import "server-only";

export interface DiscordSummary {
  presenceCount: number | null;
  source: "live" | "demo";
}

/**
 * Онлайн в Discord через публичный виджет (нужно включить Widget в настройках сервера Discord).
 */
export async function getDiscordSummary(): Promise<DiscordSummary> {
  const id = process.env.DISCORD_GUILD_ID;
  if (!id) return { presenceCount: 86, source: "demo" };
  try {
    const res = await fetch(`https://discord.com/api/guilds/${id}/widget.json`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error();
    const data = (await res.json()) as { presence_count?: number };
    return { presenceCount: data.presence_count ?? null, source: "live" };
  } catch {
    return { presenceCount: null, source: "live" };
  }
}
