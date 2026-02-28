interface ProseProps {
  html: string | null | undefined;
}

export function Prose({ html }: ProseProps) {
  if (!html) return null;

  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-ink prose-a:text-olive prose-strong:text-ink"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
