import Link from "next/link";
import { ArticleVisual } from "@/components/ArticleVisual";
import type { ArticleSummary } from "@/lib/types";

export function TopicArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="group w-[72vw] min-w-[72vw] snap-start sm:w-auto sm:min-w-0">
      <Link
        href={`/articles/${article.slug}`}
        className="relative block aspect-square overflow-hidden border border-[#ffd5df] bg-[#fff0f6] shadow-[0_8px_22px_rgba(255,79,139,0.08)]"
        aria-label={article.title}
      >
        <ArticleVisual article={article} />
      </Link>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <span className="bg-[#ff4f8b] px-2.5 py-1 text-[10px] font-black text-white">
          {article.menuLabel}
        </span>
        {article.tags.slice(0, 1).map((tag) => (
          <span
            key={tag}
            className="border border-[#b7eee7] bg-[#f3fffd] px-2.5 py-1 text-[10px] font-black text-[#278f84]"
          >
            #{tag}
          </span>
        ))}
      </div>
      <h3 className="mt-3 text-[15px] font-black leading-7 text-[#2b2522] transition group-hover:text-[#e62f6d]">
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>
    </article>
  );
}

export function TopicArticlePlaceholder() {
  return (
    <article className="w-[72vw] min-w-[72vw] snap-start sm:w-auto sm:min-w-0">
      <div className="grid aspect-square place-items-center border border-dashed border-[#ffd5df] bg-[#fff7fb]">
        <span className="text-xs font-black tracking-[0.18em] text-[#ff7aa8]">COMING SOON</span>
      </div>
      <h3 className="mt-3 text-[15px] font-black leading-7 text-[#b38b98]">
        記事準備中
      </h3>
    </article>
  );
}
