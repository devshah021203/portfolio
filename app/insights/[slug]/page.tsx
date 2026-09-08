import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/data/articles";
import { EMAIL } from "@/components/CopyEmail";
import { siteUrl } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: a.title,
      description: a.description,
      url: `/insights/${slug}`,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.modifiedAt,
      authors: [siteUrl],
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.description },
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const i = articles.findIndex((x) => x.slug === slug);
  const next = articles[(i + 1) % articles.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    dateModified: a.modifiedAt,
    keywords: a.keywords.join(", "),
    mainEntityOfPage: `${siteUrl}/insights/${slug}`,
    author: { "@type": "Person", name: "Dev Shah", url: siteUrl },
    publisher: { "@type": "Person", name: "Dev Shah", url: siteUrl },
    image: `${siteUrl}/og.png`,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Insights", item: `${siteUrl}/insights` },
      { "@type": "ListItem", position: 3, name: a.title, item: `${siteUrl}/insights/${slug}` },
    ],
  };

  return (
    <main className="wrap page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <article className="article">
        <header className="article-head">
          <Link href="/insights" className="back mono">All insights</Link>
          <p className="eyebrow mono">{a.category}</p>
          <h1 className="article-title display">{a.title}</h1>
          <div className="article-meta mono">
            <span>Dev Shah</span>
            <time dateTime={a.publishedAt}>{formatDate(a.publishedAt)}</time>
            <span>{a.readingTime}</span>
          </div>
        </header>
        <div className="article-body">
          {a.introduction.map((p, idx) => <p key={idx}>{p}</p>)}
          {a.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="display">{s.heading}</h2>
              {s.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
              {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </section>
          ))}
          <aside className="takeaway">
            <span className="mono">Takeaway</span>
            <p>{a.takeaway}</p>
          </aside>
        </div>
        <footer className="article-foot">
          <p>Working on something in Windsor? Write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
          <p className="mono">Next: <Link href={`/insights/${next.slug}`}>{next.title}</Link></p>
        </footer>
      </article>
    </main>
  );
}
