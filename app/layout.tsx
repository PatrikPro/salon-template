import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/* ===== Fonty (next/font/google) ===== */
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
  display: "swap",
});

/* ===== Globální metadata (SEO) ===== */
export const metadata: Metadata = {
  title: {
    default: "Zuzu Café – Výběrová káva v centru Prahy",
    template: "%s | Zuzu Café",
  },
  description:
    "Útulná kavárna s výběrovou kávou, rychlou Wi‑Fi a zásuvkami u každého stolu. Ideální místo pro studium, práci i setkání s přáteli.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Zuzu Café",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="flex flex-col min-h-screen">
        {/* Skip link pro klávesnicovou navigaci (a11y) */}
        <a href="#main-content" className="skip-link">
          Přeskočit na obsah
        </a>

        <Navbar />

        <div className="flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
