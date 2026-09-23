export function slugify(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base || "post"}-${suffix}`;
}

export function readingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function fallbackCover() {
  return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200";
}

export function fallbackAvatar(seed = "writer") {
  return `https://i.pravatar.cc/150?u=${encodeURIComponent(seed)}`;
}

export function safeNextPath(value: string | null | undefined) {
  if (!value) return "/";
  if (!value.startsWith("/")) return "/";
  if (value.startsWith("//") || value.includes("\\") || value.includes("@") || value.includes("://")) {
    return "/";
  }
  return value;
}
