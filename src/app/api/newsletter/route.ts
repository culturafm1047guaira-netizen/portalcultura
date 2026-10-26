import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getResendClient, RESEND_FROM_EMAIL } from "@/lib/resend";

async function sendWelcomeEmail(email: string) {
  const resend = getResendClient();
  if (!resend) return; // RESEND_API_KEY não configurada ainda — segue sem enviar

  try {
    await resend.emails.send({
      from: `Rádio Cultura FM 104.7 <${RESEND_FROM_EMAIL}>`,
      to: email,
      subject: "Inscrição confirmada — Rádio Cultura FM 104.7",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h1 style="color: #003366;">104.7</h1>
          <p>Você está inscrito para receber as principais notícias de Guaíra e região direto no seu e-mail.</p>
          <p>Enquanto isso, ouça a Cultura FM ao vivo em
            <a href="https://radioculturaguaira.com.br">radioculturaguaira.com.br</a>.
          </p>
        </div>
      `,
    });
  } catch (err) {
    // Não bloqueia a inscrição se o envio falhar — o e-mail já está salvo.
    console.error("[api/newsletter] falha ao enviar e-mail de boas-vindas:", err);
  }
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const email = typeof body === "object" && body !== null && "email" in body
    ? String((body as { email: unknown }).email ?? "").trim().toLowerCase()
    : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ ok: false, error: "Informe um e-mail válido." }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    if (error) {
      // Violação de unique constraint (e-mail já inscrito)
      if (error.code === "23505") {
        return NextResponse.json({ ok: false, error: "Você já está inscrito na nossa newsletter." }, { status: 409 });
      }
      throw error;
    }

    await sendWelcomeEmail(email);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/newsletter] erro ao inserir inscrito:", err);
    return NextResponse.json(
      { ok: false, error: "Não foi possível concluir sua inscrição. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
