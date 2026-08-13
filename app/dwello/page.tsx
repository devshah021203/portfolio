import type { Metadata } from "next";
import Link from "next/link";
import { DeskBotStage } from "@/components/airtrace/DeskBotStage";
import { EarlyAccessForm } from "@/components/airtrace/EarlyAccessForm";
import { RoomSim } from "@/components/airtrace/RoomSim";
import "./dwello.css";

const PAGE_URL = "https://shah-dev.com/dwello";

export const metadata: Metadata = {
  title: "Dwello — a desk robot that senses your room",
  description:
    "Dwello senses your room with radar instead of a camera, and reacts with an expressive face, voice and touch. An in-development prototype by Dev Shah.",
  keywords: [
    "Dwello", "AirTrace", "desk robot", "mmWave radar", "presence detection",
    "camera-free presence", "smart room", "ESP32-C6", "robot companion",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Dwello — a desk robot that senses your room",
    description:
      "Radar room sensing, an expressive face, zero cameras. Currently building.",
    url: PAGE_URL,
    siteName: "Dev Shah",
    type: "website",
    images: [{ url: "/dwello/og.png", width: 1200, height: 630, alt: "Dwello — a desk robot that senses your room" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwello — a desk robot that senses your room",
    description: "Radar room sensing, an expressive face, zero cameras.",
    images: ["/dwello/og.png"],
  },
};

const abilities = [
  ["Senses the room", "Radar picks up presence, movement and position — even when you're sitting still."],
  ["No camera. Ever.", "No lens, no video, no images. Nothing about your room leaves your room."],
  ["Has a face", "Blinks, looks around, gets sleepy when you go, wakes up when you're back."],
  ["Talks back", "Greets you, answers you, and tells you to stand up once in a while."],
  ["Feels touch", "Tap it, pet it, poke it — it reacts."],
  ["Runs your room", "Walk in and the lights come on. Leave and everything powers down."],
];

const inside = [
  "ESP32-C6", "mmWave radar", "1.28″ round LCD",
  "Far-field mic", "Speaker", "Capacitive touch", "USB-C",
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Dwello",
  description:
    "A desk robot that senses your room with radar instead of a camera, and reacts with an expressive face, voice and touch.",
  brand: { "@type": "Brand", name: "AirTrace" },
  url: PAGE_URL,
  image: "https://shah-dev.com/dwello/og.png",
  category: "Smart home device",
  manufacturer: { "@type": "Person", name: "Dev Shah", url: "https://shah-dev.com" },
};

export default function DwelloPage() {
  return (
    <div className="airtrace-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="at-nav">
        <Link href="/" className="at-brand" aria-label="Dev Shah, back to portfolio">
          <span className="at-brand-mark">Dwello</span>
          <span className="at-brand-sub micro-label">by AirTrace</span>
        </Link>
        <a href="#early-access" className="at-nav-cta">Join early access</a>
      </header>

      <main id="main-content">
        {/* ------------------------------------------------------------ hero */}
        <section className="at-hero" aria-labelledby="at-hero-title">
          <div className="at-hero-head">
            <p className="at-eyebrow micro-label">
              <span className="at-dot" aria-hidden="true" />
              Prototype &middot; building now
            </p>
            <h1 id="at-hero-title">
              Meet <em>Dwello.</em>
            </h1>
          </div>

          <DeskBotStage />

          <div className="at-hero-tail">
            <p className="at-lede">
              A little desk robot that senses your room with radar — not a camera —
              and actually reacts to you.
            </p>
            <div className="at-hero-actions">
              <a href="#early-access" className="at-btn at-btn-primary">
                Join early access <span aria-hidden="true">→</span>
              </a>
              <a href="#sense" className="at-btn at-btn-ghost">See what it sees</a>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- statement */}
        <section className="at-section at-statement" aria-label="What makes Dwello different">
          <p className="at-statement-line">Alexa waits for you to speak.</p>
          <p className="at-statement-line is-accent">Dwello already knows you walked in.</p>
        </section>

        {/* -------------------------------------------------------- abilities */}
        <section className="at-section" aria-labelledby="at-does-title">
          <h2 id="at-does-title" className="at-title">What it does</h2>
          <div className="at-feature-grid">
            {abilities.map(([title, text]) => (
              <article key={title} className="at-feature">
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- room sim */}
        <section id="sense" className="at-section" aria-labelledby="at-sense-title">
          <h2 id="at-sense-title" className="at-title">
            This is what it <em>sees.</em>
          </h2>
          <p className="at-section-lede">
            Drag the dot around the room. No camera involved — just presence,
            zones and movement, the way the radar reports them.
          </p>
          <RoomSim />
        </section>

        {/* ---------------------------------------------------------- inside */}
        <section className="at-section at-inside" aria-labelledby="at-inside-title">
          <h2 id="at-inside-title" className="at-title">Inside</h2>
          <ul className="at-chips">
            {inside.map((part) => <li key={part}>{part}</li>)}
          </ul>
          <p className="at-inside-note">
            Built for makers. In development — the design and features will change
            before launch.
          </p>
        </section>

        {/* ---------------------------------------------------- early access */}
        <section id="early-access" className="at-section at-access" aria-labelledby="at-access-title">
          <div className="at-access-copy">
            <h2 id="at-access-title" className="at-title">
              Be first to<br /><em>meet Dwello.</em>
            </h2>
            <p>
              Drop your email for build updates, demo clips, and a chance to test
              Dwello before anyone else.
            </p>
            <p className="at-access-reply">
              You&rsquo;ll get a confirmation email straight away.
            </p>
          </div>
          <EarlyAccessForm />
        </section>
      </main>

      <footer className="at-footer">
        <div className="at-footer-top">
          <p className="at-brand-mark">Dwello</p>
          <div className="at-footer-links">
            <Link href="/">← Dev Shah</Link>
            <a href="mailto:hello.devshah@gmail.com">hello.devshah@gmail.com</a>
          </div>
        </div>
        <p className="at-footer-legal micro-label">
          © {new Date().getFullYear()} AirTrace · Windsor, Canada
        </p>
      </footer>
    </div>
  );
}
