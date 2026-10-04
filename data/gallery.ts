import type { GalleryImage } from "@/lib/types";

/**
 * Галерея. Изображения лежат в public/images.
 * Сейчас это концепт-кадры (сгенерированы для макета) — замените их реальными скриншотами сервера.
 */
export const gallery: GalleryImage[] = [
  { id: "valley", src: "/images/valley.webp", width: 2000, height: 1116, title: "Долина у Тихой реки", author: "Ольха", tag: "природа", coords: "120 / 68 / -340", alt: "Вечерняя долина с рекой, берёзовым лесом и деревянным домиком, у которого горит костёр" },
  { id: "village-lantern", src: "/images/village-lantern.webp", width: 700, height: 1000, title: "Фонари Торговой улицы", author: "kestrel_", tag: "постройки", coords: "-410 / 72 / 95", alt: "Деревянный дом с фонарём и цветочной клумбой на вечерней улице" },
  { id: "harbor", src: "/images/harbor.webp", width: 1600, height: 1073, title: "Гавань Маяка", author: "Moroshka", tag: "постройки", coords: "1880 / 63 / 512", alt: "Деревянный пирс, маяк на скале и парусная лодка в утреннем тумане" },
  { id: "caves", src: "/images/caves.webp", width: 1600, height: 1073, title: "Пышные пещеры под Ельником", author: "Grifel", tag: "подземелья", coords: "-760 / -22 / -1210", alt: "Подземная пещера со светящимися ягодами на лианах, озером и деревянным мостиком" },
  { id: "sakura-pond", src: "/images/sakura-pond.webp", width: 800, height: 693, title: "Пруд у чайного дома", author: "Ольха", tag: "природа", coords: "2240 / 70 / -880", alt: "Пруд с кувшинками и каменными фонарями среди вишнёвых деревьев" },
  { id: "taiga", src: "/images/taiga.webp", width: 1600, height: 1073, title: "Северная застава", author: "Vetrov", tag: "постройки", coords: "-180 / 110 / -2650", alt: "Заснеженная тайга ночью: деревянная хижина с тёплым светом и каменная крепость на холме" },
  { id: "harbor-lighthouse", src: "/images/harbor-lighthouse.webp", width: 650, height: 900, title: "Маяк на рассвете", author: "Moroshka", tag: "постройки", coords: "1904 / 88 / 498", alt: "Белый каменный маяк на краю обрыва" },
  { id: "village", src: "/images/village.webp", width: 1600, height: 1073, title: "Рынок в сумерках", author: "kestrel_", tag: "события", coords: "-402 / 71 / 120", alt: "Площадь посёлка с рыночной лавкой и фонарями в вечерних сумерках" },
  { id: "caves-bridge", src: "/images/caves-bridge.webp", width: 900, height: 700, title: "Мостик над подземным озером", author: "Grifel", tag: "подземелья", coords: "-744 / -24 / -1198", alt: "Деревянный мостик с фонарями над тёмной водой в пещере" },
  { id: "sakura", src: "/images/sakura.webp", width: 1600, height: 1073, title: "Чайный дом в Вишнёвой роще", author: "Ольха", tag: "постройки", coords: "2210 / 71 / -900", alt: "Деревянный чайный дом у пруда в роще розовых вишнёвых деревьев" },
  { id: "taiga-keep", src: "/images/taiga-keep.webp", width: 900, height: 800, title: "Стены заставы", author: "Vetrov", tag: "постройки", coords: "-150 / 118 / -2680", alt: "Каменная крепость из булыжника и глубинного сланца под звёздным небом" },
  { id: "valley-cottage", src: "/images/valley-cottage.webp", width: 900, height: 666, title: "Первый дом сезона", author: "Ольха", tag: "события", coords: "132 / 66 / -322", alt: "Небольшой деревянный дом у реки с горящими окнами и костром" },
];
