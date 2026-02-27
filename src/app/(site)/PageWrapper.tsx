import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Prose } from "@/components/Prose";
import { getPageByPath } from "@/lib/wpgraphql/api";
import { buildMetadataFromContent } from "@/lib/seo";

function deriveTitleFromPath(path: string): string {
  if (path === "/" || path === "") return "Serrinha";
  const segment = path.split("/").filter(Boolean).pop() ?? "";
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function makePage(path: string) {
  const page = await getPageByPath(path);

  if (!page) {
    const fallbackTitle = deriveTitleFromPath(path);

    return (
      <Container>
        <header className="mb-6">
          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {fallbackTitle}
          </h1>
        </header>
        <p className="text-sm text-muted">Content coming soon.</p>
      </Container>
    );
  }

  return (
    <Container>
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {page.title}
        </h1>
      </header>
      <Prose html={page.content} />
    </Container>
  );
}

export async function makeMetadata(
  path: string,
  fallbackTitle: string,
  fallbackDescription?: string,
): Promise<Metadata> {
  const page = await getPageByPath(path);
  if (!page) {
    return { title: fallbackTitle, description: fallbackDescription };
  }

  return buildMetadataFromContent({
    title: page.title || fallbackTitle,
    description: fallbackDescription,
    html: page.content ?? undefined,
  });
}

