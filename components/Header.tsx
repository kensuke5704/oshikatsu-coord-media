import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

const navItems = [
  { href: "/", label: "ホーム" },
  { href: "/categories/oshi-character", label: "推し別コーデ" },
  { href: "/categories/oshi-color", label: "推し色コーデ" },
  { href: "/categories/taste", label: "テイスト別コーデ" },
  { href: "/categories/shopping", label: "お買い物ガイド" },
  { href: "/about", label: "このサイトについて" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-[#e8e1dd] bg-[#fffdfb]/94 backdrop-blur">
      <div className="mx-auto grid min-h-[74px] max-w-7xl grid-cols-[44px_1fr_44px] items-center gap-3 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <div className="min-w-0 justify-self-start">
          <Link
            href="/categories"
            className="hidden text-xs font-bold tracking-[0.16em] text-[#7e6f68] transition hover:text-[#b66f79] lg:block"
          >
            CATEGORY
          </Link>
        </div>
        <Link href="/" className="justify-self-center text-center">
          <span className="brand-logo block whitespace-nowrap text-[22px] leading-none text-[#2b2522] sm:text-[26px]">
            oshikatsu coord
          </span>
          <span className="mt-1 block whitespace-nowrap text-[11px] font-medium tracking-[0.12em] text-[#8b7b74]">
            推し活と日常服の小さな編集室
          </span>
        </Link>
        <Link
          href="/articles"
          className="grid size-11 shrink-0 place-items-center justify-self-end rounded-full bg-[#f4eeeb] text-[#6b514a] transition hover:bg-[#eadfda] hover:text-[#b66f79] active:translate-y-px"
          aria-label="記事を探す"
        >
          <MagnifyingGlass size={22} weight="bold" />
        </Link>
      </div>
      <nav className="border-t border-[#f0e9e5]">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 text-[12px] font-medium text-[#4a403b] sm:px-6 lg:justify-center lg:px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 border-b border-transparent pb-1 transition hover:border-[#b66f79] hover:text-[#b66f79]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
