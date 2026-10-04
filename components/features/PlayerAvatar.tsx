import { cn } from "@/lib/format";

/**
 * Пиксельный аватар 8×8, детерминированно построенный из ника.
 * Используется для demo data; при подключении API замените на голову скина (lib/services/players → avatarUrl).
 */
const skins = ["#e8c19f", "#d7a77f", "#b98559", "#8d5f3e", "#f0d2b4"];
const hairs = ["#3b2a1e", "#6b4a2b", "#1f1b19", "#a8743d", "#d9c08a", "#5a3c2c", "#8a8f93"];
const eyes = ["#2f5f8f", "#3b6346", "#4a3424", "#5a5f66"];
const shirts = ["#3b6346", "#4a6f8f", "#a3532a", "#6d5a8a", "#7a7064"];

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

export function PlayerAvatar({ nick, size = 56, className }: { nick: string; size?: number; className?: string }) {
  const h = hash(nick);
  const skin = skins[h % skins.length];
  const hair = hairs[(h >> 3) % hairs.length];
  const eye = eyes[(h >> 6) % eyes.length];
  const shirt = shirts[(h >> 9) % shirts.length];
  const fringe = (h >> 12) % 3; // форма чёлки
  const beard = (h >> 15) % 5 === 0;

  const px: { x: number; y: number; c: string }[] = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
    let c = skin;
    if (y < 2) c = hair;
    if (y === 2 && (x === 0 || x === 7 || (fringe === 1 && x < 3) || (fringe === 2 && x > 4))) c = hair;
    if (y === 4 && (x === 1 || x === 5)) c = "#f4f1ea";
    if (y === 4 && (x === 2 || x === 6)) c = eye;
    if (y === 6 && x >= 3 && x <= 4) c = "#8a5240";
    if (beard && y === 7 && x >= 2 && x <= 5) c = hair;
    if (y === 7 && (x === 0 || x === 7)) c = shirt;
    px.push({ x, y, c });
  }
  return (
    <svg viewBox="0 0 8 8" width={size} height={size} shapeRendering="crispEdges" role="img" aria-label={`Аватар игрока ${nick}`} className={cn("shrink-0 rounded-sm", className)}>
      {px.map((p, i) => <rect key={i} x={p.x} y={p.y} width="1" height="1" fill={p.c} />)}
    </svg>
  );
}
