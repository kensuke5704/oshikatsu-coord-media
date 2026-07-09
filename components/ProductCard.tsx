import type { Product } from "@/lib/types";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");

export function ProductCard({ product }: { product: Product }) {
  const imageSrc =
    product.imageUrl && product.imageUrl.startsWith("/")
      ? `${basePath}${product.imageUrl}`
      : product.imageUrl;

  return (
    <article className="flex h-full w-[168px] shrink-0 snap-start flex-col overflow-hidden rounded-[4px] border border-[#d7ecee] bg-white sm:w-auto sm:shrink">
      <div className="grid aspect-square place-items-center border-b border-[#e3f1f2] bg-[#f6fbfb] p-3 sm:aspect-[4/3] sm:p-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.displayName}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="grid size-full place-items-center rounded-[6px] border border-dashed border-[#9fd4d8] bg-white text-center">
            <div>
              <p className="text-xs font-black text-[#2f929b]">{product.itemType}</p>
              <p className="mt-2 text-sm font-bold text-[#66777b]">
                公式素材を
                <br />
                無加工で表示
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="text-sm font-black leading-snug text-[#1d3337] sm:text-base">
          {product.displayName}
        </h3>
        <p className="mt-1 text-xs font-bold text-[#66777b] sm:text-sm">{product.color}</p>
        <p className="mt-2 text-base font-black text-[#1d3337] sm:mt-3 sm:text-lg">{product.price}</p>
        <p className="mt-1 text-[10px] font-bold leading-5 text-[#8a989b] sm:text-[11px]">
          {product.priceNote}
        </p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-3 inline-flex min-h-10 items-center justify-center rounded-[4px] border border-[#d86678] bg-[#e47a8a] px-3 text-xs font-black text-white transition hover:bg-[#d86678] active:translate-y-px sm:mt-4 sm:min-h-11 sm:px-4 sm:text-sm"
        >
          商品ページを見る
        </a>
      </div>
    </article>
  );
}
