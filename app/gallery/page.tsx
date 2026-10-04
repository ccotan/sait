import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/features/GalleryGrid";
import { Alert } from "@/components/ui/Alert";
import { gallery } from "@/data/gallery";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Галерея",
  description: "Скриншоты мира Тихолесья: постройки игроков, природа, подземелья и события сервера.",
  path: "/gallery",
  image: "/images/sakura.webp",
});

export default function GalleryPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Галерея" }]} eyebrow="Галерея" title="Кадры из Тихолесья" intro="Постройки, закаты и пещеры глазами игроков. Нажмите на снимок, чтобы открыть его целиком; листать можно стрелками." />
      <Section className="pt-10 sm:pt-12">
        <div className="container-site">
          <GalleryGrid images={gallery} />
          <Alert tone="info" title="Хотите попасть в галерею?" className="mt-12 max-w-[720px]">
            Присылайте скриншоты в канал #скриншоты в <a href={site.links.discord} target="_blank" rel="noopener noreferrer" className="font-semibold text-moss underline underline-offset-4">Discord</a> с координатами и названием. Лучшие кадры публикуем здесь раз в неделю.
          </Alert>
        </div>
      </Section>
    </>
  );
}
