import { notFound, redirect } from "next/navigation";
import { WriteForm } from "@/components/WriteForm";
import { getCategories, getPostById, getVerifiedUser } from "@/lib/data";

export const metadata = {
  title: "Edit post",
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [user, post, categories] = await Promise.all([
    getVerifiedUser(),
    getPostById(id),
    getCategories(),
  ]);

  if (!user) redirect(`/login?next=/write/${id}`);
  if (!post || post.author.id !== user.id) notFound();

  return (
    <main className="page">
      <div className="container">
        <WriteForm categories={categories} post={post} />
      </div>
    </main>
  );
}
