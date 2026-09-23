import type { Category, Post, Profile } from "@/lib/types";

export const sampleCategories: Category[] = [
  { id: "1", name: "Technology", slug: "technology" },
  { id: "2", name: "Programming", slug: "programming" },
  { id: "3", name: "Artificial Intelligence", slug: "artificial-intelligence" },
  { id: "4", name: "Business", slug: "business" },
  { id: "5", name: "Lifestyle", slug: "lifestyle" },
  { id: "6", name: "Travel", slug: "travel" },
  { id: "7", name: "Food", slug: "food" },
  { id: "8", name: "Education", slug: "education" },
];

const authors: Profile[] = [
  {
    id: "a1",
    name: "Harsh Singh",
    avatar_url: "https://i.pravatar.cc/100?img=12",
    bio: "Technology writer",
  },
  {
    id: "a2",
    name: "Sarah Wilson",
    avatar_url: "https://i.pravatar.cc/100?img=20",
    bio: "Lifestyle editor",
  },
  {
    id: "a3",
    name: "John Smith",
    avatar_url: "https://i.pravatar.cc/100?img=15",
    bio: "JavaScript mentor",
  },
];

export const samplePosts: Post[] = [
  {
    id: "p1",
    title: "The Future of Artificial Intelligence",
    slug: "the-future-of-artificial-intelligence",
    excerpt: "Explore how AI is changing the world and what the future holds.",
    content:
      "Artificial intelligence is moving from research labs into everyday products.\n\nThis sample post is shown until you connect your own Supabase project and publish real articles.",
    cover_image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
    reading_time: 5,
    published: true,
    created_at: "2026-09-01T00:00:00.000Z",
    author: authors[0],
    category: sampleCategories[0],
  },
  {
    id: "p2",
    title: "Minimal Living in 2026",
    slug: "minimal-living-in-2026",
    excerpt: "Simple habits that improve your lifestyle.",
    content:
      "Minimal living is less about owning nothing and more about keeping what matters.\n\nConnect Supabase to replace this sample story with your own writing.",
    cover_image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    reading_time: 7,
    published: true,
    created_at: "2026-08-20T00:00:00.000Z",
    author: authors[1],
    category: sampleCategories[4],
  },
  {
    id: "p3",
    title: "Master JavaScript in 30 Days",
    slug: "master-javascript-in-30-days",
    excerpt: "A practical roadmap to become a JavaScript developer.",
    content:
      "A focused month of JavaScript practice can change how you build for the web.\n\nThis is placeholder copy from the original SerenFeed design.",
    cover_image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    reading_time: 9,
    published: true,
    created_at: "2026-08-10T00:00:00.000Z",
    author: authors[2],
    category: sampleCategories[1],
  },
];

export const sampleWriters = [
  {
    name: "Emily Johnson",
    role: "Technology Writer",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Michael Lee",
    role: "Business Expert",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Olivia Brown",
    role: "Travel Blogger",
    avatar: "https://i.pravatar.cc/150?img=25",
  },
];
