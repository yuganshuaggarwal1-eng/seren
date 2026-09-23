import { sampleCategories, samplePosts } from "@/lib/sample-data";
import { createClient } from "@/lib/supabase/server";
import type { Category, Post, PostRow, Profile } from "@/lib/types";

const postSelect = `
  id,
  title,
  slug,
  excerpt,
  content,
  cover_image,
  reading_time,
  published,
  created_at,
  author_id,
  category_id,
  author:profiles(id, name, avatar_url, bio),
  category:categories(id, name, slug)
`;

function asOne<T>(value: T | T[] | null | undefined): T | null {
  if (!value) return null;
  return Array.isArray(value) ? (value[0] ?? null) : value;
}

function mapPost(row: PostRow): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    cover_image: row.cover_image,
    reading_time: row.reading_time,
    published: row.published,
    created_at: row.created_at,
    author:
      asOne(row.author) ?? {
        id: row.author_id,
        name: "Writer",
        avatar_url: null,
        bio: null,
      },
    category: asOne(row.category),
  };
}

async function loadProfile(id: string): Promise<Profile> {
  const supabase = await createClient();
  if (!supabase) {
    return { id, name: "Writer", avatar_url: null, bio: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, avatar_url, bio")
    .eq("id", id)
    .maybeSingle();

  return (
    profile ?? {
      id,
      name: "Writer",
      avatar_url: null,
      bio: null,
    }
  );
}

export async function getCurrentUser(): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = await supabase.auth.getClaims();
  const id = data?.claims?.sub;
  if (!id || typeof id !== "string") return null;
  return loadProfile(id);
}

export async function getVerifiedUser(): Promise<Profile | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return loadProfile(data.user.id);
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();
  if (!supabase) return sampleCategories;

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  if (error || !data?.length) return sampleCategories;
  return data;
}

export async function getPosts(options?: {
  limit?: number;
  query?: string;
  category?: string;
}): Promise<Post[]> {
  const supabase = await createClient();
  if (!supabase) {
    return samplePosts.filter((post) => {
      const matchesQuery = options?.query
        ? `${post.title} ${post.excerpt}`.toLowerCase().includes(options.query.toLowerCase())
        : true;
      const matchesCategory = options?.category
        ? post.category?.slug === options.category
        : true;
      return matchesQuery && matchesCategory;
    });
  }

  let request = supabase
    .from("posts")
    .select(postSelect)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(options?.limit ?? 24);

  if (options?.category) {
    const { data: categoryRow } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", options.category)
      .maybeSingle();

    if (!categoryRow) return [];
    request = request.eq("category_id", categoryRow.id);
  }

  if (options?.query) {
    const safeQuery = options.query.replace(/[%(),."'\\]/g, "").slice(0, 80);
    if (safeQuery) {
      request = request.or(`title.ilike.%${safeQuery}%,excerpt.ilike.%${safeQuery}%`);
    }
  }

  const { data, error } = await request;
  if (error || !data?.length) {
    return samplePosts
      .filter((post) => {
        const matchesQuery = options?.query
          ? `${post.title} ${post.excerpt}`.toLowerCase().includes(options.query.toLowerCase())
          : true;
        const matchesCategory = options?.category
          ? post.category?.slug === options.category
          : true;
        return matchesQuery && matchesCategory;
      })
      .slice(0, options?.limit ?? 24);
  }

  return (data as PostRow[]).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient();
  if (!supabase) {
    return samplePosts.find((post) => post.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return samplePosts.find((post) => post.slug === slug) ?? null;
  }
  return mapPost(data as PostRow);
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select(postSelect)
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return mapPost(data as PostRow);
}

export async function getAuthors(): Promise<Profile[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("profiles")
    .select("id, name, avatar_url, bio")
    .order("created_at", { ascending: false })
    .limit(6);

  if (error || !data) return [];
  return data;
}
