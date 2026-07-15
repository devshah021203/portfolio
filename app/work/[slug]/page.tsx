import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StickyNav } from "@/components/layout/StickyNav";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { getProject, projects } from "@/data/projects";
import { projectMetadata, siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return project ? projectMetadata(project) : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(index + 1) % projects.length];
  const projectStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.name} case study`,
    description: project.description,
    url: `${siteUrl}/work/${project.slug}`,
    image: `${siteUrl}${project.image}`,
    sameAs: project.url,
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#dev-shah`,
      name: "Dev Shah",
    },
    creator: {
      "@type": "Person",
      "@id": `${siteUrl}/#dev-shah`,
      name: "Dev Shah",
    },
  };

  return (
    <SiteMotion>
      <CustomCursor />
      <StickyNav />
      <main id="main-content" className="case-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectStructuredData) }}
        />
        <article>
          <header className="case-hero section-shell">
            <div className="case-back-row">
              <Link href="/#work" data-cursor="BACK">← Selected work</Link>
              <span className="micro-label">{project.number} / Case Study / {project.category}</span>
            </div>
            <div className="case-heading-grid">
              <div>
                <h1>{project.name}</h1>
                <MagneticLink
                  href={project.url}
                  external
                  className="case-live-link"
                  cursor="OPEN"
                  ariaLabel={`Open ${project.name} live site`}
                >
                  {project.urlLabel} <span aria-hidden="true">↗</span>
                </MagneticLink>
                <p className="case-description">{project.description}</p>
                <div className="case-steps" aria-label="Project phases">
                  <span><b>01</b> Strategy</span>
                  <span><b>02</b> Design</span>
                  <span><b>03</b> Build</span>
                </div>
                <div className="case-role">
                  <span className="micro-label">My role</span>
                  <p>{project.role}</p>
                </div>
              </div>
              <div className="case-visual-wrap" data-reveal>
                <p className="annotation">{project.motion}</p>
                <ProjectVisual project={project} />
              </div>
            </div>
          </header>

          <section className="case-story section-shell" aria-label="Case study details">
            <article data-reveal>
              <span className="micro-label">Challenge</span>
              <h2>What had to change</h2>
              <p>{project.challenge}</p>
            </article>
            <article data-reveal>
              <span className="micro-label">Approach</span>
              <h2>How I shaped it</h2>
              <p>{project.approach}</p>
            </article>
            <article data-reveal>
              <span className="micro-label">Outcome</span>
              <h2>What the work delivered</h2>
              <p>{project.outcome}</p>
            </article>
          </section>

          <section className="case-proof section-shell" aria-label="Project technologies and motion">
            <div className="tag-list">
              {project.stack.map((item) => <span key={item}>{item}</span>)}
            </div>
            <blockquote>{project.motion}</blockquote>
          </section>

          <footer className="case-next section-shell">
            <span className="micro-label">Next project</span>
            <Link href={`/work/${nextProject.slug}`} data-cursor="NEXT">
              <span>{nextProject.name}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </footer>
        </article>
      </main>
    </SiteMotion>
  );
}
