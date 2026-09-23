"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/lib/actions";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, {
    error: "",
    success: "",
  });

  return (
    <form action={formAction}>
      {state.error ? <div className="form-error">{state.error}</div> : null}
      {state.success ? <div className="form-success">{state.success}</div> : null}
      <div className="newsletter-box">
        <input type="email" name="email" placeholder="Enter your email" required />
        <button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Subscribe"}
        </button>
      </div>
    </form>
  );
}
