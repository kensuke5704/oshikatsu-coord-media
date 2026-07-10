import Image from "next/image";
import type { ArticleSummary } from "@/lib/types";

type ArticleVisualVariant = "hero" | "square" | "wide" | "portrait" | "ranking";

const repositoryName = "oshikatsu-coord-media";
const basePath = process.env.NODE_ENV === "production" ? `/${repositoryName}` : "";

const sizesByVariant: Record<ArticleVisualVariant, string> = {
  hero: "(max-width: 768px) 100vw, 960px",
  square: "(max-width: 768px) 64vw, 320px",
  wide: "(max-width: 768px) 100vw, 480px",
  portrait: "(max-width: 768px) 100vw, 760px",
  ranking: "92px",
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
        src={`${basePath}${article.thumbnailImage}`}
        alt=""
        fill
        sizes={sizesByVariant[variant]}
        className="article-visual-image"
        unoptimized
      />
      {rank ? <span className="article-visual-rank">{rank}</span> : null}
    </div>
  );
}
