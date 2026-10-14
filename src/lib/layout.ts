import type { Block, Product } from "../types";
import {
  EPISODES,
  LOOKBOOK,
  LOOKBOOK_PRODUCTS,
  TRENDING_PRODUCTS,
} from "../data/catalog";

export function buildBlocks(products: Product[], visibleCount: number): Block[] {
  const blocks: Block[] = [];
  const maxVisible = Math.max(0, Math.min(visibleCount, products.length));
  const visibleLookbookCount = Math.max(
    0,
    Math.min(visibleCount, LOOKBOOK_PRODUCTS.length),
  );
  const visibleProducts = products.slice(0, maxVisible);
  const featuredIds = new Set<string>();
  const featuredEpisode = visibleProducts.find(
    (product) => product.episode !== undefined && product.episode !== "",
  )?.episode;
  const featuredProducts =
    featuredEpisode === undefined
      ? []
      : visibleProducts
          .filter((product) => product.episode === featuredEpisode)
          .slice(0, 4);
  if (featuredProducts.length > 0) {
    const episodeNumber = Number(featuredEpisode);
    const episodeTitle = Number.isFinite(episodeNumber)
      ? EPISODES.find((episode) => episode.number === episodeNumber)?.title
      : undefined;
    blocks.push({
      kind: "label",
      text: `New Arrivals ${featuredEpisode}`,
      ...(episodeTitle ? { sub: episodeTitle } : {}),
    });
    blocks.push({ kind: "products", items: featuredProducts });
    for (const product of featuredProducts) featuredIds.add(product.id);
  }

  if (EPISODES.length > 0) {
    blocks.push({ kind: "episodes", items: EPISODES });
  }

  if (TRENDING_PRODUCTS.length > 0) {
    blocks.push({ kind: "trending", items: TRENDING_PRODUCTS });
  }

  blocks.push({
    kind: "editorial",
    ...LOOKBOOK,
    items: LOOKBOOK_PRODUCTS.slice(0, visibleLookbookCount),
  });

  const remaining = visibleProducts.filter((product) => !featuredIds.has(product.id));
  for (let index = 0; index < remaining.length; index += 8) {
    const batch = remaining.slice(index, index + 8);
    blocks.push({ kind: "products", items: batch });

    if (index + 8 < remaining.length && index % 16 === 8 && EPISODES.length > 0) {
      blocks.push({ kind: "episodes", items: EPISODES });
    }
  }

  return blocks;
}