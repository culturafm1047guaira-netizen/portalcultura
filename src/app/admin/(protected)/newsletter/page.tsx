import { createClient } from "@/lib/supabase/server";
import SendNewsletterButton from "@/components/admin/SendNewsletterButton";

export default async function NewsletterAdminPage() {
  const supabase = await createClient();

  const { count: subscriberCount } = await supabase
    .from("newsletter_subscribers")
    .select("id", { count: "exact", head: true });

  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(6);

  return (
    <div>
      <h1 className="font-montserrat text-2xl font-bold text-dark-bg mb-2">Newsletter</h1>
      <p className="text-text-muted text-sm mb-6">
        {subscriberCount ?? 0} inscrito(s). O envio manda um resumo com as últimas matérias publicadas pra todos os inscritos.
      </p>

      <div className="bg-card-bg border border-border rounded-lg p-6 mb-6">
        <h2 className="font-semibold text-dark-bg mb-3 text-sm uppercase tracking-wider text-text-muted">
          Vai incluir estas matérias
        </h2>
        {articles && articles.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {articles.map((a) => (
              <li key={a.slug} className="text-sm text-dark-bg">
                {a.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-muted">Nenhuma matéria publicada ainda.</p>
        )}
      </div>

      <SendNewsletterButton subscriberCount={subscriberCount ?? 0} />
    </div>
  );
}
