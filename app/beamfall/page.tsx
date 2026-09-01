import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./beamfall.css";

const APP_STORE_URL = "https://apps.apple.com/ca/app/beamfall/id6805519789";
const PAGE_URL = "https://shah-dev.com/beamfall";

export const metadata: Metadata = {
  title: "BeamFall — bend light and solve the grid",
  description:
    "BeamFall is a free iPhone logic puzzle by Dev Shah. Route coloured beams through mirrors, prisms, tints and gates across 100 machine-verified levels and ten boss runs.",
  keywords: [
    "BeamFall", "Beamfall game", "BeamFall iPhone game", "light puzzle game",
    "logic puzzle iOS", "offline puzzle game", "Dev Shah game developer", "PTRI Innovation game",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "BeamFall — bend light and solve the grid",
    description: "A pure light-routing puzzle with 100 verified levels, ten boss runs and no ads or purchases.",
    url: PAGE_URL,
    siteName: "Dev Shah",
    type: "website",
    images: [{
      url: "/beamfall/icon.webp",
      width: 1024,
      height: 1024,
      alt: "BeamFall app icon with cyan and magenta light passing through glass prisms",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeamFall — bend light and solve the grid",
    description: "100 verified puzzles. Ten boss runs. One tap to turn the light.",
    images: ["/beamfall/icon.webp"],
  },
};

const pieces = [
  ["/", "Mirror", "Bounces a beam through ninety degrees."],
  ["Y", "Splitter", "Bends the light and sends a second beam straight ahead."],
  ["⌞", "Prism", "Opens one corner channel and absorbs a beam that hits the wrong face."],
  ["T", "Tint", "Changes a beam's colour before it reaches the next piece."],
  ["=", "Gate", "Only allows light of its matching colour to pass."],
  ["■", "Wall", "Stops every beam. Route around it or use it for containment."],
  ["◎", "Target", "Complete the puzzle by lighting every ring in the right colour."],
];

const screenshots = [
  ["/beamfall/screens/prism.webp", "Turn mirrors and prisms to route a cyan beam through the puzzle grid."],
  ["/beamfall/screens/cleared.webp", "A cleared BeamFall level showing the solved light path and diamond score."],
  ["/beamfall/screens/shapes.webp", "BeamFall Shapes mode adds glyphs and dash patterns for accessible colour puzzles."],
  ["/beamfall/screens/levels.webp", "BeamFall level select showing progress across one hundred levels."],
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["VideoGame", "SoftwareApplication"],
  name: "Beamfall",
  alternateName: "BeamFall",
  url: PAGE_URL,
  image: "https://shah-dev.com/beamfall/icon.webp",
  description: "A free light-routing logic puzzle for iPhone with 100 machine-verified levels and ten boss runs.",
  applicationCategory: "GameApplication",
  gamePlatform: ["iPhone", "iOS"],
  operatingSystem: "iOS 16.4 or later",
  genre: ["Puzzle", "Strategy"],
  author: { "@type": "Person", name: "Dev Shah", url: "https://shah-dev.com" },
  publisher: { "@type": "Organization", name: "PTRI Innovation Private Limited", url: "https://ptriinnovation.com" },
  offers: {
    "@type": "Offer", price: "0", priceCurrency: "CAD",
    availability: "https://schema.org/InStock", url: APP_STORE_URL,
  },
};

export default function BeamfallPage() {
  return (
    <div className="beamfall-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="bf-nav">
        <Link href="/" className="bf-brand" aria-label="Back to Dev Shah's portfolio">
          <Image src="/beamfall/icon.webp" width={42} height={42} alt="" />
          <span><strong>BeamFall</strong><small>by Dev Shah</small></span>
        </Link>
        <div className="bf-nav-actions" aria-label="BeamFall availability">
          <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="bf-store bf-store-primary">
            <span>Available on</span><strong>App Store</strong>
          </a>
          <span className="bf-store bf-store-soon" aria-label="Google Play, launching soon">
            <span>Available on</span><strong>Google Play <i>Launching soon</i></strong>
          </span>
        </div>
      </header>

      <main id="main-content">
        <section className="bf-hero" aria-labelledby="bf-title">
          <div className="bf-hero-copy">
            <p className="bf-kicker"><span /> Puzzle game · Free on iPhone</p>
            <h1 id="bf-title">Bend light.<br /><em>Solve the grid.</em></h1>
            <p className="bf-lede">Light one beam. Turn mirrors, prisms and colour gates until every target burns in exactly the right colour.</p>
            <div className="bf-hero-actions">
              <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="bf-button bf-button-primary">
                Download on the App Store <span aria-hidden="true">↗</span>
              </a>
              <a href="#how-it-works" className="bf-button bf-button-ghost">See how it works</a>
            </div>
            <dl className="bf-stats" aria-label="BeamFall game details">
              <div><dt>100</dt><dd>Levels</dd></div>
              <div><dt>10</dt><dd>Boss runs</dd></div>
              <div><dt>300</dt><dd>Diamonds</dd></div>
              <div><dt>0</dt><dd>Ads</dd></div>
            </dl>
          </div>

          <div className="bf-hero-visual" aria-label="BeamFall on iPhone">
            <div className="bf-beam bf-beam-cyan" aria-hidden="true" />
            <div className="bf-beam bf-beam-magenta" aria-hidden="true" />
            <div className="bf-phone">
              <Image
                src="/beamfall/screens/home.webp"
                alt="BeamFall home screen on iPhone with the title, level progress and play controls"
                width={1287}
                height={2796}
                priority
                sizes="(max-width: 900px) 74vw, 38vw"
              />
            </div>
            <div className="bf-orbit bf-orbit-one" aria-hidden="true" />
            <div className="bf-orbit bf-orbit-two" aria-hidden="true" />
          </div>
        </section>

        <section className="bf-marquee" aria-label="BeamFall highlights">
          <div><span>Think in light</span><i>◆</i><span>One tap to turn</span><i>◆</i><span>Every route verified</span><i>◆</i><span>Play offline</span></div>
        </section>

        <section id="how-it-works" className="bf-section bf-intro" aria-labelledby="bf-intro-title">
          <p className="bf-section-index">01 / The idea</p>
          <div className="bf-intro-grid">
            <h2 id="bf-intro-title">One beam.<br />Seven pieces.<br /><em>One verb.</em></h2>
            <div>
              <p className="bf-big-copy">Every object turns with a tap. The rules stay simple while their combinations become increasingly difficult.</p>
              <p>Rotate a mirror, open a prism face, recolour a beam and pass it through the correct gate. The level ends only when every target ring is lit—and late boss levels demand that no light escapes the board.</p>
            </div>
          </div>
        </section>

        <section className="bf-section" aria-labelledby="bf-pieces-title">
          <div className="bf-section-head">
            <div><p className="bf-section-index">02 / The optical kit</p><h2 id="bf-pieces-title">Learn the pieces.<br /><em>Master the route.</em></h2></div>
            <p>Seven readable rules create hundreds of possible paths.</p>
          </div>
          <div className="bf-piece-grid">
            {pieces.map(([symbol, name, description], index) => (
              <article key={name} className="bf-piece">
                <div className={`bf-piece-symbol bf-piece-symbol-${index + 1}`} aria-hidden="true">{symbol}</div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{name}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bf-section bf-boss" aria-labelledby="bf-boss-title">
          <div className="bf-boss-copy">
            <p className="bf-section-index">03 / Every tenth level</p>
            <h2 id="bf-boss-title">Boss runs<br /><em>fight back.</em></h2>
            <p>Every tenth puzzle expands the board, adds emitters and raises the optimal tap count. Late runs introduce a no-leak rule: solve every target without letting a single beam escape the grid.</p>
            <ul>
              <li><strong>2 → 12</strong><span>minimum taps from level 1 to 100</span></li>
              <li><strong>9 × 8</strong><span>maximum puzzle board</span></li>
              <li><strong>2 beams</strong><span>to route at once</span></li>
            </ul>
          </div>
          <div className="bf-boss-phone">
            <Image src="/beamfall/screens/boss.webp" alt="BeamFall boss level 60 with multiple cyan and violet beams on a large puzzle grid" width={1287} height={2796} sizes="(max-width: 900px) 82vw, 42vw" />
          </div>
        </section>

        <section className="bf-section bf-progress" aria-labelledby="bf-progress-title">
          <p className="bf-section-index">04 / Proven difficulty</p>
          <div className="bf-progress-copy">
            <h2 id="bf-progress-title">Not guessed.<br /><em>Machine-verified.</em></h2>
            <p>Every level was generated and then checked for its exact minimum solution. BeamFall orders the full campaign by proven difficulty, so every new mechanic and larger board earns its place.</p>
          </div>
          <div className="bf-level-line" aria-label="Difficulty rises from level 1 to level 100">
            <span>Level 001</span><div><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><span>Boss 100</span>
          </div>
        </section>

        <section className="bf-gallery-section" aria-labelledby="bf-gallery-title">
          <div className="bf-section bf-gallery-head">
            <p className="bf-section-index">05 / Inside the game</p>
            <h2 id="bf-gallery-title">Every beam tells you<br /><em>what happened.</em></h2>
          </div>
          <div className="bf-gallery">
            {screenshots.map(([src, alt], index) => (
              <figure key={src} className={index % 2 === 0 ? "is-high" : ""}>
                <Image src={src} alt={alt} width={1287} height={2796} sizes="(max-width: 700px) 78vw, 28vw" />
              </figure>
            ))}
          </div>
        </section>

        <section className="bf-section bf-accessible" aria-labelledby="bf-accessible-title">
          <div><p className="bf-section-index">06 / Built for focus</p><h2 id="bf-accessible-title">Nothing between<br /><em>you and the grid.</em></h2></div>
          <div className="bf-promise-grid">
            <article><span>Shapes mode</span><h3>Colour is never the only signal.</h3><p>Optional glyphs and unique beam dash patterns keep every puzzle readable for colour-blind players.</p></article>
            <article><span>Accessible by design</span><h3>Motion and controls respect you.</h3><p>Reduce Motion is supported and every interactive game control is labelled for VoiceOver.</p></article>
            <article><span>Truly free</span><h3>No monetization maze.</h3><p>No adverts, in-app purchases, subscriptions, account or sign-in. The entire game stays playable for free.</p></article>
            <article><span>Private and offline</span><h3>The app stays on your device.</h3><p>BeamFall itself has no tracking and does not require network access. It works in aeroplane mode, forever.</p></article>
          </div>
        </section>

        <section className="bf-final" aria-labelledby="bf-final-title">
          <Image src="/beamfall/icon.webp" width={180} height={180} alt="BeamFall app icon" />
          <p>Ready when you are.</p>
          <h2 id="bf-final-title">Find the<br /><em>perfect route.</em></h2>
          <div className="bf-final-actions">
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="bf-button bf-button-primary">Download free on the App Store <span aria-hidden="true">↗</span></a>
            <span className="bf-button bf-button-disabled">Google Play · Launching soon</span>
          </div>
        </section>
      </main>

      <footer className="bf-footer">
        <div><strong>BeamFall</strong><span>A game by Dev Shah · Published by PTRI Innovation</span></div>
        <div><Link href="/">← Portfolio</Link><a href={APP_STORE_URL} target="_blank" rel="noreferrer">App Store ↗</a></div>
      </footer>
    </div>
  );
}
