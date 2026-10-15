import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import type { Product } from "../types";
import { OptimizedImage } from "./OptimizedImage";

// Adapted from Skiper UI Carousel_002: https://skiper-ui.com/
interface Props {
  items: Product[];
  wishlistKeys: Set<string>;
  onToggleWishlist: (product: Product) => void;
}

export function TrendingCarousel({ items, wishlistKeys, onToggleWishlist }: Props) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <section id="sale" className="col-span-full min-w-0 scroll-mt-24 py-4">
      <div className="mb-2 flex items-center gap-3.5">
        <span className="h-2 w-2 rounded-full bg-accent" />
        <h3 className="font-serif text-[20px] font-semibold tracking-tight">
          Trending Now
        </h3>
        <span className="h-px flex-1 bg-line" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-auto flex w-full max-w-8xl flex-col items-center overflow-hidden rounded-2xl bg-[#f5f4f3] px-4 pb-5 pt-7"
      >
        <div className="relative w-full max-w-[290px]">
          <Swiper
            modules={[EffectCards]}
            effect="cards"
            grabCursor
            rewind={items.length > 1}
            onSwiper={setSwiper}
            onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
            className="h-[390px] w-[260px] sm:h-[420px] sm:w-[290px]"
          >
            {items.map((product, index) => (
              <SwiperSlide key={`${product.id}-${index}`} className="overflow-hidden rounded-3xl">
                <div className="relative h-full w-full">
                  <a
                    href={product.link}
                    className="group relative block h-full w-full overflow-hidden rounded-3xl bg-[#dedbd5]"
                    aria-label={`Shop ${product.title}`}
                  >
                  {product.image ? (
                    <OptimizedImage
                      src={product.image}
                      alt={product.title}
                      width={600}
                      height={800}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />

                  {product.discount ? (
                    <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-[11px] font-bold tracking-wide text-white">
                      -{product.discount}% OFF
                    </span>
                  ) : null}

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h4 className="font-sans text-2xl font-semibold leading-tight tracking-tight">
                      {product.title}
                    </h4>
                    <div className="mt-2 flex items-baseline gap-2 font-sans">
                      <span className="text-base font-bold tracking-tight">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.oldPrice ? (
                        <span className="text-[13px] font-medium text-white/70 line-through decoration-white/50">
                          ₹{product.oldPrice.toLocaleString("en-IN")}
                        </span>
                      ) : null}
                    </div>
                    <span className="mt-4 inline-flex rounded-full border border-white/60 px-4 py-2 text-xs font-semibold transition-colors group-hover:bg-white group-hover:text-ink">
                      Shop this look
                    </span>
                  </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product)}
                    aria-label={`${wishlistKeys.has(`${product.id}::${product.link}`) ? "Remove from" : "Add to"} wishlist: ${product.title}`}
                    aria-pressed={wishlistKeys.has(`${product.id}::${product.link}`)}
                    className={`absolute left-4 top-16 z-10 grid h-10 w-10 place-items-center rounded-full shadow-sm transition-colors ${
                      wishlistKeys.has(`${product.id}::${product.link}`)
                        ? "bg-accent text-white"
                        : "bg-white/95 text-ink hover:text-accent"
                    }`}
                  >
                    <Heart
                      key={wishlistKeys.has(`${product.id}::${product.link}`) ? "liked" : "unliked"}
                      size={19}
                      strokeWidth={1.8}
                      fill={wishlistKeys.has(`${product.id}::${product.link}`) ? "currentColor" : "none"}
                      className={wishlistKeys.has(`${product.id}::${product.link}`) ? "animate-heart-pop" : ""}
                    />
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {items.length > 1 ? (
          <div className="mt-5 flex items-center gap-5">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              aria-label="Previous trending product"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white transition hover:border-ink"
            >
              <ChevronLeft aria-hidden="true" size={18} />
            </button>
            <span className="min-w-12 text-center text-xs font-medium text-muted">
              {activeIndex + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              aria-label="Next trending product"
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white transition hover:border-ink"
            >
              <ChevronRight aria-hidden="true" size={18} />
            </button>
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
