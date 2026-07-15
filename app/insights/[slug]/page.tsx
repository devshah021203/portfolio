import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StickyNav } from "@/components/layout/StickyNav";
import { SiteMotion } from "@/components/motion/SiteMotion";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { articles, getArticle } from "@/data/articles";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    authors: [{ name: "Dev Shah", url: siteUrl }],
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `/insights/${article.slug}`,
      siteName: "Dev Shah Portfolio",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      authors: [siteUrl],
      images: [{ url: "/og.png", width: 1536, height: 864, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/og.png"],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const nextArticle = articles[(currentIndex + 1) % articles.length];
  const articleUrl = `${siteUrl}/insights/${article.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.description,
        image: [`${siteUrl}/og.png`],
        datePublished: article.publishedAt,
        dateModified: article.modifiedAt,
        mainEntityOfPage: articleUrl,
        keywords: article.keywords.join(", "),
        author: {
          "@type": "Person",
          "@id": `${siteUrl}/#dev-shah`,
          name: "Dev Shah",
          url: siteUrl,
        },
        publisher: {
          "@type": "Person",
          "@id": `${siteUrl}/#dev-shah`,
          name: "Dev Shah",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/insights` },
          { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
        ],
      },
    ],
  };

  return (
    <SiteMotion>
      <CustomCursor />
      <StickyNav />
      <main id="main-content" className="article-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <article>
          <header className="article-hero section-shell">
            <div className="insights-back-row">
              <Link href="/insights" data-cursor="BACK">← All insights</Link>
              <span className="micro-label">{article.number} / {article.category}</span>
            </div>
            <h1>{article.title}</h1>
            <p className="article-deck">{article.description}</p>
            <div className="article-byline micro-label">
              <span>By Dev Shah</span>
              <time dateTime={article.publishedAt}>July 15, 2026</time>
              <span>{article.readingTime}</span>
            </div>
          </header>

          <div className="article-layout section-shell">
            <aside className="article-aside">
              <span className="micro-label">Topics</span>
              <div className="tag-list">
                {article.keywords.slice(0, 4).map((keyword) => <span key={keyword}>{keyword}</span>)}
              </div>
              <Link href="/#contact" data-cursor="TALK">Discuss a project ↘</Link>
            </aside>
            <div className="article-body">
              {article.introduction.map((paragraph) => <p className="article-lead" key={paragraph}>{paragraph}</p>)}
              {article.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </section>
              ))}
              <blockquote>{article.takeaway}</blockquote>
            </div>
          </div>

          <footer className="article-next section-shell">
            <span className="micro-label">Read next</span>
            <Link href={`/insights/${nextArticle.slug}`} data-cursor="NEXT">
              <span>{nextArticle.title}</span><span aria-hidden="true">↗</span>
            </Link>
          </footer>
        </article>
      </main>
    </SiteMotion>
  );
}
