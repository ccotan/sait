import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { NewsCard } from "@/components/features/NewsCard";
import { getAdjacentNews, getAllNews, getNewsBySlug, newsCategoryLabel } from "@/lib/services/news";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";
import { ArrowLeft } from "@/components/ui/icons";
import type { NewsBlock } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getAllNews()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return { title: "Новость не найдена" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date, authors: [post.author], images: [{ url: post.cover, alt: post.coverAlt }], siteName: site.name, locale: site.locale },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();
  const { newer, older } = await getAdjacentNews(slug);
  const related = [newer, older].filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    image: `${site.url}${post.cover}`,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <article>
      <header className="container-prose pt-10 sm:pt-12">
        <Breadcrumbs items={[{ href: "/news", label: "Новости" }, { label: post.title }]} />
        <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-ink-2">
          <Badge tone="moss">{newsCategoryLabel[post.category]}</Badge>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} мин чтения</span>
        </div>
        <h1 className="mt-4 text-[36px] sm:text-[46px]">{post.title}</h1>
        <p className="mt-4 text-lg text-ink-2">{post.excerpt}</p>
        <p className="mt-6 text-[15px]">Автор: <span className="font-mono font-medium">{post.author}</span></p>
      </header>

      <div className="container-site mt-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-paper-2 sm:aspect-[2/1]">
          <Image src={post.cover} alt={post.coverAlt} fill priority sizes="(min-width: 1200px) 1120px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="container-prose prose-site py-12 sm:py-16">
        {post.body.map((b, i) => <Block key={i} block={b} />)}
      </div>

      <footer className="border-t border-line bg-paper-2/60">
        <div className="container-site py-14">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-[26px]">Читать дальше</h2>
            <Link href="/news" className="link-arrow"><ArrowLeft width={18} height={18} /> Все новости</Link>
          </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {related.map((p) => <li key={p.slug}><NewsCard post={p} /></li>)}
          </ul>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}

function Block({ block }: { block: NewsBlock }) {
  switch (block.type) {
    case "p": return <p>{block.text}</p>;
    case "h2": return <h2>{block.text}</h2>;
    case "list": return <ul>{block.items.map((t) => <li key={t}>{t}</li>)}</ul>;
    case "quote":
      return (
        <blockquote className="border-l-2 border-moss py-1 pl-6 font-display text-[22px] leading-snug text-ink">
          <p>«{block.text}»</p>
          {block.cite && <footer className="mt-3 font-sans text-[15px] text-ink-2">— {block.cite}</footer>}
        </blockquote>
      );
    case "image":
      return (
        <figure className="!my-10">
          <Image src={block.src} alt={block.alt} width={1200} height={800} sizes="720px" className="h-auto w-full rounded-md" />
          {block.caption && <figcaption className="mt-3 text-sm text-ink-2">{block.caption}</figcaption>}
        </figure>
      );
  }
}
