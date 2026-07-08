import type { Product } from "./types";

export const products = [
  {
    id: "mint-rib-knit",
    productName: "mint blue rib knit top mock",
    displayName: "シアーリブニット",
    itemType: "トップス",
    color: "ミントブルー",
    affiliateUrl: "https://example.com/affiliate/mint-rib-knit",
    imageUrl: "/images/products/mint-rib-knit-v1.png",
    price: "2,990円",
    priceNote: "価格は掲載時点の目安です",
    status: "mock",
    relatedColors: ["水色", "白", "シルバー"],
    relatedScenes: ["ライブ", "普段着", "コラボカフェ"],
    relatedTastes: ["透明感", "軽やか"],
    lastCheckedAt: "2026-07-07",
    note: "公式アフィリエイト素材に差し替える想定の仮データです。",
  },
  {
    id: "black-pleats-skirt",
    productName: "black pleats skirt mock",
    displayName: "プリーツミニスカート",
    itemType: "スカート",
    color: "ブラック",
    affiliateUrl: "https://example.com/affiliate/black-pleats-skirt",
    imageUrl: "/images/products/black-pleats-skirt-v1.png",
    price: "2,690円",
    priceNote: "価格は掲載時点の目安です",
    status: "mock",
    relatedColors: ["黒", "水色"],
    relatedScenes: ["ライブ", "イベント"],
    relatedTastes: ["クール", "近未来感"],
    lastCheckedAt: "2026-07-07",
    note: "商品画像は公式アフィリエイト素材を無加工で表示してください。",
  },
  {
    id: "silver-mini-bag",
    productName: "silver mini shoulder bag mock",
    displayName: "メタリックミニバッグ",
    itemType: "バッグ",
    color: "シルバー",
    affiliateUrl: "https://example.com/affiliate/silver-mini-bag",
    imageUrl: "/images/products/silver-mini-bag-v1.png",
    price: "2,480円",
    priceNote: "価格は掲載時点の目安です",
    status: "mock",
    relatedColors: ["シルバー", "水色", "黒"],
    relatedScenes: ["コラボカフェ", "イベント"],
    relatedTastes: ["近未来感", "透明感"],
    lastCheckedAt: "2026-07-07",
    note: "実在商品の形状をイラスト化しない前提の仮データです。",
  },
  {
    id: "black-platform-sneaker",
    productName: "black platform sneaker mock",
    displayName: "厚底スニーカー",
    itemType: "靴",
    color: "ブラック",
    affiliateUrl: "https://example.com/affiliate/black-platform-sneaker",
    imageUrl: "/images/products/black-platform-sneaker-v1.png",
    price: "3,990円",
    priceNote: "価格は掲載時点の目安です",
    status: "mock",
    relatedColors: ["黒"],
    relatedScenes: ["ライブ", "遠征", "普段着"],
    relatedTastes: ["カジュアル", "クール"],
    lastCheckedAt: "2026-07-07",
    note: "商品写真は切り抜きや合成をせず、そのまま表示します。",
  },
  {
    id: "clear-silver-accessory",
    productName: "clear silver accessory set mock",
    displayName: "クリアアクセセット",
    itemType: "アクセサリー",
    color: "クリアシルバー",
    affiliateUrl: "https://example.com/affiliate/clear-silver-accessory",
    imageUrl: "/images/products/clear-silver-accessory-v1.png",
    price: "1,290円",
    priceNote: "価格は掲載時点の目安です",
    status: "mock",
    relatedColors: ["シルバー", "白", "水色"],
    relatedScenes: ["推し会", "普段着"],
    relatedTastes: ["透明感", "軽やか"],
    lastCheckedAt: "2026-07-07",
    note: "公式衣装や固有モチーフを連想させない汎用小物として扱います。",
  },
] satisfies Product[];

const productsById = new Map<string, Product>(
  products.map((product) => [product.id, product]),
);

export function getProductById(id: string): Product {
  const product = productsById.get(id);

  if (!product) {
    throw new Error(`Unknown product id: ${id}`);
  }

  return product;
}

export function getProductsByIds(ids: readonly string[]): Product[] {
  return ids.map((id) => getProductById(id));
}
