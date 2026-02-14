import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { loadMenu } from "@/lib/menu/loadMenu";

/**
 * Preview 6 top položek menu na homepage.
 * Server Component – data se načtou na serveru.
 */
export async function MenuPreview() {
  const menu = await loadMenu();

  // Vyber oblíbené nebo prvních 6 položek
  const featured = menu.items
    .filter((item) => item.tags.includes("oblíbené"))
    .slice(0, 6);

  // Pokud není dost oblíbených, doplň
  const items =
    featured.length >= 6
      ? featured
      : [
          ...featured,
          ...menu.items
            .filter((i) => !featured.includes(i))
            .slice(0, 6 - featured.length),
        ];

  return (
    <section id="menu-preview" className="py-16 md:py-24 bg-cream-50">
      <div className="container-main">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-coffee mb-3">
            Z našeho menu
          </h2>
          <p className="text-coffee-600 font-serif text-lg max-w-xl mx-auto">
            Pár oblíbených položek. Kompletní nabídku najdeš na stránce menu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.id} hoverable>
              <CardBody>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-sans font-bold text-coffee">
                    {item.name}
                  </h3>
                  <span className="text-lg font-sans font-bold text-accent whitespace-nowrap ml-3">
                    {item.price}&nbsp;Kč
                  </span>
                </div>
                <p className="text-sm text-coffee-600 font-serif mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/menu">
            <Button variant="secondary" size="lg">
              Celé menu →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
