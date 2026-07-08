import Image from "next/image";
import Link from "next/link";
import type { ArticleSummary } from "@/lib/types";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");

export function TopicArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <article className="group w-[72vw] min-w-[72vw] snap-start sm:w-auto sm:min-w-0">
      <Link
        href={`/articles/${article.slug}`}
        className="relative block aspect-square overflow-hidden rounded-[8px] border border-[#eadfda] bg-[#f4eeeb]"
        aria-label={article.title}
      >
        <Image
          src={`${basePath}${article.thumbnailImage}`}
          alt={article.thumbnailAlt}
          fill
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 31vw, 88vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/88 px-3 py-1 text-[11px] font-bold text-[#6b514a] shadow-[0_8px_24px_rgba(65,45,38,0.08)]">
          {article.category}
        </span>
      </Link>
      <h3 className="mt-3 text-[15px] font-black leading-7 text-[#2b2522] transition group-hover:text-[#b66f79]">
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h3>
    </article>
  );
}

export function TopicArticlePlaceholder() {
  return (
    <article className="w-[72vw] min-w-[72vw] snap-start sm:w-auto sm:min-w-0">
      <div className="grid aspect-square place-items-center rounded-[8px] border border-dashed border-[#d7c5bf] bg-[#f1eeeb]">
        <span className="text-xs font-black tracking-[0.18em] text-[#a89b95]">COMING SOON</span>
      </div>
      <h3 className="mt-3 text-[15px] font-black leading-7 text-[#9a8d87]">
        記事準備中
      </h3>
    </article>
  );
}
