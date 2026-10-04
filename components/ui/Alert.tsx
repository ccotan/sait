import type { ReactNode } from "react";
import { cn } from "@/lib/format";
import { Alert as AlertIcon, Check, Info } from "./icons";

const tones = {
  info: { cls: "border-moss/25 bg-moss-soft/60", icon: Info, iconCls: "text-moss" },
  success: { cls: "border-ok/25 bg-ok-soft", icon: Check, iconCls: "text-ok" },
  warning: { cls: "border-warn/25 bg-warn-soft", icon: AlertIcon, iconCls: "text-warn" },
  error: { cls: "border-danger/25 bg-danger-soft", icon: AlertIcon, iconCls: "text-danger" },
};

export function Alert({ tone = "info", title, children, className }: { tone?: keyof typeof tones; title?: string; children: ReactNode; className?: string }) {
  const t = tones[tone];
  const Icon = t.icon;
  return (
    <div role={tone === "error" ? "alert" : "note"} className={cn("flex gap-3 rounded-md border px-4 py-3.5 text-[15px] leading-relaxed", t.cls, className)}>
      <Icon className={cn("mt-0.5 shrink-0", t.iconCls)} />
      <div>
        {title && <p className="font-semibold text-ink">{title}</p>}
        <div className="text-ink-2">{children}</div>
      </div>
    </div>
  );
}
