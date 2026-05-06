interface ShareButtonProps {
  url: string;
  title?: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const encodedUrl = encodeURIComponent(url);
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

  return (
    <a
      href={facebookUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share on Facebook"
      className="inline-flex items-center gap-2 rounded-lg border border-olive/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-olive/50 hover:bg-olive/5"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
      {title ?? "Share on Facebook"}
    </a>
  );
}
