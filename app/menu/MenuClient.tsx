"use client";

import { useState, useMemo } from "react";
import type { MenuItem, MenuCategory, MenuTag } from "@/lib/menu/types";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FiSearch, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

const TAG_OPTIONS: { value: MenuTag; label: string }[] = [
  { value: "vegan", label: "Vegan" },
  { value: "bezlepkové", label: "Bezlepkové" },
  { value: "bez-kofeinu", label: "Bez kofeinu" },
  { value: "work-friendly", label: "Work-friendly" },
  { value: "oblíbené", label: "Oblíbené" },
  { value: "sezónní", label: "Sezónní" },
];

interface MenuClientProps {
  categories: MenuCategory[];
  items: MenuItem[];
}

/**
 * Klientská část menu stránky – filtry (kategorie, tagy, hledání, cena) + modal detailu.
 */
export function MenuClient({ categories, items }: MenuClientProps) {
  // State filtrů
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeTags, setActiveTags] = useState<MenuTag[]>([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  // Detail modal
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Filtrování
  const filtered = useMemo(() => {
    let result = items;

    // Kategorie
    if (activeCategory !== "all") {
      result = result.filter((i) => i.category === activeCategory);
    }

    // Tagy (AND logika – položka musí mít všechny vybrané tagy)
    if (activeTags.length > 0) {
      result = result.filter((i) =>
        activeTags.every((tag) => i.tags.includes(tag))
      );
    }

    // Textové hledání
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }

    // Max cena
    if (maxPrice !== null) {
      result = result.filter((i) => i.price <= maxPrice);
    }

    return result;
  }, [items, activeCategory, activeTags, search, maxPrice]);

  const toggleTag = (tag: MenuTag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveTags([]);
    setSearch("");
    setMaxPrice(null);
  };

  const hasActiveFilters =
    activeCategory !== "all" ||
    activeTags.length > 0 ||
    search.trim() !== "" ||
    maxPrice !== null;

  return (
    <>
      {/* ===== Filtry ===== */}
      <div className="space-y-4 mb-8">
        {/* Hledání */}
        <div className="relative max-w-md mx-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Hledat v menu…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-cream-300 bg-white pl-9 pr-3 py-2.5 text-sm font-serif text-coffee-800 placeholder:text-coffee-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            aria-label="Hledat v menu"
          />
        </div>

        {/* Kategorie */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-colors",
              activeCategory === "all"
                ? "bg-coffee text-white"
                : "bg-cream-200 text-coffee-600 hover:bg-cream-300"
            )}
          >
            Vše
          </button>
          {categories
            .sort((a, b) => a.order - b.order)
            .map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-sans font-medium transition-colors",
                  activeCategory === cat.id
                    ? "bg-coffee text-white"
                    : "bg-cream-200 text-coffee-600 hover:bg-cream-300"
                )}
              >
                {cat.name}
              </button>
            ))}
        </div>

        {/* Tagy */}
        <div className="flex flex-wrap gap-2 justify-center">
          {TAG_OPTIONS.map((tag) => (
            <button
              key={tag.value}
              onClick={() => toggleTag(tag.value)}
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-sans font-medium border transition-colors",
                activeTags.includes(tag.value)
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-coffee-600 border-cream-300 hover:border-accent"
              )}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Max cena */}
        <div className="flex items-center gap-3 justify-center">
          <label htmlFor="max-price" className="text-sm font-sans text-coffee-600">
            Max cena:
          </label>
          <input
            id="max-price"
            type="number"
            min={0}
            step={10}
            placeholder="např. 80"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : null)
            }
            className="w-24 rounded-lg border border-cream-300 bg-white px-3 py-1.5 text-sm font-serif text-coffee-800 focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <span className="text-sm text-coffee-400">Kč</span>
        </div>

        {/* Vyčistit filtry */}
        {hasActiveFilters && (
          <div className="text-center">
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sm font-sans text-coffee-500 hover:text-coffee transition-colors"
            >
              <FiX className="w-3 h-3" aria-hidden="true" />
              Zrušit filtry
            </button>
          </div>
        )}
      </div>

      {/* ===== Aktivní kategorie popis ===== */}
      {activeCategory !== "all" && (
        <p className="text-center text-coffee-500 font-serif text-sm mb-6 italic">
          {categories.find((c) => c.id === activeCategory)?.description}
        </p>
      )}

      {/* ===== Výsledky ===== */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-coffee-500 font-serif text-lg">
            Žádné položky neodpovídají filtrům.
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 text-accent font-sans text-sm hover:underline"
          >
            Zobrazit celé menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Card
              key={item.id}
              hoverable
              className="cursor-pointer"
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              aria-label={`Detail: ${item.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedItem(item);
                }
              }}
            >
              <CardBody>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-sans font-bold text-coffee">
                    {item.name}
                  </h3>
                  <span className="text-lg font-sans font-bold text-accent whitespace-nowrap ml-3">
                    {item.price}&nbsp;Kč
                  </span>
                </div>
                <p className="text-sm text-coffee-600 font-serif mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      {/* ===== Detail modal ===== */}
      <Modal
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name ?? ""}
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-sans font-bold text-accent">
                {selectedItem.price}&nbsp;Kč
              </span>
              {selectedItem.priceAlt && (
                <span className="text-sm font-sans text-coffee-400">
                  {selectedItem.priceAlt.label}: {selectedItem.priceAlt.price}&nbsp;Kč
                </span>
              )}
            </div>

            <p className="text-coffee-700 font-serif leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedItem.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>

            <p className="text-xs text-coffee-400 font-sans">
              Kategorie:{" "}
              {categories.find((c) => c.id === selectedItem.category)?.name}
            </p>

            <div className="pt-2">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setSelectedItem(null)}
              >
                Zavřít
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
