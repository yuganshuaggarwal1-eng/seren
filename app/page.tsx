import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getAuthors, getCategories, getPosts } from "@/lib/data";
import { sampleWriters } from "@/lib/sample-data";
import { fallbackAvatar } from "@/lib/utils";

export default async function Home() {
  const [posts, categories, authors] = await Promise.all([
    getPosts({ limit: 6 }),
    getCategories(),
    getAuthors(),
  ]);

  const featured = posts[0];
  const rest = posts.slice(1, 4);

  const writers =
    authors.length > 0
      ? authors.map((author) => ({
          name: author.name,
          role: author.bio || "Writer",
          avatar: author.avatar_url || fallbackAvatar(author.id),
        }))
      : sampleWriters;

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="brand-mark">SerenFeed</p>
            <h1>
              Write calmly.
              <br />
              Be read clearly.
            </h1>
            <p>
              A quiet publishing space for thoughtful stories — publish your own, or wander into
              someone else’s.
            </p>
            <div className="hero-actions">
              <Link href="/write" className="primary-btn">
                Start writing
              </Link>
              <Link href="/explore" className="secondary-btn">
                Explore stories
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200"
              alt="Notebook and pen on a desk"
              width={1200}
              height={900}
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Browse by topic</h2>
              <p>Find a lane that matches the kind of story you want today.</p>
            </div>
          </div>
          <div className="chip-row">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/explore?category=${category.slug}`}
                className="chip"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Featured stories</h2>
              <p>Recent writing from the SerenFeed community.</p>
            </div>
            <Link href="/explore" className="text-link">
              View all →
            </Link>
          </div>

          {posts.length > 0 ? (
            <div className="story-grid">
              {featured ? <BlogCard post={featured} featured /> : null}
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No stories yet</h3>
              <p>Be the first to publish on SerenFeed.</p>
              <Link href="/write" className="primary-btn">
                Start writing
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Writers to follow</h2>
              <p>Voices shaping the feed right now.</p>
            </div>
          </div>
          <div className="writer-grid">
            {writers.map((writer) => (
              <div className="writer-card" key={writer.name}>
                <Image src={writer.avatar} alt={writer.name} width={100} height={100} unoptimized />
                <h3>{writer.name}</h3>
                <p>{writer.role}</p>
                <Link href="/explore" className="secondary-btn">
                  Browse stories
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter">
        <div className="container newsletter-inner">
          <h2>Stay in the loop</h2>
          <p>Get new stories when they publish — no noise, just reading worth your time.</p>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}
