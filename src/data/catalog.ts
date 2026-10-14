import productsData from "./products.json";
import type { Product } from "../types";
import { EPISODES } from "./episodes";
import { LOOKBOOK } from "./lookbook";

export const PRODUCTS: Product[] = productsData.products;
export const TRENDING_PRODUCTS: Product[] = productsData.trending;
export const LOOKBOOK_PRODUCTS: Product[] = productsData.lookbook;
export { EPISODES, LOOKBOOK };
