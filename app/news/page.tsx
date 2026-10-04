import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { NewsCard } from "@/components/features/NewsCard";
import { getAllNews } from "@/lib/services/news";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Новости",
  description: "Обновления сервера, анонсы событий, новости мира и сообщества Тихолесья.",
  path: "/news",
});

export default async function NewsPage() {
  const [featured, ...rest] = await getAllNews();
  return (
    <>
      <PageHeader crumbs={[{ label: "Новости" }]} eyebrow="Новости" title="Новости сервера" intro="Обновления, события и истории из мира. Главное дублируем в Discord." />
      <Section className="pt-10 sm:pt-12">
        <div className="container-site">
          {featured && <NewsCard post={featured} variant="featured" headingLevel={2} />}
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => <li key={p.slug}><NewsCard post={p} headingLevel={2} /></li>)}
          </ul>
        </div>
      </Section>
    </>
  );
}
