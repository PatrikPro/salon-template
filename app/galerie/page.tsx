import type { Metadata } from "next";
import { loadGallery } from "@/lib/cms/loadContent";
import { loadSiteContent } from "@/lib/cms/loadContent";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Fotografie z Luna Studio — interiér, detaily a výsledky naší práce.",
};

export default async function GalleryPage() {
  const [gallery, site] = await Promise.all([
    loadGallery(),
    loadSiteContent(),
  ]);

  return (
    <main id="main-content" className="py-14 md:py-22">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-luna-ink mb-4">
            {site.gallerySectionTitle}
          </h1>
          <p className="text-luna-stone font-sans text-lg">
            {site.gallerySectionSubtitle}
          </p>
        </div>

        {gallery.images.length === 0 ? (
          <p className="text-center text-luna-stone font-sans">
            Galerii doplníte v content/gallery.json
          </p>
        ) : (
          <GalleryGrid images={gallery.images} />
        )}

        <p className="text-center mt-14">
          <ButtonLink href="/rezervace" variant="secondary" size="lg">
            Rezervovat termín
          </ButtonLink>
        </p>
      </div>
    </main>
  );
}
