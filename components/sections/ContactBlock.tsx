import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

/**
 * Kontaktní blok na homepage – mapa, adresa, otevírací doba, CTA.
 */
export function ContactBlock() {
  return (
    <section id="kontakt" className="py-16 md:py-24 bg-cream-50">
      <div className="container-main">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-coffee mb-3">
            Kde nás najdeš
          </h2>
          <p className="text-coffee-600 font-serif text-lg">
            Stavte se na kávu. Rádi vás uvidíme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans font-semibold text-coffee">Adresa</p>
                  {/* UNSPECIFIED – placeholder */}
                  <p className="text-coffee-600 font-serif">Školská 12, Praha 2</p>
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
                    href="mailto:kontakt@zuzucafe.cz"
                    className="text-coffee-600 font-serif hover:text-coffee transition-colors"
                  >
                    kontakt@zuzucafe.cz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-sans font-semibold text-coffee">Otevírací doba</p>
                  {/* UNSPECIFIED – placeholder */}
                  <ul className="text-coffee-600 font-serif text-sm space-y-0.5">
                    <li>Po–Pá: 8:00–20:00</li>
                    <li>So: 9:00–21:00</li>
                    <li>Ne: 9:00–18:00</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/kontakt">
                <Button variant="secondary">Napsat zprávu</Button>
              </Link>
              <Link href="/rezervace">
                <Button>Rezervovat stůl</Button>
              </Link>
            </div>
          </div>

          {/* Mapa (lazy-loaded iframe) */}
          <div className="rounded-xl overflow-hidden shadow-md">
            <iframe
              title="Mapa – Zuzu Café"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2560.5!2d14.4241!3d50.0755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDA0JzMxLjgiTiAxNMKwMjUnMjcuMSJF!5e0!3m2!1scs!2scz!4v1"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[350px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
