import { ReactNode } from "react";
import { Container } from "./Container";
import { Button } from "./Button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  children?: ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  children,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-forest text-sand">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "url(/hero.jpg), radial-gradient(circle at top, rgba(0,0,0,0.4), transparent 60%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

      <Container className="relative z-10 flex min-h-[60vh] flex-col justify-center gap-8 py-20 sm:py-28">
        <div className="max-w-xl space-y-5 animate-fade-in">
          <p className="text-xs uppercase tracking-[0.25em] text-sand/70">
            Regenerative farm & retreat
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="text-sm text-sand/80 sm:text-base">{subtitle}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href={primaryCtaHref}>{primaryCtaLabel}</Button>
            {secondaryCtaLabel && secondaryCtaHref ? (
              <Button href={secondaryCtaHref} variant="ghost">
                {secondaryCtaLabel}
              </Button>
            ) : null}
          </div>
        </div>

        {children ? (
          <div className="mt-6 max-w-2xl text-xs text-sand/70">{children}</div>
        ) : null}
      </Container>
    </section>
  );
}

