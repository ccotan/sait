import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/format";
import { ArrowRight } from "./icons";
import { Reveal } from "./Reveal";

export function Section({ children, className, id, tone = "default", labelledBy }: { children: ReactNode; className?: string; id?: string; tone?: "default" | "muted" | "dark"; labelledBy?: string }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "muted" && "bg-paper-2/60",
        tone === "dark" && "on-dark bg-night text-[#e9e3d6]",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, id, link, tone = "default", className }: {
  eyebrow?: string; title: string; intro?: ReactNode; id?: string; link?: { href: string; label: string }; tone?: "default" | "dark"; className?: string;
}) {
  return (
    <Reveal className={cn("mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-[640px]">
        {eyebrow && <p className={cn("eyebrow mb-3", tone === "dark" && "text-[#b9b2a3]")}>{eyebrow}</p>}
        <h2 id={id} className={cn("text-[30px] sm:text-[36px]", tone === "dark" && "text-[#f4efe6]")}>{title}</h2>
        {intro && <p className={cn("mt-4 text-[17px] leading-relaxed", tone === "dark" ? "text-[#b9b2a3]" : "text-ink-2")}>{intro}</p>}
      </div>
      {link && (
        <Link href={link.href} className={cn("link-arrow shrink-0 py-2", tone === "dark" && "text-[#d9c9a8]")}>
          {link.label} <ArrowRight width={18} height={18} />
        </Link>
      )}
    </Reveal>
  );
}
