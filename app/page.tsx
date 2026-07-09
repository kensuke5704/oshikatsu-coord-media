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

const popularTags = [
  { label: "#推し色", href: "/categories/color" },
  { label: "#ライブ参戦服", href: "/categories/scene" },
  { label: "#アクスタ", href: "/articles/collaboration-cafe-oshikatsu-coordinate" },
  { label: "#痛バ", href: "/articles/live-oshikatsu-coordinate" },
  { label: "#プチプラ", href: "/articles/shein-oshikatsu-coordinate-guide" },
  { label: "#学校帰り", href: "/categories/scene" },
  { label: "#概念コーデ", href: "/categories/look" },
  { label: "#シルバー小物", href: "/articles/silver-bag-oshikatsu-coordinate" },
];

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

      <section className="mt-6 border-y border-[#eadfda] bg-[#fff7f8]/72">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[180px_1fr] lg:items-center lg:px-8">
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] text-[#b66f79]">
              TREND TAGS
            </p>
            <h1 className="mt-1 text-lg font-black leading-7 text-[#2b2522] sm:text-xl">
              今気になる言葉から探す
            </h1>
          </div>
          <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
            {popularTags.map((tag) => (
              <Link
                key={tag.label}
                href={tag.href}
                className="ui-chip snap-start"
              >
                {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="space-y-14">
          {topicSections.map((topic) => (
            <section key={topic.title} className="border-t border-[#eadfda] pt-8">
              <div className="mb-6 flex items-end justify-between gap-5">
                <div className="section-title">
                  <p>New articles</p>
                  <h2 className="topic-title">{topic.title}</h2>
                </div>
                <Link
                  href={topic.href}
                  className="ui-action"
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

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="section-title">
          <p>Ranking</p>
          <h2>よく読まれている記事</h2>
        </div>
        <ol className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {ranking.map((article, index) => (
            <li key={article.slug} className="min-w-0">
              <Link
                href={`/articles/${article.slug}`}
                className="group grid h-full grid-cols-[84px_minmax(0,1fr)] gap-3 rounded-[4px] border border-[#eadfda] bg-white p-3 transition hover:-translate-y-0.5 hover:border-[#b66f79]/40 md:grid-cols-[92px_minmax(0,1fr)] xl:block"
              >
                <span className="relative block aspect-square overflow-hidden rounded-[4px] bg-[#f4eeeb] xl:mb-3">
                  <Image
                    src={`${assetBasePath}${article.thumbnailImage}`}
                    alt={article.thumbnailAlt}
                    fill
                    sizes="(min-width: 1280px) 18vw, 92px"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-2 top-2 grid size-7 place-items-center rounded-[4px] bg-white/90 text-sm font-black text-[#b66f79]">
                    {index + 1}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold text-[#b66f79]">
                    {article.menuLabel}
                  </span>
                  <span className="mt-1 line-clamp-3 block text-sm font-black leading-6 text-[#2b2522] transition group-hover:text-[#b66f79]">
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
