"use client";

import Link from "next/link";
import Image from "next/image";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { withBasePath } from "@/lib/media";
import type { ArticleSummary } from "@/lib/types";

const heroImageBySlug: Record<string, { src: string; alt: string }> = {
  "live-oshikatsu-coordinate": {
    src: "/images/home/hero-live.jpg",
    alt: "水色のカーディガンと黒のスカートを合わせた、ライブに向けたコーディネート",
  },
  "collaboration-cafe-oshikatsu-coordinate": {
    src: "/images/home/hero-collaboration-cafe.jpg",
    alt: "ラベンダーのプリーツスカートとシルバーバッグを合わせたカフェコーディネート",
  },
  "silver-bag-oshikatsu-coordinate": {
    src: "/images/home/hero-silver-bag.jpg",
    alt: "淡いブルーニットとシルバーショルダーバッグのディテール",
  },
  "futuristic-cyber-oshikatsu-coordinate": {
    src: "/images/home/hero-futuristic-style.jpg",
    alt: "水色と黒を使った近未来ムードのバウンドコーディネート",
  },
};

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
        <div className="home-hero-filmstrip" aria-live="polite">
          {visibleArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className={`home-hero-slide group ${index === activeIndex ? "is-active" : ""}`}
              aria-label={article.title}
              aria-hidden={index !== activeIndex}
            >
              {heroImageBySlug[article.slug] ? (
                <Image
                  src={withBasePath(heroImageBySlug[article.slug].src) ?? heroImageBySlug[article.slug].src}
                  alt={heroImageBySlug[article.slug].alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, min(1280px, 100vw)"
                  className="home-hero-image"
                  unoptimized
                />
              ) : null}
            </Link>
          ))}
        </div>
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
