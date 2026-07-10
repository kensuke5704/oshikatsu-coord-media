import Link from "next/link";
import { ArticleVisual } from "@/components/ArticleVisual";
import type { ArticleSummary } from "@/lib/types";

export function ArticleCard({
  article,
  priority = false,
}: {
  article: ArticleSummary;
  priority?: boolean;
}) {
  return (
    <article
      className={`group media-card fade-up flex h-full flex-col overflow-hidden bg-white ${
        priority ? "md:grid md:grid-cols-[1.05fr_0.95fr]" : ""
      }`}
    >
      <Link
        href={`/articles/${article.slug}`}
        className={`relative block overflow-hidden bg-[#fff0f6] ${
          priority ? "min-h-[340px] md:min-h-full" : "aspect-[4/3]"
        }`}
        aria-label={article.title}
      >
        <ArticleVisual article={article} variant={priority ? "wide" : "square"} />
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-black text-[#ff4f8b]">
            {article.menuLabel}
          </span>
          {article.tags[0] ? (
            <span className="rounded-[4px] border border-[#b7eee7] bg-[#f3fffd] px-2.5 py-1 text-[10px] font-black text-[#278f84]">
              #{article.tags[0]}
            </span>
          ) : null}
        </div>
        <h2
          className={`article-card-title mt-4 text-[#2b2522] transition group-hover:text-[#e62f6d] ${
            priority
              ? "text-[1.25rem] leading-[1.65] sm:text-[1.45rem] sm:leading-[1.58]"
              : "text-[1.02rem] leading-[1.72] sm:text-[1.08rem]"
          }`}
        >
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-7 text-[#746863]">
          {article.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {[article.mainColor, article.subColor, article.accentColor]
            .filter((color, index, array) => color && array.indexOf(color) === index)
            .map((color) => (
              <span key={color} className="border border-[#ffd5df] bg-[#fff7fb] px-3 py-1 text-xs font-bold text-[#8b5667]">
                {color}
              </span>
            ))}
        </div>
      </div>
    </article>
  );
}
