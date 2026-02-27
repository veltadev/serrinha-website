import type { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ title, eyebrow, children, className = "" }: SectionProps) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <Container>
        {(title || eyebrow) && (
          <header className="mb-8 space-y-2">
            {eyebrow && (
              <p className="text-xs uppercase tracking-[0.25em] text-muted">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl text-ink">
                {title}
              </h2>
            )}
          </header>
        )}
        <div className="space-y-6">{children}</div>
      </Container>
    </section>
  );
}

