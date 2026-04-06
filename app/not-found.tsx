import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main id="main-content" className="py-24 md:py-36">
      <div className="container-main text-center max-w-xl mx-auto space-y-6">
        <p className="section-eyebrow">404</p>
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-luna-ink">
          Stránka nenalezena
        </h1>
        <p className="text-luna-stone font-sans text-lg leading-relaxed">
          Omlouváme se, ale tato stránka neexistuje nebo byla přesunuta.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <ButtonLink href="/" size="lg">
            Zpět na úvod
          </ButtonLink>
          <ButtonLink href="/sluzby" variant="secondary" size="lg">
            Služby a ceny
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}
