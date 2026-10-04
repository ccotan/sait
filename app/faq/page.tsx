import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { FaqList } from "@/components/features/FaqList";
import { faq } from "@/data/faq";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { Discord } from "@/components/ui/icons";

export const metadata = pageMetadata({
  title: "Вопросы и ответы",
  description: `Частые вопросы о сервере ${site.name}: версия, подключение, лицензия, whitelist, донат, игра с друзьями и Discord.`,
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "FAQ" }]} eyebrow="FAQ" title="Вопросы и ответы" intro="Собрали то, что спрашивают чаще всего. Не нашли свой вопрос — задайте его в Discord." />
      <Section className="pt-8 sm:pt-10">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_300px] lg:gap-16">
          <FaqList items={faq} openFirst />
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="text-[22px]">Остался вопрос?</h2>
              <p className="mt-2 text-[15px] text-ink-2">Администрация и игроки отвечают в Discord обычно в течение часа.</p>
              <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5 w-full"><Discord /> Спросить в Discord</a>
              <Link href="/support" className="btn btn-secondary mt-3 w-full">Написать в поддержку</Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
