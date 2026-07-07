import { getCategoryByName } from "./categories";
import { articleRows as rows } from "./articleRows.generated";
import type { ArticleDetail, ArticleStatus, ArticleSummary, CategorySlug } from "./types";

const excerptsByNo: Record<number, string> = {
  1: "水色、黒、シルバーを軸に、透明感と近未来感を日常服へ置き換える非公式バウンドコーデ。",
  2: "水色を主役にした推し活コーデの基本。白やシルバーを合わせて、透明感のある普段着に整えます。",
  3: "黒を重く見せずに楽しむ推し活コーデ。白やシルバーを差して、大人っぽさと抜け感を両立します。",
  4: "ライブや遠征で頼れる服装ガイド。動きやすさ、写真映え、荷物の持ちやすさをまとめて考えます。",
  5: "コラボカフェや推し会で浮きにくい着こなし。席写真やグッズ写真に馴染む色使いを提案します。",
  6: "バウンドコーデの考え方を初心者向けに解説。コスプレとの違いや、日常服で始めるコツを整理します。",
  7: "公式画像やロゴに頼らず推し活コーデを楽しむための基本方針。記事作りやSNS投稿前の確認にも使えます。",
  8: "SHEINで推し活向きの服や小物を探すコツ。検索ワード、レビュー確認、サイズ選びの見方をまとめます。",
  9: "シルバーバッグを推し活コーデに取り入れるガイド。水色、黒、白の服に合わせやすい小物選びを紹介します。",
  10: "近未来やサイバー感を日常服に落とし込むテイスト別ガイド。水色、黒、シルバーで透明感を作ります。",
};

function createFallbackExcerpt(row: (typeof rows)[number]) {
  const mood = row.moodKeywords.slice(0, 3).join("、");
  const scenes = row.scenes.slice(0, 3).join("、");

  return `${row.mainColor}、${row.subColor}、${row.accentColor}を軸に、${mood}を日常服へ落とし込む${scenes}向けの非公式コーデ提案。`;
}

function normalizeArticleStatus(rowNo: number, sourceStatus: string): ArticleStatus {
  if (rowNo === 1) {
    return "sample";
  }

  if (sourceStatus === "未着手") {
    return "未着手";
  }

  return "初期記事";
}

export const articles: ArticleSummary[] = rows.map((row): ArticleSummary => {
  const category = getCategoryByName(row.category);
  const { sourceStatus: _sourceStatus, ...articleRow } = row;

  return {
    ...articleRow,
    moodKeywords: [...row.moodKeywords],
    scenes: [...row.scenes],
    itemTypes: [...row.itemTypes],
    affiliatePriority: [...row.affiliatePriority],
    categorySlug: category.slug,
    status: "完成",
    excerpt: excerptsByNo[row.no] ?? createFallbackExcerpt(row),
    thumbnailImage: row.imagePath ?? `/images/articles/${row.slug}.png`,
    thumbnailAlt: row.imageAlt ?? `${row.title}のコーディネート参考画像`,
  };
});

