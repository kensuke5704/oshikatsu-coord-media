import type { Category, CategoryName, CategorySlug } from "./types";

export const categories = [
  {
    name: "推し別コーデ",
    slug: "oshi-character",
    count: 42,
    description: "キャラクターの色や雰囲気を日常服に置き換える非公式提案。",
  },
  {
    name: "推し色コーデ",
    slug: "oshi-color",
    count: 15,
    description: "水色、黒、白など推し色から服や小物を選ぶガイド。",
  },
  {
    name: "テイスト別コーデ",
    slug: "taste",
    count: 10,
    description: "近未来、清楚、モードなど雰囲気から探せるコーデ。",
  },
  {
    name: "アイテム別おすすめ",
    slug: "item",
    count: 10,
    description: "バッグ、靴、アクセサリーなど買い物導線のある記事。",
  },
  {
    name: "EC・買い物ガイド",
    slug: "shopping",
    count: 2,
    description: "ECサイトで推し活アイテムを探すコツと選び方。",
  },
  {
    name: "トレンド・特集",
    slug: "trend",
    count: 2,
    description: "季節や話題に合わせた推し活ファッション特集。",
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
