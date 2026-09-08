import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { designBrandList } from "@/data/designs";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Designs",
  description:
    "Brand identities by Dev Shah: logos, packaging, signage, stationery and campaign creative for Keri in Windsor, Voyagea, Dwello, BeamFall, PTRI Innovation and a set of concept brands, each shown as a full case study.",
  keywords: ["logo design Windsor", "brand identity Windsor Ontario", "graphic designer Windsor", "packaging design", "Dev Shah designer", "brand case study"],
  alternates: { canonical: "/designs" },
  openGraph: {
    title: "Designs — Dev Shah",
    description: "Brand identities shown as full case studies: mark, colour, type and applications.",
    url: "/designs",
    type: "website",
    images: [{ url: "/designs/keri/box.webp", width: 1600, height: 1000, alt: "Keri in Windsor box by Dev Shah" }],
  },
};

export default function DesignsPage() {
  const real = designBrandList.filter((b) => b.real);
  const concept = designBrandList.filter((b) => !b.real);
  const pieceCount = designBrandList.reduce((n, b) => n + b.pieces.length, 0);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Designs by Dev Shah",
    url: `${siteUrl}/designs`,
    description: metadata.description,
    author: { "@type": "Person", name: "Dev Shah", url: siteUrl },
    hasPart: designBrandList.map((b) => ({ "@type": "CreativeWork", name: `${b.name} identity`, url: `${siteUrl}/designs/${b.key}` })),
  };

  const Card = ({ b, i }: { b: (typeof designBrandList)[number]; i: number }) => {
    const hero = b.pieces[0];
    const dark = darkest(b.palette);
    return (
      <li className="brand-card" data-reveal data-delay={String(i % 3)}>
        <Link href={`/designs/${b.key}`} className="brand-open">
          <span className="brand-media lit">
            <Image src={`/designs/${b.key}/${hero.slug}-thumb.webp`} alt={`${b.name}: ${hero.title}`} width={720} height={Math.round((720 * hero.height) / hero.width)} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" priority={i < 3} />
            <span className="brand-badge" style={{ background: dark }} dangerouslySetInnerHTML={{ __html: b.markDark }} />
          </span>
          <span className="brand-meta">
            <span className="brand-name display">{b.name}</span>
            <span className="brand-what">{b.what.replace(/^Concept: /, "")}</span>
            <span className="mono muted">{b.pieces.length - 1} applications · {b.year}</span>
          </span>
        </Link>
      </li>
    );
  };

  return (
    <main className="wrap page designs">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="eyebrow mono">Designs</p>
      <h1 className="page-title display">Brands, built whole.</h1>
      <p className="page-tag">
        {designBrandList.length} identities and {pieceCount} pieces. Each brand is a full case study: the idea, the mark on a grid, colour, type, and the applications it has to survive in.
      </p>

      <section aria-labelledby="real-title" className="brand-section">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="real-title">In use</h2>
          <p className="section-note">Brands I run or build for. The mark on the box is the mark on the site.</p>
        </div>
        <ul className="brand-grid">{real.map((b, i) => <Card key={b.key} b={b} i={i} />)}</ul>
      </section>

      <section aria-labelledby="concept-title" className="brand-section">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="concept-title">Concepts</h2>
          <p className="section-note">Invented brands, one per category I wanted to work in. Clearly labelled as such.</p>
        </div>
        <ul className="brand-grid">{concept.map((b, i) => <Card key={b.key} b={b} i={i} />)}</ul>
      </section>
    </main>
  );
}

/** The darkest colour in a palette, used as the reversed-mark ground. */
function darkest(palette: Record<string, string>) {
  return Object.values(palette).sort((a, b) => lum(a) - lum(b))[0];
}
function lum(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}
