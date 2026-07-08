import Link from "next/link";
import { HomeCarousel } from "@/components/HomeCarousel";
import { SiteShell } from "@/components/SiteShell";
import { TopicArticleCard, TopicArticlePlaceholder } from "@/components/TopicArticleCard";
import { articles, getArticlesByCategory } from "@/lib/articles";
import { categories } from "@/lib/categories";
import type { ArticleSummary } from "@/lib/types";

type TopicSection = {
  title: string;
  href: string;
  articles: ArticleSummary[];
};

function createArticleSlots(sectionArticles: ArticleSummary[]) {
  return Array.from({ length: 3 }, (_, index) => sectionArticles[index] ?? null);
}

export default function HomePage() {
  const featuredArticles = [
    articles[0],
    articles[3],
    articles[4],
    articles[9],
  ].filter((article): article is ArticleSummary => Boolean(article));

  const topicSections: TopicSection[] = categories.map((category) => ({
    title: category.name,
    href: `/categories/${category.slug}`,
    articles: getArticlesByCategory(category.slug).slice(0, 3),
  }));

  const ranking = [articles[0], articles[3], articles[4], articles[8], articles[9]].filter(
    (article): article is ArticleSummary => Boolean(article),
  );

  return (
    <SiteShell>
      <HomeCarousel articles={featuredArticles} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="space-y-14">
          {topicSections.map((topic) => (
            <section key={topic.title} className="border-t border-[#eadfda] pt-8">
              <div className="mb-6 flex items-end justify-between gap-5">
                <div className="section-title">
                  <p>Topic</p>
                  <h2>{topic.title}</h2>
                </div>
                <Link
                  href={topic.href}
                  className="hidden shrink-0 rounded-full border border-[#eadfda] bg-white px-4 py-2 text-xs font-black text-[#6b514a] transition hover:border-[#b66f79] hover:text-[#b66f79] sm:inline-flex"
                >
                  もっと見る
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-3">
                {createArticleSlots(topic.articles).map((article, index) => (
                  article ? (
                    <TopicArticleCard key={article.slug} article={article} />
                  ) : (
                    <TopicArticlePlaceholder key={`${topic.title}-${index}`} />
                  )
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="section-title">
          <p>Ranking</p>
          <h2>よく読まれている記事</h2>
        </div>
        <ol className="mt-7 divide-y divide-[#eadfda] border-y border-[#eadfda]">
          {ranking.map((article, index) => (
            <li key={article.slug}>
              <Link
                href={`/articles/${article.slug}`}
                className="group grid grid-cols-[52px_1fr] gap-4 py-5 sm:grid-cols-[64px_1fr_auto] sm:items-center"
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
                <span className="hidden rounded-full border border-[#eadfda] px-3 py-1 text-xs font-bold text-[#8b7b74] sm:inline-flex">
                  No. {article.no}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </SiteShell>
  );
}
