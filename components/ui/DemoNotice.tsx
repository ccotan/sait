import { site } from "@/lib/site";
import { cn } from "@/lib/format";

/** Честная пометка демо-данных. Исчезает, когда site.demoMode = false или source = "live". */
export function DemoNotice({ children, className, force }: { children?: React.ReactNode; className?: string; force?: boolean }) {
  if (!site.demoMode && !force) return null;
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-sm border border-dashed border-line-strong px-2.5 py-1 font-mono text-[12px] text-ink-2", className)}>
      <span aria-hidden className="size-1.5 bg-ember" />
      {children ?? "Демо-данные — будут заменены данными сервера"}
    </p>
  );
}
