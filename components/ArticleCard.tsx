import Link from "next/link";
import type { CSSProperties } from "react";
import type { ArticleSummary } from "@/lib/types";

const colorMap: Record<string, string> = {
  水色: "#a9dfe0",
  黒: "#2b2928",
  白: "#ffffff",
  シルバー: "#d8d8d5",
  複数: "#d9c3c8",
};

function articlePalette(article: ArticleSummary) {
  return [article.mainColor, article.subColor, article.accentColor].map(
    (color) => colorMap[color] ?? "#d9c3c8",
  );
}

export function ArticleCard({
  article,
  priority = false,
}: {
  article: ArticleSummary;
  priority?: boolean;
}) {
  const [mainColor, subColor, accentColor] = articlePalette(article);

  return (
    <article
      className={`group media-card fade-up flex h-full flex-col overflow-hidden rounded-[8px] bg-white ${
        priority ? "md:grid md:grid-cols-[1.05fr_0.95fr]" : ""
      }`}
    >
      <Link
        href={`/articles/${article.slug}`}
        className={`article-visual relative block overflow-hidden ${
          priority ? "min-h-[340px] md:min-h-full" : "aspect-[4/3]"
        }`}
        style={
          {
            "--visual-main": mainColor,
            "--visual-sub": subColor,
            "--visual-accent": accentColor,
          } as CSSProperties
        }
        aria-label={article.title}
      >
        <span className="absolute left-5 top-5 rounded-full bg-white/88 px-3 py-1 text-[11px] font-medium text-[#6b514a] shadow-[0_8px_24px_rgba(65,45,38,0.08)]">
          {article.category}
        </span>
        <span className="absolute bottom-5 right-5 text-[12px] font-black tracking-[0.16em] text-white/92">
          ARTICLE {article.no}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-[#b66f79]">
            {article.category}
          </span>
          <span className="text-xs font-bold text-[#a89b95]">No. {article.no}</span>
        </div>
        <h2
          className={`article-card-title mt-4 leading-8 text-[#2b2522] transition group-hover:text-[#b66f79] ${
            priority ? "text-2xl sm:text-3xl sm:leading-10" : "text-lg"
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
              <span
                key={color}
                className="rounded-full border border-[#eadfda] bg-[#fffaf7] px-3 py-1 text-xs font-bold text-[#6b514a]"
              >
                {color}
              </span>
            ))}
        </div>
      </div>
    </article>
  );
}
