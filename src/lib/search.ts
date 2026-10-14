import type { Product } from "../types";

/**
 * Parse "24", "#24", "ep24", "episode 24", "r24", "reel 24" → 24
 */
export function parseEpisode(query: string): number | null {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  const match = q.match(/^\D*(\d+)\D*$/);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  return Number.isFinite(num) ? num : null;
}

export function searchProducts(products: Product[], query: string) {
  const q = query.trim();
  if (!q) return { episode: null as number | null, results: [] as Product[] };

  const ep = parseEpisode(q);
  if (ep !== null) {
    const results = products.filter(
      (p) =>
        p.episode === ep ||
        (typeof p.episode === "string" && parseEpisode(p.episode) === ep),
    );
    if (results.length > 0) return { episode: ep, results };
  }

  const lower = q.toLowerCase();
  const results = products.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      (typeof p.episode === "string" && p.episode.toLowerCase().includes(lower)),
  );
  return { episode: null, results };
}