import Link from "next/link";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { getCategoriesWithArticleCounts } from "@/lib/articles";
import type { ArticleSummary } from "@/lib/types";

export function ArticleSidebar({
  summary,
  related,
}: {
  summary: string[];
  related: ArticleSummary[];
}) {
  const categories = getCategoriesWithArticleCounts();

  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <section className="media-card rounded-[4px] bg-white p-5">
        <h2 className="text-lg font-black text-[#2b2522]">この記事のまとめ</h2>
        <div className="mt-4 h-px bg-[#eadfda]" />
        <ul className="mt-4 space-y-4">
          {summary.map((item) => (
            <li key={item} className="flex gap-3 text-sm font-bold leading-7 text-[#4a403b]">
              <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-[4px] bg-[#fff3f1] text-[#b66f79]">
                <Check size={14} weight="bold" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="media-card rounded-[4px] bg-white p-5">
        <h2 className="text-lg font-black text-[#2b2522]">おすすめの関連記事</h2>
        <div className="mt-4 space-y-4">
          {related.slice(0, 4).map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="grid grid-cols-[2rem_1fr] gap-3 rounded-[4px] p-2 transition hover:bg-[#fff7f5]"
            >
              <span className="grid size-8 place-items-center rounded-[4px] bg-[#b66f79] text-sm font-black text-white">
                {index + 1}
              </span>
              <span className="text-sm font-black leading-6 text-[#2b2522]">
                {article.title}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="media-card rounded-[4px] bg-white p-5">
        <h2 className="text-lg font-black text-[#2b2522]">カテゴリー</h2>
        <div className="mt-4 space-y-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="flex items-center justify-between rounded-[4px] px-2 py-2 text-sm font-bold text-[#4a403b] transition hover:bg-[#fff7f5] hover:text-[#b66f79]"
            >
              <span>{category.name}</span>
              <span>{category.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
