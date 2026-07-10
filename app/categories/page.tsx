import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
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
        <div className="category-index mt-9">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="category-index-row fade-up"
            >
              <span className="category-index-mark" aria-hidden="true" />
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <span className="category-index-count">
                <strong>{category.count}</strong>
                <span>articles</span>
              </span>
              <ArrowUpRight className="category-index-arrow" size={22} weight="regular" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
