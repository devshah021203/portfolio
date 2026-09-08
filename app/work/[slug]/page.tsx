import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DwelloForm from "@/components/DwelloForm";
import { builds, getBuild } from "@/data/builds";
import { getProject, projects } from "@/data/projects";
import { siteUrl } from "@/lib/seo";

type Params = { slug: string };

const order = [...projects.map((p) => p.slug), ...builds.map((b) => b.slug)];

export function generateStaticParams() {
  return order.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  const build = getBuild(slug);
  const item = project ?? build;
  if (!item) return {};
  const title = project ? `${project.name} — ${project.category}` : `${build!.name} — ${build!.kind}`;
  return {
    title,
    description: item.summary,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title,
      description: item.summary,
      url: `/work/${slug}`,
      type: "article",
      images: [{ url: item.image, alt: item.imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description: item.summary, images: [item.image] },
  };
}

function nextOf(slug: string) {
  const i = order.indexOf(slug);
  const next = order[(i + 1) % order.length];
  return getProject(next) ?? getBuild(next)!;
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const build = getBuild(slug);
  if (!project && !build) notFound();
  const item = (project ?? build)!;
  const next = nextOf(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": build ? (build.slug === "beamfall" ? "VideoGame" : "Product") : "CreativeWork",
    name: item.name,
    url: `${siteUrl}/work/${slug}`,
    image: `${siteUrl}${item.image}`,
    description: item.summary,
    author: { "@type": "Person", name: "Dev Shah", url: siteUrl },
    ...(build?.slug === "beamfall"
      ? {
          applicationCategory: "GameApplication",
          gamePlatform: ["iPhone", "iOS"],
          offers: { "@type": "Offer", price: "0", priceCurrency: "CAD", url: build.url },
        }
      : {}),
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteUrl}/#work` },
      { "@type": "ListItem", position: 3, name: item.name, item: `${siteUrl}/work/${slug}` },
    ],
  };

  return (
    <main className="wrap page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Link href="/#work" className="back mono">Back to work</Link>
      <p className="eyebrow mono">{project ? project.category : `${build!.kind} · ${build!.year}`}</p>
      <h1 className="page-title display">{item.name}</h1>
      <p className="page-tag">{item.tagline}</p>

      <dl className="meta-grid">
        <div>
          <dt className="mono">Role</dt>
          <dd>{item.role}</dd>
        </div>
        <div>
          <dt className="mono">Stack</dt>
          <dd className="chips">{item.stack.map((s) => <span key={s}>{s}</span>)}</dd>
        </div>
        <div>
          <dt className="mono">{build ? "Where" : "Live"}</dt>
          <dd>
            {item.url ? (
              <a href={item.url} rel="noopener">{project ? project.urlLabel : build!.urlLabel}</a>
            ) : (
              "Early access below"
            )}
          </dd>
        </div>
      </dl>

      <div
        className="page-media lit"
        data-fit={build ? "contain" : "cover"}
        data-ratio={build ? "tall" : undefined}
        style={build ? { aspectRatio: build.slug === "beamfall" ? "16 / 9" : "4 / 3" } : undefined}
      >
        {build?.slug === "beamfall" ? (
          <div className="gallery" style={{ padding: 24, gridAutoColumns: "min(200px, 40vw)" }}>
            {build.gallery!.slice(0, 5).map((g) => (
              <figure key={g.src}>
                <Image src={g.src} alt={g.alt} width={1287} height={2796} sizes="200px" />
              </figure>
            ))}
          </div>
        ) : (
          <Image src={item.image} alt={item.imageAlt} width={1600} height={1000} sizes="(max-width: 860px) 100vw, 1320px" priority />
        )}
      </div>

      <section className="story-wrap">
        <p className="story-lede" style={{ marginTop: 56 }}>{item.description}</p>
        {build && (
          <ul className="facts">
            {build.facts.map(([k, v]) => (
              <li key={k}><span className="mono">{k}</span><strong>{v}</strong></li>
            ))}
          </ul>
        )}
        <div className="story" style={{ paddingTop: 0 }}>
          <div><h2 className="display">The problem</h2><p>{item.challenge}</p></div>
          <div><h2 className="display">The approach</h2><p>{item.approach}</p></div>
          <div><h2 className="display">What shipped</h2><p>{item.outcome}</p></div>
        </div>
      </section>

      {build?.slug === "beamfall" && build.gallery && (
        <section aria-label="Screens" style={{ paddingBottom: 48 }}>
          <div className="gallery">
            {build.gallery.map((g) => (
              <figure key={g.src}>
                <Image src={g.src} alt={g.alt} width={1287} height={2796} sizes="240px" />
                <figcaption>{g.alt}</figcaption>
              </figure>
            ))}
          </div>
          <p className="actions">
            <a className="btn btn-fill" href={build.url} rel="noopener">Get BeamFall on the App Store</a>
          </p>
        </section>
      )}

      {build?.slug === "dwello" && (
        <section className="signup" id="early-access" aria-labelledby="ea-title">
          <div>
            <h2 className="display" id="ea-title">Early access</h2>
            <p>The first batch is small. Leave your email and you will hear from Dev directly when units are ready, with no newsletter in between.</p>
          </div>
          <DwelloForm />
        </section>
      )}

      {project && (
        <p className="actions" style={{ marginBottom: 40 }}>
          <a className="btn btn-fill" href={project.url} rel="noopener">Visit {project.urlLabel}</a>
        </p>
      )}

      <div className="next-link">
        <span className="mono">Next</span>
        <Link href={`/work/${next.slug}`}>{next.name}</Link>
      </div>
    </main>
  );
}
