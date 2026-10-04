import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Alert } from "@/components/ui/Alert";
import { ruleCategories, rulesUpdatedAt, sanctions } from "@/data/rules";
import { pageMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/format";

export const metadata = pageMetadata({
  title: "Правила",
  description: "Правила сервера: общие положения, общение, строительство, PvP, гриферство, сторонние программы и игровые аккаунты.",
  path: "/rules",
});

export default function RulesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Правила" }]}
        eyebrow="Правила"
        title="Правила сервера"
        intro="Коротко: уважайте людей и их труд, играйте честно. Ниже — подробности по категориям, чтобы не было разночтений."
        aside={<p className="font-mono text-sm text-ink-2">Редакция от {formatDate(rulesUpdatedAt)}</p>}
      />
      <Section className="pt-12 sm:pt-16">
        <div className="container-site grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <nav aria-label="Разделы правил" className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow mb-3">Разделы</p>
            <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
              {ruleCategories.map((c, i) => (
                <li key={c.id} className="shrink-0">
                  <a href={`#${c.id}`} className="flex min-h-10 items-center gap-3 rounded-md border border-line px-3 text-[15px] text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink lg:border-0">
                    <span className="font-mono text-[13px] text-moss">{i + 1}</span>{c.title}
                  </a>
                </li>
              ))}
              <li className="shrink-0"><a href="#sanctions" className="flex min-h-10 items-center gap-3 rounded-md border border-line px-3 text-[15px] text-ink-2 hover:bg-paper-2 hover:text-ink lg:border-0"><span className="font-mono text-[13px] text-moss">!</span>Наказания</a></li>
            </ol>
          </nav>

          <div className="min-w-0 space-y-14">
            {ruleCategories.map((c, i) => (
              <section key={c.id} id={c.id} aria-labelledby={`${c.id}-t`} className="scroll-mt-24">
                <div className="pixel-rule mb-6" aria-hidden />
                <p className="font-mono text-sm text-moss">Раздел {i + 1}</p>
                <h2 id={`${c.id}-t`} className="mt-1 text-[28px] sm:text-[32px]">{c.title}</h2>
                <p className="mt-2 text-ink-2">{c.summary}</p>
                <ol className="mt-6 divide-y divide-line rounded-lg border border-line bg-card">
                  {c.rules.map((r) => (
                    <li key={r.id} className="grid grid-cols-[44px_1fr] gap-3 px-5 py-4 sm:grid-cols-[52px_1fr] sm:px-6">
                      <span className="pt-0.5 font-mono text-[14px] text-ink-2">{r.id}</span>
                      <div>
                        <p className="text-[16px]">{r.text}</p>
                        {r.note && <p className="mt-1 text-sm text-ink-2">{r.note}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            ))}

            <section id="sanctions" aria-labelledby="sanctions-t" className="scroll-mt-24">
              <div className="pixel-rule mb-6" aria-hidden />
              <h2 id="sanctions-t" className="text-[28px] sm:text-[32px]">Наказания</h2>
              <p className="mt-2 text-ink-2">Мера зависит от тяжести и повторности. Администрация всегда объясняет решение.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {sanctions.map((s, i) => (
                  <div key={s.level} className="card p-5">
                    <p className="font-mono text-[13px] text-ember">Уровень {i + 1}</p>
                    <h3 className="mt-1 text-[20px]">{s.level}</h3>
                    <p className="mt-2 text-[15px] text-ink-2">{s.text}</p>
                  </div>
                ))}
              </div>
              <Alert tone="info" className="mt-8" title="Не согласны с решением?">
                Откройте тикет в Discord или воспользуйтесь <Link href="/support" className="font-semibold text-moss underline underline-offset-4">формой поддержки</Link>. Апелляции рассматривает другой модератор.
              </Alert>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
