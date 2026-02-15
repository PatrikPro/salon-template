"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Domů" },
  { href: "/menu", label: "Menu" },
  { href: "/rezervace", label: "Rezervace" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

/**
 * Responzivní navigace s mobilním hamburger menu.
 * Sticky, s blur backdrop na scrollu.
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full",
        "bg-cream/80 backdrop-blur-md border-b border-cream-300"
      )}
    >
      <nav
        className="container-main flex items-center justify-between h-16"
        aria-label="Hlavní navigace"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-sans font-bold text-coffee text-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt=""
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="hidden sm:inline">Zuzu Café</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-coffee-700 hover:text-coffee font-sans text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/rezervace">
            <Button size="sm">Rezervovat</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-cream-200 transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {mobileOpen ? (
            <FiX className="w-6 h-6 text-coffee" />
          ) : (
            <FiMenu className="w-6 h-6 text-coffee" />
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-cream-300 pb-4">
          <ul className="flex flex-col gap-1 px-4 pt-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 px-3 rounded-lg text-coffee-700 hover:bg-cream-200 font-sans text-sm font-medium transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button
                size="sm"
                fullWidth
                onClick={() => setMobileOpen(false)}
              >
                <Link href="/rezervace">Rezervovat</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
