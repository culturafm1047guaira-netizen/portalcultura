import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [{ count: total }, { count: published }, { count: drafts }] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("articles").select("id", { count: "exact", head: true }).eq("status", "draft"),
  ]);

  return (
    <div>
      <h1 className="font-montserrat text-2xl font-bold text-dark-bg mb-6">Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="bg-card-bg border border-border rounded-lg p-6 w-48">
          <p className="text-sm text-text-muted mb-1">Matérias cadastradas</p>
          <p className="text-3xl font-bold text-primary">{total ?? 0}</p>
        </div>
        <div className="bg-card-bg border border-border rounded-lg p-6 w-48">
          <p className="text-sm text-text-muted mb-1">Publicadas</p>
          <p className="text-3xl font-bold text-primary">{published ?? 0}</p>
        </div>
        <div className="bg-card-bg border border-border rounded-lg p-6 w-48">
          <p className="text-sm text-text-muted mb-1">Rascunhos</p>
          <p className="text-3xl font-bold text-primary">{drafts ?? 0}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href="/admin/materias"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold rounded-md px-5 py-2.5 text-sm transition-colors"
        >
          Gerenciar matérias
        </Link>
        <Link
          href="/admin/newsletter"
          className="inline-block border border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-md px-5 py-2.5 text-sm transition-colors"
        >
          Newsletter
        </Link>
      </div>
    </div>
  );
}
