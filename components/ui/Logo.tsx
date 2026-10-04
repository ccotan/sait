import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/format";

/** Знак: «срез» блока — травяной верх и земля. Пиксельный мотив, но без перегруза. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-7 shrink-0", className)} aria-hidden shapeRendering="crispEdges">
      <rect width="16" height="16" rx="2" fill="#6b4a32" />
      <rect width="16" height="6" fill="#4d7a52" />
      <rect y="6" width="2" height="2" fill="#4d7a52" />
      <rect x="6" y="6" width="2" height="2" fill="#4d7a52" />
      <rect x="12" y="6" width="2" height="3" fill="#4d7a52" />
      <rect x="4" y="11" width="2" height="2" fill="#57402c" />
      <rect x="10" y="12" width="2" height="2" fill="#7d5a3e" />
      <rect x="2" y="2" width="2" height="2" fill="#64925f" />
      <rect x="9" y="1" width="2" height="2" fill="#64925f" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="group inline-flex min-h-11 items-center gap-2.5" aria-label={`${site.name} — на главную`}>
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      <span className={cn("font-display text-[19px] font-semibold tracking-[-0.01em]", tone === "light" ? "text-[#f4efe6]" : "text-ink")}>
        {site.name}
      </span>
    </Link>
  );
}