export const sampleArticle: ArticleDetail = {
  ...articles[0],
  description:
    "初音ミクのイメージカラーを、日常服に落とし込む非公式バウンドコーデ提案。水色×黒×シルバーで、透明感と近未来感のあるカジュアルコーデを紹介します。",
  publishedAt: "2024.05.20",
  updatedAt: "2024.05.20",
  likes: 128,
  summary: [
    "水色×黒×シルバーで近未来感を演出",
    "透明感と軽やかさを意識したコーデ",
    "普段使いやお出かけにも取り入れやすい",
    "小物使いでさりげなく個性をプラス",
  ],
  palette: [
    {
      name: "ミントブルー",
      value: "#a9dfe0",
      role: "メインカラー",
      usage: "トップスや小物で透明感を出す",
    },
    {
      name: "ブラック",
      value: "#202124",
      role: "サブカラー",
      usage: "スカートや靴で全体を引き締める",
    },
    {
      name: "シルバー",
      value: "#d9dddd",
      role: "アクセントカラー",
      usage: "バッグやアクセサリーで近未来感を足す",
    },
    {
      name: "ホワイト",
      value: "#ffffff",
      role: "調整カラー",
      usage: "重く見えないように抜け感を作る",
    },
  ],
  introduction: [
    "初音ミクをイメージしたバウンドコーデを作るなら、ポイントは水色・黒・シルバーのバランスです。",
    "水色を主役にすると透明感や軽やかさが出ます。そこに黒を合わせると、甘くなりすぎず少しクールな印象にまとまります。さらに、シルバーのバッグやアクセサリーを足すと、近未来感のある推し活コーデに近づきます。",
    "ただし、公式衣装やキャラクター本人をそのまま再現する必要はありません。大切なのは、色やムードを普段着に置き換えることです。",
  ],
  colorPoints: [
    "水色で透明感と爽やかさを演出",
    "黒で全体を引き締めてバランスアップ",
    "シルバーでクールな近未来感をプラス",
    "シアー素材で軽やかさを意識",
    "小物使いでさりげなくアクセントに",
  ],
  illustrationNotes: [
    "水色のコンパクトトップス",
    "黒のプリーツスカート",
    "シルバーのミニバッグ",
    "黒の厚底スニーカー",
    "クリア感のあるアクセサリー",
    "髪型や顔立ちはキャラクターに寄せない",
  ],
  itemSections: [
    {
      heading: "水色トップス",
      body: [
        "主役になるのは、水色やミントブルーのトップスです。ニット、リブトップス、シアーシャツ、カーディガンなど、普段着として使いやすいものを選ぶと取り入れやすくなります。",
        "イベントで着るなら少し明るめの水色、普段着にも使いたいならくすみミントや淡いブルーを選ぶと自然です。",
      ],
    },
    {
      heading: "黒のスカート",
      body: [
        "水色の軽さを引き締めるために、ボトムスは黒がおすすめです。プリーツスカートなら少しガーリーに、タイトスカートなら大人っぽく寄せられます。",
      ],
    },
    {
      heading: "シルバーのバッグ",
      body: [
        "シルバーの小物は近未来感を出すのに使いやすいアイテムです。ミニバッグやショルダーバッグなら、ライブやコラボカフェにも持って行きやすく写真にも映えます。",
      ],
    },
    {
      heading: "黒の厚底スニーカー",
      body: [
        "足元は黒の厚底スニーカーにすると、イベントでも歩きやすく全体も引き締まります。長時間歩く予定がある場合は、クッション性や重さも確認しておくと安心です。",
      ],
    },
    {
      heading: "クリア・シルバー系アクセサリー",
      body: [
        "アクセサリーはクリア素材やシルバー系を選ぶと、透明感を足しやすくなります。服がシンプルでも、少しだけ推し活らしい雰囲気を作れます。",
      ],
    },
  ],
  stylingPoints: [
    {
      heading: "水色は主役として1点入れる",
      body: [
        "水色を全身に入れすぎると、コーデがぼんやり見えることがあります。最初はトップス、バッグ、アクセサリーのどれか1つに入れるだけでも十分です。",
      ],
    },
    {
      heading: "黒を入れて甘さを調整する",
      body: [
        "水色やミント系は、合わせ方によっては甘く見えやすい色です。黒のスカートや黒の靴を入れると、全体が締まり少しクールな印象になります。",
      ],
    },
    {
      heading: "シルバー小物で近未来感を足す",
      body: [
        "服で強く寄せなくても、小物でムードを作ると日常服としても取り入れやすくなります。",
      ],
    },
    {
      heading: "普段着にするなら色を少しくすませる",
      body: [
        "普段着として使いたい場合は、鮮やかな水色よりも少しくすんだミントや淡いブルーを選ぶと自然です。",
      ],
    },
  ],
  sceneSections: [
    {
      heading: "ライブ・イベント",
      body: [
        "水色トップスに黒スカート、黒の厚底スニーカーを合わせると、推し感と動きやすさを両立できます。",
      ],
    },
    {
      heading: "コラボカフェ",
      body: [
        "写真を撮る場面が多いため、トップスやバッグなど上半身に近い場所に水色を入れるのがおすすめです。",
      ],
    },
    {
      heading: "普段着",
      body: [
        "水色トップスにデニムや黒パンツを合わせるだけでも十分です。控えめにしたい日は、アクセサリーやバッグだけで色を入れるのも良いです。",
      ],
    },
  ],
  ngPoints: [
    "公式衣装をそのまま再現する",
    "キャラクター本人に見える髪型や小物にする",
    "ロゴや固有マークを使う",
    "公式画像・スクリーンショットを掲載する",
    "商品写真を切り抜いてコーデボードにする",
    "実在商品の形をそのままイラスト化する",
    "公式と誤解される言い回しで訴求する",
  ],
  relatedSlugs: [
    "mint-blue-oshikatsu-coordinate",
    "black-oshikatsu-coordinate",
    "live-oshikatsu-coordinate",
    "futuristic-cyber-oshikatsu-coordinate",
    "silver-bag-oshikatsu-coordinate",
  ],
  productIds: [
    "mint-rib-knit",
    "black-pleats-skirt",
    "silver-mini-bag",
    "black-platform-sneaker",
    "clear-silver-accessory",
  ],
  images: [
    {
      src: articles[0].thumbnailImage,
      alt: articles[0].thumbnailAlt,
      caption:
        "水色、黒、シルバーを使った近未来カジュアルの参考コーディネート画像です。",
    },
  ],
  conclusion: [
    "初音ミクをイメージしたバウンドコーデは、水色×黒×シルバーを意識すると作りやすくなります。",
    "水色で透明感を出し、黒で全体を引き締め、シルバー小物で近未来感を足す。この3つを押さえるだけで、公式衣装を再現しなくても推しの雰囲気を日常服に取り入れられます。",
    "色や小物から少しずつ取り入れて、推し活をもっと身近に楽しんでみてください。",
  ],
};

