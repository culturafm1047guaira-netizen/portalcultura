"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteArticleButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Excluir a matéria "${title}"? Essa ação não pode ser desfeita.`)) {
      return;
    }

    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("articles").delete().eq("id", id);
    setDeleting(false);

    if (error) {
      window.alert(`Falha ao excluir: ${error.message}`);
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="text-red-600 hover:underline font-semibold disabled:opacity-60"
    >
      {deleting ? "Excluindo..." : "Excluir"}
    </button>
  );
}
