import Image from "next/image";
import { loadSiteContent } from "@/lib/cms/loadContent";

export async function AboutStudio() {
  const site = await loadSiteContent();
  const { about } = site;

  return (
    <section
      id="o-studiu"
      className="py-20 md:py-28 bg-white border-y border-luna-champagne/50"
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden shadow-lg">
            <Image
              src={about.image}
              alt="Interiér a atmosféra studia Luna Studio"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>

          <div className="space-y-6">
            {about.sectionEyebrow && (
              <p className="section-eyebrow">{about.sectionEyebrow}</p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-serif font-medium text-luna-ink">
              {about.title}
            </h2>
            <div className="space-y-4 text-luna-stone font-sans text-base md:text-lg leading-relaxed">
              {about.bodyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
