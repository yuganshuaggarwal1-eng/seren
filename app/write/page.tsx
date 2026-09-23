import { redirect } from "next/navigation";
import { WriteForm } from "@/components/WriteForm";
import { getCategories, getVerifiedUser } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata = {
  title: "Write",
};

export default async function WritePage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="page">
        <div className="container">
          <div className="empty-state">
            <h3>Connect Supabase to write</h3>
            <p>
              Add your project keys to <code>.env.local</code>, then run{" "}
              <code>supabase/schema.sql</code> in the SQL editor.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const user = await getVerifiedUser();
  if (!user) redirect("/login?next=/write");

  const categories = await getCategories();

  return (
    <main className="page">
      <div className="container">
        <WriteForm categories={categories} />
      </div>
    </main>
  );
}
