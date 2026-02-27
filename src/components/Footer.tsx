import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-olive/10 bg-sand/95">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-serif text-base text-ink">Serrinha</p>
          <p className="max-w-sm text-xs text-muted">
            Regenerative agriculture and gentle hospitality, restoring balance
            between people and land.
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:underline"
          >
            Instagram
          </a>
          <p className="text-xs text-muted/80">
            &copy; {year} Serrinha. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

