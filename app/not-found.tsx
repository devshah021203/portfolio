import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap notfound">
      <p className="eyebrow mono">404</p>
      <h1 className="display">Nothing lives here.</h1>
      <p className="lede">The page you were after has moved or never existed. The work and the writing are both one link away.</p>
      <p className="actions">
        <Link className="btn btn-fill" href="/">Back home</Link>
        <Link className="btn" href="/insights">Read insights</Link>
      </p>
    </main>
  );
}
