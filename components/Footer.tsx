import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#eadfda] bg-[#fffdfb]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-black tracking-[0.08em] text-[#2b2522]">oshikatsu coord</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#746863]">
            推しの色や雰囲気を、日常服として楽しむための非公式ファッション提案メディアです。公式画像やロゴ、衣装再現には頼らず、色とムードを身近なコーデに置き換えます。
          </p>
        </div>
        <div className="grid gap-2 text-sm font-bold text-[#4a403b] sm:grid-cols-2">
          <Link className="transition hover:text-[#b66f79]" href="/articles">記事一覧</Link>
          <Link className="transition hover:text-[#b66f79]" href="/categories">カテゴリ一覧</Link>
        </div>
      </div>
    </footer>
  );
}
