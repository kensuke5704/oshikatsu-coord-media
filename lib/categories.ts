import type { Category, CategoryName, CategorySlug } from "./types";

export const categories = [
  {
    name: "LOOK",
    slug: "look",
    count: 0,
    description: "作品やキャラクターの色・ムードを日常服へ置き換えるコーデ提案。",
  },
  {
    name: "COLOR",
    slug: "color",
    count: 0,
    description: "推し色から服、小物、配色バランスを探すカラーガイド。",
  },
  {
    name: "STYLE",
    slug: "style",
    count: 0,
    description: "近未来、清楚、モードなどテイストから探せる着こなし。",
  },
  {
    name: "SCENE",
    slug: "scene",
    count: 0,
    description: "ライブ、コラボカフェ、推し会など場面別の服装ガイド。",
  },
  {
    name: "GUIDE",
    slug: "guide",
    count: 0,
    description: "買い物、著作権、マナー、アイテム選びの実用ガイド。",
  },
  {
    name: "FEATURE",
    slug: "feature",
    count: 0,
    description: "基礎知識や編集部視点の特集記事。",
  },
] satisfies Category[];

const categoriesByName = new Map<CategoryName, Category>(
  categories.map((category) => [category.name, category]),
);

const categoriesBySlug = new Map<CategorySlug, Category>(
  categories.map((category) => [category.slug, category]),
);

export function getCategoryByName(name: CategoryName): Category {
  const category = categoriesByName.get(name);

  if (!category) {
    throw new Error(`Unknown category name: ${name}`);
  }

  return category;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return isCategorySlug(slug) ? categoriesBySlug.get(slug) : undefined;
}

export function isCategorySlug(slug: string): slug is CategorySlug {
  return categoriesBySlug.has(slug as CategorySlug);
}
