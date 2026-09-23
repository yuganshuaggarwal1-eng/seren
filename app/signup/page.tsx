import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export const metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <main className="auth-page">
      <div className="container">
        <div className="auth-layout">
          <aside className="auth-panel">
            <p className="brand-mark">SerenFeed</p>
            <h1>Join SerenFeed</h1>
            <p>
              Create an account and publish stories that feel like yours — clear, owned, and calm.
            </p>
          </aside>
          <Suspense fallback={<div className="auth-card">Loading...</div>}>
            <AuthForm mode="signup" />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
