import Image from "next/image";
import { loadPromo } from "@/lib/cms/loadContent";
import { isPromoActive } from "@/lib/cms/promo";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function PromoBanner() {
  const promo = await loadPromo();
  if (!isPromoActive(promo)) return null;

  return (
    <section className="py-16 md:py-20 bg-luna-ink text-luna-ivory">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-5">
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-luna-rose">
              Akce
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-medium leading-tight">
              {promo.headline}
            </h2>
            <p className="text-luna-champagne/90 font-sans text-lg leading-relaxed max-w-lg">
              {promo.text}
            </p>
            <ButtonLink
              href={promo.ctaHref}
              variant="secondary"
              size="lg"
              className="!bg-luna-rose/90 !text-luna-ink !border-transparent hover:!bg-luna-rose"
            >
              {promo.ctaLabel}
            </ButtonLink>
          </div>

          {promo.image && (
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden ring-1 ring-luna-stone/30">
              <Image
                src={promo.image}
                alt={promo.headline}
                fill
                className="object-cover opacity-95"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
