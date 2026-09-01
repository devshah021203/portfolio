import Image from "next/image";
import Link from "next/link";
import { StickyNav } from "@/components/layout/StickyNav";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ArticleGrid } from "@/components/ui/ArticleGrid";
import { BuildLab } from "@/components/ui/BuildLab";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { CurrentFocusPanel } from "@/components/ui/CurrentFocusPanel";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { articles } from "@/data/articles";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/seo";

const capabilities = [
  {
    number: "01",
    title: "Web Design",
    text: "Responsive UX, visual hierarchy, conversion-focused layouts, landing pages and complete site systems.",
  },
  {
    number: "02",
    title: "Development",
    text: "React / Next.js, WordPress, Shopify customization, Supabase-backed products and clean deployment.",
  },
  {
    number: "03",
    title: "Motion",
    text: "Scroll narratives, pinned sections, text reveals, page transitions, micro-interactions and cursor behavior.",
  },
  {
    number: "04",
    title: "Growth Setup",
    text: "SEO foundations, analytics, performance, forms, quote funnels, local visibility and iteration.",
  },
];

const timeline = [
  ["Started with design", "Layouts, social creatives, brand visuals and an obsession with making things feel right."],
  ["Moved into development", "Learned to bring ideas to life through responsive code, reusable systems and deployment."],
  ["Built for real businesses", "Service sites, creative studios, local brands and websites designed to generate action."],
  ["Now building products", "AI-powered tools, travel products, automation ideas and brand systems with room to scale."],
];

const process = [
  ["01", "Discover", "Understand the real goal", "Audience, offer, constraints, competitors, content, trust gaps and what success should look like."],
  ["02", "Structure", "Build the experience map", "Sitemap, user journeys, content hierarchy, CTA logic, page responsibilities and technical choices."],
  ["03", "Design", "Create a visual system", "Typography, grid, components, project presentation, responsive behavior and motion direction."],
  ["04", "Build", "Develop cleanly", "Reusable sections, accessible markup, optimized media, forms, analytics and deployment."],
  ["05", "Improve", "Launch is not the finish", "Review behavior, fix friction, improve SEO, refine content and add features from real usage."],
];

const personId = `${siteUrl}/#dev-shah`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: "Dev Shah",
      url: siteUrl,
      email: "mailto:hello.devshah@gmail.com",
      description:
        "Dev Shah is a Windsor-based founder, developer, designer and creative director. He founded Keri in Windsor and Voyagea and works as Business Development Officer at PTRI Innovation.",
      jobTitle: [
        "Founder of Keri in Windsor",
        "Founder and Developer of Voyagea",
        "Business Development Officer at PTRI Innovation",
        "Web Developer and Designer",
      ],
      homeLocation: {
        "@type": "Place",
        name: "Windsor, Ontario, Canada",
      },
      knowsAbout: [
        "Web development",
        "Product development",
        "Creative direction",
        "Brand design",
        "Artificial intelligence travel planning",
        "Local ecommerce",
        "Business development",
        "Game design",
        "iOS game development",
      ],
      hasOccupation: experiences.map((experience) => ({
        "@type": "Occupation",
        name: `${experience.role} at ${experience.organization}`,
        description: experience.description,
        occupationLocation: {
          "@type": "Place",
          name: "Windsor, Ontario, Canada",
        },
      })),
    },
    {
      "@type": "Organization",
      "@id": "https://keriinwindsor.ca/#organization",
      name: "Keri in Windsor",
      url: "https://keriinwindsor.ca",
      description:
        "A seasonal mango business offering premium Indian mangoes through limited batches and local delivery in Windsor–Essex and nearby Ontario communities.",
      founder: { "@id": personId },
    },
    {
      "@type": "Organization",
      "@id": "https://voyagea.travel/#organization",
      name: "Voyagea",
      url: "https://voyagea.travel",
      description:
        "A free AI travel planner that creates day-by-day itineraries with maps, budgets, hyperlocal tips and a digital V-Passport.",
      founder: { "@id": personId },
    },
    {
      "@type": "Organization",
      "@id": "https://www.ptriinnovation.com/#organization",
      name: "PTRI Innovation",
      url: "https://www.ptriinnovation.com",
      description:
        "An AI-first technology company building intelligent digital platforms and scalable products.",
      employee: { "@id": personId },
    },
  ],
};

