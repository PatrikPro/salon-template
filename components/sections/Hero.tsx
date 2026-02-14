import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

/**
 * Hero sekce – headline, subheadline, CTA, badge s klíčovými features.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-main py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Feature badge */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              <Badge variant="accent">☕ Výběrová káva</Badge>
              <Badge variant="accent">🌱 Ovesné mléko</Badge>
              <Badge variant="accent">💻 Work‑friendly</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold text-coffee leading-tight">
              Káva, co tě na chvíli zpomalí.
            </h1>

            <p className="text-lg md:text-xl text-coffee-700 font-serif max-w-xl mx-auto lg:mx-0">
              Světlý prostor, rychlá Wi‑Fi a zásuvky u každého stolu. Ideální
              pro učení, práci i setkání s přáteli.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link href="/rezervace">
                <Button size="lg">Rezervovat stůl</Button>
              </Link>
              <Link href="/menu">
                <Button variant="secondary" size="lg">
                  Zobrazit menu
                </Button>
              </Link>
            </div>
          </div>

          {/* Obrázek */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/hero.svg"
              alt="Útulný interiér kavárny s kávou a notebookem na stole"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
