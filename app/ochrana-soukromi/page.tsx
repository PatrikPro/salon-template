import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochrana soukromí",
  description: "Informace o zpracování osobních údajů – Luna Studio.",
};

/**
 * Stránka Ochrana soukromí / GDPR.
 * Texty jsou orientační — před produkcí konzultujte s právníkem.
 */
export default function PrivacyPage() {
  return (
    <main id="main-content" className="py-14 md:py-22">
      <div className="container-main max-w-3xl">
        <h1 className="text-4xl font-serif font-medium text-luna-ink mb-8">
          Ochrana soukromí
        </h1>

        <div className="space-y-8 text-luna-stone font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-medium text-luna-ink">
              1. Správce osobních údajů
            </h2>
            <p>
              Správcem osobních údajů je Luna Studio, Vinohradská 128, Praha 2.
              E‑mail: hello@lunastudio.cz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-medium text-luna-ink">
              2. Jaké údaje zpracováváme
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Kontaktní formulář:</strong> jméno, e-mail, zpráva
              </li>
              <li>
                <strong>Rezervace:</strong> probíhá u externího poskytovatele
                (např. Reservio). Údaje zadávané v jeho widgetu zpracovává
                tento poskytovatel podle svých podmínek.
              </li>
              <li>
                <strong>Newsletter:</strong> e-mailová adresa
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-medium text-luna-ink">
              3. Účel zpracování
            </h2>
            <p>
              Údaje zpracováváme za účelem odpovědi na dotazy a zasílání
              novinek (pouze s vaším souhlasem).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-medium text-luna-ink">
              4. Doba uchovávání
            </h2>
            <p>
              Osobní údaje uchováváme po dobu nezbytnou pro splnění účelu
              zpracování, nejdéle však 2 roky od posledního kontaktu.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-medium text-luna-ink">
              5. Vaše práva
            </h2>
            <p>
              Máte právo na přístup, opravu, výmaz, omezení zpracování a
              přenositelnost údajů. Pro uplatnění práv nás kontaktujte na
              hello@lunastudio.cz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-medium text-luna-ink">
              6. Cookies
            </h2>
            <p>
              Tento web používá pouze nezbytné technické cookies. Analytické či
              reklamní cookies nejsou aktivní bez vašeho souhlasu.
            </p>
          </section>

          <p className="text-sm text-luna-stone/70 mt-8">
            Poslední aktualizace: duben 2026. Tento text je šablona — před
            ostrým provozem jej nechte zkontrolovat právníkem.
          </p>
        </div>
      </div>
    </main>
  );
}
