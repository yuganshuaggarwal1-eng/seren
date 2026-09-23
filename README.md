# SerenFeed

A Next.js blogging app with login, signup, and posts. Connect a **new** Supabase project when you are ready — this repo does not use an existing account.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

The site works with sample posts until you add real keys.

## Connect your new Supabase project

1. Create a fresh project at [supabase.com](https://supabase.com) (do not reuse another app’s project).
2. Copy **Project URL** and the **publishable** or **anon** key into `.env.local`.
3. In the Supabase SQL Editor, run `supabase/schema.sql`.
4. Authentication → URL configuration:
   - Site URL: `http://localhost:3000`
   - Redirect URL: `http://localhost:3000/auth/callback`
5. For local testing, you can turn off **Confirm email** under Authentication → Providers → Email.
6. Restart `npm run dev`.

## What you can do after connecting

- Sign up / log in / log out
- Publish a post
- Read posts at `/blog/[slug]`
- Edit or delete only your own posts
