import Link from "next/link";
import type { Article } from "@/data/articles";

export function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="insight-grid">
      {articles.map((article) => (
        <article key={article.slug} className="insight-card" data-reveal>
          <Link href={`/insights/${article.slug}`} data-cursor="READ">
            <div className="insight-card-top">
              <span className="micro-label">{article.number} / {article.category}</span>
              <span aria-hidden="true">↗</span>
            </div>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <div className="insight-card-meta micro-label">
              <time dateTime={article.publishedAt}>Jul 15, 2026</time>
              <span>{article.readingTime}</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
