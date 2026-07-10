"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { withBasePath } from "@/lib/media";
import type { ArticleSearchItem } from "@/lib/types";

function normalizeSearchQuery(value: string) {
  return value.trim().toLowerCase();
}

export function SearchResults({ items }: { items: ArticleSearchItem[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const normalizedQuery = normalizeSearchQuery(query);
  const results =
    normalizedQuery.length > 0
      ? items.filter((item) => item.searchText.includes(normalizedQuery))
      : [];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="section-title search-hero">
        <p>Search</p>
        <h1 className="topic-title">検索結果</h1>
        <span>
          {normalizedQuery.length > 0
            ? `「${query}」に合う記事を集めました。`
            : "気になる色、シーン、アイテム名で探せます。"}
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {results.length > 0 ? (
          results.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="search-result-card group"
            >
              <span className="search-result-image">
                <Image
                  src={withBasePath(article.thumbnailImage) ?? article.thumbnailImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 330px"
                  className="object-cover transition duration-500 group-hover:scale-[1.025]"
                  unoptimized
                />
                <span className="topic-card-label">{article.menuLabel}</span>
              </span>
              <span className="block p-4 sm:p-5">
                {article.tags[0] ? (
                  <span className="block text-[11px] font-black tracking-[0.08em] text-[#2f929b]">
                    #{article.tags[0]}
                  </span>
                ) : null}
                <span className="mt-2 line-clamp-3 block text-[1.02rem] font-black leading-7 text-[#2b2522] transition group-hover:text-[#e62f6d]">
                  {article.title}
                </span>
                <span className="mt-2 line-clamp-2 block text-sm font-medium leading-7 text-[#746863]">
                  {article.excerpt}
                </span>
              </span>
            </Link>
          ))
        ) : (
          <p className="search-empty sm:col-span-2 lg:col-span-3">
            {normalizedQuery.length > 0
              ? "該当する記事がありません。別のキーワードで検索してみてください。"
              : "上部の検索ボックスからキーワードを入力できます。"}
          </p>
        )}
      </div>
    </section>
  );
}
