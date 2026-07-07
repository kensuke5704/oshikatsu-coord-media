import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { SiteShell } from "@/components/SiteShell";
import { categories } from "@/lib/categories";
import { articles, getCategoriesWithArticleCounts } from "@/lib/articles";

export default function HomePage() {
  const categoriesWithCounts = getCategoriesWithArticleCounts();
  const featured = articles[0];
  const latest = articles.slice(1, 7);
  const ranking = [articles[0], articles[3], articles[4], articles[8], articles[9]];

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr] lg:items-center">
          <div className="fade-up">
            <p className="text-sm font-medium tracking-[0.08em] text-[#b66f79]">推し活を身近に</p>
            <h1 className="editorial-headline mt-4 max-w-3xl text-4xl leading-[1.24] text-[#2b2522] sm:text-5xl lg:text-6xl">
              推しの色を、今日着る服に。
            </h1>
            <p className="mt-5 max-w-xl text-base font-medium leading-8 text-[#746863]">
              公式画像に頼らず、色と雰囲気を日常服へ置き換える非公式ファッションメディア。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/articles/${featured.slug}`}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#b66f79] px-6 text-sm font-black text-white transition hover:bg-[#9d5963] active:translate-y-px"
              >
                注目記事を読む
              </Link>
              <Link
                href="/categories"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e0d5cf] bg-white px-6 text-sm font-black text-[#6b514a] transition hover:border-[#b66f79] hover:text-[#b66f79] active:translate-y-px"
              >
                カテゴリから探す
              </Link>
            </div>
          </div>
          <ArticleCard article={featured} priority />
        </div>
      </section>

      <section className="border-y border-[#eee5e1] bg-white/62">
        <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 py-4 text-sm font-medium text-[#4a403b] sm:px-6 lg:justify-center lg:px-8">
          {categories.slice(0, 7).map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="shrink-0 rounded-full border border-[#eadfda] bg-[#fffdfb] px-4 py-2 transition hover:border-[#b66f79] hover:text-[#b66f79]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="section-title fade-up">
          <p>Special contents</p>
          <h2>色とシーンで選ぶ、今週の特集</h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <ArticleCard article={articles[3]} priority />
          <div className="grid gap-5">
            {articles.slice(4, 6).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="section-title fade-up">
          <p>Feature</p>
          <h2>新着記事</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
        <div>
          <div className="section-title fade-up">
            <p>Ranking</p>
            <h2>よく読まれている記事</h2>
          </div>
          <ol className="mt-7 divide-y divide-[#eadfda] border-y border-[#eadfda]">
            {ranking.map((article, index) => (
              <li key={article.slug}>
                <Link
                  href={`/articles/${article.slug}`}
                  className="group grid grid-cols-[52px_1fr] gap-4 py-5"
                >
                  <span className="font-black text-3xl leading-none text-[#d7c5bf] transition group-hover:text-[#b66f79]">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-xs font-extrabold text-[#b66f79]">
                      {article.category}
                    </span>
                    <span className="mt-2 block text-base font-black leading-7 text-[#2b2522] transition group-hover:text-[#b66f79]">
                      {article.title}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <div className="section-title fade-up">
            <p>Category</p>
            <h2>目的から探す</h2>
          </div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {categoriesWithCounts.slice(0, 6).map((category) => (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="media-card fade-up rounded-[8px] bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(80,54,45,0.1)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-black text-[#2b2522]">{category.name}</h3>
                  <span className="text-2xl font-black text-[#d7c5bf]">
                    {category.count}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium leading-7 text-[#746863]">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="soft-band fade-up rounded-[8px] px-6 py-8 text-center sm:px-10 lg:px-14">
          <h2 className="text-2xl font-black text-[#2b2522] sm:text-3xl">
            公式素材を使わず、推しのムードを日常へ。
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-[#746863]">
            色、質感、シーンから考えることで、さりげなく楽しめるバウンドコーデを集めています。
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
