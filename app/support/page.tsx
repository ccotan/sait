import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { SupportForm } from "@/components/features/SupportForm";
import { PlayerAvatar } from "@/components/features/PlayerAvatar";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Discord, Mail, ArrowRight } from "@/components/ui/icons";

export const metadata = pageMetadata({
  title: "Поддержка",
  description: "Как связаться с администрацией Тихолесья: Discord, email и форма обращения.",
  path: "/support",
});

const team = [
  { nick: "Ольха", role: "Администратор", area: "Доступ, правила, апелляции" },
  { nick: "kestrel_", role: "Модератор", area: "Технические вопросы, гриф" },
];

export default function SupportPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Поддержка" }]} eyebrow="Поддержка" title="Связаться с нами" intro="Застряли, нашли баг, столкнулись с грифом или хотите что-то предложить — выберите удобный способ." />
      <Section className="pt-10 sm:pt-12">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="space-y-4">
            <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="card-link flex items-start gap-4 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-[#5865f2] text-white"><Discord /></span>
              <span>
                <span className="block text-[18px] font-semibold">Discord — быстрее всего</span>
                <span className="mt-1 block text-[15px] text-ink-2">Тикет в #поддержка. Отвечаем обычно в течение часа, вечером — быстрее.</span>
              </span>
            </a>
            <a href={`mailto:${site.contacts.email}`} className="card-link flex items-start gap-4 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-paper-2 text-ink"><Mail /></span>
              <span className="min-w-0">
                <span className="block text-[18px] font-semibold">Email</span>
                <span className="mt-1 block break-all font-mono text-[15px] text-ink-2">{site.contacts.email}</span>
                <span className="mt-1 block text-sm text-ink-2">Для вопросов, которые нельзя обсуждать публично. Ответ до 2 дней.</span>
              </span>
            </a>

            <div className="card p-6">
              <h2 className="text-[20px]">Администрация</h2>
              <ul className="mt-4 space-y-3">
                {team.map((t) => (
                  <li key={t.nick} className="flex items-center gap-3">
                    <PlayerAvatar nick={t.nick} size={40} />
                    <div className="min-w-0">
                      <p><span className="font-mono font-medium">{t.nick}</span> <span className="text-sm text-ink-2">· {t.role}</span></p>
                      <p className="text-sm text-ink-2">{t.area}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <DemoNotice className="mt-4">Имена — пример, замените на реальную команду</DemoNotice>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/faq" className="card-link flex items-center justify-between p-5"><span className="font-semibold">FAQ</span><ArrowRight className="text-moss" /></Link>
              <Link href="/status" className="card-link flex items-center justify-between p-5"><span className="font-semibold">Статус сервера</span><ArrowRight className="text-moss" /></Link>
            </div>
          </div>

          <div>
            <h2 className="text-[26px] sm:text-[30px]">Форма обращения</h2>
            <p className="mt-2 mb-6 text-ink-2">Опишите ситуацию — чем больше деталей (координаты, время, ники), тем быстрее поможем.</p>
            <SupportForm />
          </div>
        </div>
      </Section>
    </>
  );
}
