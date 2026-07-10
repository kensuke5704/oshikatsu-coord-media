import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { getCategoriesWithArticleCounts } from "@/lib/articles";

export const metadata = {
  title: "カテゴリ一覧 | oshikatsu coord",
};

export default function CategoriesPage() {
  const categories = getCategoriesWithArticleCounts();

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="section-title fade-up">
          <p>Category index</p>
          <h1>
            カテゴリ一覧
          </h1>
          <span>
            LOOK、COLOR、STYLE、GUIDE、FEATUREの5つの入口から記事を探せます。
          </span>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="category-tile fade-up rounded-[4px] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#b66f79]/40"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-black text-[#2b2522]">{category.name}</h2>
                <span className="text-3xl font-black text-[#d7c5bf]">{category.count}</span>
              </div>
              <p className="mt-4 text-sm font-medium leading-7 text-[#746863]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
