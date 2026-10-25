import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Player from "@/components/Player";
import ShareButtons from "@/components/ShareButtons";
import ArticleViewTracker from "@/components/ArticleViewTracker";
import { NewsArticleSchema } from "@/components/JsonLd";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { categoryColor, getCategoryByNewsCategory } from "@/lib/categories";

export const revalidate = 60;

interface ArticleRow {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  cover_image_url: string | null;
  category: string;
  author_id: string;
  status: string;
  published_at: string | null;
  created_at: string;
  views_count?: number | null;
  is_breaking?: boolean | null;
}

/** Busca a matéria respeitando RLS: só retorna se status = published. */
async function getArticle(slug: string): Promise<ArticleRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data as ArticleRow;
}

/**
 * Nome do autor é informação pública de byline de uma matéria já publicada.
 * A policy de RLS de `profiles` só libera leitura para usuários autenticados,
 * então para o visitante anônimo usamos o client service-role apenas para
 * este dado cosmético (não há dado sensível em `full_name`).
 */
async function getAuthorName(authorId: string): Promise<string | null> {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("profiles")
      .select("full_name")
      .eq("id", authorId)
      .single();
    return data?.full_name ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: "Matéria não encontrada — Rádio Cultura FM 104.7" };
  }

  const description = (article.summary ?? article.content).slice(0, 160);
  const url = `https://radioculturaguaira.com.br/noticia/${article.slug}`;

  return {
    title: `${article.title} — Rádio Cultura FM 104.7`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description,
      url,
      type: "article",
      images: article.cover_image_url ? [{ url: article.cover_image_url }] : undefined,
      publishedTime: article.published_at ?? undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: article.cover_image_url ? [article.cover_image_url] : undefined,
    },
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const authorName = await getAuthorName(article.author_id);
  const color = categoryColor(article.category);
  const categoryDef = getCategoryByNewsCategory(article.category);
  const publishedDate = article.published_at ?? article.created_at;
  const formattedDate = new Date(publishedDate).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const paragraphs = article.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const link = `https://radioculturaguaira.com.br/noticia/${article.slug}`;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <TopBar />
      <Player />
      <Header activeCategory={categoryDef?.key} />

      <ArticleViewTracker slug={article.slug} />
      <NewsArticleSchema
        news={{
          title: article.title,
          excerpt: article.summary ?? "",
          image: article.cover_image_url,
          pubDate: publishedDate,
          link,
          category: categoryDef?.label ?? article.category,
          source: "Rádio Cultura FM 104.7",
        }}
      />

      <main className="container py-8 flex-1">
        <article className="max-w-3xl mx-auto">
          <nav className="text-xs text-text-muted mb-4">
            <Link href="/" className="hover:underline">
              Início
            </Link>
            {categoryDef && (
              <>
                {" / "}
                <Link href={categoryDef.href} className="hover:underline" style={{ color }}>
                  {categoryDef.label}
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block text-[11px] font-bold tracking-wider uppercase" style={{ color }}>
              {categoryDef?.label ?? article.category}
            </span>
            {article.is_breaking && (
              <span className="bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                Urgente
              </span>
            )}
          </div>

          <h1 className="font-montserrat text-3xl md:text-4xl font-black text-dark-bg leading-tight mb-4">
            {article.title}
          </h1>

          {article.summary && (
            <p className="text-lg text-text-muted mb-4 leading-relaxed">{article.summary}</p>
          )}

          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted border-b border-border pb-4 mb-6">
            {authorName && (
              <span>
                Por <strong className="text-dark-bg">{authorName}</strong>
              </span>
            )}
            <span>{formattedDate}</span>
            {typeof article.views_count === "number" && (
              <span>{article.views_count.toLocaleString("pt-BR")} visualizações</span>
            )}
          </div>

          {article.cover_image_url && (
            <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden bg-light-bg">
              <Image
                src={article.cover_image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="text-base leading-relaxed text-text">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <ShareButtons
              title={article.title}
              link={link}
              buttonBaseClassName="text-text-muted transition-colors"
              iconClassName="w-5 h-5 fill-current"
              showLabels
              className="flex items-center gap-5"
            />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
