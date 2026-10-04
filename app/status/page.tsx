import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Alert } from "@/components/ui/Alert";
import { StatusPanel } from "@/components/features/StatusPanel";
import { getServerStatus } from "@/lib/services/status";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export const metadata = pageMetadata({
  title: "Статус сервера",
  description: "Онлайн, текущее количество игроков, версия, IP и задержка сервера Тихолесье.",
  path: "/status",
});

export default async function StatusPage() {
  const status = await getServerStatus();
  return (
    <>
      <PageHeader crumbs={[{ label: "Статус" }]} eyebrow="Статус" title="Статус сервера" intro="Работает ли сервер прямо сейчас, сколько людей в игре и как подключиться. Данные обновляются автоматически." />
      <Section className="pt-10 sm:pt-12">
        <div className="container-site max-w-[1000px]">
          {status.source === "demo" && (
            <Alert tone="warning" title="Показаны демонстрационные данные" className="mb-6">
              Сайт ещё не подключён к серверу. Укажите MC_SERVER_HOST в переменных окружения — и здесь появятся реальные значения.
            </Alert>
          )}
          <StatusPanel initial={status} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-[22px]">Плановые работы</h2>
              <p className="mt-2 text-ink-2">Ежедневный перезапуск в 05:00 МСК (около 2 минут) и резервная копия мира каждые 6 часов.</p>
            </div>
            <div>
              <h2 className="text-[22px]">Сервер не отвечает?</h2>
              <p className="mt-2 text-ink-2">Подождите пару минут и обновите страницу. Если проблема держится дольше — напишите в <Link href="/support" className="font-semibold text-moss underline underline-offset-4">поддержку</Link>.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
