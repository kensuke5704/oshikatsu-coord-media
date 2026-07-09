import { Suspense } from "react";
import { SearchResults } from "@/components/SearchResults";
import { SiteShell } from "@/components/SiteShell";
import { getArticleSearchIndex } from "@/lib/search";

export const metadata = {
  title: "検索結果 | oshikatsu coord",
};

export default function SearchPage() {
  return (
    <SiteShell>
      <Suspense
        fallback={
          <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="section-title">
              <p>Search</p>
              <h1 className="topic-title">検索結果</h1>
            </div>
          </section>
        }
      >
        <SearchResults items={getArticleSearchIndex()} />
      </Suspense>
    </SiteShell>
  );
}
