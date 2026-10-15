import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EMAIL } from "@/components/CopyEmail";
import { samples } from "@/data/samples";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sample sites",
  description:
    "Working sample websites Dev Shah built for businesses in Ontario before they signed: an engineering firm with its own admin, a popcorn farm store, a Punjabi restaurant, a Main Street boutique and a law firm.",
  keywords: ["website design Ontario", "small business website Windsor", "website redesign sample", "Dev Shah web designer"],
  alternates: { canonical: "/samples" },
  openGraph: {
    title: "Sample sites — Dev Shah",
    description: "Working sample websites, built before the business said yes.",
    url: "/samples",
    type: "website",
    images: [{ url: samples[0].image, width: 1600, height: 1000, alt: `${samples[0].name} sample site` }],
  },
};

export default function SamplesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Sample sites by Dev Shah",
    url: `${siteUrl}/samples`,
    description: metadata.description,
    author: { "@type": "Person", name: "Dev Shah", url: siteUrl },
    hasPart: samples.map((s) => ({ "@type": "CreativeWork", name: `${s.name} sample site`, url: s.url })),
  };

  return (
    <main className="wrap page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/" className="back mono">Home</Link>
      <p className="eyebrow mono">{samples.length} samples · all live</p>
      <h1 className="page-title display">Sample sites</h1>
      <p className="page-tag samples-intro">
        A proposal asks a business to imagine their new website. A sample lets them click through it.
      </p>
      <p className="samples-intro muted" style={{ marginTop: 18 }}>
        Each of these was built for a real business, with their own name, photos, products and facts, before
        anything was agreed. Every page carries a banner saying it is a sample, not the official site.
      </p>

      <ol className="sample-rows">
        {samples.map((s, i) => (
          <li className="sample-row" key={s.slug} id={s.slug} data-reveal>
            <a className="sample-media" href={s.url} rel="noopener" target="_blank" aria-label={`Open the ${s.name} sample`}>
              <div className="sample-screen lit">
                <Image src={s.image} alt={`${s.name} sample site on a laptop`} width={1600} height={1000} sizes="(max-width: 860px) 100vw, 55vw" priority={i === 0} />
              </div>
              <div className="sample-phone lit">
                <Image src={s.phone} alt={`${s.name} sample site on a phone`} width={780} height={1688} sizes="150px" />
              </div>
            </a>
            <div>
              <span className="mono">{s.sector} · {s.place}</span>
              <h2 className="display">{s.name}</h2>
              <p>{s.summary}</p>
              <h3>What was wrong</h3>
              <p>{s.problem}</p>
              <h3>What the sample does</h3>
              <ul>
                {s.built.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <a className="btn" href={s.url} rel="noopener" target="_blank">Open the sample</a>
            </div>
          </li>
        ))}
      </ol>

      <section className="samples-cta" aria-labelledby="cta-title">
        <h2 className="display" id="cta-title">Want one for your business?</h2>
        <p>
          Send me your current website, or just your business name if you do not have one. I will build a sample of
          the new one first. You only go ahead if you like it.
        </p>
        <p className="actions">
          <a className="btn btn-fill" href={`mailto:${EMAIL}?subject=A%20sample%20site%20for%20my%20business`}>Ask for a sample</a>
        </p>
      </section>
    </main>
  );
}
