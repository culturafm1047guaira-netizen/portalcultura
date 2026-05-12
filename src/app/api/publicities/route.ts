import { NextResponse } from "next/server";
import path from "path";
import { readdirSync } from "fs";

export async function GET() {
  try {
    const publicitiesDir = path.join(process.cwd(), "public", "Publicidades");
    const files = readdirSync(publicitiesDir)
      .filter((f) => /\.(jpg|jpeg|png|gif)$/i.test(f))
      .map((f) => `/Publicidades/${f}`);

    return NextResponse.json(files);
  } catch {
    return NextResponse.json([]);
  }
}
