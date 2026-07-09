"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react";
import type { ArticleSearchItem } from "@/lib/types";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/categories/look", label: "LOOK" },
  { href: "/categories/color", label: "COLOR" },
  { href: "/categories/style", label: "STYLE" },
  { href: "/categories/scene", label: "SCENE" },
  { href: "/categories/guide", label: "GUIDE" },
  { href: "/categories/feature", label: "FEATURE" },
];

const searchSuggestions = [
  "推し色",
  "ライブ参戦服",
  "アクスタ",
  "痛バ",
  "プチプラ",
  "水色",
  "シルバー",
  "学校帰り",
];

function normalizeKeyword(value: string) {
  return value.trim().toLowerCase();
}

export function Header({ searchItems }: { searchItems: ArticleSearchItem[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const normalizedKeyword = normalizeKeyword(keyword);

  const results = useMemo(() => {
    if (normalizedKeyword.length === 0) {
      return searchItems.slice(0, 5);
    }

    return searchItems
      .filter((item) => item.searchText.includes(normalizedKeyword))
      .slice(0, 8);
  }, [normalizedKeyword, searchItems]);

  return (
    <header className="sticky top-0 z-20 border-b border-[#e8e1dd] bg-[#fffdfb]/94 backdrop-blur">
      <div className="mx-auto grid min-h-[74px] max-w-7xl grid-cols-[44px_1fr_44px] items-center gap-3 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="min-w-0 justify-self-start">
          <Link
            href="/categories"
            className="hidden text-xs font-bold tracking-[0.16em] text-[#7e6f68] transition hover:text-[#b66f79] lg:block"
          >
            CATEGORY
          </Link>
        </div>
        <Link href="/" className="justify-self-center text-center">
          <span className="brand-logo block whitespace-nowrap text-[22px] leading-none text-[#2b2522] sm:text-[26px]">
            oshikatsu coord
          </span>
          <span className="mt-1 block whitespace-nowrap text-[11px] font-medium tracking-[0.12em] text-[#8b7b74]">
            推し活と日常服の小さな編集室
          </span>
        </Link>
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center justify-self-end rounded-[4px] border border-[#eadfda] bg-white text-[#6b514a] transition hover:border-[#b66f79]/50 hover:text-[#b66f79] active:translate-y-px"
          aria-label="記事を検索する"
          aria-expanded={isSearchOpen}
          onClick={() => setIsSearchOpen((current) => !current)}
        >
          <MagnifyingGlass size={22} weight="bold" />
        </button>
      </div>
      <div
        className={`overflow-hidden border-t border-[#f0e9e5] bg-[#fffdfb] transition-[max-height,opacity] duration-300 ${
          isSearchOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2 rounded-[4px] border border-[#e3d7d1] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(80,54,45,0.05)]">
            <MagnifyingGlass size={20} weight="bold" className="shrink-0 text-[#b66f79]" />
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="キーワードで記事を検索"
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#2b2522] outline-none placeholder:text-[#a89b95]"
              autoComplete="off"
            />
            <button
              type="button"
              className="shrink-0 text-xs font-black tracking-[0.12em] text-[#8b7b74] transition hover:text-[#b66f79]"
              onClick={() => {
                setKeyword("");
                setIsSearchOpen(false);
              }}
            >
              閉じる
            </button>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setKeyword(suggestion)}
                className="ui-chip ui-chip-accent"
              >
                #{suggestion}
              </button>
            ))}
          </div>
          <div className="mt-3 overflow-hidden rounded-[4px] border border-[#eadfda] bg-white">
            {results.length > 0 ? (
              results.map((article) => (
                <Link
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="block border-b border-[#f0e9e5] px-4 py-3 last:border-b-0 transition hover:bg-[#fff8f5]"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <span className="block text-[11px] font-black text-[#b66f79]">{article.menuLabel}</span>
                  <span className="mt-1 block text-sm font-black leading-6 text-[#2b2522]">{article.title}</span>
                  <span className="mt-1 line-clamp-2 block text-xs font-medium leading-5 text-[#746863]">
                    {article.excerpt}
                  </span>
                </Link>
              ))
            ) : (
              <p className="px-4 py-5 text-sm font-bold text-[#746863]">
                該当する記事がありません。
              </p>
            )}
          </div>
        </div>
      </div>
      <nav className="border-t border-[#f0e9e5]">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 text-[12px] font-medium text-[#4a403b] sm:px-6 lg:justify-center lg:px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 border-b border-transparent pb-1 transition hover:border-[#b66f79] hover:text-[#b66f79]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
