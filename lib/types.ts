export type Profile = {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  reading_time: number;
  published: boolean;
  created_at: string;
  author: Profile;
  category: Category | null;
};

export type PostRow = Omit<Post, "author" | "category"> & {
  author_id: string;
  category_id: string | null;
  author: Profile | Profile[] | null;
  category: Category | Category[] | null;
};
