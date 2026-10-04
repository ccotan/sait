import Image from "next/image";
import Link from "next/link";
import { CopyIp } from "@/components/ui/CopyIp";
import { Reveal } from "@/components/ui/Reveal";
import { Discord } from "@/components/ui/icons";
import { site } from "@/lib/site";

/** Финальный призыв. Один на страницу, внизу. */
export function CtaBand({ title = "Мир уже ждёт вас", text = "Подайте заявку в Discord, добавьте сервер в Minecraft — и первый вечер у костра на спавне ваш." }: { title?: string; text?: string }) {
  return (
    <section aria-labelledby="cta-title" className="container-site py-16 sm:py-20">
      <Reveal className="on-dark relative isolate overflow-hidden rounded-lg bg-moss-deep">
        <Image src="/images/valley-cottage.webp" alt="" fill sizes="(min-width: 1200px) 1120px, 100vw" className="-z-10 object-cover object-[70%_60%] opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-moss-deep via-moss-deep/80 to-moss-deep/10" />
        <div className="max-w-[560px] px-6 py-12 sm:px-12 sm:py-16">
          <h2 id="cta-title" className="text-[30px] text-[#f8f4ec] sm:text-[38px]">{title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-[#ddd6c6]">{text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/how-to-play" className="btn btn-light">Как начать играть</Link>
            <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light"><Discord /> Заявка в Discord</a>
          </div>
          <CopyIp tone="dark" className="mt-6" />
        </div>
      </Reveal>
    </section>
  );
}
