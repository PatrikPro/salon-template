import { describe, it, expect } from "vitest";
import type { ServiceItem } from "@/lib/services/types";
import { filterServiceItems } from "@/lib/services/filterServices";

const sample: ServiceItem[] = [
  {
    id: "1",
    name: "Dámský střih",
    description: "Konzultace a styling",
    priceLabel: "890 Kč",
    priceFromKc: 890,
    category: "strih-styling",
    available: true,
  },
  {
    id: "2",
    name: "Balayage",
    description: "Přirozené přechody",
    priceLabel: "od 2 790 Kč",
    priceFromKc: 2790,
    category: "barveni",
    badge: "Novinka",
    available: true,
  },
  {
    id: "3",
    name: "Skrytá",
    description: "Test",
    priceLabel: "100 Kč",
    priceFromKc: 100,
    category: "pece",
    available: false,
  },
];

describe("filterServiceItems", () => {
  it("vrátí jen dostupné služby", () => {
    const r = filterServiceItems(sample, {});
    expect(r).toHaveLength(2);
  });

  it("filtruje podle kategorie", () => {
    const r = filterServiceItems(sample, { category: "barveni" });
    expect(r).toHaveLength(1);
    expect(r[0].name).toBe("Balayage");
  });

  it("hledá v názvu a popisu", () => {
    const r = filterServiceItems(sample, { search: "balayage" });
    expect(r).toHaveLength(1);
  });

  it("hledá v badge", () => {
    const r = filterServiceItems(sample, { search: "novinka" });
    expect(r).toHaveLength(1);
  });

  it("filtruje max cenu", () => {
    const r = filterServiceItems(sample, { maxPriceKc: 1000 });
    expect(r.map((i) => i.id)).toContain("1");
    expect(r.map((i) => i.id)).not.toContain("2");
  });
});
