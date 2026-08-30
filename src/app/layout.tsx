import type { Metadata, Viewport } from "next";
import { Archivo, Big_Shoulders, DM_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import Boot from "@/components/Boot";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveals from "@/components/Reveals";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-big-shoulders",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const hud = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: ["indie games", "horror games", "game studio", "DarkLab Games", "itch.io"],
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    images: [{ url: "/video/darklab-reel-poster.jpg", width: 1920, height: 1080, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@darklabgames",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/video/darklab-reel-poster.jpg"],
  },
  icons: { icon: "/brand/icon-32.png", apple: "/brand/icon-180.png" },
};

export const viewport: Viewport = {
  themeColor: "#06090a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${hud.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-specimen focus:px-4 focus:py-2 focus:font-hud focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-ink"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              url: site.url,
              logo: `${site.url}/brand/logo-512.png`,
              email: site.email,
              founder: { "@type": "Person", name: site.founder },
              foundingDate: site.founded,
              sameAs: site.socials.map((s) => s.href),
            }),
          }}
        />
        <Boot />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveals />
      </body>
    </html>
  );
}
