import type { Product } from "../types";
import { parseEpisode } from "../lib/search";
import { ProductCard } from "./ProductCard";
import { OptimizedImage } from "./OptimizedImage";

interface Props {
  badge: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  items: Product[];
  image: string;
  link: string;
}

export function EditorialBreak({
  badge,
  eyebrow,
  title,
  body,
  cta,
  items,
  image,
  link,
}: Props) {
  const sortedItems = [...items].sort((a, b) => {
    const aEpisode = parseEpisode(String(a.episode ?? ""));
    const bEpisode = parseEpisode(String(b.episode ?? ""));

    if (aEpisode === null) return bEpisode === null ? 0 : 1;
    if (bEpisode === null) return -1;
    return bEpisode - aEpisode;
  });

  return (
    <section id="collections" className="col-span-full scroll-mt-24 my-8">
      <div className="grid overflow-hidden rounded-[18px] border border-line bg-white md:min-h-105 md:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-65 overflow-hidden bg-[linear-gradient(135deg,#2a2a2a,#4a3f38_55%,#8a6d5b)] md:min-h-full">
          <OptimizedImage
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute left-5 top-5 z-10 rounded-full border border-white/30 bg-black/30 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm md:left-7 md:top-7">
            {badge}
          </span>
        </div>

        <div className="flex flex-col items-start justify-center px-6 py-8 md:px-10 md:py-12 lg:px-14">
          <div className="mb-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
            {eyebrow}
          </div>
          <h3 className="mb-3.5 max-w-105 font-serif text-[30px] font-semibold leading-[1.12] tracking-tight md:text-[38px]">
            {title}
          </h3>
          <p className="mb-6 max-w-105 text-[14.5px] leading-relaxed text-muted">
            {body}
          </p>
          <a
            href={link}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-white transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </div>

      <h4 id="lookbook-items" className="mb-5 mt-8 scroll-mt-24 font-serif text-2xl font-semibold">
        The Hot List
      </h4>
      {sortedItems.length > 0 ? (
        <div
          className="grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5.5"
        >
          {sortedItems.map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          Add a product to the <code>lookbook</code> list in{" "}
          <code>src/data/products.json</code> to feature it here.
        </p>
      )}
    </section>
  );
}