import { loadSiteContent } from "@/lib/cms/loadContent";
import { OpeningHoursBlock } from "./OpeningHoursBlock";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export async function ContactBlock() {
  const site = await loadSiteContent();
  const { contact } = site;
  const phoneHref = contact.phone.replace(/\s/g, "");

  return (
    <section className="py-20 md:py-28 bg-luna-ivory">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="section-eyebrow mb-3">Navštivte nás</p>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-luna-ink mb-4">
            Kontakt a studio
          </h2>
          <p className="text-luna-stone font-sans text-lg">
            Jsme na dosah z centra — napište, zavolejte nebo rovnou zarezervujte
            termín.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <OpeningHoursBlock />

          <div className="space-y-8">
            <div className="space-y-5 font-sans">
              <div className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-luna-rose mt-0.5 flex-shrink-0" aria-hidden />
                <div>
                  <p className="font-semibold text-luna-ink">Adresa</p>
                  <p className="text-luna-stone">{contact.address || "—"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 text-luna-rose mt-0.5 flex-shrink-0" aria-hidden />
                <div>
                  <p className="font-semibold text-luna-ink">Telefon</p>
                  {contact.phone ? (
                    <a
                      href={`tel:${phoneHref}`}
                      className="text-luna-stone hover:text-luna-ink transition-colors"
                    >
                      {contact.phone}
                    </a>
                  ) : (
                    <span className="text-luna-stone">—</span>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMail className="w-5 h-5 text-luna-rose mt-0.5 flex-shrink-0" aria-hidden />
                <div>
                  <p className="font-semibold text-luna-ink">E-mail</p>
                  {contact.email ? (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-luna-stone hover:text-luna-ink transition-colors"
                    >
                      {contact.email}
                    </a>
                  ) : (
                    <span className="text-luna-stone">—</span>
                  )}
                </div>
              </div>
              {contact.instagramHandle && contact.instagramUrl && (
                <div>
                  <p className="font-semibold text-luna-ink mb-1">Instagram</p>
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-luna-rose hover:text-luna-ink transition-colors"
                  >
                    {contact.instagramHandle}
                  </a>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <ButtonLink href="/kontakt" variant="secondary">
                Kontaktní formulář
              </ButtonLink>
              <ButtonLink href="/rezervace">Rezervovat termín</ButtonLink>
            </div>

            {contact.mapEmbedUrl && (
              <div className="rounded-xl overflow-hidden shadow-md border border-luna-champagne/60">
                <iframe
                  title={`Mapa – ${site.brandName}`}
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[320px]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
