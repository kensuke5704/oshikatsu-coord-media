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
    <article className="flex h-full flex-col overflow-hidden rounded-[8px] border border-[#d7ecee] bg-white">
      <div className="grid aspect-[4/3] place-items-center border-b border-[#e3f1f2] bg-[#f6fbfb] p-4">
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
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-black leading-snug text-[#1d3337]">
          {product.displayName}
        </h3>
        <p className="mt-1 text-sm font-bold text-[#66777b]">{product.color}</p>
        <p className="mt-3 text-lg font-black text-[#1d3337]">{product.price}</p>
        <p className="mt-1 text-[11px] font-bold leading-5 text-[#8a989b]">
          {product.priceNote}
        </p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[#e47a8a] px-4 text-sm font-black text-white transition hover:bg-[#d86678] active:translate-y-px"
        >
          商品ページを見る
        </a>
      </div>
    </article>
  );
}
