"use client";

import { useMemo, useState } from "react";
import type { ServiceItem, ServiceCategory } from "@/lib/services/types";
import { filterServiceItems } from "@/lib/services/filterServices";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { FiSearch, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ServicesClientProps {
  categories: ServiceCategory[];
  items: ServiceItem[];
}

export function ServicesClient({ categories, items }: ServicesClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );

  const filtered = useMemo(
    () =>
      filterServiceItems(items, {
        category: activeCategory,
        search,
        maxPriceKc: maxPrice,
      }),
    [items, activeCategory, search, maxPrice]
  );

  const clearFilters = () => {
    setActiveCategory("all");
    setSearch("");
    setMaxPrice(null);
  };

  const hasFilters =
    activeCategory !== "all" || search.trim() !== "" || maxPrice !== null;

  return (
    <>
      <div className="space-y-5 mb-10 md:mb-12">
        <div className="relative max-w-md mx-auto">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-luna-stone/50"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Hledat službu…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-luna-champagne bg-white pl-9 pr-3 py-2.5 text-sm font-sans text-luna-ink placeholder:text-luna-stone/40 focus:outline-none focus:ring-2 focus:ring-luna-rose/35"
            aria-label="Hledat službu"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300",
              activeCategory === "all"
                ? "bg-luna-ink text-luna-ivory"
                : "bg-luna-champagne/50 text-luna-stone hover:bg-luna-champagne"
            )}
          >
            Vše
          </button>
          {sortedCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-luna-ink text-luna-ivory"
                  : "bg-luna-champagne/50 text-luna-stone hover:bg-luna-champagne"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 justify-center flex-wrap">
          <label htmlFor="max-price" className="text-sm font-sans text-luna-stone">
            Max. cena (Kč)
          </label>
          <input
            id="max-price"
            type="number"
            min={0}
            step={50}
            placeholder="např. 1500"
            value={maxPrice ?? ""}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : null)
            }
            className="w-28 rounded-md border border-luna-champagne bg-white px-3 py-2 text-sm font-sans text-luna-ink focus:outline-none focus:ring-2 focus:ring-luna-rose/35"
          />
        </div>

        {hasFilters && (
          <div className="text-center">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-sm font-sans text-luna-stone hover:text-luna-ink transition-colors"
            >
              <FiX className="w-3 h-3" aria-hidden />
              Zrušit filtry
            </button>
          </div>
        )}
      </div>

      {activeCategory !== "all" && (
        <p className="text-center text-luna-stone/80 font-sans text-sm mb-8 italic max-w-xl mx-auto">
          {sortedCategories.find((c) => c.id === activeCategory)?.description}
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-luna-stone font-sans text-lg mb-2">
            Žádná služba neodpovídá filtrům.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="text-luna-rose font-sans text-sm hover:underline"
          >
            Zobrazit všechny služby
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((item) => (
            <Card
              key={item.id}
              hoverable
              className="cursor-pointer overflow-hidden"
              onClick={() => setSelected(item)}
              role="button"
              tabIndex={0}
              aria-label={`Detail služby: ${item.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(item);
                }
              }}
            >
              {item.image && (
                <div className="relative h-40 w-full">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <CardBody>
                <div className="flex justify-between items-start gap-3 mb-2">
                  <h3 className="text-lg font-serif font-semibold text-luna-ink">
                    {item.name}
                  </h3>
                  <span className="text-sm font-sans font-semibold text-luna-ink whitespace-nowrap">
                    {item.priceLabel}
                  </span>
                </div>
                <p className="text-sm text-luna-stone font-sans mb-3 line-clamp-2">
                  {item.description}
                </p>
                {item.badge && <Badge variant="accent">{item.badge}</Badge>}
              </CardBody>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
      >
        {selected && (
          <div className="space-y-4">
            {selected.image && (
              <div className="relative aspect-video rounded-md overflow-hidden">
                <Image
                  src={selected.image}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <p className="text-2xl font-serif font-semibold text-luna-rose">
              {selected.priceLabel}
            </p>
            <p className="text-luna-stone font-sans leading-relaxed">
              {selected.description}
            </p>
            {selected.badge && (
              <Badge variant="accent">{selected.badge}</Badge>
            )}
            <p className="text-xs text-luna-stone/70 font-sans">
              Kategorie:{" "}
              {sortedCategories.find((c) => c.id === selected.category)?.name}
            </p>
            <Button
              variant="secondary"
              fullWidth
              type="button"
              onClick={() => setSelected(null)}
            >
              Zavřít
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
