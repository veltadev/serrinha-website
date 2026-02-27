import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Serrinha – Regenerative Farm & Retreat",
    template: "%s | Serrinha",
  },
  description:
    "Serrinha is a regenerative farm and nature retreat, cultivating biodiversity, food, and community in harmony with the land.",
  metadataBase: new URL("https://serrinha.pt"),
  icons: {
    icon: "/brand/mark_green_white.svg",
  },
  openGraph: {
    title: "Serrinha – Regenerative Farm & Retreat",
    description:
      "A calm, nature-forward space for regeneration, biodiversity and community.",
    url: "https://serrinha.pt",
    siteName: "Serrinha",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-sand text-ink">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

