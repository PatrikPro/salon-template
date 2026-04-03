import type { Metadata } from "next";
import Image from "next/image";
import { loadSiteContent } from "@/lib/cms/loadContent";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "O nás",
  description:
    "Příběh a hodnoty Luna Studio — péče, detail a profesionální beauty služby v Praze.",
};

export default async function AboutPage() {
  const site = await loadSiteContent();
  const { aboutPage, about } = site;

  return (
    <main id="main-content" className="py-14 md:py-22">
      <div className="container-main max-w-3xl">
        <p className="section-eyebrow mb-3 text-center">Luna Studio</p>
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-luna-ink mb-6 text-center">
          {aboutPage.title}
        </h1>
        <p className="text-xl text-luna-stone font-sans text-center leading-relaxed mb-14">
          {aboutPage.lead}
        </p>

        <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-14 shadow-lg">
          <Image
            src={about.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 48rem"
            priority
          />
        </div>

        <div className="space-y-5 text-luna-stone font-sans text-lg leading-relaxed mb-16">
          {aboutPage.storyParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="text-2xl md:text-3xl font-serif font-medium text-luna-ink mb-8">
          {aboutPage.valuesTitle}
        </h2>
        <ul className="space-y-4 mb-14">
          {aboutPage.values.map((v, i) => (
            <li
              key={i}
              className="flex gap-3 text-luna-stone font-sans text-base leading-relaxed border-l-2 border-luna-rose/40 pl-4"
            >
              {v}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <ButtonLink href="/rezervace" size="lg">
            Rezervovat termín
          </ButtonLink>
          <ButtonLink href="/sluzby" variant="secondary" size="lg">
            Služby a ceny
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
