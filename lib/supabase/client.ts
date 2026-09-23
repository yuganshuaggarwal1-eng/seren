import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseKey, getSupabaseUrl, isSupabaseConfigured } from "@/lib/supabase/env";

export function createClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  return createBrowserClient(getSupabaseUrl(), getSupabaseKey());
}
