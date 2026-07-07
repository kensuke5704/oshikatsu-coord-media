import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "images", "articles");
fs.mkdirSync(outDir, { recursive: true });

const generatedRowsPath = path.join(process.cwd(), "lib", "articleRows.generated.ts");
const generatedRowsText = fs.readFileSync(generatedRowsPath, "utf8");
const jsonMatch = generatedRowsText.match(/export const articleRows = ([\s\S]*?) satisfies ArticleSeed\[];/);
if (!jsonMatch) {
  throw new Error("Could not read articleRows from lib/articleRows.generated.ts");
}
const articleRows = JSON.parse(jsonMatch[1]);

const colorValues = {
  水色: "#A9DFE0",
  黒: "#202124",
  白: "#F8F7F4",
  シルバー: "#D9DDDD",
  複数: "#D9C3C8",
};

const fallbackPalettes = [
  ["#A9DFE0", "#202124", "#D9DDDD"],
  ["#F3D46B", "#A9CAE8", "#E41E26"],
  ["#C7E7D8", "#2F3437", "#D8D2C7"],
  ["#F3C9D1", "#6E6A72", "#EFE7DF"],
];

function colorFor(name, index) {
  if (name !== "複数") {
    return colorValues[name] ?? fallbackPalettes[index % fallbackPalettes.length][0];
  }

  return fallbackPalettes[index % fallbackPalettes.length][index % 3];
}

function palette(row, index) {
  return [
    colorFor(row.mainColor, index),
    colorFor(row.subColor, index + 1),
    colorFor(row.accentColor, index + 2),
  ];
}

