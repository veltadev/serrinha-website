"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { MobileMenuPortal } from "./MobileMenuPortal";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/visit", label: "Visit" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6l-12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const base =
    "sticky top-0 z-40 border-b border-[#D8D2C8] transition-colors duration-300 backdrop-blur";
  const variant = isHome
    ? "border-transparent bg-gradient-to-b from-black/40 to-transparent text-sand"
    : "bg-sand/95 text-ink/90 shadow-sm";

  return (
    <header className={`${base} ${variant}`}>
      <Container className="flex items-center justify-between gap-4 px-2 py-1 md:py-2">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-85"
          aria-label="Serrinha home"
        >
          <Image
            src="/brand/logo_green_white.svg"
            alt="Serrinha"
            width={800}
            height={300}
            priority
            className="h-[168px] w-auto md:h-[192px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex md:text-base">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 transition-colors ${
                  active
                    ? "text-olive"
                    : isHome
                      ? "text-sand/80 hover:text-sand"
                      : "text-ink/70 hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-olive" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`sm:hidden inline-flex items-center justify-center rounded-md p-2 transition-colors ${
            isHome
              ? "text-sand/90 hover:text-sand hover:bg-black/20"
              : "text-ink/80 hover:text-ink hover:bg-black/5"
          }`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </Container>

      {/* Mobile overlay */}
      {menuOpen && (
        <MobileMenuPortal>
          <div className="fixed inset-0 z-[9999] sm:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide panel */}
            <div
              className={`absolute right-0 top-0 h-full w-[85vw] max-w-sm p-6 shadow-xl ${
                isHome ? "bg-[#1f241f] text-sand" : "bg-sand text-ink"
              }`}
              role="dialog"
              aria-label="Site navigation"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium tracking-wide opacity-80">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2"
                  aria-label="Close menu"
                >
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-lg ${
                        active
                          ? isHome
                            ? "text-sand"
                            : "text-olive"
                          : isHome
                            ? "text-sand/80 hover:text-sand"
                            : "text-ink/80 hover:text-ink"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </MobileMenuPortal>
      )}
    </header>
  );
}