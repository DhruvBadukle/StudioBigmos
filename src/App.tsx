import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { BlockRenderer } from "./components/BlockRenderer";
import { LoadMore } from "./components/LoadMore";
import { Footer } from "./components/Footer";
import { SearchResults } from "./components/SearchResults";
import { ScrollToTop } from "./components/ScrollToTop";
import { WishlistPage } from "./components/WishlistPage";
import {
  LOOKBOOK_PRODUCTS,
  PRODUCTS,
  TRENDING_PRODUCTS,
} from "./data/catalog";
import { buildBlocks } from "./lib/layout";
import { searchProducts } from "./lib/search";
import type { Product } from "./types";

const PAGE_SIZE = 8;
const WISHLIST_STORAGE_KEY = "avikas-studio-wishlist";
const ALL_PRODUCTS = [...PRODUCTS, ...LOOKBOOK_PRODUCTS, ...TRENDING_PRODUCTS];

function productKey(product: Product) {
  return `${product.id}::${product.link}`;
}

const PRODUCTS_BY_KEY = new Map(
  ALL_PRODUCTS.map((product) => [productKey(product), product])
);

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlistKeys, setWishlistKeys] = useState<string[]>(() => {
    const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!storedWishlist) return [];

    try {
      const parsed: unknown = JSON.parse(storedWishlist);
      if (!Array.isArray(parsed) || !parsed.every((key) => typeof key === "string")) {
        console.error("Saved wishlist has an invalid format.");
        return [];
      }
      return parsed.filter((key) => PRODUCTS_BY_KEY.has(key));
    } catch (error) {
      console.error("Could not read the saved wishlist.", error);
      return [];
    }
  });
  const pendingNavigation = useRef<string | null>(null);
  const wishlistKeySet = useMemo(() => new Set(wishlistKeys), [wishlistKeys]);
  const wishlistProducts = wishlistKeys
    .map((key) => PRODUCTS_BY_KEY.get(key))
    .filter((product): product is Product => product !== undefined);

  const search = useMemo(
    () => searchProducts(ALL_PRODUCTS, searchQuery),
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
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistKeys));
  }, [wishlistKeys]);

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
    setIsWishlistOpen(false);

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

  const toggleWishlist = (product: Product) => {
    const key = productKey(product);
    setWishlistKeys((current) =>
      current.includes(key)
        ? current.filter((savedKey) => savedKey !== key)
        : [...current, key]
    );
  };

  const openWishlist = () => {
    setSearchQuery("");
    setIsWishlistOpen(true);
    window.history.pushState(null, "", "#wishlist");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen bg-bg font-sans text-ink">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={navigateTo}
        wishlistCount={wishlistProducts.length}
        onWishlistClick={openWishlist}
        isWishlistActive={isWishlistOpen}
      />

      {isWishlistOpen ? (
        <WishlistPage
          products={wishlistProducts}
          wishlistKeys={wishlistKeySet}
          onToggleWishlist={toggleWishlist}
          onContinueShopping={() => navigateTo("shop")}
        />
      ) : isSearching ? (
        <SearchResults
          query={searchQuery}
          episode={search.episode}
          results={search.results}
          onClear={() => setSearchQuery("")}
          wishlistKeys={wishlistKeySet}
          onToggleWishlist={toggleWishlist}
        />
      ) : (
        <>
          <Hero />
          <div className="mx-auto max-w-7xl px-6">
            <BlockRenderer
              blocks={blocks}
              wishlistKeys={wishlistKeySet}
              onToggleWishlist={toggleWishlist}
            />
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