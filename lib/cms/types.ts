/**
 * Typy pro JSON „CMS“ vrstvu – klient upravuje soubory v /content.
 */

export interface SiteHero {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  /** Cesta k obrázku v /public */
  image: string;
  /** Popis pro screen readery (prázdné = dekorativní obrázek) */
  imageAlt?: string;
}

export interface SiteAbout {
  sectionEyebrow?: string;
  title: string;
  bodyParagraphs: string[];
  image: string;
}

export interface SiteWhyUs {
  title: string;
  items: string[];
}

export interface SiteAboutPage {
  title: string;
  lead: string;
  storyParagraphs: string[];
  valuesTitle: string;
  values: string[];
}

export interface SiteContact {
  address: string;
  phone: string;
  email: string;
  instagramHandle: string;
  instagramUrl: string;
  facebookUrl?: string;
  mapEmbedUrl: string;
}

export interface SiteTestimonial {
  quote: string;
  author: string;
}

export interface SiteContent {
  brandName: string;
  hero: SiteHero;
  about: SiteAbout;
  whyUs: SiteWhyUs;
  aboutPage: SiteAboutPage;
  contact: SiteContact;
  testimonials: SiteTestimonial[];
  servicesSectionTitle: string;
  servicesSectionSubtitle: string;
  gallerySectionTitle: string;
  gallerySectionSubtitle: string;
  teamSectionTitle: string;
  teamSectionSubtitle: string;
}

export interface OpeningDay {
  id: string;
  label: string;
  /** např. "9:00–19:00" nebo null pokud closed */
  hours: string | null;
  closed: boolean;
  note?: string;
}

export interface OpeningHoursData {
  days: OpeningDay[];
  note?: string;
}

export interface PromoData {
  isActive: boolean;
  headline: string;
  text: string;
  ctaLabel: string;
  ctaHref: string;
  image?: string;
  validFrom?: string;
  validTo?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  order: number;
}

export interface GalleryData {
  images: GalleryImage[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
}

export interface TeamData {
  members: TeamMember[];
}

export type BookingMode = "button" | "iframe";

export interface ReservationSettings {
  providerName: string;
  bookingMode: BookingMode;
  /** Externí URL rezervačního widgetu (tlačítko / fallback) */
  bookingUrl: string;
  /** URL pro iframe embed (např. Reservio) – při režimu iframe */
  iframeUrl: string;
  ctaLabel: string;
  helperText?: string;
}
