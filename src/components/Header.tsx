"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";

const links = [
  { href: "/", label: "Home" },
  { href: "/regenerative", label: "Regenerative" },
  { href: "/products", label: "Products" },
  { href: "/visit", label: "Visit" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const base =
    "sticky top-0 z-40 border-b transition-colors duration-300 backdrop-blur";
  const variant = isHome
    ? "border-transparent bg-gradient-to-b from-black/40 to-transparent text-sand"
    : "border-olive/10 bg-sand/95 text-ink/90 shadow-sm";

  return (
    <header className={`${base} ${variant}`}>
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="text-lg font-serif tracking-tight text-current transition-opacity hover:opacity-80"
        >
          Serrinha
        </Link>
        <nav className="hidden gap-6 text-sm sm:flex">
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

