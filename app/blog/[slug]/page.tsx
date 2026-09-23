import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleActions } from "@/components/ArticleActions";
import { getCurrentUser, getPostBySlug } from "@/lib/data";
import { fallbackAvatar, fallbackCover, formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt ?? post.content.slice(0, 160),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, user] = await Promise.all([getPostBySlug(slug), getCurrentUser()]);

  if (!post) notFound();

  const canEdit = user?.id === post.author.id;

  return (
    <main className="page article-page">
      <div className="container">
        <article className="article">
          <Link href="/explore" className="text-link article-back">
            ← Back to explore
          </Link>
          <span className="tag">{post.category?.name || "General"}</span>
          <h1 className="article-title">{post.title}</h1>
          {post.excerpt ? <p className="article-dek">{post.excerpt}</p> : null}

          <div className="article-meta">
            <div className="author-inline">
              <Image
                src={post.author.avatar_url || fallbackAvatar(post.author.id)}
                alt={post.author.name}
                width={48}
                height={48}
                unoptimized
              />
              <div>
                <h4>{post.author.name}</h4>
                <span>
                  {formatDate(post.created_at)} · {post.reading_time} min read
                </span>
              </div>
            </div>
          </div>

          <Image
            className="article-cover"
            src={post.cover_image || fallbackCover()}
            alt={post.title}
            width={1400}
            height={760}
            unoptimized
            priority
          />

          <div className="article-body">{post.content}</div>
          {canEdit ? <ArticleActions postId={post.id} /> : null}
        </article>
      </div>
    </main>
  );
}
