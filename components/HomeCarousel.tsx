"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import type { ArticleSummary } from "@/lib/types";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");

export function HomeCarousel({ articles }: { articles: ArticleSummary[] }) {
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
      className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10"
      aria-label="特集記事"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[8px] border border-[#eadfda] bg-white shadow-[0_22px_70px_rgba(65,45,38,0.08)]">
        <div className="grid min-h-[420px] lg:grid-cols-[1.24fr_0.76fr]">
          <Link
            href={`/articles/${activeArticle.slug}`}
            className="relative block min-h-[300px] overflow-hidden bg-[#f4eeeb] lg:min-h-[500px]"
            aria-label={activeArticle.title}
          >
            <Image
              key={activeArticle.thumbnailImage}
              src={`${basePath}${activeArticle.thumbnailImage}`}
              alt={activeArticle.thumbnailAlt}
              fill
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover transition duration-700 ease-out motion-safe:animate-[carouselImageIn_700ms_ease-out]"
              priority
            />
            <span className="absolute inset-0 bg-gradient-to-r from-black/26 via-black/4 to-transparent" />
          </Link>
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-[#b66f79]">
                FEATURE {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <Link href={`/articles/${activeArticle.slug}`}>
                <h1 className="mt-4 font-editorial text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.22] tracking-[0.02em] text-[#2b2522] transition hover:text-[#b66f79]">
                  {activeArticle.title}
                </h1>
              </Link>
              <p className="mt-5 max-w-xl text-sm font-medium leading-8 text-[#746863]">
                {activeArticle.excerpt}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[activeArticle.mainColor, activeArticle.subColor, activeArticle.accentColor]
                  .filter((color, index, array) => color && array.indexOf(color) === index)
                  .map((color) => (
                    <span
                      key={color}
                      className="rounded-full border border-[#eadfda] bg-[#fffaf7] px-3 py-1 text-xs font-bold text-[#6b514a]"
                    >
                      {color}
                    </span>
                  ))}
              </div>
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={controls.prev}
                    className="grid size-11 place-items-center rounded-full border border-[#eadfda] bg-white text-[#6b514a] transition hover:border-[#b66f79] hover:text-[#b66f79] active:translate-y-px"
                    aria-label="前の特集記事"
                  >
                    <CaretLeft size={19} weight="bold" />
                  </button>
                  <button
                    type="button"
                    onClick={controls.next}
                    className="grid size-11 place-items-center rounded-full border border-[#eadfda] bg-white text-[#6b514a] transition hover:border-[#b66f79] hover:text-[#b66f79] active:translate-y-px"
                    aria-label="次の特集記事"
                  >
                    <CaretRight size={19} weight="bold" />
                  </button>
                </div>
                <Link
                  href={`/articles/${activeArticle.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full bg-[#b66f79] px-5 text-sm font-black text-white transition hover:bg-[#9d5963] active:translate-y-px"
                >
                  記事を読む
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {articles.map((article, index) => (
                  <button
                    key={article.slug}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition ${
                      index === activeIndex ? "bg-[#b66f79]" : "bg-[#eadfda] hover:bg-[#d7c5bf]"
                    }`}
                    aria-label={`${index + 1}番目の特集記事を表示`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
