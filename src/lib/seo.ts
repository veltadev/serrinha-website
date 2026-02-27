import type { Metadata } from "next";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function buildMetadataFromContent(options: {
  title: string;
  description?: string;
  html?: string | null;
}): Metadata {
  const { title, description, html } = options;

  let finalDescription = description;

  if (!finalDescription && html) {
    const text = stripHtml(html);
    finalDescription = text.slice(0, 160);
  }

  return {
    title,
    description: finalDescription,
    openGraph: {
      title,
      description: finalDescription,
    },
  };
}

