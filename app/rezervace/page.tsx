import type { Metadata } from "next";
import { loadBookingConfig } from "@/lib/booking";
import { ReservationWidget } from "@/components/reservation/ReservationWidget";

export const metadata: Metadata = {
  title: "Rezervace",
  description:
    "Rezervujte si termín v Luna Studio přes bezpečný externí rezervační systém.",
};

export default async function ReservationPage() {
  const settings = await loadBookingConfig();

  return (
    <main id="main-content" className="py-14 md:py-22">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-10 md:mb-14">
          <p className="section-eyebrow mb-3">Online rezervace</p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-luna-ink mb-4">
            Rezervovat termín
          </h1>
          <p className="text-luna-stone font-sans text-lg max-w-xl mx-auto leading-relaxed">
            Rezervace probíhá u partnera{" "}
            <span className="text-luna-ink font-medium">{settings.providerName}</span>.
            Žádné údaje neukládáme na našem serveru.
          </p>
        </div>

        <ReservationWidget settings={settings} />
      </div>
    </main>
  );
}
