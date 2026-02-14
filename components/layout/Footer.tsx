"use client";

import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiFacebook, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";

/**
 * Globální footer s kontaktními údaji, sociálními sítěmi a newsletter signup.
 */
export function Footer() {
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

  return (
    <footer className="bg-coffee-800 text-cream-100" role="contentinfo">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-sans font-bold text-white mb-4">
              Kontakt
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {/* UNSPECIFIED – placeholder adresa */}
                <span>Školská 12, Praha 2</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {/* UNSPECIFIED – placeholder telefon */}
                <a href="tel:+420777123456" className="hover:text-white transition-colors">
                  +420 777 123 456
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                {/* UNSPECIFIED – placeholder e-mail */}
                <a href="mailto:ahoj@kavarnamleta.cz" className="hover:text-white transition-colors">
                  ahoj@kavarnamleta.cz
                </a>
              </li>
            </ul>

            {/* Otevírací doba */}
            <div className="mt-4">
              <h4 className="text-sm font-sans font-semibold text-white mb-1">
                Otevírací doba
              </h4>
              <ul className="text-sm space-y-0.5">
                {/* UNSPECIFIED – placeholder otevírací doba */}
                <li>Po–Pá: 8:00–20:00</li>
                <li>So: 9:00–21:00</li>
                <li>Ne: 9:00–18:00</li>
              </ul>
            </div>
          </div>

          {/* Navigace */}
          <div>
            <h3 className="text-lg font-sans font-bold text-white mb-4">
              Navigace
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Domů
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/rezervace" className="hover:text-white transition-colors">
                  Rezervace
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link
                  href="/ochrana-soukromi"
                  className="hover:text-white transition-colors"
                >
                  Ochrana soukromí
                </Link>
              </li>
            </ul>

            {/* Sociální sítě */}
            <div className="flex gap-3 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-full hover:bg-coffee-700 transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-full hover:bg-coffee-700 transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-sans font-bold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-sm mb-3">
              Novinky, akce a tipy přímo do schránky. Žádný spam.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                E-mail pro newsletter
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder="jan@domena.cz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg border border-coffee-600 bg-coffee-700 px-3 py-2 text-sm text-cream-100 placeholder:text-coffee-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <Button variant="secondary" size="sm" type="submit">
                Odebírat
              </Button>
            </form>
            <p className="text-xs text-coffee-400 mt-2">
              Přihlášením souhlasíte se{" "}
              <Link href="/ochrana-soukromi" className="underline hover:text-cream-200">
                zpracováním osobních údajů
              </Link>
              .
            </p>

            {status === "success" && (
              <Toast
                variant="success"
                message="Díky za přihlášení! 🎉"
                onClose={() => setStatus("idle")}
                className="mt-3"
              />
            )}
            {status === "error" && (
              <Toast
                variant="error"
                message="Něco se pokazilo. Zkuste to znovu."
                onClose={() => setStatus("idle")}
                className="mt-3"
              />
            )}
          </div>
        </div>

        {/* Spodní lišta */}
        <div className="mt-10 pt-6 border-t border-coffee-700 text-center text-xs text-coffee-400">
          <p>
            © {new Date().getFullYear()} Kavárna Mletá &amp; Měkká. Všechna práva
            vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}
