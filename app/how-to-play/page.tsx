import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CopyIp } from "@/components/ui/CopyIp";
import { Alert } from "@/components/ui/Alert";
import { Discord, External, ArrowRight } from "@/components/ui/icons";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Как начать играть",
  description: `Пошаговая инструкция для новичков: как купить Minecraft Java Edition, выбрать версию ${site.server.version}, добавить IP и зайти на сервер ${site.name}.`,
  path: "/how-to-play",
});

type Step = { title: string; text: string; points: string[]; extra?: React.ReactNode };

const steps: Step[] = [
  {
    title: "Купите или откройте Minecraft Java Edition",
    text: "Нужна лицензионная Java Edition — версия для ПК (Windows, macOS, Linux). Bedrock (Windows-версия из Microsoft Store, консоли, телефоны) к серверу не подключится.",
    points: ["Если игра уже куплена — просто войдите в аккаунт Microsoft в лаунчере", "Если нет — купите на официальном сайте minecraft.net", "Установите официальный Minecraft Launcher"],
    extra: (
      <div className="flex flex-wrap gap-3">
        <a href={site.links.minecraftBuy} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">Купить Minecraft <External width={16} height={16} /></a>
        <a href={site.links.launcher} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Скачать лаунчер <External width={16} height={16} /></a>
      </div>
    ),
  },
  {
    title: `Запустите версию ${site.server.version}`,
    text: "Сервер работает на одной конкретной версии. Если выбрана другая, появится ошибка «Outdated client» или «Outdated server».",
    points: ["В лаунчере откройте вкладку «Установки»", "Нажмите «Новая установка» и выберите версию release " + site.server.version, "Вернитесь на вкладку «Играть», выберите эту установку и нажмите «Играть»"],
  },
  {
    title: "Добавьте адрес сервера",
    text: "В главном меню игры откройте «Сетевая игра» → «Добавить». Название — любое, в поле адреса вставьте IP.",
    points: ["Название сервера: например, «Тихолесье»", "Адрес сервера — скопируйте кнопкой ниже", "Нажмите «Готово» — сервер появится в списке"],
    extra: <CopyIp className="w-full sm:w-auto" />,
  },
  {
    title: "Зайдите на сервер",
    text: "Выберите сервер в списке и нажмите «Подключиться». Если заявка одобрена, вы появитесь на Площади Первых Костров.",
    points: ["Зелёные полоски справа — сервер онлайн", "Сообщение «You are not whitelisted» — заявка ещё не одобрена", "Первый вход может занять пару секунд дольше обычного"],
  },
  {
    title: "Начните выживание",
    text: "Прочитайте доску объявлений у спавна, отойдите от центра хотя бы на 300 блоков и выберите место для дома. Соседи подскажут, если что.",
    points: ["Возьмите у спавна бесплатную карту окрестностей", "Не стройте в 100 блоках от чужих построек без договорённости", "Сфотографируйте первый дом — галерея ждёт"],
  },
];

const troubles = [
  ["«Outdated client / server»", `Неверная версия. Выберите ровно ${site.server.version} в лаунчере.`],
  ["«You are not whitelisted on this server»", "Заявка ещё не рассмотрена или ник указан с ошибкой. Напишите в Discord."],
  ["«Failed to verify username»", "Перезапустите лаунчер и заново войдите в аккаунт Microsoft."],
  ["Сервер не отвечает", "Проверьте страницу статуса — возможно, идёт перезапуск или бэкап."],
];

export default function HowToPlayPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Как начать играть" }]} eyebrow="Для новичков" title="Как начать играть" intro="Пять шагов и около десяти минут. Если что-то пойдёт не так — внизу страницы собраны частые ошибки, а в Discord всегда кто-то ответит." />

      <Section className="pt-12 sm:pt-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <Alert tone="info" title="Перед началом: заявка в whitelist" className="mb-12">
              Сервер работает по белому списку. Зайдите в <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">Discord</a> и заполните короткую анкету в канале #заявка — пока она рассматривается (обычно до суток), можно пройти шаги 1–3.
            </Alert>

            <ol className="relative">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title} className="relative grid grid-cols-[48px_1fr] gap-5 pb-14 last:pb-0 sm:grid-cols-[56px_1fr] sm:gap-8">
                  {i < steps.length - 1 && <span aria-hidden className="absolute top-14 bottom-2 left-[23px] w-px bg-line-strong sm:left-[27px]" />}
                  <span className="grid size-12 place-items-center rounded-md bg-moss font-mono text-lg font-medium text-white sm:size-14" aria-hidden>{i + 1}</span>
                  <div className="pt-1.5">
                    <p className="eyebrow">Шаг {i + 1} из {steps.length}</p>
                    <h2 className="mt-2 text-[24px] sm:text-[28px]">{s.title}</h2>
                    <p className="mt-3 max-w-[620px] text-[17px] text-ink-2">{s.text}</p>
                    <ul className="mt-5 space-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[15px]">
                          <span aria-hidden className="mt-[9px] size-1.5 shrink-0 bg-moss" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    {s.extra && <div className="mt-6">{s.extra}</div>}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <aside aria-label="Краткая памятка" className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <p className="eyebrow">Памятка</p>
              <dl className="mt-4 space-y-3 text-[15px]">
                {[["Издание", "Java Edition"], ["Версия", site.server.version], ["Лицензия", "Обязательна"], ["Доступ", "Whitelist"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-line pb-3 last:border-0 last:pb-0"><dt className="text-ink-2">{k}</dt><dd className="font-medium">{v}</dd></div>
                ))}
              </dl>
              <CopyIp className="mt-5 w-full" />
              <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-3 w-full"><Discord /> Подать заявку</a>
            </div>
            <Link href="/rules" className="card-link mt-4 flex items-center justify-between p-5">
              <span><span className="block font-semibold">Прочитайте правила</span><span className="text-sm text-ink-2">5 минут, чтобы не было сюрпризов</span></span>
              <ArrowRight className="text-moss" />
            </Link>
          </aside>
        </div>
      </Section>

      <Section tone="muted" labelledBy="troubles">
        <div className="container-site">
          <h2 id="troubles" className="text-[28px] sm:text-[32px]">Если не получается зайти</h2>
          <dl className="mt-8 grid gap-4 md:grid-cols-2">
            {troubles.map(([t, d]) => (
              <div key={t} className="card p-6">
                <dt className="font-mono text-[15px] font-medium">{t}</dt>
                <dd className="mt-2 text-ink-2">{d}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-ink-2">Не нашли ответ? Загляните в <Link href="/faq" className="font-semibold text-moss underline underline-offset-4">FAQ</Link> или <Link href="/support" className="font-semibold text-moss underline underline-offset-4">напишите в поддержку</Link>.</p>
        </div>
      </Section>
    </>
  );
}
