import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana soukromí",
  description: "Informace o zpracování osobních údajů – Kavárna Mletá & Měkká.",
};

/**
 * Stránka Ochrana soukromí / GDPR.
 * UNSPECIFIED – texty jsou placeholder, upravte dle skutečného právního rámce.
 */
export default function PrivacyPage() {
  return (
    <main id="main-content" className="py-12 md:py-20">
      <div className="container-main max-w-3xl">
        <h1 className="text-4xl font-sans font-bold text-coffee mb-8">
          Ochrana soukromí
        </h1>

        <div className="prose prose-coffee font-serif space-y-6 text-coffee-700">
          <section>
            <h2 className="text-2xl font-sans font-bold text-coffee">
              1. Správce osobních údajů
            </h2>
            {/* UNSPECIFIED – placeholder */}
            <p>
              Správcem osobních údajů je Kavárna Mletá &amp; Měkká, Školská 12,
              Praha 2. E‑mail: ahoj@kavarnamleta.cz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-coffee">
              2. Jaké údaje zpracováváme
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Kontaktní formulář:</strong> jméno, e-mail, zpráva
              </li>
              <li>
                <strong>Rezervace:</strong> jméno, e-mail, telefon (volitelně),
                datum a čas
              </li>
              <li>
                <strong>Newsletter:</strong> e-mailová adresa
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-coffee">
              3. Účel zpracování
            </h2>
            <p>
              Údaje zpracováváme za účelem odpovědi na vaše dotazy, správy
              rezervací a zasílání novinek (pouze s vaším souhlasem).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-coffee">
              4. Doba uchovávání
            </h2>
            <p>
              Osobní údaje uchováváme po dobu nezbytnou pro splnění účelu
              zpracování, nejdéle však 2 roky od posledního kontaktu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-coffee">
              5. Vaše práva
            </h2>
            <p>
              Máte právo na přístup, opravu, výmaz, omezení zpracování a
              přenositelnost údajů. Pro uplatnění práv nás kontaktujte na
              ahoj@kavarnamleta.cz.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-sans font-bold text-coffee">
              6. Cookies
            </h2>
            <p>
              Tento web používá pouze nezbytné technické cookies. Žádné
              analytické ani reklamní cookies nejsou aktivní bez vašeho
              souhlasu.
            </p>
          </section>

          <p className="text-sm text-coffee-400 mt-8">
            Poslední aktualizace: únor 2026. Tento text je placeholder –
            doporučujeme konzultaci s právníkem.
          </p>
        </div>
      </div>
    </main>
  );
}
