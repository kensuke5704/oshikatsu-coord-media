import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const generatedDir =
  "/Users/kensuke_kawamura/.codex/generated_images/019f32e4-c89f-7ed3-aab8-56c945181885";
const imageConfigPath = path.join(rootDir, "data", "article-image-config.json");
const historyPath = path.join(rootDir, "data", "article-image-history.json");
const rowsPath = path.join(rootDir, "lib", "articleRows.generated.ts");
const outputArticleDir = path.join(rootDir, "public", "images", "articles");
const outputProductDir = path.join(rootDir, "public", "images", "products");

const imageConfig = JSON.parse(fs.readFileSync(imageConfigPath, "utf8"));
const rowsText = fs.readFileSync(rowsPath, "utf8");
const rowsMatch = rowsText.match(/export const articleRows = ([\s\S]*?) satisfies ArticleSeed\[];/);

if (!rowsMatch) {
  throw new Error("Could not read articleRows from lib/articleRows.generated.ts");
}

const articleRows = JSON.parse(rowsMatch[1]);
const outputWidth = imageConfig.width;
const outputHeight = imageConfig.height;
const noPaletteCategories = new Set(imageConfig.noPaletteCategories ?? []);

const sourceBySlug = {
  "hatsune-miku-bound-coordinate": "ig_0661d3e079a669bd016a4e62ce9da48191a2a8fb5dd9ec70a2.png",
  "mint-blue-oshikatsu-coordinate": "ig_095dea807641efe8016a4e648b217c819196e2a032d9f98924.png",
  "black-oshikatsu-coordinate": "ig_095dea807641efe8016a4e64fd22ec8191a71241b119623142.png",
  "live-oshikatsu-coordinate": "ig_0708777f73dfefb3016a4e5f128ddc8191bae5e7759ff9c755.png",
  "collaboration-cafe-oshikatsu-coordinate": "ig_0708777f73dfefb3016a4e5f8afb808191b9f4fb52f9fe8204.png",
  "bound-coordinate-beginner-guide": "ig_0708777f73dfefb3016a4e5ffe52788191a623e39a094ad8c8.png",
  "oshikatsu-coordinate-copyright-manners": "ig_002e55f49c13d7e4016a4e6aaeff68819184534216ceaeb0f4.png",
  "shein-oshikatsu-coordinate-guide": "ig_002e55f49c13d7e4016a4e6b482a6881918f2d2849f02cb7e0.png",
  "silver-bag-oshikatsu-coordinate": "ig_002e55f49c13d7e4016a4e6ba3fe9481919b2b7bfff95407c3.png",
  "futuristic-cyber-oshikatsu-coordinate": "ig_002e55f49c13d7e4016a4e6a16c2c881919cd9f174acdd80d8.png",
};

const colorValues = {
  水色: "#A9CAE8",
  黒: "#202124",
  白: "#F7F5F2",
  シルバー: "#D9DDDD",
  複数: "#D7ECEE",
};

const colorLabels = {
  水色: ["AQUA", "clear & airy"],
  黒: ["BLACK", "sharp & cool"],
  白: ["WHITE", "soft & clean"],
  シルバー: ["SILVER", "light & clean"],
  複数: ["MIX", "flexible mood"],
};

