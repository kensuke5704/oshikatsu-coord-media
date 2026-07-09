import Image from "next/image";
import type { ArticleImage } from "@/lib/types";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_ACTIONS === "true" && repositoryName !== "" ? `/${repositoryName}` : "");

export function OutfitIllustration({ image }: { image: ArticleImage }) {
  return (
    <figure className="relative w-full max-w-full overflow-hidden rounded-[8px] border border-[#d7ecee] bg-white p-3">
      <Image
        src={`${basePath}${image.src}`}
        alt={image.alt}
        width={1024}
        height={1536}
        sizes="(min-width: 1024px) 820px, calc(100vw - 32px)"
        className="block h-auto w-full max-w-full rounded-[6px]"
        priority
      />
    </figure>
  );
}
