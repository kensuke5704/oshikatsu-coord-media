import { articleDetails } from "./articles";
import type { ArticleSearchItem } from "./types";

function flattenText(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(flattenText).join(" ");
  }

  if (typeof value === "object" && value !== null) {
    return Object.values(value).map(flattenText).join(" ");
  }

  return typeof value === "string" || typeof value === "number" ? String(value) : "";
}

export function getArticleSearchIndex(): ArticleSearchItem[] {
  return articleDetails.map((article) => ({
    slug: article.slug,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    searchText: [
      article.title,
      article.category,
      article.characterName,
      article.workName,
      article.description,
      article.excerpt,
      article.mainColor,
      article.subColor,
      article.accentColor,
      flattenText(article.moodKeywords),
      flattenText(article.scenes),
      flattenText(article.itemTypes),
      flattenText(article.summary),
      flattenText(article.introduction),
      flattenText(article.colorPoints),
      flattenText(article.itemSections),
      flattenText(article.stylingPoints),
      flattenText(article.conclusion),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  }));
}
