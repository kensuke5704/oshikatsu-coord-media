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

  const visibleArticles = articles.slice(0, 4);
  const activeArticle = visibleArticles[activeIndex];
  const total = visibleArticles.length;

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
      <div className="home-hero-frame relative overflow-hidden bg-white">
        <Link
          href={`/articles/${activeArticle.slug}`}
          className="home-hero-single group block"
          aria-label={activeArticle.title}
        >
          <ArticleVisual article={activeArticle} variant="hero" />
        </Link>
        <div className="pointer-events-none absolute inset-x-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between gap-3 sm:inset-x-5">
          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={controls.prev}
              className="home-hero-control"
              aria-label="前の特集記事"
            >
              <CaretLeft size={19} weight="bold" />
            </button>
            <button
              type="button"
              onClick={controls.next}
              className="home-hero-control"
              aria-label="次の特集記事"
            >
              <CaretRight size={19} weight="bold" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 bg-white/82 px-3 py-2 backdrop-blur">
          {visibleArticles.map((article, index) => (
            <button
              key={article.slug}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1 w-8 transition ${
                index === activeIndex ? "bg-[#2b2522]" : "bg-[#d7d0cc] hover:bg-[#746863]"
              }`}
              aria-label={`${index + 1}番目の特集記事を表示`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
