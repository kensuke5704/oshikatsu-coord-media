import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";

export const metadata = {
  title: "このサイトについて | oshikatsu coord",
};

const policies = [
  "公式画像、ロゴ、スクリーンショットは掲載しません。",
  "公式衣装やキャラクター本人の再現ではなく、色や雰囲気を日常服へ置き換えます。",
  "記事画像は生成表現による参考コーデ画像で、実在の商品写真の切り抜き・加工・合成は使いません。",
  "広告・アフィリエイトリンクを含む記事では、記事上部にPR表記と非公式注記を表示します。",
];

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="section-title">
          <p>About</p>
          <h1>このサイトについて</h1>
          <span>
            oshikatsu coord は、推しの色や雰囲気を日常服として楽しむための非公式ファッションメディアです。
          </span>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="media-card rounded-[8px] bg-white p-6 sm:p-8">
            <h2 className="font-editorial text-3xl font-semibold leading-snug text-[#2b2522]">
              公式素材に頼らず、ムードを着る。
            </h2>
            <div className="mt-5 space-y-4 text-sm font-medium leading-8 text-[#746863]">
              <p>
                キャラクターや作品そのものを再現するのではなく、色、素材感、シーン、小物の雰囲気から普段着に落とし込むことを大切にしています。
              </p>
              <p>
                ライブ、コラボカフェ、推し会、普段のお出かけなど、強すぎない推し活コーデを探しやすい形で編集します。
              </p>
            </div>
          </section>

          <section className="rounded-[8px] border border-[#eadfda] bg-[#fffaf7] p-6 sm:p-8">
            <h2 className="text-lg font-black text-[#2b2522]">掲載方針</h2>
            <ul className="mt-5 space-y-4">
              {policies.map((policy) => (
                <li key={policy} className="flex gap-3 text-sm font-bold leading-7 text-[#4a403b]">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-[#b66f79]" />
                  <span>{policy}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-[8px] border border-[#eadfda] bg-white p-6 sm:p-8">
          <h2 className="text-lg font-black text-[#2b2522]">記事と画像について</h2>
          <div className="mt-4 space-y-4 text-sm font-medium leading-8 text-[#746863]">
            <p>
              記事内の参考コーデ画像は、4つのコーディネート写真とカラーパネルを組み合わせた生成画像です。顔や固有のキャラクター要素を出さず、メインカラー、サブカラー、アクセントカラーを中心に構成しています。
            </p>
            <p>
              商品紹介は、今後アフィリエイトリンクを含む場合があります。その場合も、公式と誤解される表現を避け、リンクには `rel=&quot;sponsored&quot;` を付与します。
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/articles"
              className="inline-flex min-h-11 items-center rounded-full bg-[#b66f79] px-5 text-sm font-black text-white transition hover:bg-[#9d5963] active:translate-y-px"
            >
              記事一覧へ
            </Link>
            <Link
              href="/categories/rules"
              className="inline-flex min-h-11 items-center rounded-full border border-[#eadfda] bg-white px-5 text-sm font-black text-[#6b514a] transition hover:border-[#b66f79] hover:text-[#b66f79] active:translate-y-px"
            >
              ルールを見る
            </Link>
          </div>
        </section>
      </section>
    </SiteShell>
  );
}
