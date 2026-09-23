import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page">
      <div className="container">
        <div className="empty-state">
          <h3>Page not found</h3>
          <p>That story or page doesn’t exist — or it may have been removed.</p>
          <Link href="/explore" className="primary-btn">
            Explore stories
          </Link>
        </div>
      </div>
    </main>
  );
}
