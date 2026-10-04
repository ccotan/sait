import type { Player } from "@/lib/types";

/** ДЕМО-ДАННЫЕ. Ники и статистика вымышлены — замените на данные из API сервера. */
export const players: Player[] = [
  { uuid: "demo-0001", nick: "Ольха", role: "admin", status: "online", joinedAt: "2026-09-01", settlement: "Тихая долина", bio: "Основательница сервера. Строит медленно и красиво, отвечает в Discord.", stats: { playtimeHours: 212, blocksPlaced: 84210, distanceKm: 410, deaths: 6, advancements: 88 } },
  { uuid: "demo-0002", nick: "kestrel_", role: "moderator", status: "online", joinedAt: "2026-09-01", settlement: "Торговая улица", bio: "Держит лавку редстоуна и помогает новичкам с первой фермой.", stats: { playtimeHours: 168, blocksPlaced: 51200, distanceKm: 302, deaths: 14, advancements: 74 } },
  { uuid: "demo-0003", nick: "Moroshka", role: "builder", status: "away", joinedAt: "2026-09-02", settlement: "Гавань Маяка", bio: "Автор маяка и верфи. Любит туман, корабли и большие окна.", stats: { playtimeHours: 141, blocksPlaced: 97340, distanceKm: 188, deaths: 9, advancements: 61 } },
  { uuid: "demo-0004", nick: "Vetrov", role: "resident", status: "offline", joinedAt: "2026-09-03", settlement: "Северная застава", bio: "Строит северную крепость и водит рейды в Энд.", stats: { playtimeHours: 156, blocksPlaced: 66010, distanceKm: 521, deaths: 21, advancements: 92 } },
  { uuid: "demo-0005", nick: "Grifel", role: "resident", status: "online", joinedAt: "2026-09-05", settlement: "Ельник", bio: "Шахтёр, картограф и автор ледяной дороги в Незере.", stats: { playtimeHours: 133, blocksPlaced: 40980, distanceKm: 744, deaths: 17, advancements: 70 } },
  { uuid: "demo-0006", nick: "lumen.moth", role: "resident", status: "offline", joinedAt: "2026-09-08", settlement: "Вишнёвая роща", bio: "Садовод: пчёлы, цветы и самая аккуратная ферма тыкв.", stats: { playtimeHours: 87, blocksPlaced: 22140, distanceKm: 96, deaths: 4, advancements: 43 } },
  { uuid: "demo-0007", nick: "Sever_Pine", role: "resident", status: "away", joinedAt: "2026-09-12", settlement: "Северная застава", bio: "Помогает Vetrov со стенами. Пишет летопись сервера.", stats: { playtimeHours: 64, blocksPlaced: 18700, distanceKm: 140, deaths: 11, advancements: 38 } },
  { uuid: "demo-0008", nick: "tikhon", role: "newcomer", status: "offline", joinedAt: "2026-09-28", bio: "Только пришёл. Ищет соседей у реки.", stats: { playtimeHours: 9, blocksPlaced: 1320, distanceKm: 22, deaths: 3, advancements: 12 } },
];

export const roleLabel: Record<Player["role"], string> = {
  admin: "Администратор",
  moderator: "Модератор",
  builder: "Архитектор",
  resident: "Житель",
  newcomer: "Новичок",
};

export const statusLabel: Record<Player["status"], string> = {
  online: "В игре",
  away: "Отошёл",
  offline: "Не в сети",
};
