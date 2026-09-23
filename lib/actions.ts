"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getVerifiedUser } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { readingTime, slugify } from "@/lib/utils";

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function signOut() {
  const supabase = await createClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/");
}

export async function subscribeNewsletter(
  _prev: { error: string; success: string },
  formData: FormData,
): Promise<{ error: string; success: string }> {
  const email = asString(formData.get("email"));
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email.", success: "" };
  }

  const supabase = await createClient();
  if (!supabase) {
    return { error: "", success: "Thanks! Add your Supabase project to store subscribers." };
  }

  const { error } = await supabase.from("subscribers").insert({ email });
  if (error && error.code !== "23505") {
    return { error: "Could not subscribe right now. Try again later.", success: "" };
  }

  return { error: "", success: "Thank you for subscribing." };
}

export async function createPost(
  _prev: { error: string },
  formData: FormData,
): Promise<{ error: string }> {
  const user = await getVerifiedUser();
  const supabase = await createClient();

  if (!user || !supabase) {
    return { error: "You need to log in before publishing." };
  }

  const title = asString(formData.get("title"));
  const excerpt = asString(formData.get("excerpt"));
  const content = asString(formData.get("content"));
  const categoryId = asString(formData.get("category_id"));
  const coverImage = asString(formData.get("cover_image"));

  if (!title || title.length < 4) {
    return { error: "Give your post a title of at least 4 characters." };
  }

  if (!content || content.length < 20) {
    return { error: "Write a bit more — at least 20 characters." };
  }

  const payload = {
    author_id: user.id,
    category_id: categoryId || null,
    title,
    slug: slugify(title),
    excerpt: excerpt || content.slice(0, 160),
    content,
    cover_image: coverImage || null,
    reading_time: readingTime(content),
    published: true,
  };

  const { data, error } = await supabase.from("posts").insert(payload).select("slug").single();
  if (error || !data) {
    return { error: "Could not publish this post. Try a different title." };
  }

  revalidatePath("/");
  revalidatePath("/explore");
  redirect(`/blog/${data.slug}`);
}

export async function updatePost(
  _prev: { error: string },
  formData: FormData,
): Promise<{ error: string }> {
  const user = await getVerifiedUser();
  const supabase = await createClient();
  const id = asString(formData.get("id"));

  if (!user || !supabase || !id) {
    return { error: "You can only edit your own posts." };
  }

  const title = asString(formData.get("title"));
  const excerpt = asString(formData.get("excerpt"));
  const content = asString(formData.get("content"));
  const categoryId = asString(formData.get("category_id"));
  const coverImage = asString(formData.get("cover_image"));

  if (!title || title.length < 4) {
    return { error: "Give your post a title of at least 4 characters." };
  }

  if (!content || content.length < 20) {
    return { error: "Write a bit more — at least 20 characters." };
  }

  const { data, error } = await supabase
    .from("posts")
    .update({
      category_id: categoryId || null,
      title,
      excerpt: excerpt || content.slice(0, 160),
      content,
      cover_image: coverImage || null,
      reading_time: readingTime(content),
    })
    .eq("id", id)
    .eq("author_id", user.id)
    .select("slug")
    .single();

  if (error || !data) {
    return { error: "Could not update this post." };
  }

  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath(`/blog/${data.slug}`);
  redirect(`/blog/${data.slug}`);
}

export async function deletePost(formData: FormData) {
  const user = await getVerifiedUser();
  const supabase = await createClient();
  const id = asString(formData.get("id"));

  if (!user || !supabase || !id) {
    redirect("/");
  }

  await supabase.from("posts").delete().eq("id", id).eq("author_id", user.id);
  revalidatePath("/");
  revalidatePath("/explore");
  redirect("/explore");
}
