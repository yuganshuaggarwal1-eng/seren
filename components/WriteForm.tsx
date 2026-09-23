"use client";

import { useActionState } from "react";
import { createPost, updatePost } from "@/lib/actions";
import type { Category, Post } from "@/lib/types";

export function WriteForm({
  categories,
  post,
}: {
  categories: Category[];
  post?: Post;
}) {
  const action = post ? updatePost : createPost;
  const [state, formAction, pending] = useActionState(action, { error: "" });

  return (
    <form className="write-card" action={formAction}>
      <p className="eyebrow">{post ? "Editing" : "New story"}</p>
      <h1>{post ? "Edit your story" : "Write a story"}</h1>
      <p className="form-hint">
        Title and body are required. Excerpt and cover image help your story stand out on the feed.
      </p>

      {state.error ? <div className="form-error">{state.error}</div> : null}
      {post ? <input type="hidden" name="id" value={post.id} /> : null}

      <div className="write-layout">
        <div>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              defaultValue={post?.title}
              placeholder="Give it a clear title"
              required
              minLength={4}
            />
          </div>
          <div className="field">
            <label htmlFor="content">Story</label>
            <textarea
              id="content"
              name="content"
              defaultValue={post?.content}
              placeholder="Start writing..."
              required
              minLength={20}
            />
          </div>
        </div>

        <aside className="write-side">
          <div className="field">
            <label htmlFor="excerpt">Excerpt</label>
            <input
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt ?? ""}
              placeholder="One or two lines for the card"
            />
          </div>
          <div className="field">
            <label htmlFor="category_id">Category</label>
            <select id="category_id" name="category_id" defaultValue={post?.category?.id ?? ""}>
              <option value="">General</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="cover_image">Cover image URL</label>
            <input
              id="cover_image"
              name="cover_image"
              type="url"
              defaultValue={post?.cover_image ?? ""}
              placeholder="https://..."
            />
          </div>
          <button className="primary-btn" type="submit" disabled={pending}>
            {pending ? "Saving..." : post ? "Update story" : "Publish"}
          </button>
        </aside>
      </div>
    </form>
  );
}
