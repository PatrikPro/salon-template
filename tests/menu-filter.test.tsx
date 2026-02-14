import { describe, it, expect } from "vitest";
import type { MenuItem, MenuTag } from "@/lib/menu/types";

/**
 * Test menu filtrování – logika, která je v MenuClient komponentě.
 * Extrahujeme filtrační logiku, abychom ji mohli testovat izolovaně.
 */

/** Filtrační logika (duplikát z MenuClient pro testovatelnost) */
function filterMenuItems(
  items: MenuItem[],
  {
    category = "all",
    tags = [] as MenuTag[],
    search = "",
    maxPrice = null as number | null,
  }
): MenuItem[] {
  let result = items;

  if (category !== "all") {
    result = result.filter((i) => i.category === category);
  }

  if (tags.length > 0) {
    result = result.filter((i) => tags.every((tag) => i.tags.includes(tag)));
  }

  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q)
    );
  }

  if (maxPrice !== null) {
    result = result.filter((i) => i.price <= maxPrice);
  }

  return result;
}

const sampleItems: MenuItem[] = [
  {
    id: "1",
    name: "Espresso",
    description: "Čistá dávka chuti",
    price: 55,
    category: "espresso",
    tags: ["oblíbené"],
  },
  {
    id: "2",
    name: "Flat white",
    description: "Silnější káva, hladší mléko",
    price: 85,
    category: "mlecne",
    tags: ["oblíbené", "work-friendly"],
  },
  {
    id: "3",
    name: "Matcha latte",
    description: "Jemná matcha, krémové mléko",
    price: 109,
    category: "caj",
    tags: ["vegan"],
  },
  {
    id: "4",
    name: "Avokádový toast",
    description: "Kváskový chléb, avokádo",
    price: 149,
    category: "snidane",
    tags: ["vegan", "oblíbené"],
  },
  {
    id: "5",
    name: "Batch brew",
    description: "Filtr v konvici",
    price: 69,
    category: "filtr",
    tags: ["work-friendly", "oblíbené"],
  },
];

describe("Menu filtrování", () => {
  it("vrátí všechny položky bez filtrů", () => {
    const result = filterMenuItems(sampleItems, {});
    expect(result).toHaveLength(5);
  });

  it("filtruje dle kategorie", () => {
    const result = filterMenuItems(sampleItems, { category: "espresso" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Espresso");
  });

  it("filtruje dle jednoho tagu", () => {
    const result = filterMenuItems(sampleItems, { tags: ["vegan"] });
    expect(result).toHaveLength(2);
    expect(result.map((i) => i.name)).toContain("Matcha latte");
    expect(result.map((i) => i.name)).toContain("Avokádový toast");
  });

  it("filtruje dle více tagů (AND logika)", () => {
    const result = filterMenuItems(sampleItems, {
      tags: ["vegan", "oblíbené"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Avokádový toast");
  });

  it("filtruje dle textového hledání (case-insensitive)", () => {
    const result = filterMenuItems(sampleItems, { search: "matcha" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Matcha latte");
  });

  it("filtruje dle popisu", () => {
    const result = filterMenuItems(sampleItems, { search: "kváskový" });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Avokádový toast");
  });

  it("filtruje dle maximální ceny", () => {
    const result = filterMenuItems(sampleItems, { maxPrice: 80 });
    expect(result).toHaveLength(2);
    expect(result.every((i) => i.price <= 80)).toBe(true);
  });

  it("kombinuje více filtrů", () => {
    const result = filterMenuItems(sampleItems, {
      tags: ["oblíbené"],
      maxPrice: 70,
    });
    expect(result).toHaveLength(2); // Espresso (55) + Batch brew (69)
  });

  it("vrátí prázdné pole pokud nic neodpovídá", () => {
    const result = filterMenuItems(sampleItems, { search: "neexistuje" });
    expect(result).toHaveLength(0);
  });
});
