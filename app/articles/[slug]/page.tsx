import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarBlank, Tag } from "@phosphor-icons/react/dist/ssr";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleSidebar } from "@/components/Sidebar";
import { ColorPalette } from "@/components/ColorPalette";
import { DisclosureNotice } from "@/components/Notice";
import { OutfitIllustration } from "@/components/OutfitIllustration";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteShell } from "@/components/SiteShell";
import {
  articles,
  getArticleBySlug,
  getArticleSummaryBySlug,
  getRelatedArticles,
} from "@/lib/articles";
import { getProductsByIds } from "@/lib/products";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleSummaryBySlug(slug);

  return {
    title: article ? `${article.title} | oshikatsu coord` : "記事",
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const summary = getArticleSummaryBySlug(slug);

  if (!summary) {
    notFound();
  }

  const detail = getArticleBySlug(slug);
  if (!detail) {
    notFound();
  }
  const related = getRelatedArticles(detail.relatedSlugs);
  const footerRelated = related.slice(0, 3);
  const products = getProductsByIds(detail.productIds);
  const mainImage = detail.images[0];
  const shouldShowPalette =
    detail.category !== "EC・買い物ガイド" && detail.category !== "トレンド・特集";

  return (
    <SiteShell>
      <article className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-5 text-xs font-bold text-[#66777b]">
          <Link href="/">HOME</Link>
          <span className="px-2">/</span>
          <Link href={`/categories/${detail.categorySlug}`}>{detail.category}</Link>
          <span className="px-2">/</span>
          <span>{detail.title}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            <span className="rounded-full bg-[#2f929b] px-4 py-2 text-sm font-black text-white">
              {detail.category}
            </span>
            <h1 className="article-title mt-5 max-w-4xl text-[1.72rem] leading-[1.55] text-[#2b2522] sm:text-[2.05rem] lg:text-[2.28rem]">
              {detail.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm font-bold text-[#66777b]">
              <span className="inline-flex items-center gap-2">
                <CalendarBlank size={18} />
                {detail.publishedAt}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarBlank size={18} />
                更新: {detail.updatedAt}
              </span>
              <span className="inline-flex items-center gap-2">
                <Tag size={18} />
                {detail.mainColor}×{detail.subColor}
              </span>
            </div>

            <div className="mt-7">
              <DisclosureNotice />
            </div>

            <div className="article-body mt-8 text-base font-medium text-[#1d3337]">
              {detail.introduction.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <section className="mt-10">
              <SectionHeading number="01" title="カラー＆雰囲気のポイント" />
              <div className={`grid gap-5 ${shouldShowPalette ? "lg:grid-cols-[0.82fr_1.18fr]" : ""}`}>
                <div className="soft-card rounded-[8px] p-5">
                  <ul className="space-y-3 text-sm font-bold leading-7 text-[#1d3337]">
                    {detail.colorPoints.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="text-[#2f929b]">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {shouldShowPalette ? <ColorPalette colors={detail.palette} /> : null}
              </div>
            </section>

            <section className="mt-10">
              <SectionHeading number="02" title="コーディネートイメージ" />
              <OutfitIllustration image={mainImage} />
            </section>

            {products.length > 0 ? (
              <section className="mt-10">
                <SectionHeading number="03" title="おすすめアイテム" />
                <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-10">
              <SectionHeading number="04" title="アイテム構成" />
              <div className="grid gap-6 rounded-[8px] border border-[#d7ecee] bg-white p-4 md:grid-cols-[minmax(0,0.9fr)_minmax(280px,1fr)] md:p-5">
                <div className="overflow-hidden rounded-[8px] bg-[#f6fbfb]">
                  <img
                    src={`${basePath}/images/articles/item-composition-hatsune-miku-v1.png`}
                    alt={`${detail.title}のアイテム構成イラスト`}
                    className="h-full min-h-[320px] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="grid content-center gap-3">
                  {detail.itemSections.map((section, index) => (
                    <section
                      key={section.heading}
                      className="rotate-[-0.35deg] rounded-[8px] border border-[#9fd4d8] bg-[#fffdf7] p-4 shadow-[0_10px_28px_rgba(37,105,112,0.08)] even:rotate-[0.35deg]"
                    >
                      <div className="flex items-start gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#2f929b] text-sm font-black text-white">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="text-base font-black leading-7 text-[#1d3337]">
                            {section.heading}
                          </h3>
                          <p className="mt-1 text-sm font-bold leading-7 text-[#52676b]">
                            {section.body[0]}
                          </p>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-10">
              <div className="rounded-[8px] border border-[#9fd4d8] bg-[#f4fbfb] p-5">
                <h2 className="text-2xl font-black text-[#2f929b]">着こなしのポイント</h2>
                <div className="mt-4 space-y-4">
                  {detail.stylingPoints.map((point) => (
                    <div key={point.heading}>
                      <h3 className="font-black text-[#1d3337]">{point.heading}</h3>
                      <p className="mt-1 text-sm font-bold leading-7 text-[#66777b]">
                        {point.body[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-10 rounded-[8px] border border-[#d7ecee] bg-white p-6">
              <h2 className="text-2xl font-black text-[#1d3337]">まとめ</h2>
              <div className="article-body text-base font-medium text-[#1d3337]">
                {detail.conclusion.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            {footerRelated.length > 0 ? (
              <section className="mt-10">
                <SectionHeading number="05" title="関連記事" />
                <div className="grid gap-5 md:grid-cols-3">
                  {footerRelated.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <ArticleSidebar summary={detail.summary} related={related} />
        </div>
      </article>
    </SiteShell>
  );
}
