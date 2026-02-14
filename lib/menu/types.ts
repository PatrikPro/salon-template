/**
 * Typy pro menu kavárny.
 * Používané jak v content/menu.json, tak v UI komponentách.
 */

/** Tagy pro filtrování menu položek */
export type MenuTag =
  | "vegan"
  | "bezlepkové"
  | "bez-kofeinu"
  | "work-friendly"
  | "oblíbené"
  | "sezónní";

/** Jednotlivá položka menu */
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Cena v Kč */
  price: number;
  /** Volitelná alternativní cena (např. ovesné mléko) */
  priceAlt?: { label: string; price: number };
  category: string;
  tags: MenuTag[];
  /** Cesta k obrázku (relativní od /public) */
  image?: string;
}

/** Kategorie menu */
export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  /** Pořadí zobrazení */
  order: number;
}

/** Kompletní menu datový formát */
export interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}
