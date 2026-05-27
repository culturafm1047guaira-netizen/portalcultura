import { NextResponse } from "next/server";
import { getAllIndicators } from "@/lib/dados-financeiros";

export async function GET() {
  try {
    const data = await getAllIndicators();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      },
    });
  } catch {
    return NextResponse.json({ error: "Falha ao coletar dados financeiros" }, { status: 500 });
  }
}
