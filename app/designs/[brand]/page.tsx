import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseGallery from "@/components/CaseGallery";
import { brandOrder, designBrands } from "@/data/designs";
import { siteUrl } from "@/lib/seo";

type Params = { brand: string };

export function generateStaticParams() {
  return brandOrder.map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { brand } = await params;
  const b = designBrands[brand];
  if (!b) return {};
  const title = `${b.name} identity`;
  const description = `${b.what}. ${b.role}. Brand identity, packaging and creative by Dev Shah.`;
  return {
    title,
    description,
    alternates: { canonical: `/designs/${brand}` },
    openGraph: { title, description, url: `/designs/${brand}`, type: "article", images: [{ url: `/designs/${brand}/${b.pieces[0].slug}.webp`, width: b.pieces[0].width, height: b.pieces[0].height, alt: `${b.name}: ${b.pieces[0].title}` }] },
    twitter: { card: "summary_large_image", title, description, images: [`/designs/${brand}/${b.pieces[0].slug}.webp`] },
  };
}

/** Grid lines and clear-space guides drawn over the mark. */
function ConstructionOverlay() {
  const lines: string[] = [];
  for (let i = 0; i <= 120; i += 10) lines.push(`M${i} 0V120M0 ${i}H120`);
  return (
    <svg className="construct-grid" viewBox="0 0 120 120" aria-hidden="true">
      <path d={lines.join("")} />
      <rect x="6" y="6" width="108" height="108" className="construct-clear" />
      <path d="M60 0V120M0 60H120" className="construct-axis" />
    </svg>
  );
}

export default async function BrandCasePage({ params }: { params: Promise<Params> }) {
  const { brand } = await params;
  const b = designBrands[brand];
  if (!b) notFound();
  const i = brandOrder.indexOf(brand);
  const next = designBrands[brandOrder[(i + 1) % brandOrder.length]];
  const hero = b.pieces[0];
  const type = b.pieces.find((p) => p.slug === "type");
  const apps = b.pieces.filter((p) => p.slug !== "type" && p.slug !== hero.slug);
  const dark = darkest(b.palette);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${b.name} identity`,
    url: `${siteUrl}/designs/${brand}`,
    image: `${siteUrl}/designs/${brand}/${hero.slug}.webp`,
    description: b.brief,
    author: { "@type": "Person", name: "Dev Shah", url: siteUrl },
    genre: b.real ? "Brand identity" : "Brand identity concept",
  };

  return (
    <main className="wrap page case">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/designs" className="back mono">All designs</Link>
      <p className="eyebrow mono">{b.what} · {b.year}{!b.real && <span className="chip-tag" style={{ marginLeft: 10 }}>concept</span>}</p>
      <h1 className="page-title display">{b.name}</h1>
      <p className="page-tag">{b.role}.</p>

      <div className="case-hero lit" data-reveal>
        <Image src={`/designs/${brand}/${hero.slug}.webp`} alt={`${b.name}: ${hero.title}`} width={hero.width} height={hero.height} sizes="(max-width: 860px) 100vw, 1320px" priority />
      </div>

      <section className="idea" aria-labelledby="idea-title">
        <div className="idea-mark" data-reveal>
          <div className="mark-tile" style={{ background: "rgb(var(--bg2))" }} dangerouslySetInnerHTML={{ __html: b.markLight }} />
          <div className="mark-tile" style={{ background: dark }} dangerouslySetInnerHTML={{ __html: b.markDark }} />
        </div>
        <div className="idea-text" data-reveal data-delay="1">
          <h2 className="display" id="idea-title">The idea</h2>
          <p className="idea-brief">{b.brief}</p>
          <dl className="idea-meta">
            <div><dt className="mono">Role</dt><dd>{b.role}</dd></div>
            <div><dt className="mono">Type</dt><dd>{b.fonts.display} with {b.fonts.body}</dd></div>
            <div><dt className="mono">Status</dt><dd>{b.real ? "In use" : "Concept, invented to explore the category"}</dd></div>
          </dl>
        </div>
      </section>

      <section className="mark-section" aria-labelledby="mark-title">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="mark-title">Mark and lockup</h2>
          <p className="section-note">Drawn once as vector and reused across every application. Clear space is half the mark&apos;s height on all sides.</p>
        </div>
        <div className="mark-panels">
          <div className="mark-panel lit" style={{ background: "rgb(var(--bg2))" }} data-reveal>
            <Image src={`/designs/${brand}/lockup-light.webp`} alt={`${b.name} lockup, positive`} width={1400} height={420} sizes="(max-width: 860px) 100vw, 44vw" />
          </div>
          <div className="mark-panel lit" style={{ background: dark }} data-reveal data-delay="1">
            <Image src={`/designs/${brand}/lockup-dark.webp`} alt={`${b.name} lockup, reversed`} width={1400} height={420} sizes="(max-width: 860px) 100vw, 44vw" />
          </div>
          <div className="mark-panel construct lit" data-reveal data-delay="2">
            <div className="construct-mark" dangerouslySetInnerHTML={{ __html: b.markLight }} />
            <ConstructionOverlay />
            <span className="mono muted construct-label">120-unit grid · clear space</span>
          </div>
        </div>
      </section>

      <section className="colour-section" aria-labelledby="colour-title">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="colour-title">Colour</h2>
          <p className="section-note">Named for what they are in the brand&apos;s world, not for what they look like.</p>
        </div>
        <div className="swatch-row" data-reveal>
          {Object.entries(b.palette).map(([name, hex]) => (
            <div key={name} className="swatch lit" style={{ background: hex, color: luminance(hex) > 0.6 ? "rgba(0,0,0,.8)" : "rgba(255,255,255,.92)" }}>
              <span className="swatch-name">{name}</span>
              <span className="mono">{hex}</span>
            </div>
          ))}
        </div>
      </section>

      {type && (
        <section className="type-section" aria-labelledby="type-title">
          <div className="section-head" data-reveal>
            <h2 className="section-title display" id="type-title">Type</h2>
            <p className="section-note">{b.fonts.display} for the voice, {b.fonts.body} for everything that has to be read.</p>
          </div>
          <div className="case-hero lit" data-reveal>
            <Image src={`/designs/${brand}/${type.slug}.webp`} alt={`${b.name} type specimen`} width={type.width} height={type.height} sizes="(max-width: 860px) 100vw, 1320px" />
          </div>
        </section>
      )}

      <section className="apps-section" aria-labelledby="apps-title">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="apps-title">Applications</h2>
          <p className="section-note">{apps.length + 1} pieces including the one above, each built from the same mark, palette and type.</p>
        </div>
        <CaseGallery brandKey={brand} brandName={b.name} pieces={apps} />
      </section>

      <div className="next-link">
        <span className="mono">Next brand</span>
        <Link href={`/designs/${next.key}`}>{next.name}</Link>
      </div>
    </main>
  );
}

function luminance(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}

/** The darkest colour in a palette, used as the reversed-mark ground. */
function darkest(palette: Record<string, string>) {
  return Object.values(palette).sort((a, b) => lum(a) - lum(b))[0];
}
function lum(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
}
