import type { ServiceItem } from "./types";

export interface ServiceFilterOptions {
  category?: string;
  search?: string;
  maxPriceKc?: number | null;
}

/**
 * Filtruje služby (logika sdílená s UI a testy).
 */
export function filterServiceItems(
  items: ServiceItem[],
  {
    category = "all",
    search = "",
    maxPriceKc = null,
  }: ServiceFilterOptions = {}
): ServiceItem[] {
  let result = items.filter((i) => i.available !== false);

  if (category !== "all") {
    result = result.filter((i) => i.category === category);
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        (i.badge?.toLowerCase().includes(q) ?? false)
    );
  }

  if (maxPriceKc !== null && maxPriceKc !== undefined) {
    result = result.filter((i) => i.priceFromKc <= maxPriceKc);
  }

  return result;
}
