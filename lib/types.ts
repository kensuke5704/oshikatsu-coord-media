export type CategorySlug =
  | "look"
  | "color"
  | "style"
  | "scene"
  | "guide"
  | "feature";

export type CategoryName =
  | "LOOK"
  | "COLOR"
  | "STYLE"
  | "SCENE"
  | "GUIDE"
  | "FEATURE";

export type ArticleType = CategoryName;

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
  menuLabel: CategoryName;
  excerpt: string;
  searchText: string;
};

export type ArticleSummary = {
  no: number;
  articleType: ArticleType;
  featureType: string;
  menuLabel: CategoryName;
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
  tags: string[];
  affiliatePriority: string[];
  status: ArticleStatus;
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
  editorialSections?: DetailSection[];
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
