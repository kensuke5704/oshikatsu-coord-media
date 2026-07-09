import { categories, getCategoryByName } from "./categories";
import { articleRows as rows } from "./articleRows.generated";
import type { ArticleDetail, ArticleStatus, ArticleSummary, CategorySlug, DetailSection } from "./types";

const excerptsByNo: Record<number, string> = {
  1: "水色を主役に、黒で締めてシルバー小物で光を足す。ライブやカフェにも普段にも戻せる非公式LOOK。",
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
  const category = getCategoryByName(row.menuLabel);
  const { sourceStatus: _sourceStatus, ...articleRow } = row;

  return {
    ...articleRow,
    moodKeywords: [...row.moodKeywords],
    scenes: [...row.scenes],
    itemTypes: [...row.itemTypes],
    tags: [...row.tags],
    affiliatePriority: [...row.affiliatePriority],
    categorySlug: category.slug,
    status: "完成",
    excerpt: excerptsByNo[row.no] ?? createFallbackExcerpt(row),
    thumbnailImage: row.imagePath ?? `/images/articles/${row.slug}.png`,
    thumbnailAlt: row.imageAlt ?? `${row.title}のコーディネート参考画像`,
  };
});

export function getCategoriesWithArticleCounts() {
  const counts = new Map<CategorySlug, number>();

  for (const article of articles) {
    counts.set(article.categorySlug, (counts.get(article.categorySlug) ?? 0) + 1);
  }

  return categories.map((category) => ({
    ...category,
    count: counts.get(category.slug) ?? 0,
  }));
}

