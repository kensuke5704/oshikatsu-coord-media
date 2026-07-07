import Image from "next/image";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");

export function OutfitIllustration() {
  return (
    <figure className="relative overflow-hidden rounded-[8px] border border-[#d7ecee] bg-white p-3">
      <Image
        src={`${basePath}/illustrations/hatsune-miku-bound-coordinate-draft.png`}
        alt="水色、黒、シルバーを使った一般的な近未来カジュアルコーデの参考イラスト"
        width={1024}
        height={1536}
        className="h-auto w-full rounded-[6px]"
        priority
      />
      <div className="absolute bottom-6 right-6 max-w-[220px] rounded-[8px] border border-[#9fd4d8] bg-white/92 p-4 text-sm font-bold leading-7 text-[#1d3337] shadow-[0_18px_50px_rgba(37,105,112,0.16)] backdrop-blur">
        <p className="text-[#2f929b]">コーデのポイント</p>
        <p>水色、黒、シルバーの配色を日常服に置き換えた参考表現です。</p>
      </div>
    </figure>
  );
}
