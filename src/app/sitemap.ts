import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES } from "@/lib/categories";

const BASE_URL = "https://radioculturaguaira.com.br";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: "hourly", priority: 1.0 },
    { url: `${BASE_URL}/busca`, changeFrequency: "daily", priority: 0.5 },
    { url: `${BASE_URL}/programacao`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sobre`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/sobre/privacidade`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/contato`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/termos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/transparencia`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/economia`, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE_URL}/servicos-publicos`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES
    .filter((c) => c.href.startsWith("/categoria/"))
    .map((c) => ({
      url: `${BASE_URL}${c.href}`,
      changeFrequency: "hourly" as const,
      priority: 0.7,
    }));

  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("articles")
      .select("slug, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(500);

    articleRoutes = (data ?? []).map((a) => ({
      url: `${BASE_URL}/noticia/${a.slug}`,
      lastModified: a.published_at ? new Date(a.published_at) : undefined,
      changeFrequency: "daily" as const,
      priority: 0.6,
    }));
  } catch {
    // Supabase indisponível no momento do build/revalidate: mantém só as
    // rotas estáticas em vez de quebrar o sitemap inteiro.
  }

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
