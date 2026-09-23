import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>SerenFeed</h2>
          <p>A calm place to write freely and read with intention.</p>
        </div>
        <div>
          <h3>Discover</h3>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/explore">Explore</Link>
            </li>
            <li>
              <Link href="/write">Write</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Account</h3>
          <ul>
            <li>
              <Link href="/login">Log in</Link>
            </li>
            <li>
              <Link href="/signup">Sign up</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>For writers</h3>
          <p>Publish once. Edit when you need to. Keep ownership of every line.</p>
          <Link href="/write" className="footer-cta">
            Start writing →
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 SerenFeed. All rights reserved.</p>
      </div>
    </footer>
  );
}
