import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ArticleForm, { type ArticleFormInitialData } from "@/components/admin/ArticleForm";

export default async function EditarMateriaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // RLS garante que só o autor (ou admin/editor) consegue ler esta linha.
  const { data: article, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, summary, content, cover_image_url, category, is_breaking, status, published_at, scheduled_for"
    )
    .eq("id", id)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-montserrat text-2xl font-bold text-dark-bg mb-6">Editar matéria</h1>
      <ArticleForm initialData={article as ArticleFormInitialData} />
    </div>
  );
}
