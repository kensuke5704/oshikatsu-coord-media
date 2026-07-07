export type CategorySlug =
  | "oshi-character"
  | "oshi-color"
  | "scene"
  | "taste"
  | "item"
  | "knowhow"
  | "rules"
  | "shopping"
  | "trend";

export type CategoryName =
  | "推し別コーデ"
  | "推し色コーデ"
  | "シーン別コーデ"
  | "テイスト別コーデ"
  | "アイテム別おすすめ"
  | "初心者向けノウハウ"
  | "ルール・マナー・著作権"
  | "EC・買い物ガイド"
  | "トレンド・特集";

export type Category = {
  name: CategoryName;
  slug: CategorySlug;
  count: number;
  description: string;
};

export type ArticleStatus = "sample" | "初期記事" | "未着手";

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
  memo: string;
  excerpt: string;
};

export type ProductStatus = "mock" | "active" | "paused";

export type Product = {
  id: string;
  productName: string;
  displayName: string;
  itemType: string;
  color: string;
  ecName: string;
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
  publishedAt: string;
  updatedAt: string;
  likes: number;
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
  conclusion: string[];
};
