import type { MenuData } from "./types";
import menuJson from "@/content/menu.json";

/**
 * Rozhraní pro menu data provider.
 * Umožňuje přepnout z JSON na headless CMS (Sanity, Strapi, Contentful).
 *
 * UNSPECIFIED: Headless CMS integrace není implementována.
 * Doporučené možnosti:
 * 1. Sanity.io – flexibilní, free tier, real-time preview
 * 2. Strapi – open-source, self-hosted
 * 3. Contentful – cloud, bohatý ekosystém
 *
 * Pro přepnutí implementujte tento interface a změňte export v tomto souboru.
 */
export interface MenuProvider {
  getMenu(): Promise<MenuData>;
}

/** Default: načítání z lokálního JSON souboru */
class JsonMenuProvider implements MenuProvider {
  async getMenu(): Promise<MenuData> {
    // Statický import – Next.js to bundluje do buildu
    return menuJson as MenuData;
  }
}

/**
 * Placeholder pro YAML provider.
 * Vyžaduje balíček `yaml` (npm i yaml).
 *
 * class YamlMenuProvider implements MenuProvider {
 *   async getMenu(): Promise<MenuData> {
 *     const fs = await import("fs/promises");
 *     const yaml = await import("yaml");
 *     const file = await fs.readFile("content/menu.yaml", "utf-8");
 *     return yaml.parse(file) as MenuData;
 *   }
 * }
 */

// Exportovaná instance – změňte zde pro přepnutí provideru
const provider: MenuProvider = new JsonMenuProvider();

/**
 * Načte menu data z aktuálního provideru.
 * Používejte v Server Components.
 */
export async function loadMenu(): Promise<MenuData> {
  return provider.getMenu();
}
