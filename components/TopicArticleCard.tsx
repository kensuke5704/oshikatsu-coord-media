import Link from "next/link";
import { ArticleVisual } from "@/components/ArticleVisual";
import type { ArticleSummary } from "@/lib/types";

export function TopicArticleCard({
  article,
  featured = false,
}: {
  article: ArticleSummary;
  featured?: boolean;
}) {
  return (
    <article
      className={`group topic-card w-[72vw] min-w-[72vw] snap-start sm:w-auto sm:min-w-0 ${
        featured ? "topic-card-featured" : ""
      }`}
    >
      <Link
        href={`/articles/${article.slug}`}
        className="topic-card-image relative block aspect-square overflow-hidden bg-[#fff0f6]"
        aria-label={article.title}
      >
        <ArticleVisual article={article} />
        <span className="topic-card-label">{article.menuLabel}</span>
      </Link>
      <div className="topic-card-copy">
        <h3 className="mt-3 text-[15px] font-black leading-7 text-[#2b2522] transition group-hover:text-[#e62f6d] sm:mt-4">
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.tags[0] ? (
          <p className="mt-2 text-[11px] font-black tracking-[0.08em] text-[#2f929b]">#{article.tags[0]}</p>
        ) : null}
      </div>
    </article>
  );
}
