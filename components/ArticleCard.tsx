import Link from "next/link";
import Image from "next/image";
import type { ArticleSummary } from "@/lib/types";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");

export function ArticleCard({
  article,
  priority = false,
}: {
  article: ArticleSummary;
  priority?: boolean;
}) {
  return (
    <article
      className={`group media-card fade-up flex h-full flex-col overflow-hidden rounded-[8px] bg-white ${
        priority ? "md:grid md:grid-cols-[1.05fr_0.95fr]" : ""
      }`}
    >
      <Link
        href={`/articles/${article.slug}`}
        className={`relative block overflow-hidden bg-[#f4eeeb] ${
          priority ? "min-h-[340px] md:min-h-full" : "aspect-[4/3]"
        }`}
        aria-label={article.title}
      >
        <Image
          src={`${basePath}${article.thumbnailImage}`}
          alt={article.thumbnailAlt}
          fill
          sizes={priority ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          priority={priority}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 rounded-full bg-white/88 px-3 py-1 text-[11px] font-medium text-[#6b514a] shadow-[0_8px_24px_rgba(65,45,38,0.08)]">
          {article.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-[#b66f79]">
            {article.category}
          </span>
        </div>
        <h2
          className={`article-card-title mt-4 text-[#2b2522] transition group-hover:text-[#b66f79] ${
            priority
              ? "text-[1.25rem] leading-[1.65] sm:text-[1.45rem] sm:leading-[1.58]"
              : "text-[1.02rem] leading-[1.72] sm:text-[1.08rem]"
          }`}
        >
          <Link href={`/articles/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm font-medium leading-7 text-[#746863]">
          {article.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {[article.mainColor, article.subColor, article.accentColor]
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
    </article>
  );
}
