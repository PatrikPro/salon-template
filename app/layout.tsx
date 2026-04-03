import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  loadSiteContent,
  loadOpeningHours,
} from "@/lib/cms/loadContent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luna Studio – Prémiový beauty salon",
    template: "%s | Luna Studio",
  },
  description:
    "Prémiová péče o vlasy a beauty služby v elegantním prostředí. Luna Studio — individuální přístup, klid a profesionální výsledek.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Luna Studio",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await loadSiteContent();
  const openingHours = await loadOpeningHours();

  return (
    <html lang="cs" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="flex flex-col min-h-screen">
        <a href="#main-content" className="skip-link">
          Přeskočit na obsah
        </a>

        <Navbar brandName={site.brandName} />

        <div className="flex-1">{children}</div>

        <Footer
          brandName={site.brandName}
          contact={site.contact}
          openingHours={openingHours}
        />
      </body>
    </html>
  );
}
