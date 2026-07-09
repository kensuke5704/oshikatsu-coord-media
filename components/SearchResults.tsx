"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="section-title">
        <p>Search</p>
        <h1 className="topic-title">検索結果</h1>
        <span>
          {normalizedQuery.length > 0
            ? `「${query}」を含む記事を表示しています。`
            : "キーワードを入力して検索してください。"}
        </span>
      </div>

      <div className="mt-8 border-t border-[#eadfda]">
        {results.length > 0 ? (
          results.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block border-b border-[#eadfda] py-5 transition hover:bg-[#fff8f5]"
            >
              <span className="block text-[11px] font-black text-[#b66f79]">
                {article.menuLabel}
              </span>
              <span className="mt-2 block text-[1.02rem] font-black leading-7 text-[#2b2522]">
                {article.title}
              </span>
              <span className="mt-2 line-clamp-2 block text-sm font-medium leading-7 text-[#746863]">
                {article.excerpt}
              </span>
            </Link>
          ))
        ) : (
          <p className="py-8 text-sm font-bold leading-7 text-[#746863]">
            {normalizedQuery.length > 0
              ? "該当する記事がありません。別のキーワードで検索してみてください。"
              : "上部の検索ボックスからキーワードを入力できます。"}
          </p>
        )}
      </div>
    </section>
  );
}
