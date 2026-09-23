"use client";

import Link from "next/link";
import { deletePost } from "@/lib/actions";

export function ArticleActions({ postId }: { postId: string }) {
  return (
    <div className="article-actions">
      <Link href={`/write/${postId}`} className="secondary-btn">
        Edit
      </Link>
      <form
        action={deletePost}
        onSubmit={(event) => {
          if (!window.confirm("Delete this post? This cannot be undone.")) {
            event.preventDefault();
          }
        }}
      >
        <input type="hidden" name="id" value={postId} />
        <button type="submit" className="danger-btn">
          Delete
        </button>
      </form>
    </div>
  );
}
