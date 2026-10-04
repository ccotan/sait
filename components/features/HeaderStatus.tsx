"use client";

import Link from "next/link";
import { useServerStatus } from "@/lib/hooks/useServerStatus";
import { StatusDot } from "@/components/ui/Badge";
import { cn } from "@/lib/format";

export function HeaderStatus({ className }: { className?: string }) {
  const { status } = useServerStatus(undefined, 90_000);
  const label = !status ? "Проверяем…" : status.online ? `${status.playersOnline} онлайн` : "Офлайн";
  return (
    <Link
      href="/status"
      className={cn("min-h-9 items-center gap-2 whitespace-nowrap rounded-md border border-line px-3 font-mono text-[13px] text-ink-2 transition-colors hover:border-line-strong hover:text-ink", className)}
      aria-label={`Статус сервера: ${label}${status?.source === "demo" ? " (демо)" : ""}`}
    >
      <StatusDot state={!status ? "offline" : status.online ? "online" : "offline"} />
      <span>{label}</span>
    </Link>
  );
}
