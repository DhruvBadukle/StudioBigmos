import { Heart } from "lucide-react";
import type { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  wishlistKeys: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onContinueShopping: () => void;
}

export function WishlistPage({
  products,
  wishlistKeys,
  onToggleWishlist,
  onContinueShopping,
}: Props) {
  return (
    <main className="mx-auto min-h-[60vh] max-w-[1280px] px-6 pb-16 pt-10 md:pt-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
            <Heart size={14} fill="currentColor" />
            Your collection
          </div>
          <h1 className="font-serif text-[32px] font-semibold tracking-tight md:text-[40px]">
            Your wishlist
          </h1>
          <p className="mt-1.5 text-[13.5px] text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"} saved for later
          </p>
        </div>
        <button
          type="button"
          onClick={onContinueShopping}
          className="rounded-full border border-line bg-white px-5 py-2.5 text-[13px] font-medium transition-colors hover:border-ink"
        >
          ← Continue shopping
        </button>
      </div>

      {products.length === 0 ? (
        <div className="flex min-h-[340px] flex-col items-center justify-center px-5 text-center">
          <div className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-[#f2eeeb] text-accent">
            <Heart size={27} strokeWidth={1.5} />
          </div>
          <h2 className="font-serif text-2xl font-semibold">Your wishlist is waiting</h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Tap the heart on anything you love and it will be saved here.
          </p>
          <button
            type="button"
            onClick={onContinueShopping}
            className="mt-6 rounded-full bg-ink px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-accent"
          >
            Explore the shop
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[22px]">
          {products.map((product) => (
            <ProductCard
              key={`${product.id}::${product.link}`}
              product={product}
              isWishlisted={wishlistKeys.has(`${product.id}::${product.link}`)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </main>
  );
}
