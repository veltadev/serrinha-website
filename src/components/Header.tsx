"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/visit", label: "Visit" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          className="flex shrink-0 transition-opacity hover:opacity-85"
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
      </Container>
    </header>
  );
}