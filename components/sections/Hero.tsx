import Image from "next/image";
import { loadSiteContent } from "@/lib/cms/loadContent";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function Hero() {
  const site = await loadSiteContent();
  const { hero } = site;

  return (
    <section className="relative overflow-hidden bg-luna-ivory">
      <div className="container-main py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1 animate-fade-up">
            <p className="section-eyebrow justify-center lg:justify-start flex">
              {site.brandName}
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.08] font-serif font-medium text-luna-ink">
              {hero.title}
            </h1>

            <p className="text-lg md:text-xl text-luna-stone font-sans font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <ButtonLink href="/rezervace" size="lg">
                {hero.primaryCtaLabel}
              </ButtonLink>
              <ButtonLink href="/sluzby" variant="secondary" size="lg">
                {hero.secondaryCtaLabel}
              </ButtonLink>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative w-full aspect-[4/5] md:aspect-[5/6] rounded-sm overflow-hidden shadow-2xl shadow-luna-ink/10 ring-1 ring-luna-champagne/80">
              <Image
                src={hero.image}
                alt={hero.imageAlt ?? ""}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-luna-rose/20 rounded-full blur-2xl -z-10 hidden md:block"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
