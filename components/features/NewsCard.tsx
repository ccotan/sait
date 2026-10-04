import Image from "next/image";
import Link from "next/link";
import type { NewsPost } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { newsCategoryLabel } from "@/lib/services/news";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/format";

export function NewsCard({ post, variant = "default", headingLevel = 3 }: { post: NewsPost; variant?: "default" | "featured" | "compact"; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  if (variant === "compact") {
    return (
      <article className="group relative flex gap-4 border-t border-line py-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
            <Badge tone="moss">{newsCategoryLabel[post.category]}</Badge>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <H className="mt-2 text-[20px] leading-snug transition-colors group-hover:text-moss">
            <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
          </H>
        </div>
      </article>
    );
  }
  const featured = variant === "featured";
  return (
    <article className={cn("card-link group relative flex h-full flex-col overflow-hidden", featured && "lg:grid lg:grid-cols-[1.4fr_1fr]")}>
      <div className={cn("relative overflow-hidden bg-paper-2", featured ? "aspect-[16/10] lg:aspect-auto lg:min-h-[380px]" : "aspect-[16/10]")}>
        <Image src={post.cover} alt={post.coverAlt} fill sizes={featured ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"} className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]" />
      </div>
      <div className={cn("flex flex-1 flex-col p-5 sm:p-6", featured && "lg:justify-center lg:p-10")}>
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-2">
          <Badge tone="moss">{newsCategoryLabel[post.category]}</Badge>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <H className={cn("mt-3 leading-snug", featured ? "text-[28px] sm:text-[32px]" : "text-[21px]")}>
          <Link href={`/news/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
        </H>
        <p className={cn("mt-3 text-ink-2", featured ? "text-[17px]" : "text-[15px]")}>{post.excerpt}</p>
        <p className="mt-auto pt-5 text-sm text-ink-2">{post.author} · {post.readingMinutes} мин чтения</p>
      </div>
    </article>
  );
}
