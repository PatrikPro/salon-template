import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktuj Kavárnu Mletá & Měkká – formulář, telefon, e-mail, mapa a otevírací doba.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="py-12 md:py-20">
      <div className="container-main">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-coffee mb-3">
            Kontakt
          </h1>
          <p className="text-coffee-600 font-serif text-lg">
            Máš dotaz, nápad nebo zpětnou vazbu? Napiš nám.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulář */}
          <ContactForm />

          {/* Info + mapa */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans font-semibold text-coffee">Adresa</p>
                  <p className="text-coffee-600 font-serif">
                    Školská 12, Praha 2
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans font-semibold text-coffee">Telefon</p>
                  <a
                    href="tel:+420777123456"
                    className="text-coffee-600 font-serif hover:text-coffee transition-colors"
                  >
                    +420 777 123 456
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans font-semibold text-coffee">E-mail</p>
                  <a
                    href="mailto:ahoj@kavarnamleta.cz"
                    className="text-coffee-600 font-serif hover:text-coffee transition-colors"
                  >
                    ahoj@kavarnamleta.cz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans font-semibold text-coffee">
                    Otevírací doba
                  </p>
                  <ul className="text-coffee-600 font-serif text-sm space-y-0.5">
                    <li>Po–Pá: 8:00–20:00</li>
                    <li>So: 9:00–21:00</li>
                    <li>Ne: 9:00–18:00</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-xl overflow-hidden shadow-md">
              <iframe
                title="Mapa – Kavárna Mletá &amp; Měkká"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.5!2d14.4241!3d50.0755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA0JzMxLjgiTiAxNMKwMjUnMjcuMSJF!5e0!3m2!1scs!2scz!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[300px]"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
