import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "oshikatsu coord | 推し活を身近に",
  description:
    "推し色や雰囲気を日常服に落とし込む、非公式バウンドコーデ提案メディア。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
