import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { BlockRenderer } from "./components/BlockRenderer";
import { LoadMore } from "./components/LoadMore";
import { Footer } from "./components/Footer";
import { SearchResults } from "./components/SearchResults";
import { ScrollToTop } from "./components/ScrollToTop";
import {
  LOOKBOOK_PRODUCTS,
  PRODUCTS,
  TRENDING_PRODUCTS,
} from "./data/catalog";
import { buildBlocks } from "./lib/layout";
import { searchProducts } from "./lib/search";

const PAGE_SIZE = 8;

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const pendingNavigation = useRef<string | null>(null);

  const search = useMemo(
    () => searchProducts([...PRODUCTS, ...LOOKBOOK_PRODUCTS, ...TRENDING_PRODUCTS], searchQuery),
    [searchQuery]
  );

  const blocks = useMemo(
    () => buildBlocks(PRODUCTS, visibleCount),
    [visibleCount]
  );

  const isSearching = searchQuery.trim().length > 0;
  const visibleProducts =
    Math.min(visibleCount, PRODUCTS.length) +
    Math.min(visibleCount, LOOKBOOK_PRODUCTS.length);
  const totalProducts = PRODUCTS.length + LOOKBOOK_PRODUCTS.length;

  useEffect(() => {
    const destination = pendingNavigation.current;
    if (isSearching || !destination) return;

    const target = document.getElementById(destination);
    if (target) {
      window.history.pushState(null, "", `#${destination}`);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    pendingNavigation.current = null;
  }, [isSearching]);

  const navigateTo = (target: string) => {
    if (isSearching) {
      pendingNavigation.current = target;
      setSearchQuery("");
      return;
    }

    const element = document.getElementById(target);
    if (element) {
      window.history.pushState(null, "", `#${target}`);
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-bg font-sans text-ink">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={navigateTo}
      />

      {isSearching ? (
        <SearchResults
          query={searchQuery}
          episode={search.episode}
          results={search.results}
          onClear={() => setSearchQuery("")}
        />
      ) : (
        <>
          <Hero />
          <div className="mx-auto max-w-7xl px-6">
            <BlockRenderer blocks={blocks} />
            <LoadMore
              visible={visibleProducts}
              total={totalProducts}
              onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
            />
          </div>
        </>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
}