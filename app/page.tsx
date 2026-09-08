import Image from "next/image";
import Link from "next/link";
import Bridge from "@/components/Bridge";
import CopyEmail, { EMAIL } from "@/components/CopyEmail";
import Sky from "@/components/Sky";
import { articles } from "@/data/articles";
import { designBrandList } from "@/data/designs";
import { builds } from "@/data/builds";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";

// Display order and grid span: two rows of 7 + 5, then one cinematic 12.
const layout: [string, "7" | "5" | "12"][] = [
  ["voyagea", "7"],
  ["keri-in-windsor", "5"],
  ["trik-studio", "5"],
  ["ak-builds-plumbing", "7"],
  ["skyvage", "12"],
];
const ordered = layout
  .map(([slug, span]) => ({ span, project: projects.find((p) => p.slug === slug)! }))
  .filter((x) => x.project);

const now = [
  {
    label: "Founder & developer",
    name: "Voyagea",
    href: "https://voyagea.travel",
    text: "A free AI travel planner. Day-by-day itineraries with maps, budgets and local tips.",
  },
  {
    label: "Founder",
    name: "Keri in Windsor",
    href: "https://keriinwindsor.ca",
    text: "Premium Indian mangoes delivered across Windsor–Essex. In season May to July.",
  },
  {
    label: "Business development",
    name: "PTRI Innovation",
    href: "https://www.ptriinnovation.com",
    text: "Growth and partnerships for an AI-first studio building digital products.",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="hero" aria-label="Introduction">
        <Sky />
        <Bridge />
        <div className="wrap hero-inner">
          <h1 className="hero-title">
            Dev Shah
            <span className="hero-sub">builds products, brands and small ventures from Windsor, Ontario.</span>
          </h1>
          <p className="hero-lede">
            Founder of Voyagea and Keri in Windsor. Developer behind BeamFall and Dwello. Designer of websites
            that local businesses actually get enquiries from.
          </p>
          <p className="actions">
            <a className="btn btn-fill" href="#work">See the work</a>
            <a className="btn" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
          <p className="hero-hint mono">This page is lit by the real sky over Windsor. Drag it to change the time.</p>
        </div>
      </section>

      <section className="wrap now" aria-label="Right now">
        <ul className="now-list">
          {now.map((item, i) => (
            <li className="now-item" key={item.name} data-reveal data-delay={String(i)}>
              <span className="mono">{item.label}</span>
              <a href={item.href} rel="noopener">{item.name}</a>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section" id="work" aria-labelledby="work-title">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="work-title">Selected work</h2>
          <p className="section-note">
            Websites and products for businesses in Windsor, Ahmedabad and beyond. Each one is live.
          </p>
        </div>
        <div className="work-grid">
          {ordered.map(({ project: p, span }, i) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="work-card"
              data-span={span}
              data-reveal
              data-delay={String(i % 2)}
            >
              <div className="work-media lit">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 860px) 100vw, 60vw"
                  priority={i === 0}
                />
              </div>
              <div className="work-meta">
                <h3 className="work-name display">{p.name}</h3>
                <span className="work-cat mono">{p.category}</span>
                <p className="work-summary">{p.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section" id="builds" aria-labelledby="builds-title">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="builds-title">Also built</h2>
          <p className="section-note">Things that are not websites: a puzzle game on the App Store and a desk robot.</p>
        </div>
        <div className="builds-grid">
          {builds.map((b, i) => (
            <Link key={b.slug} href={`/work/${b.slug}`} className="build-card lit" data-reveal data-delay={String(i)}>
              <div className="build-media" data-fit={b.slug === "dwello" ? "contain" : "cover"}>
                <Image src={b.image} alt={b.imageAlt} width={800} height={1000} sizes="(max-width: 960px) 45vw, 22vw" />
              </div>
              <div className="build-body">
                <div>
                  <span className="mono">{b.kind} · {b.year}</span>
                  <h3 className="build-name display">{b.name}</h3>
                  <p>{b.summary}</p>
                </div>
                <span className="build-link">{b.slug === "beamfall" ? "Free on the App Store" : "Join early access"}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap section" id="designs" aria-labelledby="designs-title">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="designs-title">Designs</h2>
          <p className="section-note">Brand identities as full case studies: mark, colour, type and the packaging, signage and print they live on. <Link href="/designs">All {designBrandList.length} brands</Link>.</p>
        </div>
        <div className="design-strip" data-reveal>
          {designBrandList.slice(0, 6).map((b) => {
            const hero = b.pieces[0];
            return (
              <Link key={b.key} href={`/designs/${b.key}`} className="lit" aria-label={`${b.name} identity`}>
                <Image src={`/designs/${b.key}/${hero.slug}-thumb.webp`} alt={`${b.name}: ${hero.title}`} width={720} height={Math.round((720 * hero.height) / hero.width)} sizes="(max-width: 640px) 50vw, 33vw" />
                <span className="strip-name">{b.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="wrap section" id="roles" aria-labelledby="roles-title">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="roles-title">Where I work</h2>
          <p className="section-note">Most recent first. Design came before code, and both came before the ventures.</p>
        </div>
        <ol className="roles">
          {experiences.map((e, i) => (
            <li className="role" key={e.organization} data-reveal data-delay={String(i % 3)}>
              <span className="role-period mono">{e.period}</span>
              <div>
                <h3 className="role-org">
                  {e.url ? <a href={e.url} rel="noopener">{e.organization}</a> : e.organization}
                </h3>
                <span className="role-title">{e.role}</span>
              </div>
              <p>{e.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section" id="insights" aria-labelledby="insights-title">
        <div className="section-head" data-reveal>
          <h2 className="section-title display" id="insights-title">Insights</h2>
          <p className="section-note">Notes on websites, local search and building small things in Windsor.</p>
        </div>
        <ul className="posts">
          {articles.map((a, i) => (
            <li className="post" key={a.slug} data-reveal data-delay={String(i % 3)}>
              <div className="post-meta mono">
                <span>{a.category}</span>
                <span>{a.readingTime}</span>
              </div>
              <div>
                <h3 className="display"><Link href={`/insights/${a.slug}`}>{a.title}</Link></h3>
                <p>{a.excerpt}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section contact" id="contact" aria-labelledby="contact-title">
        <div data-reveal>
          <p className="eyebrow mono">Windsor, Ontario · working with teams anywhere</p>
          <h2 className="contact-title display" id="contact-title">Say hello.</h2>
          <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className="contact-row">
            <CopyEmail />
            <span className="muted">Replies within a day, usually faster.</span>
          </div>
          <p className="contact-note">
            A website for your business, a product you want built, or a venture you want a second pair of hands on.
          </p>
        </div>
      </section>
    </main>
  );
}
