import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const generatedRowsPath = path.join(rootDir, "lib", "articleRows.generated.ts");
const imageConfigPath = path.join(rootDir, "data", "article-image-config.json");
const historyPath = path.join(rootDir, "data", "article-image-history.json");

const imageConfig = JSON.parse(fs.readFileSync(imageConfigPath, "utf8"));
const noPaletteCategories = new Set(imageConfig.noPaletteCategories ?? []);
const history = fs.existsSync(historyPath) ? JSON.parse(fs.readFileSync(historyPath, "utf8")) : [];

const generatedRowsText = fs.readFileSync(generatedRowsPath, "utf8");
const jsonMatch = generatedRowsText.match(/export const articleRows = ([\s\S]*?) satisfies ArticleSeed\[];/);

if (!jsonMatch) {
  throw new Error("Could not read articleRows from lib/articleRows.generated.ts");
}

const articleRows = JSON.parse(jsonMatch[1]);

console.log(`imageRevision\t${imageConfig.imageRevision}`);
console.log(`imageSize\t${imageConfig.width}x${imageConfig.height}`);
console.log("");
console.log("targets:");
for (const row of articleRows) {
  const relativeImagePath = (row.imagePath ?? `/images/articles/${row.slug}.png`).replace(/^\//, "");
  const imagePath = path.join("public", relativeImagePath);
  const palette = noPaletteCategories.has(row.category) ? "no-palette" : "palette";
  const exists = fs.existsSync(path.join(rootDir, imagePath)) ? "exists" : "missing";
  console.log(`${row.no}\t${row.slug}\t${row.category}\t${palette}\t${exists}\t${imagePath}`);
}

console.log("");
console.log("previous image notes to avoid:");
for (const entry of history) {
  console.log(`- ${entry.revision} (${entry.createdAt}): ${entry.layout}`);
  for (const note of entry.avoidInNextGeneration ?? []) {
    console.log(`  avoid: ${note}`);
  }
}
