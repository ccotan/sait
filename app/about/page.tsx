import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/features/CtaBand";
import { Check, Close, ArrowRight } from "@/components/ui/icons";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "О сервере",
  description: `Философия ${site.name}: чистая ваниль, без доната, сообщество по заявке и мир без вайпов. Для кого подходит сервер и чем он отличается от других.`,
  path: "/about",
});

const vanillaYes = ["Обычный survival на сложной сложности", "Ванильная генерация, механики и фермы", "Карта мира в браузере (по мере запуска)", "Лёгкие технические плагины: анти-чит, логи блоков, бэкапы"];
const vanillaNo = ["Приваты, /home, /tpa, /spawn", "Экономика, магазины и киты", "Донат-привилегии и кейсы", "Кастомные предметы и мобы"];

const audiences = [
  { title: "Строителям", text: "Тем, кто готов месяц доводить фасад и хочет, чтобы через год его постройку увидели соседи." },
  { title: "Исследователям", text: "Тем, кто уходит за горизонт с картой и лодкой и возвращается с координатами древнего города." },
  { title: "Тем, кто устал от шума", text: "Если надоели серверы с рекламой в чате, пятью валютами и бесконечными командами." },
  { title: "Компаниям друзей", text: "Приходите вместе — поселение на несколько человек здесь обычное дело." },
];

const differences = [
  ["Ставка на атмосферу", "Мы модерируем не только читы, но и тон: у нас нет «рынка доната» и токсичного чата."],
  ["Небольшой масштаб", "До 60 игроков одновременно. Достаточно, чтобы встречать людей, и мало, чтобы не теряться."],
  ["Заметные события", "Ярмарки, экспедиции, конкурсы построек — всё делают игроки, без плагинов-ивентов."],
  ["Прозрачность", "Решения администрации, изменения правил и планы сезона публикуются в новостях."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "О сервере" }]} eyebrow="О сервере" title="Ванильный survival, каким его хочется помнить" intro="Тихолесье — небольшой сервер для тех, кому важны неспешная игра, красивые постройки и люди вокруг. Ниже — кто мы, во что верим и чего здесь не будет." />

      <Section labelledBy="philosophy">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Философия</p>
            <h2 id="philosophy" className="text-[30px] sm:text-[36px]">Игра — это то, что происходит между игроками</h2>
          </Reveal>
          <Reveal delay={100} className="prose-site text-ink-2">
            <p>Мы не пытаемся «улучшить» Minecraft. Ванильная игра уже даёт всё: огромный мир, ресурсы, которые надо добыть, и ночь, которую надо пережить. Чего ей не хватает в одиночку — это соседей.</p>
            <p>Поэтому всё, что мы делаем, — про людей: короткая заявка вместо открытого входа, мир, который живёт целый сезон, и события, которые придумывают сами игроки. Сервер не зарабатывает на вас, и поэтому ему не нужно, чтобы вы торопились.</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted" labelledBy="vanilla">
        <div className="container-site">
          <SectionHeading id="vanilla" eyebrow="Что значит vanilla" title="Ваниль — значит без подмены правил игры" intro="Мы используем только то, что защищает мир и не меняет геймплей." />
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal className="card p-6 sm:p-8">
              <h3 className="text-[22px]">Есть на сервере</h3>
              <ul className="mt-5 space-y-3">
                {vanillaYes.map((t) => <li key={t} className="flex gap-3"><Check className="mt-0.5 shrink-0 text-ok" /> <span>{t}</span></li>)}
              </ul>
            </Reveal>
            <Reveal delay={80} className="card p-6 sm:p-8">
              <h3 className="text-[22px]">Не будет</h3>
              <ul className="mt-5 space-y-3">
                {vanillaNo.map((t) => <li key={t} className="flex gap-3"><Close className="mt-0.5 shrink-0 text-danger" /> <span>{t}</span></li>)}
              </ul>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section labelledBy="principles">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image src="/images/harbor-lighthouse.webp" alt="Белый маяк на скале над морем" fill sizes="(min-width: 1024px) 540px, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4">Принципы</p>
            <h2 id="principles" className="text-[30px] sm:text-[36px]">Три простых правила вместо сотни</h2>
            <ol className="mt-8 space-y-6">
              {[
                ["Уважай чужой труд", "Чужая постройка, сундук или ферма неприкосновенны. Логи сохраняются, откаты возможны."],
                ["Играй честно", "Без читов, X-Ray и дюпов. Мы хотим, чтобы алмазы были событием."],
                ["Будь соседом", "Помоги новичку, предупреди о крипере, не строй вплотную без спроса."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="font-mono text-[15px] text-moss">0{i + 1}</span>
                  <div>
                    <h3 className="text-[21px]">{t}</h3>
                    <p className="mt-1 text-ink-2">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/rules" className="link-arrow mt-8">Полный свод правил <ArrowRight width={18} height={18} /></Link>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted" labelledBy="audience">
        <div className="container-site">
          <SectionHeading id="audience" eyebrow="Для кого" title="Кому у нас понравится" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 60} className="card p-6">
                <h3 className="text-[20px]">{a.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{a.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Section labelledBy="world-features">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Особенности мира</p>
            <h2 id="world-features" className="text-[30px] sm:text-[36px]">Один мир на весь сезон</h2>
            <p className="mt-4 text-[17px] text-ink-2">Граница мира 10 000 × 10 000 блоков и расширяется по ходу сезона. Энд открыт с первого дня, Незер соединён общими дорогами.</p>
            <Link href="/world" className="link-arrow mt-6">Регионы и карта <ArrowRight width={18} height={18} /></Link>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow mb-4">Чем мы отличаемся</p>
            <dl className="divide-y divide-line border-y border-line">
              {differences.map(([t, d]) => (
                <div key={t} className="grid gap-1 py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <dt className="font-semibold">{t}</dt>
                  <dd className="text-ink-2">{d}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
