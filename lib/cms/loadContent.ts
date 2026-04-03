import siteJson from "@/content/site.json";
import openingHoursJson from "@/content/openingHours.json";
import promoJson from "@/content/promo.json";
import galleryJson from "@/content/gallery.json";
import teamJson from "@/content/team.json";
import reservationSettingsJson from "@/content/reservationSettings.json";
import type {
  GalleryData,
  OpeningHoursData,
  PromoData,
  ReservationSettings,
  SiteContent,
  TeamData,
} from "./types";

const defaultSite: SiteContent = {
  brandName: "Luna Studio",
  hero: {
    title: "Prostor, kde krása dostává čas.",
    subtitle: "",
    primaryCtaLabel: "Rezervovat termín",
    secondaryCtaLabel: "Zobrazit služby",
    image: "/images/salon-hero.svg",
    imageAlt: "",
  },
  about: {
    title: "O studiu",
    bodyParagraphs: [],
    image: "/images/salon-interior.svg",
  },
  whyUs: { title: "Proč my", items: [] },
  aboutPage: {
    title: "O nás",
    lead: "",
    storyParagraphs: [],
    valuesTitle: "Naše hodnoty",
    values: [],
  },
  contact: {
    address: "",
    phone: "",
    email: "",
    instagramHandle: "",
    instagramUrl: "https://instagram.com",
    mapEmbedUrl: "",
  },
  testimonials: [],
  servicesSectionTitle: "Služby",
  servicesSectionSubtitle: "",
  gallerySectionTitle: "Galerie",
  gallerySectionSubtitle: "",
  teamSectionTitle: "Náš tým",
  teamSectionSubtitle: "",
};

function mergeSite(raw: Partial<SiteContent>): SiteContent {
  return {
    ...defaultSite,
    ...raw,
    hero: { ...defaultSite.hero, ...raw.hero },
    about: { ...defaultSite.about, ...raw.about },
    whyUs: { ...defaultSite.whyUs, ...raw.whyUs },
    aboutPage: { ...defaultSite.aboutPage, ...raw.aboutPage },
    contact: { ...defaultSite.contact, ...raw.contact },
    testimonials: raw.testimonials ?? defaultSite.testimonials,
  };
}

export async function loadSiteContent(): Promise<SiteContent> {
  return mergeSite(siteJson as Partial<SiteContent>);
}

const defaultHours: OpeningHoursData = { days: [] };

export async function loadOpeningHours(): Promise<OpeningHoursData> {
  const raw = openingHoursJson as OpeningHoursData;
  return {
    days: Array.isArray(raw.days) ? raw.days : defaultHours.days,
    note: raw.note,
  };
}

const defaultPromo: PromoData = {
  isActive: false,
  headline: "",
  text: "",
  ctaLabel: "",
  ctaHref: "/rezervace",
};

export async function loadPromo(): Promise<PromoData> {
  return { ...defaultPromo, ...(promoJson as PromoData) };
}

export async function loadGallery(): Promise<GalleryData> {
  const raw = galleryJson as GalleryData;
  if (!raw.images?.length) {
    return { images: [] };
  }
  return {
    images: [...raw.images].sort((a, b) => a.order - b.order),
  };
}

export async function loadTeam(): Promise<TeamData> {
  const raw = teamJson as TeamData;
  if (!raw.members?.length) {
    return { members: [] };
  }
  return {
    members: [...raw.members].sort((a, b) => a.order - b.order),
  };
}

const defaultReservation: ReservationSettings = {
  providerName: "Reservio",
  bookingMode: "button",
  bookingUrl: "https://www.reservio.com",
  iframeUrl: "",
  ctaLabel: "Rezervovat termín",
  helperText: "",
};

export async function loadReservationSettings(): Promise<ReservationSettings> {
  return {
    ...defaultReservation,
    ...(reservationSettingsJson as ReservationSettings),
  };
}
