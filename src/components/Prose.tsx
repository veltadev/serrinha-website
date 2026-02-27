import DOMPurify from "isomorphic-dompurify";

interface ProseProps {
  html: string | null | undefined;
}

export function Prose({ html }: ProseProps) {
  if (!html) return null;

  const clean = DOMPurify.sanitize(html);

  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-ink prose-a:text-olive prose-strong:text-ink"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}

