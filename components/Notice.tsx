import { Info, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export function DisclosureNotice() {
  return (
    <div className="soft-card rounded-[8px] p-5">
      <div className="flex gap-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#2f929b] text-white">
          <Info size={20} weight="bold" />
        </span>
        <div className="space-y-2 text-sm font-bold leading-7 text-[#1d3337]">
          <p>PR: この記事には広告・アフィリエイトリンクを含みます。</p>
          <p>
            掲載しているコーデ提案は、各作品・キャラクター・権利者とは関係のない非公式のファッション提案です。
          </p>
          <p>
            公式画像・ロゴ・衣装デザインの再現ではなく、色や雰囲気を日常服に落とし込むことを目的としています。
          </p>
        </div>
      </div>
    </div>
  );
}

export function IllustrationNotice() {
  return (
    <div className="rounded-[8px] border border-[#d7ecee] bg-[#f4fbfb] p-4">
      <div className="flex gap-3">
        <span className="mt-1 text-[#2f929b]">
          <ShieldCheck size={22} weight="duotone" />
        </span>
        <p className="text-sm font-bold leading-7 text-[#1d3337]">
          参考コーデ画像は雰囲気を示すための生成表現です。実在の商品・公式衣装・キャラクタービジュアルを再現したものではありません。
        </p>
      </div>
    </div>
  );
}
