import Image from "next/image";
import { loadTeam } from "@/lib/cms/loadContent";
import { loadSiteContent } from "@/lib/cms/loadContent";
import { Card, CardBody } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/ButtonLink";

export async function TeamSection() {
  const [team, site] = await Promise.all([loadTeam(), loadSiteContent()]);

  if (!team.members.length) return null;

  const preview = team.members.slice(0, 2);

  return (
    <section id="tym" className="py-20 md:py-28 bg-white">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="section-eyebrow mb-3">Lidé</p>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-luna-ink mb-4">
            {site.teamSectionTitle}
          </h2>
          {site.teamSectionSubtitle && (
            <p className="text-luna-stone font-sans text-lg">
              {site.teamSectionSubtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {preview.map((member) => (
            <Card key={member.id} hoverable className="overflow-hidden">
              <div className="relative aspect-[4/5] max-h-80 w-full">
                <Image
                  src={member.image}
                  alt={`${member.name} – ${member.role}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <CardBody>
                <h3 className="text-xl font-serif font-semibold text-luna-ink">
                  {member.name}
                </h3>
                <p className="text-sm font-sans text-luna-rose font-medium mt-1">
                  {member.role}
                </p>
                <p className="text-sm text-luna-stone font-sans mt-3 leading-relaxed line-clamp-4">
                  {member.bio}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        {team.members.length > 0 && (
          <p className="text-center mt-10">
            <ButtonLink href="/tym" variant="secondary" size="md">
              Celý tým
            </ButtonLink>
          </p>
        )}
      </div>
    </section>
  );
}
