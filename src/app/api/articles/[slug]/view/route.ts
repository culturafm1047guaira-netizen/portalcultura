import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Incrementa o contador de visualizações de uma matéria própria.
 * Usa o client service-role (bypassa RLS) porque o público não tem permissão
 * de update na tabela articles. Chamado via fetch a partir da página de
 * matéria, sem bloquear a renderização.
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const supabase = createAdminClient();

    // views_count pode não existir ainda caso a migration 0002 não tenha
    // sido rodada — nesse caso o update falha silenciosamente e seguimos.
    const { data: article, error: selectError } = await supabase
      .from("articles")
      .select("id, views_count")
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (selectError || !article) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }

    // Incremento atômico via função do Postgres (migration 0003) — evita
    // perder contagem sob acesso concorrente. Se a migration ainda não foi
    // rodada nesse banco, cai no select+update antigo (não atômico, mas
    // mantém a contagem funcionando até a migration ser aplicada).
    const { error: rpcError } = await supabase.rpc("increment_article_views", {
      article_id: article.id,
    });

    if (rpcError) {
      const currentViews = typeof article.views_count === "number" ? article.views_count : 0;
      await supabase
        .from("articles")
        .update({ views_count: currentViews + 1 })
        .eq("id", article.id);
    }

    return NextResponse.json({ ok: true });
  } catch {
    // Defensivo: nunca deixa essa rota quebrar a experiência do leitor.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
