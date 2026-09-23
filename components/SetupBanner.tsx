import { isSupabaseConfigured } from "@/lib/supabase/env";

export function SetupBanner() {
  if (isSupabaseConfigured()) return null;

  return (
    <div className="setup-banner">
      Sample posts are showing until you add your new Supabase project keys to
      <code> .env.local</code> and run <code>supabase/schema.sql</code>.
    </div>
  );
}
