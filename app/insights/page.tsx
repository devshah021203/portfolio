import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Notes from Dev Shah on small business websites in Windsor, local SEO, building Keri in Windsor and what an AI travel planner should solve.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <main className="wrap page">
      <p className="eyebrow mono">Insights</p>
      <h1 className="page-title display">Notes from Windsor.</h1>
      <p className="page-tag">Websites, local search and what it takes to ship small things.</p>
      <ul className="posts" style={{ marginTop: 48 }}>
        {articles.map((a) => (
          <li className="post" key={a.slug}>
            <div className="post-meta mono">
              <span>{a.category}</span>
              <span>{a.readingTime}</span>
              <time dateTime={a.publishedAt}>{a.publishedAt}</time>
            </div>
            <div>
              <h2 className="display" style={{ fontSize: "clamp(24px, 2.4vw, 34px)", margin: "0 0 8px" }}>
                <Link href={`/insights/${a.slug}`}>{a.title}</Link>
              </h2>
              <p>{a.excerpt}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
