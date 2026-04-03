import Link from "next/link";
import Image from "next/image";
import { loadServices } from "@/lib/services/loadServices";
import { loadSiteContent } from "@/lib/cms/loadContent";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function ServiceHighlight() {
  const [services, site] = await Promise.all([
    loadServices(),
    loadSiteContent(),
  ]);

  const available = services.items
    .filter((i) => i.available !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  const withBadge = available.filter((i) => i.badge);
  const picked =
    withBadge.length >= 6
      ? withBadge.slice(0, 6)
      : [
          ...withBadge,
          ...available.filter((i) => !withBadge.includes(i)).slice(0, 6 - withBadge.length),
        ];

  const items = picked.slice(0, 6);

  if (items.length === 0) return null;

  return (
    <section
      id="sluzby-preview"
      className="py-20 md:py-28 bg-luna-ivory"
    >
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <p className="section-eyebrow mb-3">Služby</p>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-luna-ink mb-4">
            {site.servicesSectionTitle}
          </h2>
          {site.servicesSectionSubtitle && (
            <p className="text-luna-stone font-sans text-lg leading-relaxed">
              {site.servicesSectionSubtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => (
            <Link key={item.id} href="/sluzby" className="group block h-full">
              <Card hoverable className="h-full overflow-hidden">
                {item.image && (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardBody>
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="text-lg font-serif font-semibold text-luna-ink group-hover:text-luna-rose transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-sm font-sans font-semibold text-luna-ink whitespace-nowrap">
                      {item.priceLabel}
                    </span>
                  </div>
                  <p className="text-sm text-luna-stone font-sans leading-relaxed line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  {item.badge && (
                    <Badge variant="accent">{item.badge}</Badge>
                  )}
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-14">
          <ButtonLink href="/sluzby" variant="secondary" size="lg">
            Kompletní ceník
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
