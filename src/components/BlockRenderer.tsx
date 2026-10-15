import type { Block, Product } from "../types";
import { ProductCard } from "./ProductCard";
import { SectionLabel } from "./SectionLabel";
import { EpisodeStrip } from "./EpisodeStrip";
import { EditorialBreak } from "./EditorialBreak";
import { TrendingCarousel } from "./TrendingCarousel";

interface Props {
  blocks: Block[];
  wishlistKeys: Set<string>;
  onToggleWishlist: (product: Product) => void;
}

export function BlockRenderer({ blocks, wishlistKeys, onToggleWishlist }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5.5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "label":
            return (
              <SectionLabel
                key={`l-${i}`}
                id="shop"
                text={block.text}
                sub={block.sub}
              />
            );

          case "products":
            return block.items.map((p) => (
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
            ));

          case "trending":
            return (
              <TrendingCarousel
                key="trending"
                items={block.items}
                wishlistKeys={wishlistKeys}
                onToggleWishlist={onToggleWishlist}
              />
            );

          case "episodes":
            return <EpisodeStrip key={`e-${i}`} items={block.items} />;

          case "editorial":
            return (
              <EditorialBreak
                key={`ed-${i}`}
                badge={block.badge}
                eyebrow={block.eyebrow}
                title={block.title}
                body={block.body}
                cta={block.cta}
                items={block.items}
                image={block.image}
                link={block.link}
                wishlistKeys={wishlistKeys}
                onToggleWishlist={onToggleWishlist}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}