function outfitPanel({ x, y, w, h, colors, variant }) {
  const [main, sub, accent] = colors;
  const poseShift = [-16, 12, -4, 18][variant % 4];
  const skirt = variant % 2 === 1;
  const coat = variant % 4 === 2;
  const rear = variant % 4 === 2;
  const seated = variant % 4 === 1;
  const legY = seated ? y + h * 0.64 : y + h * 0.58;
  const bodyX = x + w * 0.5 + poseShift;
  const topY = y + h * 0.17;

  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e8e2dc"/>
    <rect x="${x}" y="${y + h * 0.54}" width="${w}" height="${h * 0.46}" fill="#d8d1ca"/>
    <path d="M${x} ${y + h * 0.58} C${x + w * 0.22} ${y + h * 0.5}, ${x + w * 0.74} ${y + h * 0.62}, ${x + w} ${y + h * 0.52} L${x + w} ${y + h} L${x} ${y + h}Z" fill="#c9c1ba" opacity="0.42"/>
    <rect x="${x + w * 0.1}" y="${y + h * 0.08}" width="${w * 0.8}" height="${h * 0.84}" fill="none" stroke="#ffffff" stroke-opacity="0.32" stroke-width="2"/>
    <rect x="${bodyX - 24}" y="${topY - 26}" width="48" height="44" rx="22" fill="#d8c2b0" opacity="0.88"/>
    <rect x="${bodyX - 34}" y="${topY + 7}" width="68" height="${seated ? 112 : 146}" rx="22" fill="${main}" opacity="0.96"/>
    ${
      coat
        ? `<path d="M${bodyX - 66} ${topY + 8} L${bodyX - 20} ${topY + 8} L${bodyX - 42} ${y + h * 0.84} L${bodyX - 92} ${y + h * 0.86}Z" fill="${main}" opacity="0.84"/><path d="M${bodyX + 20} ${topY + 8} L${bodyX + 66} ${topY + 8} L${bodyX + 88} ${y + h * 0.82} L${bodyX + 40} ${y + h * 0.85}Z" fill="${main}" opacity="0.84"/>`
        : ""
    }
    ${
      skirt
        ? `<path d="M${bodyX - 54} ${topY + 132} L${bodyX + 54} ${topY + 132} L${bodyX + 92} ${legY + 42} L${bodyX - 86} ${legY + 42}Z" fill="${sub}"/><path d="M${bodyX - 38} ${topY + 136} L${bodyX - 22} ${legY + 36}" stroke="#ffffff" stroke-opacity="0.18" stroke-width="3"/><path d="M${bodyX + 8} ${topY + 136} L${bodyX + 20} ${legY + 36}" stroke="#ffffff" stroke-opacity="0.18" stroke-width="3"/>`
        : `<rect x="${bodyX - 58}" y="${topY + 128}" width="48" height="${h * 0.34}" rx="16" fill="${sub}"/><rect x="${bodyX + 10}" y="${topY + 128}" width="48" height="${h * 0.34}" rx="16" fill="${sub}"/>`
    }
    <path d="M${bodyX - 34} ${topY + 30} C${bodyX - 88} ${topY + 78}, ${bodyX - 86} ${topY + 156}, ${bodyX - 46} ${topY + 178}" fill="none" stroke="${main}" stroke-width="22" stroke-linecap="round" opacity="0.9"/>
    <path d="M${bodyX + 34} ${topY + 30} C${bodyX + 86} ${topY + 74}, ${bodyX + 72} ${topY + 134}, ${bodyX + 38} ${topY + 164}" fill="none" stroke="${main}" stroke-width="22" stroke-linecap="round" opacity="0.9"/>
    <rect x="${bodyX - 78}" y="${legY + 118}" width="52" height="24" rx="10" fill="#111111"/>
    <rect x="${bodyX + 28}" y="${legY + 118}" width="52" height="24" rx="10" fill="#111111"/>
    <rect x="${bodyX + (rear ? 58 : 50)}" y="${topY + 130}" width="64" height="52" rx="12" fill="${accent}" opacity="0.96"/>
    <path d="M${bodyX + 34} ${topY + 24} L${bodyX + 84} ${topY + 156}" stroke="${accent}" stroke-width="5" opacity="0.92"/>
  `;
}

function imageSvg(row, index) {
  const colors = palette(row, index);
  const [main, sub, accent] = colors;
  const w = 1024;
  const h = 1536;
  const panelW = 512;
  const panelH = 768;
  const cardW = 260;
  const cardH = 350;
  const swatchW = 190;
  const swatchH = 285;
  const cardX = 382;
  const swatchX = 417;
  const tops = [219, 585, 951];

  return `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#000000" flood-opacity="0.22"/>
    </filter>
  </defs>
  ${outfitPanel({ x: 0, y: 0, w: panelW, h: panelH, colors, variant: index })}
  ${outfitPanel({ x: panelW, y: 0, w: panelW, h: panelH, colors: [sub, main, accent], variant: index + 1 })}
  ${outfitPanel({ x: 0, y: panelH, w: panelW, h: panelH, colors: [main, sub, accent], variant: index + 2 })}
  ${outfitPanel({ x: panelW, y: panelH, w: panelW, h: panelH, colors: [accent, sub, main], variant: index + 3 })}
  <g filter="url(#shadow)">
    <rect x="${cardX}" y="${tops[0]}" width="${cardW}" height="${cardH}" fill="#f6f5f7"/>
    <rect x="${swatchX}" y="${tops[0] + 14}" width="${swatchW}" height="${swatchH}" fill="${main}"/>
    <text x="${cardX + 38}" y="${tops[0] + 329}" font-family="Arial Black, Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="900" letter-spacing="-1" fill="#181818">${main}</text>
    <rect x="${cardX}" y="${tops[1]}" width="${cardW}" height="${cardH}" fill="#f6f5f7"/>
    <rect x="${swatchX}" y="${tops[1] + 14}" width="${swatchW}" height="${swatchH}" fill="${sub}"/>
    <text x="${cardX + 38}" y="${tops[1] + 329}" font-family="Arial Black, Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="900" letter-spacing="-1" fill="#181818">${sub}</text>
    <rect x="${cardX}" y="${tops[2]}" width="${cardW}" height="${cardH}" fill="#f6f5f7"/>
    <rect x="${swatchX}" y="${tops[2] + 14}" width="${swatchW}" height="${swatchH}" fill="${accent}"/>
    <text x="${cardX + 38}" y="${tops[2] + 329}" font-family="Arial Black, Helvetica Neue, Arial, sans-serif" font-size="30" font-weight="900" letter-spacing="-1" fill="#181818">${accent}</text>
  </g>
</svg>`;
}

for (const [index, row] of articleRows.entries()) {
  const outPath = path.join(outDir, `${row.slug}.png`);
  await sharp(Buffer.from(imageSvg(row, index))).png().toFile(outPath);
  console.log(outPath);
}
