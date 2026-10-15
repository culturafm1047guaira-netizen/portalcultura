import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { count } = await supabase
    .from("articles")
    .select("id", { count: "exact", head: true });

  return (
    <div>
      <h1 className="font-montserrat text-2xl font-bold text-dark-bg mb-6">Dashboard</h1>
      <div className="bg-card-bg border border-border rounded-lg p-6 max-w-sm">
        <p className="text-sm text-text-muted mb-1">Matérias cadastradas</p>
        <p className="text-3xl font-bold text-primary">{count ?? 0}</p>
      </div>
      <p className="text-sm text-text-muted mt-6">
        A lista de matérias e o editor de texto chegam na próxima fase.
      </p>
    </div>
  );
}
