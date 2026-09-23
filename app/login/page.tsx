import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export const metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-layout">
          <aside className="auth-panel">
            <p className="brand-mark">SerenFeed</p>
            <h1>Welcome back</h1>
            <p>Pick up where you left off — write, edit, and publish with the same calm tools.</p>
          </aside>
          <Suspense fallback={<div className="auth-card">Loading...</div>}>
            <AuthForm mode="login" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
