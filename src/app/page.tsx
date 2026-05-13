import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Ticker from "@/components/Ticker";
import BreakingNews from "@/components/BreakingNews";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import { getNews } from "@/lib/news";

export const revalidate = 600;

export default async function Home() {
  const allNews = await getNews();

  // Hero = primeira notícia Regional (rádio regional)
  const heroNews = allNews.find(n => n.category === "Regional") || allNews[0];
  const sideHeroNews = allNews
    .filter(n => n !== heroNews)
    .slice(0, 3);

  const mainGridNews = allNews
    .filter(n => n !== heroNews && !sideHeroNews.includes(n))
    .slice(0, 6);

  const categories = [
    { id: "Regional", label: "Regional", color: "var(--color-cat-regional)" },
    { id: "Brasil", label: "Brasil", color: "var(--color-cat-brasil)" },
    { id: "Esportes", label: "Esportes", color: "var(--color-cat-esportes)" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar />
      <BreakingNews />
      <Header />
      <Ticker newsTitles={allNews.slice(0, 10).map(n => n.title)} />

      <main className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-8 xl:gap-12 items-start">
          
          {/* Coluna Principal */}
          <div>
            {/* Top Section: Hero + Lista Lateral */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-6 xl:gap-8 mb-12 border-b border-border pb-12">
              {/* Manchete Principal */}
              <div>
                {heroNews && <Hero news={heroNews} />}
              </div>
              
              {/* Lista Lateral ao Destaque (Estilo Globo) */}
              <div className="flex flex-col border-t md:border-t-0 md:border-l border-border md:pl-6 xl:pl-8">
                <h2 className="font-montserrat font-black text-sm uppercase tracking-widest text-primary mb-2 mt-4 md:mt-0">
                  Mais Lidas
                </h2>
                <div className="flex flex-col">
                  {sideHeroNews.map((news, i) => (
                    <NewsCard key={i} {...news} compact={true} />
                  ))}
                </div>
              </div>
            </div>

            {/* Últimas Notícias (Grid) */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-montserrat text-2xl font-black text-dark-bg uppercase tracking-tight">
                  Últimas Notícias
                </h2>
                <div className="flex-1 border-b border-border" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {mainGridNews.map((news, i) => (
                  <NewsCard key={i} {...news} />
                ))}
              </div>
            </div>

            {/* Categorias Temáticas */}
            {categories.map((cat) => (
              <div key={cat.id} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight" style={{ color: cat.color }}>
                    {cat.label}
                  </h2>
                  <div className="flex-1 border-b border-border" />
                  <a href="#" className="text-[11px] font-bold tracking-wider hover:opacity-70 transition-all uppercase whitespace-nowrap" style={{ color: cat.color }}>
                    Ver todas →
                  </a>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {allNews
                    .filter(n => n.category === cat.id)
                    .slice(0, 4)
                    .map((news, i) => (
                      <NewsCard key={i} {...news} />
                    ))
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar fixa à direita com Clima + Cotações */}
          <div className="sticky top-24">
            <Sidebar />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
