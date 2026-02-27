import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <article
      className={`group rounded-2xl border border-olive/10 bg-white/80 backdrop-blur-sm transition-transform transition-colors duration-300 hover:-translate-y-1 hover:border-olive/40 ${className}`}
    >
      <div className="p-6">{children}</div>
    </article>
  );
}

