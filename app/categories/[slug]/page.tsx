import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { SiteShell } from "@/components/SiteShell";
import { getArticlesByCategory } from "@/lib/articles";
import { categories, getCategoryBySlug } from "@/lib/categories";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  return {
    title: category ? `${category.name} | oshikatsu coord` : "カテゴリ",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryArticles = getArticlesByCategory(category.slug);

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="section-title fade-up">
          <p>Category</p>
          <h1>
            {category.name}
          </h1>
          <span>
            {category.description}
          </span>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        {categoryArticles.length === 0 ? (
          <div className="mt-8 rounded-[8px] border border-[#eadfda] bg-white p-8 text-sm font-bold text-[#746863]">
            このカテゴリの記事は準備中です。
          </div>
        ) : null}
      </section>
    </SiteShell>
  );
}
