import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import NewsCard from "@/components/NewsCard";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import { getNews } from "@/lib/news";

export const revalidate = 600;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string, limit?: string }>;
}) {
  const { q: query, limit } = await searchParams;
  const currentLimit = parseInt(limit || "12", 10);
  const allNews = await getNews();

  const filteredNews = query
    ? allNews.filter((n) =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        n.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const displayedNews = filteredNews.slice(0, currentLimit);
  const hasMore = currentLimit < filteredNews.length;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <TopBar />
      <Player />
      <Header />

      <main className="container py-12 flex-1">
        <div className="flex flex-col md:flex-row gap-8 xl:gap-12 items-start">
          <div className="flex-1 min-w-0">
            <div className="mb-12">
              <h1 className="font-montserrat text-3xl font-black uppercase tracking-tight text-primary mb-2">
                Resultados da Busca
              </h1>
              <p className="text-gray-500 font-medium">
                {query ? (
                  <>
                    Mostrando resultados para: <span className="text-dark-bg font-bold">&quot;{query}&quot;</span>
                    <span className="ml-2 text-sm">({filteredNews.length} encontradas)</span>
                  </>
                ) : (
                  "Digite algo para pesquisar..."
                )}
              </p>
              <div className="mt-4 border-b border-border w-full" />
            </div>

            {filteredNews.length > 0 ? (
              <div className="flex flex-col gap-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                  {displayedNews.map((news) => (
                    <NewsCard key={`${news.source}-${news.pubDate}-${news.title}`} {...news} />
                  ))}
                </div>
                
                {hasMore && (
                  <div className="flex justify-center mt-4">
                    <Link 
                      href={`/busca?q=${encodeURIComponent(query || "")}&limit=${currentLimit + 12}`}
                      className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md hover:shadow-lg"
                      scroll={false}
                    >
                      Carregar mais notícias
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-400 uppercase tracking-widest">
                  Nenhuma notícia encontrada
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Tente outros termos ou verifique a ortografia.
                </p>
                <Link href="/" className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-primary-dark transition-colors">
                  Voltar para o Início
                </Link>
              </div>
            )}
          </div>

          <aside className="w-full md:w-[320px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-8">
              <Sidebar />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
