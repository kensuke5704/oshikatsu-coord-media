import Link from "next/link";
import { ArticleVisual } from "@/components/ArticleVisual";
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="space-y-18 lg:space-y-20">
          {topicSections.map((topic) => (
            <section key={topic.title} className="home-topic-section">
              <div className="home-topic-heading mb-7 flex items-end justify-between gap-5">
                <div className="min-w-0">
                  <p className="home-topic-kicker">{topic.articles.length} articles</p>
                  <h2 className="home-topic-title">{topic.title}</h2>
                </div>
                <Link
                  href={topic.href}
                  className="ui-action home-topic-action"
                >
                  ALL
                </Link>
              </div>
              <div className="topic-scroll -mx-4 flex snap-x scroll-pl-6 gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
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

      <section className="home-ranking-section mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="home-ranking-panel">
          <div className="mb-7 flex items-end justify-between gap-5">
            <div>
              <p className="home-topic-kicker">Ranking</p>
              <h2 className="home-topic-title home-ranking-title">よく読まれている記事</h2>
            </div>
          </div>
        <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {ranking.map((article, index) => (
            <li key={article.slug} className="min-w-0">
              <Link
                href={`/articles/${article.slug}`}
                className="ranking-card group grid h-full grid-cols-[84px_minmax(0,1fr)] gap-3 bg-white p-3 transition md:grid-cols-[92px_minmax(0,1fr)] xl:block"
              >
                <div className="relative block aspect-square overflow-hidden bg-[#fff0f6] xl:mb-3">
                  <ArticleVisual article={article} variant="ranking" rank={index + 1} />
                </div>
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold text-[#ff4f8b]">
                    {article.menuLabel}
                  </span>
                  <span className="mt-1 line-clamp-3 block text-[15px] font-black leading-7 text-[#2b2522] transition group-hover:text-[#e62f6d]">
                    {article.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        </div>
      </section>
    </SiteShell>
  );
}
