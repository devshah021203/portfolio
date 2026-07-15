import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <span className="micro-label">404 / Off the map</span>
      <h1>This route has not been built.</h1>
      <p>The rest of the portfolio is exactly where you left it.</p>
      <Link href="/" className="nav-cta">Back home ↙</Link>
    </main>
  );
}
