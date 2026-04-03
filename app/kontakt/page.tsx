import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import { loadSiteContent } from "@/lib/cms/loadContent";
import { loadOpeningHours } from "@/lib/cms/loadContent";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktujte Luna Studio — adresa na Vinohradech, telefon, e-mail a kontaktní formulář.",
};

export default async function ContactPage() {
  const [site, hours] = await Promise.all([
    loadSiteContent(),
    loadOpeningHours(),
  ]);
  const { contact } = site;
  const phoneHref = contact.phone.replace(/\s/g, "");

  return (
    <main id="main-content" className="py-14 md:py-22">
      <div className="container-main">
        <div className="text-center mb-10 md:mb-14">
          <p className="section-eyebrow mb-3">Kontakt</p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-luna-ink mb-4">
            Napište nám
          </h1>
          <p className="text-luna-stone font-sans text-lg max-w-xl mx-auto">
            Dotaz ke službám, spolupráce nebo zpětná vazba — odpovídáme co
            nejdříve.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <ContactForm />

          <div className="space-y-8">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <FiMapPin
                  className="w-5 h-5 text-luna-rose mt-0.5 flex-shrink-0"
                  aria-hidden
                />
                <div>
                  <p className="font-sans font-semibold text-luna-ink">Adresa</p>
                  <p className="text-luna-stone font-sans">{contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone
                  className="w-5 h-5 text-luna-rose mt-0.5 flex-shrink-0"
                  aria-hidden
                />
                <div>
                  <p className="font-sans font-semibold text-luna-ink">Telefon</p>
                  <a
                    href={`tel:${phoneHref}`}
                    className="text-luna-stone font-sans hover:text-luna-ink transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail
                  className="w-5 h-5 text-luna-rose mt-0.5 flex-shrink-0"
                  aria-hidden
                />
                <div>
                  <p className="font-sans font-semibold text-luna-ink">E-mail</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-luna-stone font-sans hover:text-luna-ink transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock
                  className="w-5 h-5 text-luna-rose mt-0.5 flex-shrink-0"
                  aria-hidden
                />
                <div>
                  <p className="font-sans font-semibold text-luna-ink">
                    Otevírací doba
                  </p>
                  <ul className="text-luna-stone font-sans text-sm space-y-1 mt-1">
                    {hours.days.map((d) => (
                      <li key={d.id}>
                        {d.label}:{" "}
                        {d.closed ? d.note ?? "Zavřeno" : d.hours ?? "—"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <ButtonLink href="/rezervace" size="lg" fullWidth className="sm:w-auto sm:inline-flex">
              Rezervovat termín
            </ButtonLink>

            {contact.mapEmbedUrl && (
              <div className="rounded-xl overflow-hidden shadow-md border border-luna-champagne/60">
                <iframe
                  title={`Mapa – ${site.brandName}`}
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[300px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
