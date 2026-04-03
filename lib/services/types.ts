/**
 * Služby salonu – struktura odpovídá content/services.json.
 */

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  /** Zobrazená cena, např. „890 Kč“ nebo „od 2 790 Kč“ */
  priceLabel: string;
  /**
   * Číselná hodnota v Kč pro řazení a filtr „max cena“ (bez textu „od“).
   * U „od 2 790 Kč“ uveďte 2790.
   */
  priceFromKc: number;
  category: string;
  badge?: string;
  image?: string;
  order?: number;
  /** false = skryto v přehledech */
  available?: boolean;
}

export interface ServicesData {
  categories: ServiceCategory[];
  items: ServiceItem[];
}
