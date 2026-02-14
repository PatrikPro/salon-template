import Link from "next/link";
import Image from "next/image";
import { Card, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import eventsData from "@/content/events.json";

interface Event {
  id: string;
  title: string;
  description: string;
  frequency: string;
  day: string;
  time: string;
  price: string;
  cta: string;
  image: string;
}

/**
 * Sekce událostí/akcí kavárny.
 */
export function Events() {
  const events = eventsData as Event[];

  return (
    <section id="akce" className="py-16 md:py-24 bg-cream-50">
      <div className="container-main">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-coffee mb-3">
            Akce &amp; události
          </h2>
          <p className="text-coffee-600 font-serif text-lg max-w-xl mx-auto">
            Víc než káva. Přijď na workshop, open mic nebo si užij tichou neděli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} hoverable>
              <div className="relative w-full h-40">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <CardBody className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-sans font-bold text-coffee">
                    {event.title}
                  </h3>
                  <Badge variant="accent">{event.price}</Badge>
                </div>
                <p className="text-sm text-coffee-600 font-serif">
                  {event.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-coffee-400 font-sans">
                  <span>{event.frequency}</span>
                  <span>•</span>
                  <span>{event.time}</span>
                </div>
                <Link href="/rezervace" className="inline-block mt-2">
                  <Button size="sm" variant="secondary">
                    {event.cta}
                  </Button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
