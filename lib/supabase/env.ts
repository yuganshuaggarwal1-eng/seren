export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
}

export function getSupabaseKey() {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    ""
  );
}

export function isSupabaseConfigured() {
  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  return Boolean(url && key && !url.includes("your-project") && !key.includes("your-"));
}
