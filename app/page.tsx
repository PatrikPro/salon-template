import { Hero } from "@/components/sections/Hero";
import { AboutStudio } from "@/components/sections/AboutStudio";
import { WhyUs } from "@/components/sections/WhyUs";
import { ServiceHighlight } from "@/components/sections/ServiceHighlight";
import { GallerySection } from "@/components/sections/GallerySection";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { Testimonials } from "@/components/sections/Testimonials";
import { TeamSection } from "@/components/sections/TeamSection";
import { ReservationCTA } from "@/components/sections/ReservationCTA";
import { ContactBlock } from "@/components/sections/ContactBlock";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <AboutStudio />
      <WhyUs />
      <ServiceHighlight />
      <GallerySection />
      <PromoBanner />
      <Testimonials />
      <TeamSection />
      <ReservationCTA />
      <ContactBlock />
    </main>
  );
}
