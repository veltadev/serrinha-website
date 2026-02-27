import Image from "next/image";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[#D8D2C8] bg-[#2F3A2E]">
      <Container className="flex flex-col gap-10 px-6 py-24 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Image
            src="/brand/logo_white_green.svg"
            alt="Serrinha"
            width={192}
            height={64}
            className="h-28 w-auto"
          />
          <p className="mt-8 max-w-sm text-xs text-sand/70">
            Regenerative agriculture and gentle hospitality, restoring balance
            between people and land.
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs text-sand/70">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="underline-offset-4 hover:text-sand hover:underline"
          >
            Instagram
          </a>
          <p className="text-sand/60">
            &copy; {year} Serrinha. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

