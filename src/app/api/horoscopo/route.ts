import { NextRequest, NextResponse } from "next/server";
import { SignoId, SIGNOS } from "@/lib/horoscopo";
import { generateHoroscopoText } from "@/lib/generateHoroscopo";

const BABI_API_URL = process.env.BABI_API_URL;

export async function GET(req: NextRequest) {
  const signo = req.nextUrl.searchParams.get("signo") as SignoId | null;

  if (!signo) {
    return NextResponse.json({ error: "Parâmetro 'signo' é obrigatório." }, { status: 400 });
  }

  if (!SIGNOS.some((s) => s.id === signo)) {
    return NextResponse.json({ error: "Signo inválido." }, { status: 400 });
  }

  if (BABI_API_URL) {
    try {
      const res = await fetch(`${BABI_API_URL}/signo/${signo}/dia`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, {
          headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
        });
      }
    } catch {
      /* usa gerador */
    }
  }

  return NextResponse.json(
    { signo, texto: generateHoroscopoText(signo) },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
  );
}
