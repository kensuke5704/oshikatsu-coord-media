import type { ArticleImage } from "@/lib/types";
import type { ArticleSummary } from "@/lib/types";
import { ArticleVisual } from "@/components/ArticleVisual";

export function OutfitIllustration({
  image,
  article,
}: {
  image: ArticleImage;
  article: ArticleSummary;
}) {
  return (
    <figure className="relative w-full max-w-full overflow-hidden rounded-[4px] border border-[#d7ecee] bg-white p-3">
      <div className="aspect-[2/3] w-full overflow-hidden rounded-[4px]" role="img" aria-label={image.alt}>
        <ArticleVisual article={article} variant="portrait" />
      </div>
    </figure>
  );
}
