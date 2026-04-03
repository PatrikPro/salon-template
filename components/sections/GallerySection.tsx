import { loadGallery } from "@/lib/cms/loadContent";
import { loadSiteContent } from "@/lib/cms/loadContent";
import { GalleryGrid } from "./GalleryGrid";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function GallerySection() {
  const [gallery, site] = await Promise.all([
    loadGallery(),
    loadSiteContent(),
  ]);

  if (!gallery.images.length) return null;

  return (
    <section id="galerie" className="py-20 md:py-28 bg-white">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14">
          <p className="section-eyebrow mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-luna-ink mb-4">
            {site.gallerySectionTitle}
          </h2>
          {site.gallerySectionSubtitle && (
            <p className="text-luna-stone font-sans text-lg">
              {site.gallerySectionSubtitle}
            </p>
          )}
        </div>

        <GalleryGrid images={gallery.images} />

        <p className="text-center mt-10">
          <ButtonLink href="/galerie" variant="ghost" size="md">
            Celá galerie
          </ButtonLink>
        </p>
      </div>
    </section>
  );
}
