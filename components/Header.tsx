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
    <header className="sticky top-0 z-20 border-b border-[#f5ccd8] bg-white/94 backdrop-blur">
      <div className="mx-auto grid min-h-[74px] max-w-7xl grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-3 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="min-w-0 justify-self-start">
          <Link
            href="/categories"
            className="hidden text-xs font-black tracking-[0.16em] text-[#ff4f8b] transition hover:text-[#f22f6d] lg:block"
          >
            CATEGORY
          </Link>
        </div>
        <div className="min-w-0 justify-self-stretch text-center lg:w-auto lg:justify-self-center">
          <div className="scrollbar-none max-w-full overflow-x-auto overscroll-x-contain whitespace-nowrap px-1 lg:overflow-visible lg:px-0">
            <Link href="/" className="inline-flex min-w-max flex-col items-center px-3 sm:px-0">
              <span className="brand-logo block whitespace-nowrap text-[22px] leading-none text-[#2b2522] sm:text-[26px]">
                oshikatsu coord
              </span>
              <span className="mt-1 block whitespace-nowrap text-[11px] font-medium tracking-[0.12em] text-[#8b7b74]">
                推し活と日常服の小さな編集室
              </span>
            </Link>
          </div>
        </div>
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center justify-self-end rounded-[4px] border border-[#ffd5df] bg-white text-[#6b514a] transition hover:border-[#ff4f8b]/60 hover:text-[#ff4f8b] active:translate-y-px"
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
            className="flex items-center gap-2 rounded-[4px] border border-[#ffd5df] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(255,79,139,0.09)]"
            onSubmit={handleSearch}
          >
            <MagnifyingGlass size={20} weight="bold" className="shrink-0 text-[#ff4f8b]" />
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
              className="shrink-0 text-xs font-black tracking-[0.12em] text-[#8b7b74] transition hover:text-[#ff4f8b]"
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
