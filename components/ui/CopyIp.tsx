"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/format";
import { Check, Copy } from "./icons";

/** Кнопка копирования IP с подтверждением для скринридеров. */
export function CopyIp({ tone = "default", className, label = "IP сервера" }: { tone?: "default" | "dark"; className?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(site.server.ip);
    } catch {
      const t = document.createElement("textarea");
      t.value = site.server.ip;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }
  const dark = tone === "dark";
  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "group inline-flex min-h-11 max-w-full items-center gap-3 rounded-md border pr-3 pl-4 text-left transition-colors",
        dark ? "border-white/25 bg-black/25 text-white hover:border-white/50" : "border-line-strong bg-card text-ink hover:border-ink/40",
        className,
      )}
      aria-label={`Скопировать ${label}: ${site.server.ip}`}
    >
      <span className="flex min-w-0 flex-col py-1.5">
        <span className={cn("font-mono text-[11px] uppercase tracking-[0.1em]", dark ? "text-[#cfc6b5]" : "text-ink-2")}>{label}</span>
        <span className="font-mono text-[14px] font-medium break-all sm:text-[15px]">{site.server.ip}</span>
      </span>
      <span className={cn("ml-auto grid size-8 shrink-0 place-items-center rounded-sm transition-colors", dark ? "bg-white/10 group-hover:bg-white/20" : "bg-paper-2 group-hover:bg-moss-soft")}>
        {copied ? <Check width={16} height={16} /> : <Copy width={16} height={16} />}
      </span>
      <span role="status" aria-live="polite" className="sr-only">{copied ? "IP скопирован" : ""}</span>
    </button>
  );
}
