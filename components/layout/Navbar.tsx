"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";
import { ButtonLink } from "@/components/ui/ButtonLink";

const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/sluzby", label: "Služby" },
  { href: "/o-nas", label: "O nás" },
  { href: "/tym", label: "Tým" },
  { href: "/galerie", label: "Galerie" },
  { href: "/rezervace", label: "Rezervace" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export function Navbar({ brandName }: { brandName: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-luna-ivory/85 backdrop-blur-md border-b border-luna-champagne/60"
      )}
    >
      <nav
        className="container-main flex items-center justify-between h-16 md:h-[4.25rem]"
        aria-label="Hlavní navigace"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-serif text-xl md:text-2xl font-semibold text-luna-ink tracking-tight"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            width={36}
            height={36}
            className="w-9 h-9"
          />
          <span className="hidden sm:inline">{brandName}</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-sans font-medium text-luna-stone hover:text-luna-ink transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <ButtonLink href="/rezervace" size="sm">
            Rezervovat termín
          </ButtonLink>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-md hover:bg-luna-champagne/50 transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {mobileOpen ? (
            <FiX className="w-6 h-6 text-luna-ink" />
          ) : (
            <FiMenu className="w-6 h-6 text-luna-ink" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden bg-luna-ivory border-t border-luna-champagne/60 pb-6">
          <ul className="flex flex-col gap-0.5 px-4 pt-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 px-3 rounded-md text-luna-stone hover:bg-luna-champagne/40 font-sans text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <ButtonLink
                href="/rezervace"
                size="sm"
                fullWidth
                className="text-center"
              >
                Rezervovat termín
              </ButtonLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
