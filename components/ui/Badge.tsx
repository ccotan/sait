import type { ReactNode } from "react";
import { cn } from "@/lib/format";

const tones = {
  neutral: "bg-paper-2 text-ink-2",
  moss: "bg-moss-soft text-moss",
  ember: "bg-ember-soft text-ember",
  ok: "bg-ok-soft text-ok",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
  dark: "bg-white/12 text-[#f4efe6]",
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: BadgeTone; className?: string }) {
  return <span className={cn("badge", tones[tone], className)}>{children}</span>;
}

export function StatusDot({ state, className }: { state: "online" | "away" | "offline"; className?: string }) {
  const color = state === "online" ? "bg-ok" : state === "away" ? "bg-[#c08a2d]" : "bg-ink-2/50";
  return <span aria-hidden className={cn("inline-block size-2 rounded-full", color, state === "online" && "dot-live", className)} />;
}
