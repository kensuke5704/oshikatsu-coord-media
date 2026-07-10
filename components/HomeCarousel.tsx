"use client";

import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { ArticleVisual } from "@/components/ArticleVisual";
import type { ArticleSummary } from "@/lib/types";

export function HomeCarousel({
  articles,
}: {
  articles: ArticleSummary[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeArticle = articles[activeIndex];
  const total = articles.length;

  const controls = useMemo(
    () => ({
      next: () => setActiveIndex((index) => (index + 1) % total),
      prev: () => setActiveIndex((index) => (index - 1 + total) % total),
    }),
    [total],
  );

  useEffect(() => {
    if (isPaused || total <= 1) {
      return;
    }

    const timer = window.setInterval(controls.next, 5200);
    return () => window.clearInterval(timer);
  }, [controls, isPaused, total]);

  if (!activeArticle) {
    return null;
  }

  return (
    <section
      className="home-carousel mx-auto max-w-7xl px-4 pt-5 sm:px-6 sm:pt-7 lg:px-8 lg:pt-8"
      aria-label="特集記事"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative grid overflow-hidden border border-[#f0d7df] bg-white shadow-[0_18px_44px_rgba(120,68,83,0.08)] lg:grid-cols-[minmax(0,1.05fr)_minmax(390px,0.78fr)]">
        <Link
          href={`/articles/${activeArticle.slug}`}
          className="group relative z-0 block aspect-[4/5] min-h-[300px] overflow-hidden bg-[#fff8fb] sm:aspect-[16/7] lg:min-h-[392px]"
          aria-label={activeArticle.title}
        >
          <ArticleVisual key={activeArticle.slug} article={activeArticle} variant="hero" />
        </Link>
        <div className="relative z-10 flex flex-col justify-between border-t border-[#f0d7df] bg-[#fffdfb] p-5 sm:p-6 lg:border-l lg:border-t-0 lg:p-7">
          <div>
            <span className="text-[11px] font-black tracking-[0.18em] text-[#e62f6d]">
              FEATURED
            </span>
            <h1 className="mt-4 text-[1.45rem] font-black leading-[1.55] text-[#2b2522] sm:text-[1.65rem] lg:text-[1.8rem]">
              <Link href={`/articles/${activeArticle.slug}`} className="transition hover:text-[#e62f6d]">
                {activeArticle.title}
              </Link>
            </h1>
            <p className="mt-4 line-clamp-4 text-sm font-bold leading-7 text-[#746863]">
              {activeArticle.excerpt}
            </p>
          </div>
          <div className="mt-7 flex items-end justify-between gap-4">
            <Link
              href={`/articles/${activeArticle.slug}`}
              className="ui-action border-[#ffbfd2] bg-[#fff5f8] text-[#e62f6d]"
            >
              READ
            </Link>
            <div className="flex gap-2">
              {articles.map((article, index) => (
                <button
                  key={article.slug}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-8 transition ${
                    index === activeIndex ? "bg-[#ff4f8b]" : "bg-[#f1d8df] hover:bg-[#ffbfd2]"
                  }`}
                  aria-label={`${index + 1}番目の特集記事を表示`}
                  aria-current={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute left-3 right-3 top-1/2 flex -translate-y-1/2 items-center justify-between gap-3 sm:left-5 sm:right-auto sm:top-auto sm:bottom-5 sm:translate-y-0">
          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={controls.prev}
              className="grid size-10 place-items-center border border-[#ffbfd2] bg-white/94 text-[#e62f6d] backdrop-blur transition hover:bg-white hover:text-[#ff4f8b] active:translate-y-px"
              aria-label="前の特集記事"
            >
              <CaretLeft size={19} weight="bold" />
            </button>
            <button
              type="button"
              onClick={controls.next}
              className="grid size-10 place-items-center border border-[#ffbfd2] bg-white/94 text-[#e62f6d] backdrop-blur transition hover:bg-white hover:text-[#ff4f8b] active:translate-y-px"
              aria-label="次の特集記事"
            >
              <CaretRight size={19} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
