"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

  // Mobile collapse state
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Collapse header on scroll (mobile only), unless menu is open
  useEffect(() => {
    if (menuOpen) return;

    let raf = 0;
    const threshold = 48; // px scrolled before collapsing
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setCollapsed(y > threshold);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  const base =
    "sticky top-0 z-40 border-b border-[#D8D2C8] transition-colors duration-300 backdrop-blur";
  const variant = isHome
    ? "border-transparent bg-gradient-to-b from-black/40 to-transparent text-sand"
    : "bg-sand/95 text-ink/90 shadow-sm";

  // When collapsed on mobile, we render a minimal bar with only the burger button
  const headerClass = useMemo(() => {
    // On desktop we never collapse
    // On mobile, collapse only when scrolled and menu isn't open
    return `${base} ${variant} ${collapsed && !menuOpen ? "sm:!sticky" : ""}`;
  }, [base, variant, collapsed, menuOpen]);

  return (
    <header className={headerClass}>
      {/* Collapsed mobile bar */}
      <div
        className={`sm:hidden ${
          collapsed && !menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center justify-end px-4 py-2">
          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-md p-2 transition-colors ${
              isHome
                ? "text-sand/90 hover:text-sand hover:bg-black/20"
                : "text-ink/80 hover:text-ink hover:bg-black/5"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Full header (shown when not collapsed OR on desktop OR when menu is open) */}
      <div
        className={`${
          collapsed && !menuOpen ? "hidden" : "block"
        }`}
      >
        <Container className="flex items-center justify-between gap-3 px-4 py-0 md:px-8 md:py-3">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-85"
            aria-label="Serrinha home"
          >
            <Image
              src="/brand/logo_green_white_crop.svg"
              alt="Serrinha"
              width={900}
              height={260}
              priority
              className="h-[135px] w-auto sm:h-[110px] md:h-[112px]"
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 340px, 420px"
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
      </div>

      {menuOpen && (
        <MobileMenuPortal>
          <div className="fixed inset-0 z-[9999] sm:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
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