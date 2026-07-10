import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const articlesSource = fs.readFileSync(path.join(rootDir, "lib/articleRows.generated.ts"), "utf8");
const productsSource = fs.readFileSync(path.join(rootDir, "lib/products.ts"), "utf8");

const articleMatch = articlesSource.match(/export const articleRows = ([\s\S]*?) satisfies ArticleSeed\[];/);

if (!articleMatch) {
  throw new Error("Could not find generated article rows.");
}

const articles = JSON.parse(articleMatch[1]);

const colorValues = {
  水色: "#A9CAE8",
  黒: "#202124",
  白: "#F7F5F2",
  シルバー: "#D9DDDD",
  複数: "#F7C8D8",
};

const fallbackAccents = {
  LOOK: "#54D7C7",
  COLOR: "#FF4F8B",
  STYLE: "#FFD84D",
  GUIDE: "#7FC9D3",
  FEATURE: "#FF9FBA",
};

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function color(name, fallback = "#F7C8D8") {
  return colorValues[name] ?? fallback;
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

async function writePng(svg, outputPath, width, height) {
  ensureDir(outputPath);
  await sharp(Buffer.from(svg)).resize(width, height).png({ compressionLevel: 9 }).toFile(outputPath);
}

function texture(id = "paper") {
  return `
    <filter id="${id}">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" seed="8" result="noise"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.07"/>
      </feComponentTransfer>
      <feBlend mode="multiply" in2="SourceGraphic"/>
    </filter>
  `;
}

function articleLayout(article) {
  const main = color(article.mainColor, fallbackAccents[article.articleType] ?? "#F7C8D8");
  const sub = color(article.subColor, "#FFF7FB");
  const accent = color(article.accentColor, fallbackAccents[article.articleType] ?? "#FFD84D");
  const type = esc(article.articleType);
  const slugSeed = article.slug.length % 7;
  const title = esc(article.title.replace(/｜.*$/, ""));
  const keyword = esc(article.moodKeywords?.[0] ?? article.featureType);

  if (article.articleType === "LOOK") {
    return `
      <rect x="0" y="0" width="1024" height="1536" fill="#fffafd"/>
      <rect x="0" y="0" width="514" height="768" fill="${main}"/>
      <rect x="514" y="0" width="510" height="768" fill="#f9f1ea"/>
      <rect x="0" y="768" width="514" height="768" fill="#f3f0ed"/>
      <rect x="514" y="768" width="510" height="768" fill="${sub}"/>
      <path d="M151 610 C190 454 287 351 354 235 C430 353 485 468 534 610 Z" fill="${sub}" opacity="0.9"/>
      <rect x="218" y="330" width="174" height="282" rx="0" fill="${main}" opacity="0.92"/>
      <path d="M638 305 C721 252 839 272 900 344 L876 606 L652 606 Z" fill="#fffdfb" opacity="0.9"/>
      <rect x="722" y="420" width="124" height="190" fill="${accent}" opacity="0.94"/>
      <circle cx="269" cy="1096" r="108" fill="${main}" opacity="0.9"/>
      <rect x="162" y="1198" width="256" height="134" fill="#fffdfb" opacity="0.92"/>
      <path d="M648 1024 C706 929 821 942 869 1034 L833 1282 L669 1282 Z" fill="${main}" opacity="0.9"/>
      <rect x="724" y="1074" width="90" height="202" fill="${sub}" opacity="0.85"/>
      <line x1="512" y1="0" x2="512" y2="1536" stroke="#fff" stroke-width="8"/>
      <line x1="0" y1="768" x2="1024" y2="768" stroke="#fff" stroke-width="8"/>
      <rect x="382" y="388" width="260" height="760" fill="#fff" opacity="0.94"/>
      <rect x="406" y="420" width="212" height="220" fill="${main}"/>
      <text x="428" y="720" font-size="45" font-weight="800" fill="#2b2522" letter-spacing="8">${esc(article.mainColor)}</text>
      <rect x="406" y="760" width="212" height="220" fill="${sub}"/>
      <text x="428" y="1060" font-size="45" font-weight="800" fill="#2b2522" letter-spacing="8">${esc(article.subColor)}</text>
      <text x="54" y="1456" font-size="43" font-weight="800" fill="#2b2522" letter-spacing="9">${type}</text>
    `;
  }

  if (article.articleType === "COLOR") {
    return `
      <rect width="1024" height="1536" fill="#fffafd"/>
      <rect x="80" y="142" width="864" height="222" fill="${main}"/>
      <rect x="80" y="364" width="360" height="222" fill="${sub}"/>
      <rect x="440" y="364" width="504" height="222" fill="${accent}"/>
      <rect x="80" y="664" width="864" height="128" fill="${main}" opacity="0.62"/>
      <rect x="80" y="850" width="540" height="128" fill="${sub}" opacity="0.86"/>
      <rect x="620" y="850" width="324" height="128" fill="${accent}" opacity="0.9"/>
      <rect x="80" y="1040" width="864" height="288" fill="#fff" stroke="#eadfda" stroke-width="2"/>
      <circle cx="225" cy="1184" r="72" fill="${main}"/>
      <circle cx="512" cy="1184" r="72" fill="${sub}"/>
      <circle cx="799" cy="1184" r="72" fill="${accent}"/>
      <text x="80" y="1378" font-size="42" font-weight="800" fill="#2b2522" letter-spacing="8">${type}</text>
      <text x="80" y="1430" font-size="30" font-weight="700" fill="#786861">${esc(article.mainColor)} / ${esc(article.subColor)} / ${esc(article.accentColor)}</text>
    `;
  }

  const offset = 28 + slugSeed * 9;
  return `
    <rect width="1024" height="1536" fill="#fffafd"/>
    <rect x="70" y="90" width="884" height="1356" fill="#fff" stroke="#eadfda" stroke-width="2"/>
    <rect x="${106 + offset}" y="172" width="356" height="500" fill="${main}"/>
    <rect x="530" y="${138 + offset}" width="318" height="318" fill="${sub}"/>
    <rect x="534" y="512" width="338" height="238" fill="${accent}"/>
    <rect x="152" y="824" width="276" height="384" fill="${sub}" opacity="0.72"/>
    <rect x="484" y="850" width="374" height="228" fill="${main}" opacity="0.84"/>
    <path d="M518 1184 C590 1110 712 1110 784 1184 L826 1284 L474 1284 Z" fill="${accent}" opacity="0.86"/>
    <line x1="130" y1="748" x2="894" y2="748" stroke="#f0dfdd" stroke-width="5"/>
    <text x="122" y="1370" font-size="46" font-weight="800" fill="#2b2522" letter-spacing="9">${type}</text>
    <text x="122" y="1424" font-size="30" font-weight="700" fill="#786861">${keyword}</text>
  `;
}

function articleSvg(article) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536" viewBox="0 0 1024 1536">
      <defs>${texture()}</defs>
      <g filter="url(#paper)">
        ${articleLayout(article)}
      </g>
    </svg>
  `;
}

function readProductBlocks() {
  const blocks = productsSource.match(/\{[\s\S]*?imageUrl:[\s\S]*?\},/g) ?? [];

  return blocks.map((block) => {
    const get = (key) => block.match(new RegExp(`${key}:\\s*"([^"]+)"`))?.[1] ?? "";
    return {
      id: get("id"),
      displayName: get("displayName"),
      itemType: get("itemType"),
      color: get("color"),
      imageUrl: get("imageUrl"),
    };
  }).filter((product) => product.imageUrl);
}

