import type { Product } from "../types";
import { OptimizedImage } from "./OptimizedImage";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  return (
    <a
      href={product.link}
      className="group block cursor-pointer transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#eee]">
        {/* image placeholder (gradient) */}
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
          <span className="absolute left-3 top-3 z-10 rounded-md bg-accent px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
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
        <h3 className="mb-1.5 line-clamp-2 font-sans text-sm font-semibold leading-snug tracking-[-0.01em] text-ink">
          {product.title}
        </h3>
        <div className="flex items-baseline gap-2 font-sans">
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
        </div>
      </div>
    </a>
  );
}