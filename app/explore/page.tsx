import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { getCategories, getPosts } from "@/lib/data";

export const metadata = {
  title: "Explore",
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const [posts, categories] = await Promise.all([
    getPosts({ query: q, category }),
    getCategories(),
  ]);

  const activeCategory = categories.find((item) => item.slug === category);

  return (
    <main className="page">
      <div className="container">
        <div className="page-hero">
          <p className="eyebrow">Discover</p>
          <h1>{activeCategory ? activeCategory.name : "Explore stories"}</h1>
          <p>
            {q
              ? `Showing results for “${q}”`
              : "Search titles, skim topics, and open anything that catches your eye."}
          </p>
        </div>

        <form className="search-bar" action="/explore">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search by title or excerpt..."
            aria-label="Search stories"
          />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          <button className="primary-btn" type="submit">
            Search
          </button>
        </form>

        <div className="chip-row">
          <Link href="/explore" className={`chip${!category ? " is-active" : ""}`}>
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/explore?category=${item.slug}`}
              className={`chip${category === item.slug ? " is-active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <p className="results-count">
          {posts.length} {posts.length === 1 ? "story" : "stories"}
          {activeCategory ? ` in ${activeCategory.name}` : ""}
        </p>

        {posts.length > 0 ? (
          <div className="story-grid">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Nothing matched</h3>
            <p>Try another search, or clear filters and browse everything.</p>
            <Link href="/explore" className="secondary-btn">
              Clear filters
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
