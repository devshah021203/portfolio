import type { Metadata } from "next";
import Link from "next/link";
import { StickyNav } from "@/components/layout/StickyNav";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { ArticleGrid } from "@/components/ui/ArticleGrid";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { articles } from "@/data/articles";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Insights on Web Design, Local SEO & Product Building",
  description:
    "Practical articles by Dev Shah on Windsor web design, local SEO, building Keri in Windsor and developing the Voyagea AI travel planner.",
  keywords: [
    "Dev Shah blog",
    "web design Windsor Ontario",
    "local SEO Windsor",
    "Keri in Windsor founder",
    "Voyagea founder",
    "AI travel planner",
  ],
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights by Dev Shah",
    description: "Field notes on useful websites, local growth, founder-led brands and product development.",
    url: "/insights",
    siteName: "Dev Shah Portfolio",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 864, alt: "Insights by Dev Shah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights by Dev Shah",
    description: "Field notes on web design, local SEO, brands and product development.",
    images: ["/og.png"],
  },
};

const collectionStructuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Insights by Dev Shah",
  description:
    "Articles on Windsor web design, local SEO, founder-led brands and AI product development.",
  url: `${siteUrl}/insights`,
  author: {
    "@type": "Person",
    "@id": `${siteUrl}/#dev-shah`,
    name: "Dev Shah",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${siteUrl}/insights/${article.slug}`,
      name: article.title,
    })),
  },
};

export default function InsightsPage() {
  return (
    <SiteMotion>
      <CustomCursor />
      <StickyNav />
      <main id="main-content" className="insights-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionStructuredData) }}
        />
        <header className="insights-hero section-shell">
          <div className="insights-back-row">
            <Link href="/#insights" data-cursor="BACK">← Portfolio</Link>
            <span className="micro-label">Insights / Dev Shah</span>
          </div>
          <span className="micro-label">Useful notes, written from the work</span>
          <h1>Field notes for <em>useful digital work.</em></h1>
          <p>
            Practical thinking on web design in Windsor, local SEO, founder-led brands and building products people can actually use.
          </p>
        </header>
        <section className="insights-index section-shell" aria-label="All articles">
          <ArticleGrid articles={articles} />
        </section>
        <footer className="insights-footer section-shell">
          <Link href="/#contact" className="nav-cta" data-cursor="TALK">
            Build something useful <span aria-hidden="true">↘</span>
          </Link>
        </footer>
      </main>
    </SiteMotion>
  );
}
