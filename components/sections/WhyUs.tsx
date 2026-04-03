import { loadSiteContent } from "@/lib/cms/loadContent";
import { FiCheck } from "react-icons/fi";

export async function WhyUs() {
  const site = await loadSiteContent();
  const { whyUs } = site;

  if (!whyUs.items.length) return null;

  return (
    <section className="py-20 md:py-24 bg-luna-champagne/25">
      <div className="container-main max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-luna-ink mb-12">
          {whyUs.title}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {whyUs.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 items-start p-5 rounded-xl bg-white/70 border border-luna-champagne/60 shadow-sm"
            >
              <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-luna-rose/25 text-luna-ink">
                <FiCheck className="w-4 h-4" aria-hidden />
              </span>
              <span className="font-sans text-luna-stone leading-snug pt-1">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
