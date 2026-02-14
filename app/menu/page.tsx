import type { Metadata } from "next";
import { loadMenu } from "@/lib/menu/loadMenu";
import { MenuClient } from "./MenuClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Kompletní nabídka Kavárny Mletá & Měkká – espresso, mléčné, filtrované, čaj, sladké i snídaně.",
};

/**
 * Menu stránka – Server Component načte data, Client Component řeší filtry + modal.
 */
export default async function MenuPage() {
  const menu = await loadMenu();

  return (
    <main id="main-content" className="py-12 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-coffee mb-3">
            Naše menu
          </h1>
          <p className="text-coffee-600 font-serif text-lg max-w-xl mx-auto">
            Výběrová káva, domácí pečivo a jednoduché pokrmy. Vše čerstvé, každý
            den.
          </p>
        </div>

        <MenuClient categories={menu.categories} items={menu.items} />
      </div>
    </main>
  );
}
