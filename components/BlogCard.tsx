import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { fallbackAvatar, fallbackCover, formatDate } from "@/lib/utils";

export function BlogCard({
  post,
  featured = false,
}: {
  post: Post;
  featured?: boolean;
}) {
  return (
    <article className={`story-card${featured ? " is-featured" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="story-card-media">
        <Image
          src={post.cover_image || fallbackCover()}
          alt={post.title}
          width={featured ? 1200 : 800}
          height={featured ? 720 : 480}
          unoptimized
        />
      </Link>
      <div className="story-card-body">
        <div className="story-card-top">
          <span className="tag">{post.category?.name || "General"}</span>
          <span className="meta-date">{formatDate(post.created_at)}</span>
        </div>
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.excerpt ? <p className="story-excerpt">{post.excerpt}</p> : null}
        <div className="story-card-footer">
          <div className="author-inline">
            <Image
              src={post.author.avatar_url || fallbackAvatar(post.author.id)}
              alt={post.author.name}
              width={42}
              height={42}
              unoptimized
            />
            <div>
              <h4>{post.author.name}</h4>
              <span>{post.reading_time} min read</span>
            </div>
          </div>
          <Link href={`/blog/${post.slug}`} className="read-btn">
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}
