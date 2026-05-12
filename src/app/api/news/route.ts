import { NextResponse } from "next/server";
import { getNews } from "@/lib/news";

export async function GET() {
  try {
    const allNews = await getNews();
    return NextResponse.json(allNews, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1200",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
