import { Info } from "@phosphor-icons/react/dist/ssr";

export function DisclosureNotice() {
  return (
    <div className="disclosure-notice">
      <div className="flex gap-3">
        <span className="grid size-8 shrink-0 place-items-center bg-[#2f929b] text-white">
          <Info size={18} weight="bold" />
        </span>
        <div className="space-y-1 text-[13px] font-bold leading-6 text-[#1d3337] sm:text-sm sm:leading-7">
          <p>
            PR: この記事には広告・アフィリエイトリンクを含みます。掲載しているコーデ提案は非公式のファッション提案です。
          </p>
          <p>
            各作品・キャラクター・権利者とは関係なく、公式画像・ロゴ・衣装デザインの再現ではなく、色や雰囲気を日常服に置き換えています。
          </p>
        </div>
      </div>
    </div>
  );
}