const paletteValueByColor: Record<string, string> = {
  水色: "#a9dfe0",
  黒: "#202124",
  白: "#ffffff",
  シルバー: "#d9dddd",
  複数: "#d7ecee",
};

function createPalette(summary: ArticleSummary) {
  return [
    {
      name: summary.mainColor,
      value: paletteValueByColor[summary.mainColor] ?? "#d7ecee",
      role: "メインカラー",
      usage:
        summary.mainColor === "複数"
          ? "推し色やテーマに合わせて主役の色を1つ決める"
          : "トップスやバッグなど目に入りやすい場所に入れる",
    },
    {
      name: summary.subColor,
      value: paletteValueByColor[summary.subColor] ?? "#f4fbfb",
      role: "サブカラー",
      usage:
        summary.subColor === "複数"
          ? "白、黒、ベージュなど手持ち服と馴染む色で整える"
          : "ボトムスや靴で全体の印象を調整する",
    },
    {
      name: summary.accentColor,
      value: paletteValueByColor[summary.accentColor] ?? "#e8f7f8",
      role: "アクセントカラー",
      usage:
        summary.accentColor === "複数"
          ? "小物で写真映えや季節感を足す"
          : "バッグ、靴、アクセサリーでさりげなく足す",
    },
  ];
}

function readableList(values: string[]) {
  return values.join("、");
}

