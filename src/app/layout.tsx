import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
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
  verification: {
    google: "xqApGgwWi-MbmBDRKSaldno_9fCI77CKvcA1eFdI_LQ",
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6JHJ4QY1HM"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6JHJ4QY1HM');
          `}
        </Script>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

