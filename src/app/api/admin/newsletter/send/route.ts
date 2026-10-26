import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getResendClient, RESEND_FROM_EMAIL } from "@/lib/resend";

const BASE_URL = "https://radioculturaguaira.com.br";
const ARTICLE_LIMIT = 6;

// Envio sequencial (ver loop abaixo) pode demorar: ~0.55s por inscrito.
// No plano Hobby da Vercel toda função é limitada a 10s independente desse
// valor — acima de ~15 inscritos o envio vai cortar no meio. Plano Pro
// permite até 300s. Se a lista de inscritos crescer muito, trocar pro envio
// em lote (resend.batch.send) ou mover pra uma fila/cron.
export const maxDuration = 60;

function buildDigestHtml(articles: { title: string; slug: string; summary: string | null }[]) {
  const items = articles
    .map(
      (a) => `
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
            <a href="${BASE_URL}/noticia/${a.slug}" style="color:#003366; font-weight:bold; text-decoration:none; font-size:15px;">
              ${a.title}
            </a>
            ${a.summary ? `<p style="margin:6px 0 0; color:#555; font-size:13px;">${a.summary}</p>` : ""}
          </td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
      <h1 style="color:#003366; margin-bottom:4px;">104.7</h1>
      <p style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px; margin-top:0;">
        Resumo da semana — Rádio Cultura FM
      </p>
      <table style="width:100%; border-collapse:collapse;">${items}</table>
      <p style="margin-top:24px;">
        <a href="${BASE_URL}" style="color:#003366;">Ver todas as notícias →</a>
      </p>
    </div>
  `;
}

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ ok: false, error: "Não autenticado." }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (!profile || !["admin", "editor"].includes(profile.role)) {
      return NextResponse.json({ ok: false, error: "Sem permissão." }, { status: 403 });
    }

    const resend = getResendClient();
    if (!resend) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY não configurada. Peça pro responsável técnico configurar." },
        { status: 503 }
      );
    }

    const admin = createAdminClient();

    const [{ data: articles }, { data: subscribers }] = await Promise.all([
      admin
        .from("articles")
        .select("title, slug, summary")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(ARTICLE_LIMIT),
      admin.from("newsletter_subscribers").select("email"),
    ]);

    if (!articles || articles.length === 0) {
      return NextResponse.json({ ok: false, error: "Nenhuma matéria publicada pra incluir no resumo." }, { status: 400 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ ok: false, error: "Nenhum inscrito na newsletter ainda." }, { status: 400 });
    }

    const html = buildDigestHtml(articles);
    let sent = 0;
    let failed = 0;

    // Envio individual (não em lote/BCC) pra não expor os e-mails dos
    // inscritos uns aos outros. Sequencial com um respiro entre envios pra
    // não estourar o rate limit do plano gratuito do Resend (2 req/s).
    for (const { email } of subscribers) {
      try {
        await resend.emails.send({
          from: `Rádio Cultura FM 104.7 <${RESEND_FROM_EMAIL}>`,
          to: email,
          subject: "Resumo da semana — Rádio Cultura FM 104.7",
          html,
        });
        sent++;
      } catch (err) {
        failed++;
        console.error(`[newsletter/send] falha ao enviar para ${email}:`, err);
      }
      await new Promise((resolve) => setTimeout(resolve, 550));
    }

    return NextResponse.json({ ok: true, sent, failed, total: subscribers.length });
  } catch (err) {
    console.error("[newsletter/send] erro inesperado:", err);
    return NextResponse.json({ ok: false, error: "Erro inesperado ao enviar." }, { status: 500 });
  }
}