export default function Home() {
  return (
    <SiteMotion>
      <CustomCursor />
      <StickyNav />
      <main id="main-content">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <section id="home" className="hero-scene section-shell" aria-labelledby="hero-title">
          <div className="hero-kicker micro-label">Web developer · Designer · Creative builder</div>
          <div className="hero-layout">
            <div className="hero-copy">
              <h1 id="hero-title" className="hero-name">
                <span>Dev</span>
                <span>Shah.</span>
              </h1>
              <p className="hero-statement">
                Founder, developer and designer building websites, products and brand systems that <em>move, convert</em> and stay remembered.
              </p>
              <div className="hero-meta tag-list">
                <span>Based in Windsor, Canada</span>
                <span>Working worldwide</span>
                <span className="availability"><i /> Available for projects</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-browser">
                <CurrentFocusPanel />
              </div>
            </div>
          </div>
          <div className="hero-scroll-word" aria-hidden="true">Scroll to enter</div>
          <a className="scroll-cue" href="#about" data-cursor="DOWN">
            <span>Scroll to know me</span>
            <span aria-hidden="true">↓</span>
          </a>
        </section>

        <section id="about" className="about-section section-shell" aria-labelledby="about-title">
          <div className="section-index micro-label">02 / About</div>
          <div className="about-top">
            <div>
              <h2 id="about-title" className="section-title" data-reveal>
                I turn ideas into <em>useful digital things.</em>
              </h2>
              <p className="about-intro" data-reveal>
                I’m Dev Shah—a web developer, designer and founder based in Windsor, Canada, originally from India. I founded Keri in Windsor and Voyagea, work in business development at PTRI Innovation, and combine visual direction, code, product thinking and business context to create digital experiences that perform in the real world.
              </p>
              <div className="tag-list about-tags" data-reveal>
                <span>University of Windsor · Computer Science</span>
                <span>Freelance + Product Builder</span>
                <span>Canada / India</span>
              </div>
            </div>
            <aside className="client-value" data-reveal>
              <span className="micro-label">What clients get</span>
              <h3>One person who can think across the whole experience.</h3>
              <ul>
                <li>Strategy before decoration</li>
                <li>Design that is actually buildable</li>
                <li>Clean responsive development</li>
                <li>Launch support and iteration</li>
              </ul>
            </aside>
          </div>
          <ol className="about-timeline" aria-label="Dev Shah's journey">
            {timeline.map(([title, text]) => (
              <li key={title} data-reveal>
                <span className="timeline-dot" />
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="experience" className="experience-section section-shell" aria-labelledby="experience-title">
          <div className="section-index micro-label">03 / Experience</div>
          <div className="section-heading-row">
            <h2 id="experience-title" className="section-title" data-reveal>
              From visual direction to <em>products and ventures.</em>
            </h2>
            <p className="annotation" data-reveal>Design roots. Founder mindset. Real-world delivery.</p>
          </div>
          <ol className="experience-list" aria-label="Dev Shah's professional experience">
            {experiences.map((experience, index) => (
              <li key={`${experience.organization}-${experience.period}`} data-reveal>
                <span className="experience-number micro-label">{String(index + 1).padStart(2, "0")}</span>
                <div className="experience-heading">
                  <span className="micro-label">{experience.period}</span>
                  <h3>{experience.organization}</h3>
                  <p className="experience-role">{experience.role}</p>
                </div>
                <div className="experience-detail">
                  <p>{experience.description}</p>
                  {experience.url && experience.linkLabel && (
                    <MagneticLink
                      href={experience.url}
                      external
                      className="experience-link"
                      cursor="OPEN"
                      ariaLabel={`Open ${experience.organization} website`}
                    >
                      {experience.linkLabel} <span aria-hidden="true">↗</span>
                    </MagneticLink>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="capabilities" className="capabilities-section section-shell" aria-labelledby="capabilities-title">
          <div className="section-index micro-label">04 / Capabilities</div>
          <div className="section-heading-row">
            <h2 id="capabilities-title" className="section-title" data-reveal>
              Design. Build. Launch. <em>Improve.</em>
            </h2>
            <p className="annotation" data-reveal>I do not stop at the mockup.</p>
          </div>
          <div className="capabilities-grid">
            {capabilities.map((item) => (
              <article key={item.number} data-reveal>
                <span className="micro-label">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="stack-rule" data-reveal>
            <div>
              <span className="micro-label">Core stack</span>
              <div className="tag-list">
                {[
                  "Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis", "Supabase", "WordPress", "Shopify", "Vercel", "Git / GitHub", "Figma", "AI Workflows",
                ].map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </div>
            <blockquote>
              <span className="micro-label">Portfolio rule</span>
              Show the stack only after the work. People should first understand the problem solved, then see the tools used to solve it.
            </blockquote>
          </div>
        </section>

        <section id="work" className="work-section section-shell" aria-labelledby="work-title">
          <div className="section-index micro-label">05 / Selected Work</div>
          <div className="section-heading-row">
            <h2 id="work-title" className="section-title" data-reveal>
              Projects that turned ideas into <em>real presence.</em>
            </h2>
            <p className="annotation" data-reveal>Hover on desktop.<br />Swipe on mobile.</p>
          </div>
          <ProjectGrid />
        </section>

        <section id="games" className="games-section section-shell" aria-labelledby="games-title">
          <div className="section-index micro-label">06 / Games</div>
          <div className="section-heading-row">
            <h2 id="games-title" className="section-title" data-reveal>
              Small rules. <em>Deep systems.</em>
            </h2>
            <p className="annotation" data-reveal>Designed, built and shipped.</p>
          </div>
          <Link href="/beamfall" className="game-feature" data-cursor="PLAY" data-reveal>
            <div className="game-feature-copy">
              <div className="game-feature-head">
                <span className="micro-label">01 / Puzzle · iPhone</span>
                <span className="game-live"><i /> Live on the App Store</span>
              </div>
              <Image src="/beamfall/icon.webp" width={104} height={104} alt="BeamFall app icon" />
              <h3>BeamFall</h3>
              <p>A pure light-routing puzzle with 100 machine-verified levels, ten boss runs and no ads or purchases.</p>
              <span className="game-feature-link">Explore the game <i aria-hidden="true">↗</i></span>
            </div>
            <div className="game-feature-visual">
              <div className="game-beam game-beam-cyan" aria-hidden="true" />
              <div className="game-beam game-beam-pink" aria-hidden="true" />
              <Image
                src="/beamfall/screens/boss.webp"
                width={1287}
                height={2796}
                alt="BeamFall boss puzzle showing coloured light routed across a grid"
                sizes="(max-width: 899px) 72vw, 32vw"
              />
            </div>
          </Link>
        </section>

        <section id="lab" className="lab-section" aria-labelledby="lab-title">
          <div className="lab-inner section-shell">
            <div className="section-index micro-label">07 / Build Lab</div>
            <div className="section-heading-row">
              <h2 id="lab-title" className="section-title">
                Things I build <em>before they are obvious.</em>
              </h2>
              <p className="annotation">Experiments prove curiosity.</p>
            </div>
            <BuildLab />
            <div className="lab-manifesto" aria-hidden="true">Build small · Test fast · Learn in public</div>
          </div>
        </section>

        <section id="process" className="process-section section-shell" aria-labelledby="process-title">
          <div className="section-index micro-label">08 / Process</div>
          <div className="section-heading-row">
            <h2 id="process-title" className="section-title" data-reveal>
              A clear process keeps creative work <em>useful.</em>
            </h2>
            <p className="annotation" data-reveal>Clients should know what happens next.</p>
          </div>
          <ol className="process-grid">
            {process.map(([number, label, title, text]) => (
              <li key={number} data-reveal>
                <span className="micro-label">{number} / {label}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="process-notes">
            <article data-reveal>
              <span className="micro-label">Communication</span>
              <h3>Weekly clarity</h3>
              <p>Short updates, visible progress, direct questions and decisions documented before they become expensive changes.</p>
            </article>
            <article data-reveal>
              <span className="micro-label">Deliverables</span>
              <ul>
                <li>Figma / visual direction</li>
                <li>Responsive website</li>
                <li>CMS or editable content</li>
                <li>Basic SEO and analytics</li>
                <li>Launch and handoff</li>
                <li>Post-launch support options</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="insights" className="insights-section section-shell" aria-labelledby="insights-title">
          <div className="section-index micro-label">09 / Insights</div>
          <div className="section-heading-row">
            <h2 id="insights-title" className="section-title" data-reveal>
              Useful notes from <em>building the work.</em>
            </h2>
            <p className="annotation" data-reveal>Original thinking. Practical answers. No keyword filler.</p>
          </div>
          <ArticleGrid articles={articles} />
          <div className="insights-more" data-reveal>
            <MagneticLink href="/insights" className="nav-cta" cursor="READ">
              View all insights <span aria-hidden="true">↗</span>
            </MagneticLink>
          </div>
        </section>

        <section id="motion" className="motion-section section-shell" aria-labelledby="motion-title">
          <div className="section-index micro-label">10 / Motion System</div>
          <div className="section-heading-row">
            <h2 id="motion-title" className="section-title" data-reveal>
              Animation should <em>explain the page.</em>
            </h2>
            <p className="annotation light" data-reveal>Use motion to create hierarchy, rhythm and cause-and-effect.</p>
          </div>
          <div className="motion-grid">
            <article data-reveal>
              <span className="micro-label">Global</span>
              <h3>Smooth, not slow</h3>
              <p>Native-feeling momentum. No excessive delay. Smooth scrolling disables automatically for reduced-motion preferences.</p>
              <code>lerp: 0.09<br />wheelMultiplier: 0.9</code>
            </article>
            <article data-reveal>
              <span className="micro-label">Section</span>
              <h3>Pin only when earned</h3>
              <p>Pinned moments belong to the hero, project story and Build Lab - not every screen.</p>
              <code>pin: true<br />scrub: 0.8</code>
            </article>
            <article data-reveal>
              <span className="micro-label">Element</span>
              <h3>Small responses</h3>
              <p>Text masks, image reveals, card lift, cursor attraction and clear underline motion.</p>
              <code>y: 28 → 0<br />stagger: 0.06</code>
            </article>
          </div>
          <div className="motion-principles" data-reveal>
            <span>Text reveal</span><span>Image reveal</span><span>Project transition</span><span>Section handoff</span>
          </div>
        </section>

        <section id="contact" className="contact-section section-shell" aria-labelledby="contact-title">
          <div className="section-index micro-label">11 / Contact</div>
          <div className="contact-layout">
            <div>
              <h2 id="contact-title" className="contact-title" data-reveal>Let’s<br />build.</h2>
              <p className="contact-intro" data-reveal>
                Need a website, product concept, redesign, landing page or brand-led digital presence? Let’s turn the idea into something people can use and remember.
              </p>
              <div className="contact-card" data-reveal>
                <MagneticLink href="mailto:hello.devshah@gmail.com" className="email-link" cursor="EMAIL">
                  hello.devshah@gmail.com
                </MagneticLink>
                <CopyEmail />
                <p>Based in Windsor, Canada / India · Working worldwide · Available for selected projects and collaborations.</p>
              </div>
            </div>
            <div className="featured-links" data-reveal>
              <span className="micro-label">Featured links</span>
              <MagneticLink
                href="https://apps.apple.com/ca/app/beamfall/id6805519789"
                external
                cursor="PLAY"
                ariaLabel="Download BeamFall on the App Store"
              >
                <span>BeamFall on the App Store</span><span aria-hidden="true">↗</span>
              </MagneticLink>
              {projects.map((project) => (
                <MagneticLink
                  key={project.slug}
                  href={project.url}
                  external
                  cursor="OPEN"
                  ariaLabel={`Open ${project.name} live site`}
                >
                  <span>{project.urlLabel}</span><span aria-hidden="true">↗</span>
                </MagneticLink>
              ))}
            </div>
          </div>
          <footer className="site-footer">
            <span>End of portfolio - start of conversation</span>
            <span>Dev Shah / 2026</span>
          </footer>
        </section>
      </main>
    </SiteMotion>
  );
}
