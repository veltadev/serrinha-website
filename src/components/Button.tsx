import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  href?: string;
}

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-olive disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-sand hover:bg-forest",
  ghost:
    "bg-transparent text-ink border border-olive/30 hover:border-olive/60 hover:bg-olive/5",
};

export function Button({
  children,
  variant = "primary",
  href,
  ...props
}: ButtonProps) {
  const className = `${base} ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

