"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, isGroup, site, type NavGroup } from "@/lib/site";
import { cn } from "@/lib/format";
import { Logo } from "@/components/ui/Logo";
import { ChevronDown, Close, Discord, Menu } from "@/components/ui/icons";
import { HeaderStatus } from "@/components/features/HeaderStatus";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300", mobileOpen ? "border-line bg-paper" : scrolled ? "border-line bg-paper/92 backdrop-blur-md" : "border-transparent bg-paper")}>
      <a href="#main" className="sr-only rounded-md bg-moss px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50">
        Перейти к содержанию
      </a>
      <div className="container-site flex h-16 items-center gap-4">
        <Logo />

        <nav aria-label="Основная навигация" className="ml-2 hidden lg:block xl:ml-6">
          <ul className="flex items-center gap-0.5">
            {navigation.map((entry) =>
              isGroup(entry) ? (
                <li key={entry.label}><NavDropdown group={entry} pathname={pathname} /></li>
              ) : (
                <li key={entry.href}>
                  <Link href={entry.href} aria-current={isActive(pathname, entry.href) ? "page" : undefined} className={navLinkCls(isActive(pathname, entry.href))}>
                    {entry.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <HeaderStatus className="hidden sm:inline-flex lg:hidden xl:inline-flex" />
          <a href={site.links.discord} target="_blank" rel="noopener noreferrer" aria-label="Discord сервера (откроется в новой вкладке)" className="hidden size-11 place-items-center rounded-md text-ink-2 transition-colors hover:bg-paper-2 hover:text-ink md:grid">
            <Discord />
          </a>
          <Link href="/how-to-play" className="btn btn-primary btn-sm hidden md:inline-flex">Начать играть</Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-md text-ink hover:bg-paper-2 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

function navLinkCls(active: boolean) {
  return cn(
    "relative inline-flex min-h-10 items-center gap-1 rounded-md px-3 text-[15px] font-medium whitespace-nowrap transition-colors",
    active ? "text-ink" : "text-ink-2 hover:bg-paper-2 hover:text-ink",
    "after:absolute after:inset-x-3 after:-bottom-[13px] after:h-[2px] after:origin-left after:bg-moss after:transition-transform after:duration-300",
    active ? "after:scale-x-100" : "after:scale-x-0",
  );
}

function NavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = group.items.some((i) => isActive(pathname, i.href));
  const id = `nav-${group.label}`;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); ref.current?.querySelector("button")?.focus(); }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((v) => !v)} className={navLinkCls(active)}>
        {group.label}
        <ChevronDown width={16} height={16} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div id={id} hidden={!open} className="absolute top-full left-0 pt-3">
        <ul className="w-[300px] animate-[scale-in_.2s_var(--ease-out-soft)] rounded-lg border border-line bg-card p-2 shadow-[var(--shadow-lift)]">
          {group.items.map((item) => {
            const a = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={a ? "page" : undefined} className={cn("flex flex-col rounded-md px-3 py-2.5 transition-colors hover:bg-paper-2", a && "bg-moss-soft/70")}>
                  <span className="text-[15px] font-semibold text-ink">{item.label}</span>
                  {item.description && <span className="text-sm text-ink-2">{item.description}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" hidden={!open} className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-paper lg:hidden">
      <nav aria-label="Мобильная навигация" className="container-site animate-[page-in_.35s_var(--ease-out-soft)] py-6">
        <ul className="space-y-1">
          <li><MobileLink href="/" label="Главная" pathname={pathname} /></li>
          {navigation.filter((e) => !isGroup(e)).map((e) => !isGroup(e) && <li key={e.href}><MobileLink href={e.href} label={e.label} pathname={pathname} /></li>)}
        </ul>
        {navigation.filter(isGroup).map((g) => (
          <div key={g.label} className="mt-6">
            <p className="eyebrow mb-2 px-3">{g.label}</p>
            <ul className="space-y-1">
              {g.items.map((i) => <li key={i.href}><MobileLink href={i.href} label={i.label} pathname={pathname} /></li>)}
            </ul>
          </div>
        ))}
        <div className="mt-8 grid gap-3 border-t border-line pt-6 sm:grid-cols-2">
          <Link href="/how-to-play" className="btn btn-primary">Начать играть</Link>
          <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><Discord /> Discord</a>
        </div>
      </nav>
    </div>
  );
}

function MobileLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const a = isActive(pathname, href);
  return (
    <Link href={href} aria-current={a ? "page" : undefined} className={cn("flex min-h-12 items-center justify-between rounded-md px-3 text-[17px] font-medium transition-colors", a ? "bg-moss-soft text-ink" : "text-ink hover:bg-paper-2")}>
      {label}
      {a && <span aria-hidden className="size-2 bg-moss" />}
    </Link>
  );
}
