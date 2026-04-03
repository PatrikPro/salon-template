import type { Metadata } from "next";
import Image from "next/image";
import { loadTeam } from "@/lib/cms/loadContent";
import { loadSiteContent } from "@/lib/cms/loadContent";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Tým",
  description:
    "Seznamte se s týmem Luna Studio — stylistky a specialistky na vlasy a beauty.",
};

export default async function TeamPage() {
  const [team, site] = await Promise.all([loadTeam(), loadSiteContent()]);

  return (
    <main id="main-content" className="py-14 md:py-22">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
          <p className="section-eyebrow mb-3">Lidé</p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-luna-ink mb-4">
            {site.teamSectionTitle}
          </h1>
          <p className="text-luna-stone font-sans text-lg">
            {site.teamSectionSubtitle}
          </p>
        </div>

        {team.members.length === 0 ? (
          <p className="text-center text-luna-stone font-sans">
            Tým doplníte v souboru content/team.json
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {team.members.map((member) => (
              <Card key={member.id} className="overflow-hidden">
                <div className="relative aspect-[4/5] max-h-[420px] w-full">
                  <Image
                    src={member.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <CardBody>
                  <h2 className="text-2xl font-serif font-semibold text-luna-ink">
                    {member.name}
                  </h2>
                  <p className="text-sm font-sans text-luna-rose font-medium mt-1">
                    {member.role}
                  </p>
                  <p className="text-luna-stone font-sans mt-4 leading-relaxed">
                    {member.bio}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        <p className="text-center mt-14">
          <ButtonLink href="/rezervace" size="lg">
            Rezervovat termín
          </ButtonLink>
        </p>
      </div>
    </main>
  );
}
