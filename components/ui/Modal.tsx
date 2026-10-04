"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/format";
import { Close } from "./icons";

/**
 * Модальное окно на нативном <dialog>: фокус-ловушка, Esc и inert-фон из коробки.
 */
export function Modal({ open, onClose, label, children, className, variant = "panel" }: {
  open: boolean; onClose: () => void; label: string; children: ReactNode; className?: string; variant?: "panel" | "media";
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={() => { document.documentElement.style.overflow = ""; onClose(); }}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className={cn(
        "m-auto max-h-[92dvh] w-[min(100%-24px,var(--w))] overflow-visible bg-transparent p-0 backdrop:bg-night/90 backdrop:backdrop-blur-[2px] open:animate-[scale-in_.3s_var(--ease-out-soft)] open:backdrop:animate-[fade-in_.3s]",
        className,
      )}
      style={{ ["--w" as string]: variant === "media" ? "1280px" : "560px" }}
    >
      <div className={cn("relative", variant === "panel" && "rounded-lg bg-card p-6 shadow-[var(--shadow-lift)] sm:p-8")}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className={cn(
            "absolute z-10 grid size-11 place-items-center rounded-md transition-colors",
            variant === "media" ? "-top-14 right-0 text-white hover:bg-white/10" : "top-3 right-3 text-ink-2 hover:bg-paper-2 hover:text-ink",
          )}
        >
          <Close />
        </button>
        {children}
      </div>
    </dialog>
  );
}
