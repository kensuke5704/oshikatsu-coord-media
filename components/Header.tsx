"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MagnifyingGlass } from "@phosphor-icons/react";

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
  return value.trim();
}

export function Header() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const normalizedKeyword = normalizeKeyword(keyword);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (normalizedKeyword.length === 0) {
      return;
    }

    setIsSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(normalizedKeyword)}`);
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[#e8e1dd] bg-[#fffdfb]/94 backdrop-blur">
      <div className="relative mx-auto flex min-h-[74px] max-w-7xl items-center lg:hidden">
        <div className="scrollbar-none flex max-w-full flex-1 overflow-x-auto overscroll-x-contain pl-4 pr-[76px]">
          <Link href="/" className="mx-auto inline-flex min-w-max flex-col items-center px-3 text-center">
            <span className="brand-logo block whitespace-nowrap text-[22px] leading-none text-[#2b2522]">
              oshikatsu coord
            </span>
            <span className="mt-1 block whitespace-nowrap text-[11px] font-medium tracking-[0.12em] text-[#8b7b74]">
              推し活と日常服の小さな編集室
            </span>
          </Link>
        </div>
        <button
          type="button"
          className="absolute right-4 top-1/2 grid size-11 shrink-0 -translate-y-1/2 place-items-center rounded-[4px] border border-[#eadfda] bg-white text-[#6b514a] transition hover:border-[#b66f79]/50 hover:text-[#b66f79] active:scale-[0.98]"
          aria-label="記事を検索する"
          aria-expanded={isSearchOpen}
          onClick={() => setIsSearchOpen((current) => !current)}
        >
          <MagnifyingGlass size={22} weight="bold" />
        </button>
      </div>
      <div className="mx-auto hidden min-h-[74px] max-w-7xl items-center justify-center gap-16 px-8 lg:flex xl:gap-24 2xl:gap-32">
        <Link href="/" className="inline-flex min-w-max flex-col items-start justify-self-start text-left">
          <span className="brand-logo block whitespace-nowrap text-[26px] leading-none text-[#2b2522]">
            oshikatsu coord
          </span>
          <span className="mt-1 block whitespace-nowrap text-[11px] font-medium tracking-[0.12em] text-[#8b7b74]">
            推し活と日常服の小さな編集室
          </span>
        </Link>
        <div className="min-w-0">
          <Link
            href="/categories"
            className="text-xs font-bold tracking-[0.16em] text-[#7e6f68] transition hover:text-[#b66f79]"
          >
            CATEGORY
          </Link>
        </div>
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center rounded-[4px] border border-[#eadfda] bg-white text-[#6b514a] transition hover:border-[#b66f79]/50 hover:text-[#b66f79] active:translate-y-px"
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
          <form
            className="flex items-center gap-2 rounded-[4px] border border-[#e3d7d1] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(80,54,45,0.05)]"
            onSubmit={handleSearch}
          >
            <MagnifyingGlass size={20} weight="bold" className="shrink-0 text-[#b66f79]" />
            <input
              name="q"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="キーワードで記事を検索"
              className="min-w-0 flex-1 bg-transparent text-sm font-bold text-[#2b2522] outline-none placeholder:text-[#a89b95]"
              autoComplete="off"
            />
            <button
              type="submit"
              className="ui-action px-3 py-2"
              disabled={normalizedKeyword.length === 0}
            >
              検索
            </button>
          </form>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
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
        </div>
      </div>
      <nav className="border-t border-[#f0e9e5]">
        <div className="mx-auto flex w-full max-w-none snap-x gap-8 overflow-x-auto overscroll-x-contain scroll-smooth px-5 py-3 text-[12px] font-medium text-[#4a403b] sm:px-6 lg:max-w-5xl lg:justify-between lg:gap-0 lg:overflow-visible lg:px-10 xl:max-w-6xl">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 snap-start border-b border-transparent pb-1 transition hover:border-[#b66f79] hover:text-[#b66f79]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
