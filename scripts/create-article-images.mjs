import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const generatedRowsPath = path.join(process.cwd(), "lib", "articleRows.generated.ts");

const generatedRowsText = fs.readFileSync(generatedRowsPath, "utf8");
const jsonMatch = generatedRowsText.match(/export const articleRows = ([\s\S]*?) satisfies ArticleSeed\[];/);

if (!jsonMatch) {
  throw new Error("Could not read articleRows from lib/articleRows.generated.ts");
}

const articleRows = JSON.parse(jsonMatch[1]);
const expectedWidth = 1024;
const expectedHeight = 1536;
const missing = [];
const invalid = [];

for (const row of articleRows) {
  const relativeImagePath = (row.imagePath ?? `/images/articles/${row.slug}.png`).replace(/^\//, "");
  const imagePath = path.join(process.cwd(), "public", relativeImagePath);

  if (!fs.existsSync(imagePath)) {
    missing.push(imagePath);
    continue;
  }

  const metadata = await sharp(imagePath).metadata();
  if (metadata.width !== expectedWidth || metadata.height !== expectedHeight) {
    invalid.push({
      path: imagePath,
      width: metadata.width,
      height: metadata.height,
    });
  }
}

if (missing.length > 0 || invalid.length > 0) {
  if (missing.length > 0) {
    console.error("Missing article images:");
    for (const imagePath of missing) {
      console.error(`- ${imagePath}`);
    }
  }

  if (invalid.length > 0) {
    console.error("Article images must be 1024x1536:");
    for (const image of invalid) {
      console.error(`- ${image.path} (${image.width}x${image.height})`);
    }
  }

  process.exit(1);
}

console.log(`Verified ${articleRows.length} article images.`);
