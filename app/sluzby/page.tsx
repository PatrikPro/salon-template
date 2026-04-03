import type { Metadata } from "next";
import { loadServices } from "@/lib/services/loadServices";
import { ServicesClient } from "./ServicesClient";

export const metadata: Metadata = {
  title: "Služby a ceny",
  description:
    "Kompletní přehled služeb Luna Studio — střih, barvení, péče, lashes, brows a nails. Transparentní ceny.",
};

export default async function ServicesPage() {
  const data = await loadServices();

  return (
    <main id="main-content" className="py-14 md:py-22">
      <div className="container-main">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <p className="section-eyebrow mb-3">Ceník</p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-luna-ink mb-4">
            Služby a ceny
          </h1>
          <p className="text-luna-stone font-sans text-lg leading-relaxed">
            Každá služba začíná konzultací. Finální cena může záviset na délce a
            kondici vlasů — rádi vše dopředu vysvětlíme.
          </p>
        </div>

        <ServicesClient
          categories={data.categories}
          items={data.items}
        />
      </div>
    </main>
  );
}
