import Image from "next/image";
import { withBasePath } from "@/lib/media";
import type { ArticleSummary } from "@/lib/types";

type ArticleVisualVariant = "hero" | "square" | "wide" | "portrait" | "ranking";

const sizesByVariant: Record<ArticleVisualVariant, string> = {
  hero: "(max-width: 768px) 100vw, 960px",
  square: "(max-width: 768px) 64vw, 320px",
  wide: "(max-width: 768px) 100vw, 480px",
  portrait: "(max-width: 768px) 100vw, 760px",
  ranking: "92px",
};

const heroFocusByArticleNo: Record<number, string> = {
  1: "18% 28%",
  2: "72% 32%",
  3: "26% 72%",
  4: "71% 24%",
  5: "26% 28%",
  6: "72% 68%",
  7: "28% 66%",
  8: "74% 30%",
  9: "26% 70%",
  10: "72% 28%",
};

export function ArticleVisual({
  article,
  variant = "square",
  rank,
}: {
  article: ArticleSummary;
  variant?: ArticleVisualVariant;
  rank?: number;
}) {
  return (
    <div
      className={`article-visual article-visual-${variant} article-visual-type-${article.articleType.toLowerCase()}`}
      aria-hidden="true"
    >
      <Image
        src={withBasePath(article.thumbnailImage) ?? article.thumbnailImage}
        alt=""
        fill
        sizes={sizesByVariant[variant]}
        className="article-visual-image"
        style={variant === "hero" ? { objectPosition: heroFocusByArticleNo[article.no] ?? "center" } : undefined}
        unoptimized
      />
      {rank ? <span className="article-visual-rank">{rank}</span> : null}
    </div>
  );
}
