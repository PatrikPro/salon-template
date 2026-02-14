import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MenuPreview } from "@/components/sections/MenuPreview";
import { Gallery } from "@/components/sections/Gallery";
import { Events } from "@/components/sections/Events";
import { Reviews } from "@/components/sections/Reviews";
import { ContactBlock } from "@/components/sections/ContactBlock";

/**
 * Homepage – Kavárna Mletá & Měkká
 * Sestavena z jednotlivých sekcí (Server Components).
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <MenuPreview />
      <Gallery />
      <Events />
      <Reviews />
      <ContactBlock />
    </main>
  );
}
