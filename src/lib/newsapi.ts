import type { NewsItem } from "./news";

export async function getNewsAPIData(): Promise<NewsItem[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=br&pageSize=12&apiKey=${apiKey}`,
      { next: { revalidate: 1800 } }
    );
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.articles?.length) return [];

    return data.articles.map((a: any) => ({
      title: a.title || "",
      link: a.url || "#",
      image: a.urlToImage || null,
      excerpt: (a.description || "").substring(0, 160),
      pubDate: a.publishedAt ? new Date(a.publishedAt).toISOString() : new Date().toISOString(),
      source: a.source?.name || "NewsAPI",
      category: "Brasil",
    }));
  } catch {
    return [];
  }
}
