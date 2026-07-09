import Link from "next/link";
import Image from "next/image";
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
  const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const assetBasePath =
    process.env.NEXT_PUBLIC_BASE_PATH ??
    (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");
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
      <HomeCarousel articles={featuredArticles} assetBasePath={assetBasePath} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="space-y-14">
          {topicSections.map((topic) => (
            <section key={topic.title} className="home-topic-section pt-8">
              <div className="mb-6 flex items-end justify-between gap-5">
                <h2 className="home-topic-title">{topic.title}</h2>
                <Link
                  href={topic.href}
                  className="ui-action home-topic-action"
                >
                  ALL
                </Link>
              </div>
              <div className="-mx-4 flex snap-x scroll-pl-6 gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
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
        <h2 className="home-topic-title">よく読まれている記事</h2>
        <ol className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {ranking.map((article, index) => (
            <li key={article.slug} className="min-w-0">
              <Link
                href={`/articles/${article.slug}`}
                className="group grid h-full grid-cols-[84px_minmax(0,1fr)] gap-3 rounded-[6px] border border-[#ffd5df] bg-white p-3 shadow-[0_8px_22px_rgba(255,79,139,0.07)] transition hover:-translate-y-0.5 hover:border-[#ff4f8b]/45 md:grid-cols-[92px_minmax(0,1fr)] xl:block"
              >
                <span className="relative block aspect-square overflow-hidden rounded-[6px] bg-[#fff0f6] xl:mb-3">
                  <Image
                    src={`${assetBasePath}${article.thumbnailImage}`}
                    alt={article.thumbnailAlt}
                    fill
                    sizes="(min-width: 1280px) 18vw, 92px"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-2 top-2 grid size-7 place-items-center rounded-[4px] bg-[#ff4f8b] text-sm font-black text-white">
                    {index + 1}
                  </span>
                </span>
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
      </section>
    </SiteShell>
  );
}