export const sampleArticle: ArticleDetail = {
  ...articles[0],
  description:
    "水色、黒、シルバーを使って、初音ミクの透明感や近未来感を日常服にそっと混ぜる非公式LOOKです。",
  summary: [
    "水色を主役にしても子どもっぽく見せない合わせ方",
    "黒を入れてコーデ全体をすっきり見せるバランス",
    "シルバー小物で近未来感をさりげなく足すコツ",
    "ライブやカフェでも浮きにくい普段着ベースの作り方",
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
    "ライブの日、コラボカフェの日、友だちと写真を撮る日。せっかくなら「今日はちょっと推しを連れてきた」って、自分だけわかるくらいの服で出かけたい。",
    "初音ミクをイメージするなら、軸にしたいのは水色、黒、シルバーです。水色で透明感を出して、黒で少し締める。そこにシルバー小物を足すと、甘すぎない近未来っぽさが出ます。",
    "キャラクターそのものに寄せるより、色と空気感を借りるくらいがちょうどいい。学校帰りや普段のお出かけにも戻しやすい、軽めのバウンドコーデです。",
  ],
  colorPoints: [
    "水色は上半身に入れると写真に残りやすい",
    "黒のボトムスや靴で甘さをすっきり引き締める",
    "シルバーやクリア小物で近未来感を少し足す",
    "明るい水色は現場向き、くすみミントは普段着向き",
    "公式衣装ではなく、色と空気感を普段着に混ぜる",
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
      heading: "写真に残る水色トップス",
      body: [
        "主役になるのは、水色やミントブルーのトップスです。リブニット、カーディガン、シアーシャツなら、写真に残ったときも色が伝わりやすく、普段着にも戻しやすいです。",
        "現場の日は少し明るめの水色、普段にも着たい日はくすみミントや淡いブルー。気分と予定に合わせて選ぶと自然です。",
      ],
    },
    {
      heading: "甘さを抑える黒ボトムス",
      body: [
        "水色の軽さを引き締めるなら、ボトムスは黒が頼れます。プリーツスカートなら軽め、ミニスカートならイベント感、ワイドパンツなら大人っぽくまとまります。",
      ],
    },
    {
      heading: "近未来感を足すシルバーバッグ",
      body: [
        "シルバーのバッグは、近未来感を足すのに使いやすい小物です。全面シルバーが強く感じる日は、チェーンや金具だけシルバーのバッグでも雰囲気が出ます。",
      ],
    },
    {
      heading: "歩ける黒の靴",
      body: [
        "足元は黒のスニーカーやローファーにすると、全体がぼんやりしません。長時間歩く日なら、見た目の高さよりも重さと歩きやすさを先に見ておくと安心です。",
      ],
    },
    {
      heading: "手元に効くクリアアクセ",
      body: [
        "クリア素材やシルバー系アクセは、服がシンプルな日にも透明感を足せます。アクスタやトレカを持って写真を撮る日なら、手元に少し光が入るだけで画面が締まります。",
      ],
    },
  ],
  stylingPoints: [
    {
      heading: "水色は上半身かバッグに入れる",
      body: [
        "集合写真や自撮りで残りやすいのは、上半身と手元です。トップス、カーディガン、バッグのどこかに水色を入れると、推し色がちゃんと伝わります。",
      ],
    },
    {
      heading: "黒で甘さを調整する",
      body: [
        "水色やミント系は、合わせ方によっては甘く見えやすい色です。黒のスカートや黒の靴を入れると、少しクールに寄って日常服としても着やすくなります。",
      ],
    },
    {
      heading: "シルバーは一点だけで十分",
      body: [
        "シルバーは入れすぎるとパーティー感が出やすいので、バッグかアクセサリーのどちらかに絞るくらいが自然です。",
      ],
    },
    {
      heading: "現場の日こそ靴は試しておく",
      body: [
        "かわいさだけでなく、歩きやすさも大事です。新しい靴を当日に初めて履くより、近所で一度歩いておくと気持ちに余裕ができます。",
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
    "初音ミクをイメージしたLOOKは、水色、黒、シルバーの3色で作ると取り入れやすいです。",
    "水色で透明感を出す。黒で締める。シルバーで少しだけ光を足す。このバランスなら、推しの雰囲気を感じながら、普段の服としても着やすくなります。",
    "ライブの日も、カフェの日も、ただの休日も。自分の中で少し気分が上がるくらいの推し色が、いちばん長く楽しめます。",
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

type EditorialCopy = {
  summary: string[];
  introduction: string[];
  sections: DetailSection[];
  conclusion: string[];
};

const editorialCopyBySlug: Record<string, EditorialCopy> = {
  "live-oshikatsu-coordinate": {
    summary: [
      "ライブ服は写真映えより先に、帰り道まで機嫌よくいられるかで考える",
      "足元、バッグ、羽織りの3つで当日の疲れ方が大きく変わる",
      "推し色は面積よりも、見える位置と写真に残る位置を意識する",
    ],
    introduction: [
      "ライブの日の服は、朝の鏡の前だけで決めると少し危ないです。",
      "駅まで歩く、物販に並ぶ、座席で荷物を抱える、終演後に人の流れに乗って帰る。かわいいかどうかの前に、半日以上をその服で過ごすことになります。",
      "それでも、ただ楽なだけでは寂しい。写真を撮ったときに推し活の日だったとわかるくらいの高揚感は残したい。この記事では、そのちょうど真ん中を狙います。",
    ],
    sections: [
      {
        heading: "最初に決めるのは靴",
        body: [
          "ライブ服は、トップスより先に靴を決めたほうが失敗しにくいです。会場までの道、階段、物販列、帰りの駅。足が痛くなると、服のかわいさを楽しむ余裕が一気になくなります。",
          "厚底を履くなら、見た目の高さよりも重さと曲がりやすさを見ます。新品を当日に下ろすより、近所を一度歩いて、くるぶしや甲に当たるところがないか確認しておくほうが安心です。",
        ],
      },
      {
        heading: "推し色は上半身か小物に寄せる",
        body: [
          "集合写真や自撮りに残るのは、意外と上半身と手元です。推し色を全身に散らすより、トップス、カーディガン、バッグ、ヘアアクセのどこかに絞ると画面の中でちゃんと効きます。",
          "色が強い場合は、白、黒、グレー、デニムで一度受け止めると日常服として見えやすくなります。会場では少し派手でも、帰り道のコンビニで浮きすぎないくらいがちょうどいいです。",
        ],
      },
      {
        heading: "バッグは容量より出し入れのしやすさ",
        body: [
          "ライブの日のバッグは、入る量だけで選ぶと使いづらいことがあります。チケット、スマホ、財布、リップ、モバイルバッテリーを立ったまま出せるか。ここがかなり大事です。",
          "うちわやペンライトがある日は、メインバッグと小さなショルダーを分けるのも手です。貴重品だけ体の前に置けると、人混みでも落ち着いて動けます。",
        ],
      },
      {
        heading: "羽織りは写真に写ってもいいものを",
        body: [
          "空調が強い会場、夜の帰り道、雨の日の待機列。羽織りは実用品ですが、結局ずっと手に持ったり肩にかけたりして写真に写ります。",
          "畳んだときにかさばらない、色がコーデから浮かない、シワが気になりにくい。この3つを満たす薄手のシャツやカーディガンがあると、当日の安心感がかなり変わります。",
        ],
      },
    ],
    conclusion: [
      "ライブ参戦コーデは、動ける服に少しだけ推し色を足すくらいが長く楽しめます。",
      "靴、バッグ、羽織りを先に整えてから、トップスや小物で写真映えを足す。そうすると、開演前から帰宅後まで、服のせいで気持ちが削られにくくなります。",
    ],
  },
  "collaboration-cafe-oshikatsu-coordinate": {
    summary: [
      "コラボカフェ服は、席に座ったときの見え方で考える",
      "強い再現より、グッズやフードと並んだときの馴染みを優先する",
      "白、淡色、差し色小物を使うと写真が重くなりにくい",
    ],
    introduction: [
      "コラボカフェの服は、外を歩くときよりも、席に座った瞬間のほうが本番です。",
      "テーブルの上にはドリンク、フード、アクリルスタンド、ぬい。写真に残るものが多いので、服だけが主張しすぎると全体が少し忙しく見えます。",
      "目指したいのは、気合いが入っているのに、写真の中でちゃんと余白がある服。推しを前に出しながら、自分も機嫌よく写れるバランスを考えます。",
    ],
    sections: [
      {
        heading: "トップスは顔まわりを明るくする",
        body: [
          "席写真やバストアップの写真では、トップスの色が印象を決めます。迷ったら白、淡いグレー、ミント、薄いピンクなど、顔まわりが暗くならない色を選ぶと写真がやわらかく見えます。",
          "推し色が濃い場合は、トップス全面で使うより、襟、カーディガン、スカーフ、バッグで足すほうが扱いやすいです。",
        ],
      },
      {
        heading: "ボトムスは座ったときの形で選ぶ",
        body: [
          "コラボカフェでは座っている時間が長いので、立ち姿だけで選ばないほうがいいです。短すぎる丈、シワが強く出る素材、座るとお腹まわりが苦しい服は、楽しい時間のノイズになります。",
          "写真を撮る予定がある日は、スカートなら広がりすぎないもの、パンツなら膝が出にくいものが扱いやすいです。",
        ],
      },
      {
        heading: "バッグはテーブルに置いたときも見る",
        body: [
          "小さめのバッグは、テーブル横や椅子に置いたときに写真へ入り込みます。だから、ロゴや装飾が強いものより、色や素材で雰囲気を足せるものが便利です。",
          "クリア、シルバー、淡色のミニバッグは、グッズやドリンクの色を邪魔しにくく、推し活の写真にも馴染みます。",
        ],
      },
      {
        heading: "アクセサリーは小さく効かせる",
        body: [
          "カフェでは手元の写真が増えます。リング、ブレスレット、ネイル、スマホケースなど、近くで見える小物に少しだけ推し色を入れると、押しつけ感なく気分が出ます。",
          "大きなモチーフをたくさん使うより、色を拾うくらいのほうが大人っぽくまとまります。",
        ],
      },
    ],
    conclusion: [
      "コラボカフェの服は、服だけで完成させようとしなくて大丈夫です。",
      "テーブル、フード、グッズ、店内の明るさまで含めて一枚の写真になります。だからこそ、服は少し引き算して、推しの色がきれいに見える余白を残すのがおすすめです。",
    ],
  },
  "bound-coordinate-beginner-guide": {
    summary: [
      "バウンドコーデは衣装の再現ではなく、色と雰囲気の翻訳",
      "最初はトップスか小物の一点だけで十分",
      "似せるより、日常服としてまた着たいかを基準にする",
    ],
    introduction: [
      "バウンドコーデという言葉を聞くと、少し難しそうに感じるかもしれません。",
      "でも本来は、キャラクターや作品の雰囲気を、手持ちの服や普段着でそっと楽しむための考え方です。衣装を作る必要も、髪型を寄せる必要もありません。",
      "むしろ、やりすぎないほうが日常に馴染みます。この記事では、最初の一歩をかなり現実寄りに分解します。",
    ],
    sections: [
      {
        heading: "再現ではなく、翻訳として考える",
        body: [
          "バウンドコーデで大切なのは、公式衣装をなぞることではありません。色、素材、雰囲気、シルエットを普段着の言葉に置き換えることです。",
          "たとえば、近未来感ならシルバー小物。透明感なら淡いブルーや白。元気さならスニーカーや短め丈。こうして要素を一度ばらすと、普段の服に混ぜやすくなります。",
        ],
      },
      {
        heading: "最初は一点だけでいい",
        body: [
          "初めてなら、全身で表現しようとしないほうがうまくいきます。トップス、バッグ、靴、アクセサリーのどれか一点に推し色を入れるだけでも、気分はかなり変わります。",
          "一点だけなら、イベントの日だけでなく、普段の外出にも使いやすいです。続けやすさは、推し活の服選びではかなり大事です。",
        ],
      },
      {
        heading: "手持ち服に混ぜて考える",
        body: [
          "新しく買う前に、クローゼットの中で使える色を見ておくと無駄が減ります。黒、白、デニム、グレー、ベージュは、多くの推し色を受け止めてくれる土台になります。",
          "推し色の服を買うなら、手持ちの土台服と2パターン以上組めるかを確認してみてください。着回せる服は、イベント後もちゃんと残ります。",
        ],
      },
      {
        heading: "公式と混同されない距離を取る",
        body: [
          "非公式で楽しむ以上、ロゴ、固有マーク、衣装そのものに見える形は避けます。誰かに見せたときに、公式衣装の複製ではなく、色やムードを楽しんでいると伝わる距離感が安心です。",
          "これは制限というより、日常服として楽しむための余白です。余白があるほうが、自分の服として長く着られます。",
        ],
      },
    ],
    conclusion: [
      "バウンドコーデは、完璧に似せるほど正解に近づくものではありません。",
      "推しの好きなところをひとつ選び、それを色や小物で日常に連れてくる。まずはそのくらいの軽さで始めると、服選びがずっと楽しくなります。",
    ],
  },
  "oshikatsu-coordinate-copyright-manners": {
    summary: [
      "公式画像、ロゴ、スクリーンショットは使わない",
      "衣装再現ではなく、色やムードの提案として距離を取る",
      "読者が公式企画と誤解しない表現を徹底する",
    ],
    introduction: [
      "推し活の服を考えるとき、かわいさと同じくらい大切なのが距離感です。",
      "好きだからこそ、公式の画像やロゴをそのまま使いたくなる場面があります。でも、メディアとして提案するなら、そこに頼らない形を先に作っておく必要があります。",
      "この記事は、萎縮するためのルールではありません。安心して長く楽しむための、足場のようなものです。",
    ],
    sections: [
      {
        heading: "公式素材を使わない理由",
        body: [
          "公式画像、ロゴ、スクリーンショットは、それだけで作品や権利者の文脈を強く持ちます。記事内で使うと、非公式の提案であっても公式企画のように見えてしまうことがあります。",
          "このサイトでは、公式素材に頼らず、色、季節感、素材、小物の組み合わせで雰囲気を伝えます。そのほうが読者も自分の服に置き換えやすくなります。",
        ],
      },
      {
        heading: "衣装そのものに寄せすぎない",
        body: [
          "配色だけでなく、形、装飾、特徴的な小物まで重ねると、日常服ではなく衣装再現に近づきます。特に固有マーク、記号的な髪型、特徴的な装飾は避けます。",
          "目標は、わかる人には雰囲気が伝わるけれど、街で着ても自然に見えること。そこに非公式ファッション提案としての居場所があります。",
        ],
      },
      {
        heading: "商品紹介で気をつけること",
        body: [
          "商品を紹介するときは、公式衣装の代用品として煽らないことが大切です。『完全再現』や『公式風』のような言い方は、読者の期待も権利面の距離感も曖昧にします。",
          "このサイトでは、商品は色や素材の選択肢として扱います。アフィリエイトリンクにはPRであることを明示し、リンク属性も適切に付けます。",
        ],
      },
      {
        heading: "SNSに載せる前の見直し",
        body: [
          "投稿前には、公式と誤解される要素がないかを一度見ます。画像内のロゴ、背景のスクリーンショット、商品写真の加工、キャプションの言い回し。小さなところで印象は変わります。",
          "好きなものを長く好きでいるために、少しだけ確認する。マナーは窮屈なものではなく、自分の楽しみ方を守るための習慣です。",
        ],
      },
    ],
    conclusion: [
      "推し活コーデは、公式素材を使わなくても十分に楽しく作れます。",
      "むしろ、色や素材だけで雰囲気を伝えるほうが、読者自身の服として取り入れやすくなります。安心できる距離感を持ったまま、好きな気持ちを日常に混ぜていきましょう。",
    ],
  },
  "shein-oshikatsu-coordinate-guide": {
    summary: [
      "検索語は色、素材、形の3方向で分ける",
      "写真よりレビューとサイズ表を先に見る",
      "安さだけでなく、イベント当日に使えるかで選ぶ",
    ],
    introduction: [
      "SHEINで推し活向きの服を探すと、選択肢が多すぎて途中で疲れてしまうことがあります。",
      "かわいいものは見つかる。でも、届いたときに生地が薄すぎたり、サイズが合わなかったり、イベントの日に着るには不安だったりする。プチプラだからこそ、探し方に少しコツがいります。",
      "ここでは、商品を眺め続ける前に決めておくと楽になる検索の順番をまとめます。",
    ],
    sections: [
      {
        heading: "検索語は一度に詰め込まない",
        body: [
          "最初から『水色 ライブ 推し活 かわいい』のように全部入れるより、色、素材、形を分けて探すほうが見つけやすいです。",
          "たとえば色なら『ミント』『ライトブルー』、素材なら『シアー』『リブ』、形なら『カーディガン』『プリーツスカート』。方向を分けると、候補の質が安定します。",
        ],
      },
      {
        heading: "レビュー写真で生地感を見る",
        body: [
          "商品写真はきれいに撮られています。実際の厚み、透け感、丈感はレビュー写真のほうが参考になることが多いです。",
          "特に白や淡色、シアー素材、ニットは差が出やすいので、レビューの自然光写真や着用コメントを先に見ます。イベント用なら、薄すぎないか、座ったときに気にならないかも大切です。",
        ],
      },
      {
        heading: "サイズは普段の感覚で決めない",
        body: [
          "海外通販では、S/M/Lの感覚が手持ち服とずれることがあります。サイズ表の肩幅、身幅、着丈、ウエストを見て、手持ちの服と比べるのが一番確実です。",
          "ぴったり着たい服と、長時間座る日のボトムスでは選ぶサイズも変わります。推し活用なら、少し動ける余裕を残すほうが当日安心です。",
        ],
      },
      {
        heading: "買う前に一軍服と合わせる",
        body: [
          "候補を見つけたら、手持ちの一軍服と合わせられるかを考えます。黒スカート、白トップス、デニム、シンプルなバッグ。このあたりと組めるなら、イベント後も出番が残ります。",
          "一回きりの服を否定する必要はありません。ただ、何度か着られる服のほうが、結果的に推し活の準備が楽になります。",
        ],
      },
    ],
    conclusion: [
      "SHEINで探すときは、かわいいものを偶然見つけるより、検索の軸を分けるほうが疲れにくいです。",
      "色、素材、形。レビュー、サイズ表、手持ち服。見る順番を決めておくだけで、届いてからの失敗はかなり減らせます。",
    ],
  },
  "silver-bag-oshikatsu-coordinate": {
    summary: [
      "シルバーバッグは推し色を邪魔せず、写真に少しだけ光を足せる",
      "形はミニショルダー、巾着、横長バッグが使いやすい",
      "金具やロゴが強すぎないものを選ぶと日常服に馴染む",
    ],
    introduction: [
      "シルバーバッグは、推し活コーデの中でかなり頼れる小物です。",
      "水色には透明感を、黒には抜け感を、白には少しだけ近未来感を足してくれます。しかも、推し色を大きく増やさなくても写真の中でちゃんと目に入ります。",
      "ただし、選び方を間違えると急にパーティー感が強くなることもあります。日常服に馴染むシルバーを基準に見ていきます。",
    ],
    sections: [
      {
        heading: "まずは面積の小さいものから",
        body: [
          "シルバーに慣れていないなら、大きなトートよりミニバッグから始めるほうが簡単です。面積が小さいと、服全体から浮きにくく、アクセサリーの延長として使えます。",
          "ライブやカフェなら、スマホ、ミニ財布、リップ、鍵が入るくらいのサイズが便利です。荷物が多い日はサブバッグと分けると、写真に写る部分をきれいに保てます。",
        ],
      },
      {
        heading: "水色コーデには軽いシルバー",
        body: [
          "水色に合わせるなら、ギラギラした鏡面より、少し白っぽいシルバーやマット寄りの質感が使いやすいです。透明感を邪魔せず、涼しげな印象を足してくれます。",
          "服が淡い日は、バッグのチェーンや金具が細いものを選ぶと全体が重くなりません。",
        ],
      },
      {
        heading: "黒コーデには形で抜けを作る",
        body: [
          "黒の服にシルバーバッグを合わせると、ぐっと大人っぽく見えます。角ばったバッグならモードに、丸みのあるバッグなら少しやわらかく寄せられます。",
          "黒コーデが重く感じる日は、靴まで黒で固めず、バッグだけシルバーにして光を一点作るとバランスが取りやすいです。",
        ],
      },
      {
        heading: "派手な金具とロゴは控えめに",
        body: [
          "推し活の写真では、バッグが思ったより目立ちます。ブランド風の大きな金具やロゴが強いと、推し色よりバッグの印象が勝ってしまうことがあります。",
          "無地、細めストラップ、小さめの金具。これくらいの引き算があるほうが、いろいろな色のコーデに合わせやすくなります。",
        ],
      },
    ],
    conclusion: [
      "シルバーバッグは、推し色を増やさずにムードを足せる便利な小物です。",
      "水色には透明感、黒には抜け感、白には少しの華やかさ。服を買い足す前に、小物で雰囲気を変えたいときの選択肢として持っておくと頼れます。",
    ],
  },
  "futuristic-cyber-oshikatsu-coordinate": {
    summary: [
      "近未来感は光る服ではなく、冷たい色と素材で作る",
      "水色、黒、シルバーを使うと日常服に落とし込みやすい",
      "シルエットはすっきり、アクセントは一点に絞る",
    ],
    introduction: [
      "近未来・サイバー系のコーデは、やりすぎると一気に衣装っぽくなります。",
      "でも、色と素材を少しだけ選べば、日常服のまま雰囲気を作れます。水色の透明感、黒のシャープさ、シルバーの光。この3つがあると、強い装飾がなくてもそれらしく見えてきます。",
      "この記事では、街で着られる範囲に残しながら、少しだけ非日常感を入れる方法を考えます。",
    ],
    sections: [
      {
        heading: "色は冷たく、形は普通に",
        body: [
          "近未来感を出そうとして、形まで特殊にするとコスチューム感が強くなります。色を水色、黒、シルバーに寄せるなら、服の形はリブトップス、シャツ、スカート、スラックスなど普通の形で十分です。",
          "見慣れた形に冷たい色を乗せるくらいが、日常服としてはちょうどいいバランスです。",
        ],
      },
      {
        heading: "素材で少しだけ光を入れる",
        body: [
          "サイバー感は、メタリックな服を着なくても作れます。シルバーのバッグ、クリアアクセサリー、少しツヤのある靴。小さな面積に光があるだけで印象は変わります。",
          "全身を光らせるより、一点だけ反射する場所を作るほうが大人っぽくまとまります。",
        ],
      },
      {
        heading: "黒は締め役として使う",
        body: [
          "水色とシルバーだけだと、淡くて輪郭がぼやけることがあります。黒のスカート、黒のパンツ、黒の靴を入れると、コーデの線がはっきりします。",
          "黒を多く使う日は、バッグやアクセサリーで軽さを足すと、重くならずに近未来感が残ります。",
        ],
      },
      {
        heading: "アクセントは一点に絞る",
        body: [
          "近未来・サイバー系は、要素を増やすほど説明的になります。メタリックバッグ、クリアアクセ、厚底、ライン入りトップスを全部入れると、日常服から離れやすいです。",
          "今日はバッグだけ、今日は靴だけ。アクセントを一点に絞ると、雰囲気は残しながら着やすくなります。",
        ],
      },
    ],
    conclusion: [
      "近未来・サイバー系は、強い装飾を足すより、色と素材の温度をそろえるほうがきれいに見えます。",
      "水色、黒、シルバーを土台にして、光る小物を一点だけ。これくらいの引き算が、日常服としてのリアルさにつながります。",
    ],
  },
};

function createEditorialArticleDetail(summary: ArticleSummary, copy: EditorialCopy): ArticleDetail {
  return {
    ...summary,
    description: summary.excerpt,
    palette: createPalette(summary),
    summary: copy.summary,
    introduction: copy.introduction,
    editorialSections: copy.sections,
    colorPoints: [],
    illustrationNotes: [],
    itemSections: [],
    stylingPoints: [],
    sceneSections: [],
    ngPoints: [],
    relatedSlugs: articles
      .filter((article) => article.slug !== summary.slug)
      .filter(
        (article) =>
          article.articleType === summary.articleType ||
          article.categorySlug === summary.categorySlug ||
          article.tags.some((tag) => summary.tags.includes(tag)),
      )
      .slice(0, 4)
      .map((article) => article.slug),
    productIds: [],
    images: [
      {
        src: summary.thumbnailImage,
        alt: summary.thumbnailAlt,
        caption: "",
      },
    ],
    conclusion: copy.conclusion,
  };
}

export function createDraftArticleDetail(summary: ArticleSummary): ArticleDetail {
  const editorialCopy = editorialCopyBySlug[summary.slug];
  if (summary.articleType !== "LOOK" && summary.articleType !== "COLOR" && editorialCopy) {
    return createEditorialArticleDetail(summary, editorialCopy);
  }

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
          article.articleType === summary.articleType ||
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
