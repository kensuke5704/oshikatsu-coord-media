import { Footer } from "./Footer";
import { Header } from "./Header";
import { getArticleSearchIndex } from "@/lib/search";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const searchItems = getArticleSearchIndex();

  return (
    <>
      <Header searchItems={searchItems} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
