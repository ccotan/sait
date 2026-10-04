import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { CopyIp } from "@/components/ui/CopyIp";
import { Discord } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="on-dark bg-night text-[#c9c1b1]">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.3fr_2fr]">
        <div className="max-w-[360px]">
          <Logo tone="light" />
          <p className="mt-4 text-[15px] leading-relaxed">
            Ванильный survival-сервер Minecraft {site.server.edition} {site.server.version}. Строим, исследуем и не спешим.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CopyIp tone="dark" />
            <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light"><Discord /> Discord</a>
          </div>
        </div>
        <nav aria-label="Навигация в подвале" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((g) => (
            <div key={g.label}>
              <p className="eyebrow text-[#9d968a]">{g.label}</p>
              <ul className="mt-4 space-y-1">
                {g.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="inline-flex min-h-9 items-center text-[15px] text-[#e4ddcf] transition-colors hover:text-white">{i.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-[13px] text-[#9d968a] sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Фанатский проект сообщества.</p>
          <p>Не является официальным продуктом Minecraft. Не одобрено и не связано с Mojang или Microsoft.</p>
        </div>
      </div>
    </footer>
  );
}
