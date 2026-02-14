import Image from "next/image";

const images = [
  { src: "/images/gallery-1.svg", alt: "Latte art v šálku – pohled shora" },
  { src: "/images/gallery-2.svg", alt: "Interiér kavárny se slunečním světlem" },
  { src: "/images/gallery-3.svg", alt: "Vitrina s pečivem a sladkým" },
  { src: "/images/hero.svg", alt: "Pracovní místo v kavárně s laptopem" },
  { src: "/images/gallery-1.svg", alt: "Detail latte artu" },
  { src: "/images/gallery-3.svg", alt: "Čerstvé croissanty na tácu" },
];

/**
 * Galerie obrázků kavárny s lazy-loading.
 */
export function Gallery() {
  return (
    <section id="galerie" className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-coffee mb-3">
            Galerie
          </h2>
          <p className="text-coffee-600 font-serif text-lg">
            Nahlédni k nám.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
