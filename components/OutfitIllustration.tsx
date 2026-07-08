import Image from "next/image";
import type { ArticleImage } from "@/lib/types";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");

export function OutfitIllustration({ image }: { image: ArticleImage }) {
  return (
    <figure className="relative overflow-hidden rounded-[8px] border border-[#d7ecee] bg-white p-3">
      <Image
        src={`${basePath}${image.src}`}
        alt={image.alt}
        width={1024}
        height={1536}
        className="h-auto w-full rounded-[6px]"
        priority
      />
      <div className="mt-3 rounded-[8px] border border-[#9fd4d8] bg-white/92 p-4 text-sm font-bold leading-7 text-[#1d3337] shadow-[0_18px_50px_rgba(37,105,112,0.12)] backdrop-blur sm:absolute sm:bottom-6 sm:right-6 sm:mt-0 sm:max-w-[220px]">
        <p className="text-[#2f929b]">コーデのポイント</p>
        <p>{image.caption}</p>
      </div>
    </figure>
  );
}
