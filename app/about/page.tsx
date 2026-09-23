import Link from "next/link";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="page">
      <div className="container">
        <div className="page-hero">
          <p className="eyebrow">About</p>
          <h1>SerenFeed</h1>
          <p className="about-lead">
            A calm publishing space for people who want to write well and read with intention.
          </p>
        </div>

        <div className="about-grid">
          <article className="about-card">
            <h2>Why it exists</h2>
            <p>
              Most feeds reward noise. SerenFeed is built for the opposite: clear stories, quiet
              design, and ownership of what you publish.
            </p>
          </article>
          <article className="about-card">
            <h2>How it works</h2>
            <p>
              Create an account, write a post, and publish when you’re ready. You can edit or delete
              only what you wrote. Readers explore by topic or search.
            </p>
          </article>
          <article className="about-card">
            <h2>Who it’s for</h2>
            <p>
              Thinkers, builders, travelers, teachers — anyone who wants a simple place to put words
              in front of people who came to read.
            </p>
          </article>
        </div>

        <section className="about-cta">
          <h2>Ready to write?</h2>
          <p>Open a blank page and start with one honest sentence.</p>
          <div className="hero-actions">
            <Link href="/write" className="primary-btn">
              Start writing
            </Link>
            <Link href="/explore" className="secondary-btn">
              Explore stories
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
