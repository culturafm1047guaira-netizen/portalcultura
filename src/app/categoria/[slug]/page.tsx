import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Player from "@/components/Player";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import { NewsArticleSchema } from "@/components/JsonLd";
import { getNews } from "@/lib/news";
import { CATEGORIES, getCategoryByKey, type CategoryKey } from "@/lib/categories";

export const revalidate = 600;

/** Só gera estaticamente as categorias que de fato vivem em /categoria/[slug]
 *  (Economia tem página própria em /economia, fora deste grupo de rotas). */
export function generateStaticParams() {
  return CATEGORIES.filter((cat) => cat.href.startsWith("/categoria/")).map((cat) => ({
    slug: cat.key,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = getCategoryByKey(slug);

  if (!categoria) {
    return { title: "Categoria não encontrada — Rádio Cultura FM 104.7" };
  }

  return {
    title: `${categoria.label} — Rádio Cultura FM 104.7`,
    description: `Últimas notícias de ${categoria.label} no Portal da Rádio Cultura FM 104.7 — Guaíra, SP.`,
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoria = getCategoryByKey(slug);

  if (!categoria) {
    notFound();
  }

  const allNews = await getNews();
  const newsInCategory = allNews.filter((n) => n.category === categoria.newsCategory);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <TopBar />
      <Player />
      <Header activeCategory={categoria.key as CategoryKey} />

      <main className="container py-8 flex-1">
        <div className="text-[12px] text-gray-400 mb-6 min-w-0 truncate">
          <Link href="/" className="text-primary hover:underline">Início</Link> &rsaquo; <strong>{categoria.label}</strong>
        </div>

        <div className="flex flex-col md:flex-row gap-8 xl:gap-12 md:items-start">
          <div className="flex-1 min-w-0">
            <div className="mb-10">
              <h1
                className="section-heading font-montserrat text-3xl font-black uppercase tracking-tight"
                style={{ color: categoria.color }}
              >
                {categoria.label}
              </h1>
              <p className="text-[14px] text-text-muted mt-3 max-w-2xl">
                As últimas notícias de {categoria.label} para Guaíra, SP e região.
              </p>
            </div>

            {newsInCategory.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                {newsInCategory.map((news) => (
                  <NewsCard key={`${news.source}-${news.pubDate}-${news.title}`} {...news} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-gray-50 dark:bg-slate-800 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">
                <div className="text-4xl mb-4">📰</div>
                <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest">
                  Nenhuma notícia encontrada
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Ainda não há notícias de {categoria.label} disponíveis. Volte em breve.
                </p>
                <Link href="/" className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-primary-dark transition-colors">
                  Voltar para o Início
                </Link>
              </div>
            )}

            {newsInCategory.map((n) => (
              <NewsArticleSchema key={`schema-${n.source}-${n.pubDate}-${n.title}`} news={n} />
            ))}
          </div>

          <aside className="w-full md:w-[320px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-8">
              <Sidebar topNews={allNews.slice(0, 5).map((n) => ({ title: n.title, link: n.link }))} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
