import type { CSSProperties } from "react";
import type { ArticleSummary } from "@/lib/types";

type ArticleVisualVariant = "hero" | "square" | "wide" | "portrait" | "ranking";

const colorValues: Record<string, string> = {
  水色: "#A9CAE8",
  黒: "#202124",
  白: "#F7F5F2",
  シルバー: "#D9DDDD",
  複数: "#F7C8D8",
};

const typeLabels: Record<string, string> = {
  LOOK: "LOOK",
  COLOR: "COLOR",
  STYLE: "STYLE",
  GUIDE: "GUIDE",
  FEATURE: "FEATURE",
};

function getColorValue(colorName: string, fallback: string) {
  return colorValues[colorName] ?? fallback;
}

export function ArticleVisual({
  article,
  variant = "square",
  rank,
}: {
  article: ArticleSummary;
  variant?: ArticleVisualVariant;
  rank?: number;
}) {
  const main = getColorValue(article.mainColor, "#F7C8D8");
  const sub = getColorValue(article.subColor, "#A9CAE8");
  const accent = getColorValue(article.accentColor, "#FFD84D");

  return (
    <div
      className={`article-visual article-visual-${variant} article-visual-type-${article.articleType.toLowerCase()}`}
      style={
        {
          "--visual-main": main,
          "--visual-sub": sub,
          "--visual-accent": accent,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <span className="article-visual-plane article-visual-plane-main" />
      <span className="article-visual-plane article-visual-plane-sub" />
      <span className="article-visual-plane article-visual-plane-accent" />
      <span className="article-visual-line article-visual-line-a" />
      <span className="article-visual-line article-visual-line-b" />
      <span className="article-visual-label">{typeLabels[article.articleType] ?? article.menuLabel}</span>
      {rank ? <span className="article-visual-rank">{rank}</span> : null}
    </div>
  );
}
