export interface Product {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image?: string;
  bg?: string;
  link: string;
  episode?: number | string;
}

export interface Episode {
  number: number;
  title: string;
  image?: string;
  bg?: string;
  link: string;
}

export type Block =
  | { kind: "label"; text: string; sub?: string }
  | { kind: "products"; items: Product[] }
  | { kind: "trending"; items: Product[] }
  | { kind: "episodes"; items: Episode[] }
  | {
      kind: "editorial";
      badge: string;
      eyebrow: string;
      title: string;
      body: string;
      cta: string;
      items: Product[];
      image: string;
      link: string;
    };