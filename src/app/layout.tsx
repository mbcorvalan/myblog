import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

// Títulos
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
// Textos y posts
const newsreader = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-body", display: "swap" });
// Fechas, etiquetas y detalles
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s · ${siteConfig.title}` },
  description: siteConfig.subtitle,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${newsreader.variable} ${plexMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
