import { loadSiteContent } from "@/lib/cms/loadContent";
import { Card, CardBody } from "@/components/ui/Card";
import { FiStar } from "react-icons/fi";

export async function Testimonials() {
  const site = await loadSiteContent();
  const list = site.testimonials;

  if (!list.length) return null;

  return (
    <section id="reference" className="py-20 md:py-28 bg-luna-champagne/20">
      <div className="container-main">
        <div className="text-center mb-12 md:mb-16">
          <p className="section-eyebrow mb-3">Reference</p>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-luna-ink">
            Co říkají klientky
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {list.map((t, i) => (
            <Card key={i} className="h-full border-luna-champagne/90">
              <CardBody className="flex flex-col h-full space-y-4">
                <div
                  className="flex gap-0.5 text-luna-rose"
                  aria-label="Hodnocení 5 z 5"
                >
                  {Array.from({ length: 5 }).map((_, j) => (
                    <FiStar
                      key={j}
                      className="w-4 h-4 fill-luna-rose/80 text-luna-rose"
                      aria-hidden
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-luna-stone font-sans text-base leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="pt-4 border-t border-luna-champagne/80">
                  <cite className="not-italic font-sans text-sm font-semibold text-luna-ink">
                    {t.author}
                  </cite>
                </footer>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
