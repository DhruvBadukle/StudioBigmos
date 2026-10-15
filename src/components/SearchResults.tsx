import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface Props {
  query: string;
  episode: number | null;
  results: Product[];
  onClear: () => void;
  wishlistKeys: Set<string>;
  onToggleWishlist: (product: Product) => void;
}

export function SearchResults({
  query,
  episode,
  results,
  onClear,
  wishlistKeys,
  onToggleWishlist,
}: Props) {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-6">
      {/* Header row */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
            {episode !== null ? `Episode ${episode}` : "Search results"}
          </div>
          <h2 className="font-serif text-[28px] font-semibold tracking-tight">
            {episode !== null ? `From Episode ${episode}` : `"${query}"`}
          </h2>
          <p className="mt-1 text-[13.5px] text-muted">
            {results.length} {results.length === 1 ? "piece" : "pieces"} found
          </p>
        </div>
        <button
          onClick={onClear}
          className="rounded-full border border-line bg-white px-5 py-2.5 text-[13px] font-medium hover:border-ink"
        >
          ← Back to shop
        </button>
      </div>

      {results.length === 0 ? (
        <div className="py-24 text-center text-muted">
          <p className="mb-2 text-[15px]">No pieces found for that search.</p>
          <p className="text-[13px]">Try episode numbers like <b>24</b>, <b>#12</b>, or <b>ep 7</b>.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[22px]">
          {results.map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="opacity-0 animate-fade-up"
              style={{ animationDelay: `${(i % 8) * 30}ms` }}
            >
              <ProductCard
                product={p}
                isWishlisted={wishlistKeys.has(`${p.id}::${p.link}`)}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      )}

      <div className="py-16" />
    </section>
  );
}