import Image from "next/image";

/**
 * Sekce "O nás" – příběh kavárny s důrazem na lokálnost a pohodlí.
 */
export function About() {
  return (
    <section id="o-nas" className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Obrázek */}
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/gallery-2.svg"
              alt="Útulný interiér kavárny se slunečním světlem"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-coffee">
              Malá kavárna, velký klid.
            </h2>
            <div className="space-y-3 text-coffee-700 font-serif text-base md:text-lg leading-relaxed">
              <p>
                Jsme lokální kavárna v srdci města. Přes den tu najdeš tiché
                kouty na práci a studium, odpoledne prostor na rozhovory.
              </p>
              <p>
                Všechno stavíme na kvalitních surovinách, příjemné obsluze a
                férových cenách. Pečeme po malých várkách, kávu pražíme z
                čerstvých zrn a mléko nabízíme i v ovesné variantě.
              </p>
              <p>
                Ať jsi student, nomád nebo místní — u nás si vždycky sedneš
                pohodlně.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
