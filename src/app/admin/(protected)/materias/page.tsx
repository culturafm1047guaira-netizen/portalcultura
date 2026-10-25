import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const STATUS_LABEL: Record<string, string> = {
  draft: "Rascunho",
  scheduled: "Agendada",
  published: "Publicada",
};

const STATUS_COLOR: Record<string, string> = {
  draft: "bg-gray-200 text-gray-700",
  scheduled: "bg-amber-100 text-amber-700",
  published: "bg-emerald-100 text-emerald-700",
};

export default async function MateriasPage() {
  const supabase = await createClient();

  // RLS já cuida do filtro: autor vê só as próprias, admin/editor veem todas.
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, title, status, category, created_at, published_at, scheduled_for")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-montserrat text-2xl font-bold text-dark-bg">Matérias</h1>
        <Link
          href="/admin/materias/nova"
          className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-md px-4 py-2 text-sm transition-colors"
        >
          + Nova matéria
        </Link>
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-4">Erro ao carregar matérias: {error.message}</p>
      )}

      {!error && (!articles || articles.length === 0) && (
        <div className="bg-card-bg border border-border rounded-lg p-8 text-center text-text-muted">
          Nenhuma matéria cadastrada ainda.
        </div>
      )}

      {articles && articles.length > 0 && (
        <div className="bg-card-bg border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-light-bg border-b border-border text-left text-text-muted uppercase text-[11px] tracking-wider">
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                const date = article.published_at ?? article.scheduled_for ?? article.created_at;
                return (
                  <tr key={article.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-dark-bg">{article.title}</td>
                    <td className="px-4 py-3 text-text-muted">{article.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          STATUS_COLOR[article.status] ?? "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {STATUS_LABEL[article.status] ?? article.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-muted">
                      {date ? new Date(date).toLocaleDateString("pt-BR") : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/materias/${article.id}/editar`}
                        className="text-primary hover:underline font-semibold"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
