import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const slug = process.argv[2];

if (!slug) {
  console.error("Usage: node scripts/compose-coordinate-collage.mjs <article-slug>");
  process.exit(1);
}

const generatedRowsPath = path.join(process.cwd(), "lib", "articleRows.generated.ts");
const generatedRowsText = fs.readFileSync(generatedRowsPath, "utf8");
const jsonMatch = generatedRowsText.match(/export const articleRows = ([\s\S]*?) satisfies ArticleSeed\[];/);

if (!jsonMatch) {
  throw new Error("Could not read articleRows from lib/articleRows.generated.ts");
}

const articleRows = JSON.parse(jsonMatch[1]);
const row = articleRows.find((article) => article.slug === slug);

if (!row) {
  throw new Error(`Unknown article slug: ${slug}`);
}

const colorValues = {
  水色: "#A9CAE8",
  黒: "#202124",
  白: "#F8F7F4",
  シルバー: "#D9DDDD",
};

const fallbackPalettes = [
  ["#F3D46B", "#A9CAE8", "#E41E26"],
  ["#C7E7D8", "#2F3437", "#D8D2C7"],
  ["#F3C9D1", "#6E6A72", "#EFE7DF"],
  ["#B5D8C8", "#F6F0E8", "#C44B59"],
];

function colorFor(name, fallbackIndex) {
  if (name && name !== "複数") {
    return colorValues[name] ?? fallbackPalettes[fallbackIndex % fallbackPalettes.length][0];
  }

  return fallbackPalettes[(Number(row.no) - 1) % fallbackPalettes.length][fallbackIndex % 3];
}

const colors = [
  colorFor(row.mainColor, 0),
  colorFor(row.subColor, 1),
  colorFor(row.accentColor, 2),
];

const sourceDir = path.join(process.cwd(), "work", "article-image-sources", slug);
const sources = [1, 2, 3, 4].map((index) => path.join(sourceDir, `panel-${index}.png`));
const missing = sources.filter((source) => !fs.existsSync(source));

if (missing.length > 0) {
  console.error("Missing source panels:");
  for (const source of missing) {
    console.error(`- ${source}`);
  }
  process.exit(1);
}

const width = 1024;
const height = 1536;
const panelWidth = 512;
const panelHeight = 768;
const cardWidth = 260;
const cardHeight = 350;
const cardMargin = 10;
const labelHeight = 56;
const swatchWidth = cardWidth - cardMargin * 2;
const swatchHeight = cardHeight - labelHeight - cardMargin;
const cardX = 382;
const swatchX = cardX + cardMargin;
const textX = cardX + cardMargin + 12;
const textBaselineFromLabelTop = 40;
const tops = [219, 585, 951];

async function panelBuffer(source) {
  const image = sharp(source);
  const metadata = await image.metadata();
  const topCrop = Math.round((metadata.height ?? 0) * 0.14);
  const cropHeight = (metadata.height ?? panelHeight) - topCrop;

  return image
    .extract({
      left: 0,
      top: topCrop,
      width: metadata.width ?? panelWidth,
      height: cropHeight,
    })
    .resize(panelWidth, panelHeight, { fit: "cover", position: "attention" })
    .png()
    .toBuffer();
}

const resizedPanels = await Promise.all(sources.map((source) => panelBuffer(source)));

const grainSvg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" seed="12"/>
    <feColorMatrix type="saturate" values="0"/>
    <feComponentTransfer>
      <feFuncA type="table" tableValues="0 0.13"/>
    </feComponentTransfer>
  </filter>
  <rect width="${width}" height="${height}" filter="url(#grain)" opacity="0.34"/>
</svg>`;

function paletteOverlay() {
  return `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="cardShadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#000000" flood-opacity="0.22"/>
    </filter>
  </defs>
  <g filter="url(#cardShadow)">
    ${colors
      .map(
        (color, index) => `
          <rect x="${cardX}" y="${tops[index]}" width="${cardWidth}" height="${cardHeight}" fill="#f6f5f7"/>
          <rect x="${swatchX}" y="${tops[index] + cardMargin}" width="${swatchWidth}" height="${swatchHeight}" fill="${color}"/>
          <text x="${textX}" y="${tops[index] + cardHeight - labelHeight + textBaselineFromLabelTop}" font-family="Arial Black, Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="900" fill="#181818">${color}</text>
        `,
      )
      .join("")}
  </g>
</svg>`;
}

const outPath = path.join(process.cwd(), "public", row.imagePath.replace(/^\//, ""));
fs.mkdirSync(path.dirname(outPath), { recursive: true });

await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: "#ffffff",
  },
})
  .composite([
    { input: resizedPanels[0], left: 0, top: 0 },
    { input: resizedPanels[1], left: panelWidth, top: 0 },
    { input: resizedPanels[2], left: 0, top: panelHeight },
    { input: resizedPanels[3], left: panelWidth, top: panelHeight },
    { input: Buffer.from(grainSvg), left: 0, top: 0, blend: "overlay" },
    { input: Buffer.from(paletteOverlay()), left: 0, top: 0 },
  ])
  .png()
  .toFile(outPath);

console.log(outPath);
