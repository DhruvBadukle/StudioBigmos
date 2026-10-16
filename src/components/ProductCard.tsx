import type { Product } from "../types";
import { Heart } from "lucide-react";
import { OptimizedImage } from "./OptimizedImage";

interface Props {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export function ProductCard({ product, isWishlisted, onToggleWishlist }: Props) {
  return (
    <article className="group relative block transition-transform duration-200 hover:-translate-y-1">
      <a href={product.link} className="block cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#eee]">
          <div
            className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ background: product.bg ?? "#eee" }}
          />
          {product.image ? (
            <OptimizedImage
              src={product.image}
              alt={product.title}
              width={600}
              height={800}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
            />
          ) : null}

          {product.discount && !product.oldPrice ? (
            <span className="absolute left-3 top-14 z-10 rounded-md bg-accent px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
              -{product.discount}%
            </span>
          ) : null}

          {product.episode ? (
            <span className="absolute right-3 top-3 z-10 rounded-md bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-ink backdrop-blur-sm">
              {typeof product.episode === "number"
                ? `Ep ${product.episode}`
                : product.episode}
            </span>
          ) : null}
        </div>

        <div className="pt-3.5">
          <h3 className="h-[2.75rem] line-clamp-2 font-sans text-sm font-semibold leading-snug tracking-[-0.01em] text-ink">
            {product.title}
          </h3>
        </div>
      </a>
      <div className="flex items-start justify-between gap-2 pt-1.5">
        <a
          href={product.link}
          className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 font-sans"
        >
          <span className="text-[15px] font-bold tracking-tight text-ink">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.oldPrice ? (
            <span className="text-[12px] font-medium text-muted line-through decoration-muted/70">
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </span>
          ) : null}
          {product.discount && product.oldPrice ? (
            <span className="text-[11px] font-bold tracking-wide text-accent">
              {product.discount}% OFF
            </span>
          ) : null}
        </a>
        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          aria-label={`${isWishlisted ? "Remove from" : "Add to"} wishlist: ${product.title}`}
          aria-pressed={isWishlisted}
          className={`-mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border shadow-sm transition-[background-color,color,border-color,transform] duration-200 active:scale-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            isWishlisted
              ? "border-accent bg-accent text-white"
              : "border-[#ead8d0] bg-[#f7eee9] text-accent hover:border-accent hover:bg-[#f1e2db]"
          }`}
        >
          <Heart
            key={isWishlisted ? "liked" : "unliked"}
            size={18}
            strokeWidth={1.9}
            fill={isWishlisted ? "currentColor" : "none"}
            className={isWishlisted ? "animate-heart-pop" : ""}
          />
        </button>
      </div>
    </article>
  );
}