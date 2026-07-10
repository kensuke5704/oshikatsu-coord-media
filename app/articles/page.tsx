import { ArticleCard } from "@/components/ArticleCard";
import { SiteShell } from "@/components/SiteShell";
import { articles } from "@/lib/articles";
import Link from "next/link";

export const metadata = {
  title: "記事一覧 | oshikatsu coord",
};

const tagShortcuts = ["推し色", "ライブ", "コラボカフェ", "プチプラ", "シルバー", "バウンドコーデ"];

export default function ArticlesPage() {
  const leadArticle = articles[0];
  const restArticles = articles.slice(1);

  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="section-title archive-hero fade-up">
          <p>Article index</p>
          <h1>
            記事一覧
          </h1>
          <span>
            LOOK、COLOR、STYLE、GUIDE、FEATUREを横断して探せます。
          </span>
        </div>
        <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
          {tagShortcuts.map((tag) => (
            <Link
              key={tag}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="ui-chip ui-chip-accent"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <ArticleCard article={leadArticle} priority />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {restArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
