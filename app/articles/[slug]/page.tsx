import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarBlank, Heart, Tag } from "@phosphor-icons/react/dist/ssr";
import { ArticleSidebar } from "@/components/Sidebar";
import { ColorPalette } from "@/components/ColorPalette";
import { DisclosureNotice, IllustrationNotice } from "@/components/Notice";
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
  const products = getProductsByIds(detail.productIds);
  const mainImage = detail.images[0];

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
            <h1 className="article-title mt-5 max-w-4xl text-3xl leading-[1.45] text-[#2b2522] sm:text-4xl lg:text-5xl">
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
                <Heart size={18} />
                {detail.likes}
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
              <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
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
                <ColorPalette colors={detail.palette} />
              </div>
            </section>

            <section className="mt-10">
              <SectionHeading number="02" title="参考画像で見るコーデ" />
              <div className="space-y-4">
                <IllustrationNotice />
                <OutfitIllustration image={mainImage} />
              </div>
            </section>

            {products.length > 0 ? (
              <section className="mt-10">
                <SectionHeading number="03" title="おすすめアイテム" />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <p className="mt-3 text-center text-xs font-bold text-[#8a989b]">
                  商品データは仮データです。実運用では公式アフィリエイト素材を無加工で表示します。
                </p>
              </section>
            ) : null}

            <section className="mt-10">
              <SectionHeading number="04" title="アイテム構成" />
              <div className="grid gap-4">
                {detail.itemSections.map((section) => (
                  <section key={section.heading} className="soft-card rounded-[8px] p-5">
                    <h3 className="text-xl font-black text-[#1d3337]">{section.heading}</h3>
                    <div className="article-body text-sm font-medium text-[#1d3337]">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section className="mt-10 grid gap-5 lg:grid-cols-2">
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
              <div className="rounded-[8px] border border-[#f0c7ce] bg-[#fff7f8] p-5">
                <h2 className="text-2xl font-black text-[#e47a8a]">NGポイント</h2>
                <ul className="mt-4 space-y-2 text-sm font-bold leading-7 text-[#1d3337]">
                  {detail.ngPoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-[#e47a8a]">×</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-10">
              <SectionHeading number="05" title="シーン別の着方" />
              <div className="grid gap-4 md:grid-cols-3">
                {detail.sceneSections.map((section) => (
                  <section key={section.heading} className="soft-card rounded-[8px] p-5">
                    <h3 className="text-lg font-black text-[#1d3337]">{section.heading}</h3>
                    <p className="mt-3 text-sm font-bold leading-7 text-[#66777b]">
                      {section.body[0]}
                    </p>
                  </section>
                ))}
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
          </div>

          <ArticleSidebar summary={detail.summary} related={related} />
        </div>
      </article>
    </SiteShell>
  );
}
