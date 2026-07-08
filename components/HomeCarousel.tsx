"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import type { ArticleSummary } from "@/lib/types";

export function HomeCarousel({
  articles,
  assetBasePath = "",
}: {
  articles: ArticleSummary[];
  assetBasePath?: string;
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
      className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8"
      aria-label="特集記事"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[8px] border border-[#eadfda] bg-[#f4eeeb] shadow-[0_16px_50px_rgba(65,45,38,0.07)]">
        <Link
          href={`/articles/${activeArticle.slug}`}
          className="relative block aspect-[4/3] min-h-[220px] overflow-hidden sm:aspect-[16/7] sm:min-h-[280px] lg:min-h-[340px]"
          aria-label={activeArticle.title}
        >
          <Image
            key={activeArticle.thumbnailImage}
            src={`${assetBasePath}${activeArticle.thumbnailImage}`}
            alt={activeArticle.thumbnailAlt}
            fill
            sizes="(min-width: 1024px) 960px, 100vw"
            className="object-cover transition duration-700 ease-out motion-safe:animate-[carouselImageIn_700ms_ease-out]"
            priority
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </Link>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-between gap-3 px-3 sm:bottom-5 sm:px-5">
          <div className="pointer-events-auto flex gap-2">
            <button
              type="button"
              onClick={controls.prev}
              className="grid size-10 place-items-center rounded-full border border-white/70 bg-white/86 text-[#6b514a] shadow-[0_10px_30px_rgba(65,45,38,0.12)] backdrop-blur transition hover:bg-white hover:text-[#b66f79] active:translate-y-px"
              aria-label="前の特集記事"
            >
              <CaretLeft size={19} weight="bold" />
            </button>
            <button
              type="button"
              onClick={controls.next}
              className="grid size-10 place-items-center rounded-full border border-white/70 bg-white/86 text-[#6b514a] shadow-[0_10px_30px_rgba(65,45,38,0.12)] backdrop-blur transition hover:bg-white hover:text-[#b66f79] active:translate-y-px"
              aria-label="次の特集記事"
            >
              <CaretRight size={19} weight="bold" />
            </button>
          </div>
          <div className="pointer-events-auto flex max-w-[45%] justify-end gap-1.5 sm:gap-2">
            {articles.map((article, index) => (
              <button
                key={article.slug}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-6 rounded-full shadow-[0_6px_18px_rgba(65,45,38,0.12)] transition sm:w-8 ${
                  index === activeIndex ? "bg-white" : "bg-white/46 hover:bg-white/72"
                }`}
                aria-label={`${index + 1}番目の特集記事を表示`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