export function createDraftArticleDetail(summary: ArticleSummary): ArticleDetail {
  const palette = createPalette(summary);
  const mainColorLabel =
    summary.mainColor === "複数" ? "推し色" : `${summary.mainColor}`;
  const subColorLabel =
    summary.subColor === "複数" ? "手持ち服に馴染む色" : `${summary.subColor}`;
  const accentColorLabel =
    summary.accentColor === "複数" ? "小物の差し色" : `${summary.accentColor}`;
  const productIds =
    summary.slug === "silver-bag-oshikatsu-coordinate"
      ? ["silver-mini-bag", "clear-silver-accessory"]
      : summary.mainColor === "水色"
        ? ["mint-rib-knit", "silver-mini-bag", "clear-silver-accessory"]
        : summary.mainColor === "黒"
          ? ["black-pleats-skirt", "black-platform-sneaker", "silver-mini-bag"]
          : [];

  return {
    ...summary,
    description: summary.excerpt,
    publishedAt: "2026.07.07",
    updatedAt: "2026.07.07",
    likes: 0,
    palette,
    summary: [
      `${mainColorLabel}を軸に日常服へ落とし込む`,
      `${subColorLabel}で着回しやすく整える`,
      `${accentColorLabel}で推し活らしい雰囲気を足す`,
      `${readableList(summary.scenes)}で使いやすい構成にする`,
    ],
    introduction: [
      `${summary.title}の記事です。`,
      summary.excerpt,
      "この記事では、公式画像やロゴに頼らず、色、素材、小物、シーンの雰囲気から日常服として取り入れやすい方向で整理します。",
    ],
    colorPoints: [
      `${mainColorLabel}を主役として1点入れる`,
      `${subColorLabel}で全体を馴染ませる`,
      `${accentColorLabel}を小物で足す`,
      `${readableList(summary.moodKeywords)}の印象を意識する`,
      "顔立ち、髪型、固有マークではなく服のムードで表現する",
    ],
    illustrationNotes: [
      `${mainColorLabel}のトップスまたは小物`,
      `${subColorLabel}のボトムスまたは靴`,
      `${accentColorLabel}のバッグやアクセサリー`,
      `${readableList(summary.itemTypes.filter((item) => item !== "なし"))}を中心に構成`,
      "キャラクター本人に寄せた髪型や顔立ちは描かない",
    ],
    itemSections: summary.itemTypes
      .filter((item) => item !== "なし")
      .slice(0, 5)
      .map((item) => ({
        heading: item,
        body: [
          `${item}は、${summary.mainColor}や${summary.accentColor}を取り入れやすいアイテムです。手持ち服と合わせやすい色味や、イベント後も使える形を選ぶと自然に着回せます。`,
        ],
      })),
    stylingPoints: [
      {
        heading: "色を入れる場所を決める",
        body: [
          `${mainColorLabel}を全身に散らすより、トップス、バッグ、アクセサリーなど見せたい場所を決めるとまとまりやすくなります。`,
        ],
      },
      {
        heading: "シーンに合わせて動きやすさを調整する",
        body: [
          `${readableList(summary.scenes)}では、写真映えだけでなく歩きやすさ、座りやすさ、荷物の持ちやすさも確認しておくと安心です。`,
        ],
      },
      {
        heading: "小物で雰囲気を足す",
        body: [
          "服で強く寄せなくても、バッグやアクセサリーでムードを足すと普段着として取り入れやすくなります。",
        ],
      },
    ],
    sceneSections: summary.scenes.slice(0, 3).map((scene) => ({
      heading: scene,
      body: [
        `${scene}では、${mainColorLabel}を1点入れつつ、靴やバッグは使いやすさを優先すると過ごしやすくなります。`,
      ],
    })),
    ngPoints: [
      "公式画像やスクリーンショットを使う",
      "ロゴや固有マークを服や小物に入れる",
      "衣装そのものに見える形や配色を狙う",
      "キャラクター本人に見える髪型や顔立ちへ寄せる",
      "公式と誤解される言い回しで商品を勧める",
    ],
    relatedSlugs: articles
      .filter((article) => article.slug !== summary.slug)
      .filter(
        (article) =>
          article.categorySlug === summary.categorySlug ||
          article.mainColor === summary.mainColor ||
          article.scenes.some((scene) => summary.scenes.includes(scene)),
      )
      .slice(0, 4)
      .map((article) => article.slug),
    productIds,
    images: [
      {
        src: summary.thumbnailImage,
        alt: summary.thumbnailAlt,
        caption: `${summary.mainColor}、${summary.subColor}、${summary.accentColor}を使った記事用の参考コーディネート画像です。`,
      },
    ],
    conclusion: [
      `${summary.title}は、色とシーンを先に決めると組み立てやすくなります。`,
      `${mainColorLabel}、${subColorLabel}、${accentColorLabel}のバランスを見ながら、普段着として無理なく使えるアイテムから取り入れてみてください。`,
    ],
  };
}

export const articleDetails: ArticleDetail[] = articles.map((article) =>
  article.slug === sampleArticle.slug ? sampleArticle : createDraftArticleDetail(article),
);

export function getArticleBySlug(slug: string) {
  return articleDetails.find((article) => article.slug === slug);
}

export function getArticleSummaryBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(categorySlug: CategorySlug): ArticleSummary[] {
  return articles.filter((article) => article.categorySlug === categorySlug);
}

export function getRelatedArticles(slugs: readonly string[]): ArticleSummary[] {
  return slugs
    .map((slug) => getArticleSummaryBySlug(slug))
    .filter((article): article is ArticleSummary => Boolean(article));
}
