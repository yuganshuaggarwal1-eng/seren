-- Run this in the SQL Editor of the NEW SerenFeed Supabase project.
-- Do not run it on an existing unrelated project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default 'Writer',
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles (id) on delete cascade,
  category_id uuid references public.categories (id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image text,
  reading_time integer not null default 1,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email ~* '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'),
  created_at timestamptz not null default now()
);

create index if not exists posts_published_created_at_idx
  on public.posts (published, created_at desc);

create index if not exists posts_author_id_idx
  on public.posts (author_id);

create index if not exists posts_category_id_idx
  on public.posts (category_id);

create index if not exists posts_slug_idx
  on public.posts (slug);

create schema if not exists private;

create or replace function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'Writer'
    )
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function private.set_updated_at();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.subscribers enable row level security;

drop policy if exists profiles_select_all on public.profiles;
create policy profiles_select_all
  on public.profiles
  for select
  using (true);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists categories_select_all on public.categories;
create policy categories_select_all
  on public.categories
  for select
  using (true);

drop policy if exists posts_select_published_or_own on public.posts;
create policy posts_select_published_or_own
  on public.posts
  for select
  using (published = true or auth.uid() = author_id);

drop policy if exists posts_insert_own on public.posts;
create policy posts_insert_own
  on public.posts
  for insert
  with check (auth.uid() = author_id);

drop policy if exists posts_update_own on public.posts;
create policy posts_update_own
  on public.posts
  for update
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

drop policy if exists posts_delete_own on public.posts;
create policy posts_delete_own
  on public.posts
  for delete
  using (auth.uid() = author_id);

drop policy if exists subscribers_insert on public.subscribers;
create policy subscribers_insert
  on public.subscribers
  for insert
  with check (true);

grant usage on schema public to anon, authenticated;

grant select on table public.profiles to anon, authenticated;
grant update on table public.profiles to authenticated;

grant select on table public.categories to anon, authenticated;

grant select on table public.posts to anon, authenticated;
grant insert, update, delete on table public.posts to authenticated;

grant insert on table public.subscribers to anon, authenticated;

insert into public.categories (name, slug)
values
  ('Technology', 'technology'),
  ('Programming', 'programming'),
  ('Artificial Intelligence', 'artificial-intelligence'),
  ('Business', 'business'),
  ('Lifestyle', 'lifestyle'),
  ('Travel', 'travel'),
  ('Food', 'food'),
  ('Education', 'education')
on conflict (slug) do nothing;
