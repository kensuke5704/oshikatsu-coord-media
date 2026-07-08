export type CategorySlug =
  | "oshi-character"
  | "oshi-color"
  | "taste"
  | "item"
  | "shopping"
  | "trend";

export type CategoryName =
  | "推し別コーデ"
  | "推し色コーデ"
  | "テイスト別コーデ"
  | "アイテム別おすすめ"
  | "EC・買い物ガイド"
  | "トレンド・特集";

export type Category = {
  name: CategoryName;
  slug: CategorySlug;
  count: number;
  description: string;
};

export type ArticleStatus = "sample" | "初期記事" | "未着手" | "完成";

export type ArticleImage = {
  src: string;
  alt: string;
  caption: string;
};

export type ArticleSearchItem = {
  slug: string;
  title: string;
  category: CategoryName;
  excerpt: string;
  searchText: string;
};

export type ArticleSummary = {
  no: number;
  category: CategoryName;
  categorySlug: CategorySlug;
  title: string;
  slug: string;
  characterName?: string;
  workName?: string;
  mainColor: string;
  subColor: string;
  accentColor: string;
  moodKeywords: string[];
  scenes: string[];
  itemTypes: string[];
  affiliatePriority: string[];
  status: ArticleStatus;
  publishedAt: string;
  updatedAt: string;
  memo: string;
  excerpt: string;
  thumbnailImage: string;
  thumbnailAlt: string;
};

export type ArticleSeed = Omit<
  ArticleSummary,
  "categorySlug" | "status" | "excerpt" | "thumbnailImage" | "thumbnailAlt"
> & {
  sourceStatus: string;
  imagePath?: string;
  imageAlt?: string;
};

export type ProductStatus = "mock" | "active" | "paused";

export type Product = {
  id: string;
  productName: string;
  displayName: string;
  itemType: string;
  color: string;
  affiliateUrl: string;
  imageUrl?: string;
  price: string;
  priceNote: string;
  status: ProductStatus;
  relatedColors: string[];
  relatedScenes: string[];
  relatedTastes: string[];
  lastCheckedAt: string;
  note: string;
};

export type PaletteColor = {
  name: string;
  value: string;
  role: string;
  usage: string;
};

export type DetailSection = {
  heading: string;
  body: string[];
};

export type ArticleDetail = ArticleSummary & {
  description: string;
  palette: PaletteColor[];
  summary: string[];
  introduction: string[];
  colorPoints: string[];
  illustrationNotes: string[];
  itemSections: DetailSection[];
  stylingPoints: DetailSection[];
  sceneSections: DetailSection[];
  ngPoints: string[];
  relatedSlugs: string[];
  productIds: string[];
  images: ArticleImage[];
  conclusion: string[];
};
