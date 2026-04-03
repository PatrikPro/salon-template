"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiInstagram,
  FiFacebook,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import type { SiteContact } from "@/lib/cms/types";
import type { OpeningHoursData } from "@/lib/cms/types";

function formatOpeningLines(hours: OpeningHoursData): string[] {
  if (!hours.days.length) {
    return ["Doplňte otevírací dobu v souboru content/openingHours.json"];
  }
  return hours.days.map((d) => {
    if (d.closed) {
      return `${d.label}: ${d.note ?? "Zavřeno"}`;
    }
    return `${d.label}: ${d.hours ?? "—"}`;
  });
}

export function Footer({
  brandName,
  contact,
  openingHours,
}: {
  brandName: string;
  contact: SiteContact;
  openingHours: OpeningHoursData;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const phoneHref = contact.phone.replace(/\s/g, "");
  const hoursLines = formatOpeningLines(openingHours);

  return (
    <footer
      className="bg-luna-ink text-luna-ivory/95 border-t border-luna-stone/30"
      role="contentinfo"
    >
      <div className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
          <div>
            <h3 className="text-lg font-serif font-semibold text-luna-ivory mb-5">
              Kontakt
            </h3>
            <ul className="space-y-3 text-sm font-sans text-luna-champagne/90">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-luna-rose" aria-hidden />
                <span>{contact.address || "—"}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 flex-shrink-0 text-luna-rose" aria-hidden />
                {contact.phone ? (
                  <a
                    href={`tel:${phoneHref}`}
                    className="hover:text-luna-ivory transition-colors"
                  >
                    {contact.phone}
                  </a>
                ) : (
                  "—"
                )}
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 flex-shrink-0 text-luna-rose" aria-hidden />
                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-luna-ivory transition-colors"
                  >
                    {contact.email}
                  </a>
                ) : (
                  "—"
                )}
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-xs font-sans font-semibold uppercase tracking-widest text-luna-rose mb-2">
                Otevírací doba
              </h4>
              <ul className="text-sm font-sans text-luna-champagne/85 space-y-1">
                {hoursLines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              {openingHours.note && (
                <p className="text-xs text-luna-stone mt-2">{openingHours.note}</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold text-luna-ivory mb-5">
              Navigace
            </h3>
            <ul className="space-y-2.5 text-sm font-sans">
              <li>
                <Link
                  href="/sluzby"
                  className="text-luna-champagne/90 hover:text-luna-ivory transition-colors"
                >
                  Služby a ceny
                </Link>
              </li>
              <li>
                <Link
                  href="/rezervace"
                  className="text-luna-champagne/90 hover:text-luna-ivory transition-colors"
                >
                  Rezervace
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-luna-champagne/90 hover:text-luna-ivory transition-colors"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/ochrana-soukromi"
                  className="text-luna-champagne/90 hover:text-luna-ivory transition-colors"
                >
                  Ochrana soukromí
                </Link>
              </li>
            </ul>

            <div className="flex gap-2 mt-6">
              {contact.instagramUrl && (
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-full border border-luna-stone/40 hover:border-luna-rose hover:bg-luna-stone/20 transition-all"
                >
                  <FiInstagram className="w-5 h-5" />
                </a>
              )}
              {contact.facebookUrl && (
                <a
                  href={contact.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-full border border-luna-stone/40 hover:border-luna-rose hover:bg-luna-stone/20 transition-all"
                >
                  <FiFacebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-semibold text-luna-ivory mb-5">
              Newsletter
            </h3>
            <p className="text-sm text-luna-champagne/85 mb-4 leading-relaxed">
              Tipy na péči, novinky ze studia a akční nabídky. Jednou za čas,
              žádný spam.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                E-mail pro newsletter
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder="vas@email.cz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-md border border-luna-stone/40 bg-luna-ink/50 px-3 py-2.5 text-sm text-luna-ivory placeholder:text-luna-stone focus:outline-none focus:ring-2 focus:ring-luna-rose/50"
              />
              <Button variant="secondary" size="sm" type="submit">
                Odebírat
              </Button>
            </form>
            <p className="text-xs text-luna-stone mt-2">
              Odesláním souhlasíte se{" "}
              <Link
                href="/ochrana-soukromi"
                className="underline hover:text-luna-champagne"
              >
                zpracováním osobních údajů
              </Link>
              .
            </p>

            {status === "success" && (
              <Toast
                variant="success"
                message="Děkujeme za přihlášení."
                onClose={() => setStatus("idle")}
                className="mt-3"
              />
            )}
            {status === "error" && (
              <Toast
                variant="error"
                message="Zkuste to prosím znovu."
                onClose={() => setStatus("idle")}
                className="mt-3"
              />
            )}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-luna-stone/25 text-center text-xs text-luna-stone font-sans">
          <p>
            © {new Date().getFullYear()} {brandName}. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