function productSvg(product) {
  const palette = {
    ミントブルー: "#A9CAE8",
    ブラック: "#202124",
    シルバー: "#D9DDDD",
    クリアシルバー: "#D9DDDD",
  };
  const fill = palette[product.color] ?? "#F7C8D8";
  const accent = product.color.includes("ブラック") ? "#A9CAE8" : "#FF4F8B";
  const title = esc(product.displayName);
  const itemType = esc(product.itemType);

  const shape = {
    トップス: `<path d="M308 246 L392 196 H508 L594 246 L670 382 L602 428 L548 334 V660 H352 V334 L298 428 L230 382 Z" fill="${fill}"/><path d="M372 248 H528" stroke="#fff" stroke-width="10" opacity="0.55"/><path d="M390 340 H510 M390 398 H510 M390 456 H510" stroke="#fff" stroke-width="4" opacity="0.38"/>`,
    スカート: `<path d="M326 226 H574 L664 682 H236 Z" fill="${fill}"/><path d="M356 246 L318 672 M430 246 L414 672 M500 246 L522 672 M568 246 L630 672" stroke="#fff" stroke-width="5" opacity="0.38"/>`,
    バッグ: `<rect x="276" y="330" width="348" height="246" fill="${fill}"/><path d="M350 330 C360 214 540 214 550 330" fill="none" stroke="${fill}" stroke-width="26"/><rect x="420" y="418" width="60" height="48" fill="#fff" opacity="0.65"/>`,
    靴: `<path d="M214 500 C346 430 526 454 678 566 L696 630 H226 C190 610 180 552 214 500 Z" fill="${fill}"/><rect x="228" y="626" width="478" height="54" fill="#fff"/><path d="M354 492 L516 564" stroke="#fff" stroke-width="11" opacity="0.72"/>`,
    アクセサリー: `<circle cx="356" cy="372" r="86" fill="none" stroke="${fill}" stroke-width="26"/><circle cx="544" cy="372" r="86" fill="none" stroke="${fill}" stroke-width="26"/><path d="M304 610 C386 526 520 526 604 610" fill="none" stroke="${accent}" stroke-width="20"/><circle cx="454" cy="626" r="26" fill="${fill}"/>`,
  }[product.itemType] ?? `<rect x="260" y="260" width="380" height="380" fill="${fill}"/>`;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
      <defs>${texture("grain")}</defs>
      <rect width="900" height="900" fill="#fffafd"/>
      <rect x="72" y="72" width="756" height="756" fill="#fff" stroke="#eadfda" stroke-width="2"/>
      <circle cx="724" cy="178" r="72" fill="${accent}" opacity="0.28"/>
      <circle cx="180" cy="728" r="92" fill="${fill}" opacity="0.18"/>
      <g filter="url(#grain)">${shape}</g>
      <text x="96" y="778" font-size="34" font-weight="800" fill="#2b2522" letter-spacing="3">${title}</text>
      <text x="96" y="822" font-size="22" font-weight="700" fill="#786861" letter-spacing="7">${itemType}</text>
    </svg>
  `;
}

for (const article of articles) {
  const outputPath = path.join(rootDir, "public", article.imagePath.replace(/^\//, ""));
  await writePng(articleSvg(article), outputPath, 1024, 1536);
  console.log(`created ${path.relative(rootDir, outputPath)}`);
}

for (const product of readProductBlocks()) {
  const outputPath = path.join(rootDir, "public", product.imageUrl.replace(/^\//, ""));
  await writePng(productSvg(product), outputPath, 900, 900);
  console.log(`created ${path.relative(rootDir, outputPath)}`);
}