const panelRule = {
  cardW: 260,
  cardH: 350,
  gap: 16,
  margin: 10,
  labelH: 70,
  titleSize: 24,
  moodSize: 12,
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function paletteSvg(row) {
  const { cardW, cardH, gap, margin, labelH, titleSize, moodSize } = panelRule;
  const groupH = cardH * 3 + gap * 2;
  const x = Math.round((outputWidth - cardW) / 2);
  const y = Math.round(outputHeight * 0.5 - groupH / 2);
  const roles = [row.mainColor, row.subColor, row.accentColor];
  const cards = roles
    .map((colorName, index) => {
      const cardY = y + index * (cardH + gap);
      const swatchH = cardH - labelH - margin;
      const [label, mood] = colorLabels[colorName] ?? [String(colorName).toUpperCase(), "coordinate mood"];
      return `
        <g>
          <rect x="${x}" y="${cardY}" width="${cardW}" height="${cardH}" fill="#fffdfa"/>
          <rect x="${x + margin}" y="${cardY + margin}" width="${cardW - margin * 2}" height="${swatchH}" fill="${colorValues[colorName] ?? "#d7ecee"}"/>
          <text x="${x + margin + 28}" y="${cardY + cardH - 42}" fill="#211b18" font-family="'Times New Roman', 'Georgia', serif" font-size="${titleSize}" font-weight="500" letter-spacing="6">${escapeXml(label)}</text>
          <text x="${x + margin + 31}" y="${cardY + cardH - 20}" fill="#211b18" font-family="'Times New Roman', 'Georgia', serif" font-size="${moodSize}" font-weight="400" letter-spacing="5">${escapeXml(mood)}</text>
        </g>
      `;
    })
    .join("");

  return Buffer.from(`
    <svg width="${outputWidth}" height="${outputHeight}" viewBox="0 0 ${outputWidth} ${outputHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#2b2522" flood-opacity="0.14"/>
        </filter>
      </defs>
      <g filter="url(#shadow)">${cards}</g>
    </svg>
  `);
}

function gridSvg() {
  const line = 4;
  return Buffer.from(`
    <svg width="${outputWidth}" height="${outputHeight}" viewBox="0 0 ${outputWidth} ${outputHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${outputWidth / 2 - line / 2}" y="0" width="${line}" height="${outputHeight}" fill="#fffdfa" opacity="0.96"/>
      <rect x="0" y="${outputHeight / 2 - line / 2}" width="${outputWidth}" height="${line}" fill="#fffdfa" opacity="0.96"/>
    </svg>
  `);
}

function accessorySvg() {
  return Buffer.from(`
    <svg width="900" height="900" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="900" fill="#fffaf6"/>
      <ellipse cx="450" cy="730" rx="270" ry="48" fill="#eadfda"/>
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="320" cy="390" r="72" stroke="#d9dddd" stroke-width="28"/>
        <circle cx="580" cy="390" r="72" stroke="#c4caca" stroke-width="28"/>
        <path d="M313 470c-58 85-95 150-110 196" stroke="#cfd6d6" stroke-width="24"/>
        <path d="M587 470c58 85 95 150 110 196" stroke="#d6dddd" stroke-width="24"/>
        <path d="M390 345c34-46 84-46 120 0" stroke="#a9cae8" stroke-width="18"/>
        <path d="M290 658h320" stroke="#d9dddd" stroke-width="22"/>
      </g>
      <g fill="#f8fbfb" stroke="#d9dddd" stroke-width="12">
        <circle cx="250" cy="660" r="34"/>
        <circle cx="650" cy="660" r="34"/>
        <circle cx="450" cy="600" r="42"/>
      </g>
    </svg>
  `);
}

async function finalizeArticleImages() {
  fs.mkdirSync(outputArticleDir, { recursive: true });

  for (const row of articleRows) {
    const sourceName = sourceBySlug[row.slug];
    if (!sourceName) {
      throw new Error(`No source image configured for ${row.slug}`);
    }

    const sourcePath = path.join(generatedDir, sourceName);
    const outputPath = path.join(outputArticleDir, `${row.slug}-${imageConfig.imageRevision}.png`);
    if (!fs.existsSync(sourcePath)) {
      if (fs.existsSync(outputPath)) {
        continue;
      }

      throw new Error(`Missing source image: ${sourcePath}`);
    }

    const layers = [{ input: gridSvg(), blend: "over" }];
    if (!noPaletteCategories.has(row.category)) {
      layers.push({ input: paletteSvg(row), blend: "over" });
    }

    await sharp(sourcePath)
      .resize(outputWidth, outputHeight, { fit: "cover", position: "center" })
      .modulate({ saturation: 0.96, brightness: 0.995 })
      .composite(layers)
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
  }
}

async function finalizeProductImages() {
  fs.mkdirSync(outputProductDir, { recursive: true });
  const expectedProductImages = [
    "mint-rib-knit-v1.png",
    "black-pleats-skirt-v1.png",
    "silver-mini-bag-v1.png",
    "black-platform-sneaker-v1.png",
    "clear-silver-accessory-v1.png",
  ];
  const sheetPath = path.join(
    generatedDir,
    "ig_0661d3e079a669bd016a4e633e46908191ad09d3494344226b.png",
  );
  if (!fs.existsSync(sheetPath)) {
    const allProductImagesExist = expectedProductImages.every((name) =>
      fs.existsSync(path.join(outputProductDir, name)),
    );

    if (allProductImagesExist) {
      return;
    }

    throw new Error(`Missing product source image: ${sheetPath}`);
  }
  const metadata = await sharp(sheetPath).metadata();
  const halfW = Math.floor((metadata.width ?? 1024) / 2);
  const halfH = Math.floor((metadata.height ?? 1024) / 2);
  const crops = [
    ["mint-rib-knit-v1.png", 0, 0],
    ["black-pleats-skirt-v1.png", halfW, 0],
    ["silver-mini-bag-v1.png", 0, halfH],
    ["black-platform-sneaker-v1.png", halfW, halfH],
  ];

  await Promise.all(
    crops.map(([name, left, top]) =>
      sharp(sheetPath)
        .extract({ left, top, width: halfW, height: halfH })
        .resize(900, 900, { fit: "cover", position: "center" })
        .png({ compressionLevel: 9 })
        .toFile(path.join(outputProductDir, name)),
    ),
  );

  await sharp(accessorySvg())
    .resize(900, 900)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputProductDir, "clear-silver-accessory-v1.png"));
}

function updateHistory() {
  const history = JSON.parse(fs.readFileSync(historyPath, "utf8"));
  const generatedAt = new Date().toISOString().slice(0, 10);
  const nextEntries = articleRows.map((row) => ({
    slug: row.slug,
    imageRevision: imageConfig.imageRevision,
    category: row.category,
    sourceImage: sourceBySlug[row.slug],
    outputImage: `/images/articles/${row.slug}-${imageConfig.imageRevision}.png`,
    paletteCards: !noPaletteCategories.has(row.category),
    layout: "1024x1536; 2x2 grid split exactly at x=512/y=768; top-left and bottom-right full-body; top-right and bottom-left detail.",
    panelRule: !noPaletteCategories.has(row.category)
      ? "Three fixed cards, 260x350, 16px gap, centered at x=382, group center at 50% height, ordered main/sub/accent."
      : "No palette cards for this category.",
    avoidNext: "Avoid matching both pose and background. Do not repeat full-body stance, detail target, camera angle, or light mood from this output.",
    generatedAt,
  }));

  history.generatedImages = [
    ...nextEntries,
    ...(history.generatedImages ?? []).filter(
      (entry) =>
        !(entry.imageRevision === imageConfig.imageRevision && nextEntries.some((next) => next.slug === entry.slug)),
    ),
  ];

  fs.writeFileSync(historyPath, `${JSON.stringify(history, null, 2)}\n`);
}

await finalizeArticleImages();
await finalizeProductImages();
updateHistory();

console.log(`Finalized ${articleRows.length} article images and product mock images.`);
