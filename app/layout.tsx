import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Schibsted_Grotesk, Young_Serif } from "next/font/google";
import Link from "next/link";
import Lighting from "@/components/Lighting";
import Reveal from "@/components/Reveal";
import WindsorClock from "@/components/WindsorClock";
import { EMAIL } from "@/components/CopyEmail";
import { baseMetadata, personJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const body = Schibsted_Grotesk({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = baseMetadata;
export const viewport: Viewport = { themeColor: "#0b0f19", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Lighting />
        <Reveal />
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Dev Shah, home">Dev Shah</Link>
          <nav className="nav" aria-label="Site">
            <Link href="/#work">Work</Link>
            <Link href="/#builds">Builds</Link>
            <Link href="/designs">Designs</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/#contact">Contact</Link>
          </nav>
          <div className="header-right">
            <WindsorClock />
            <a className="btn" href={`mailto:${EMAIL}`}>Email me</a>
          </div>
        </header>
        {children}
        <footer className="wrap site-footer mono">
          <span>© {new Date().getFullYear()} Dev Shah · Windsor, Ontario</span>
          <nav aria-label="Footer">
            <Link href="/designs">Designs</Link>
            <Link href="/insights">Insights</Link>
            <a href="https://voyagea.travel">Voyagea</a>
            <a href="https://keriinwindsor.ca">Keri in Windsor</a>
            <a href="https://www.ptriinnovation.com">PTRI Innovation</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
