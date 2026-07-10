import Image from "next/image";
import { withBasePath } from "@/lib/media";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card flex h-full w-[218px] shrink-0 snap-start flex-col overflow-hidden bg-white sm:w-auto sm:shrink">
      <div className="product-visual grid aspect-square place-items-center bg-[#f8f6f4] p-4 sm:aspect-[4/3]">
        {product.imageUrl ? (
          <Image
            src={withBasePath(product.imageUrl) ?? product.imageUrl}
            alt=""
            fill
            sizes="(max-width: 768px) 218px, 220px"
            className="product-visual-image"
            unoptimized
          />
        ) : (
          <div className="product-visual-inner">
            <span className="product-visual-type">{product.itemType}</span>
            <span className="product-visual-name">{product.color}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-black leading-snug text-[#2b2522] sm:text-[0.95rem]">
          {product.displayName}
        </h3>
        <p className="mt-1 text-[11px] font-bold text-[#746863] sm:text-xs">{product.color}</p>
        <p className="mt-2 text-base font-black text-[#2b2522] sm:mt-3 sm:text-[1.05rem]">{product.price}</p>
        <p className="mt-1 text-[10px] font-bold leading-5 text-[#8b7b74] sm:text-[11px]">
          {product.priceNote}
        </p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="product-card-link mt-3 inline-flex min-h-10 items-center justify-center whitespace-nowrap border px-3 text-xs font-black transition active:translate-y-px sm:mt-4 sm:min-h-11 sm:px-4"
        >
          似たアイテムを探す
        </a>
      </div>
    </article>
  );
}
