import { loadBookingConfig } from "@/lib/booking";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function ReservationCTA() {
  const booking = await loadBookingConfig();

  return (
    <section className="py-16 md:py-20 bg-luna-champagne/30 border-y border-luna-champagne/60">
      <div className="container-main text-center max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-luna-ink">
          Rezervujte si svůj čas
        </h2>
        <p className="text-luna-stone font-sans text-lg leading-relaxed">
          Vyberte si termín v rezervačním systému {booking.providerName}. Rádi
          vás přivítáme v klidném prostředí studia.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <ButtonLink href="/rezervace" size="lg">
            {booking.ctaLabel}
          </ButtonLink>
          <ButtonLink href="/sluzby" variant="secondary" size="lg">
            Prohlédnout služby
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
