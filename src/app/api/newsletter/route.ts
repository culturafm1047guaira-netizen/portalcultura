import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/newsletter] erro ao inserir inscrito:", err);
    return NextResponse.json(
      { ok: false, error: "Não foi possível concluir sua inscrição. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
