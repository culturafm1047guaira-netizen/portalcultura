import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Ticker from "@/components/Ticker";
import BreakingNews from "@/components/BreakingNews";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import VideoGallery from "@/components/VideoGallery";
import { getNews } from "@/lib/news";

export const revalidate = 600;

export default async function Home() {
  const allNews = await getNews();

  // Hero = primeira notícia Regional (rádio regional)
  const heroNews = allNews.find(n => n.category === "Regional") || allNews[0];

  const categories = [
    { id: "Regional", label: "Regional", color: "var(--color-cat-regional)" },
    { id: "Brasil", label: "Brasil", color: "var(--color-cat-brasil)" },
    { id: "Esportes", label: "Esportes", color: "var(--color-cat-esportes)" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar />
      <BreakingNews newsTitle={allNews[0]?.title} />
      <Header />
      <Ticker newsTitles={allNews.slice(0, 10).map(n => n.title)} />

      <main className="container py-8 flex-1">
        {/* Top Section: Hero taking full width of the grid container */}
        <div className="w-full mb-12 border-b border-border pb-12">
          {heroNews && <Hero news={heroNews} />}
        </div>

        {/* Banner Publicitário */}
        <div className="w-full mb-12">
          <div className="relative w-full overflow-hidden rounded-sm border border-border bg-white">
            <Image 
              src="/img/banner-festa-peao.jpg" 
              alt="Publicidade" 
              width={1200}
              height={300}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>



        {/* Layout: News (Left) + Sidebar (Right) */}
        <div className="flex flex-col md:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Coluna Principal: Categorias em 3 colunas */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-16">
              {categories.map((cat) => (
                <div key={cat.id}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight" style={{ color: cat.color }}>
                      {cat.label}
                    </h2>
                    <div className="flex-1 border-b border-border" />
                    <a href="#" className="text-[11px] font-bold tracking-wider hover:opacity-70 transition-all uppercase whitespace-nowrap" style={{ color: cat.color }}>
                      Ver todas →
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                    {allNews
                      .filter(n => n.category === cat.id && n !== heroNews)
                      .slice(0, 3)
                      .map((news, i) => (
                        <NewsCard key={i} {...news} />
                      ))
                    }
                  </div>
                </div>
              ))}

              {/* Mais Notícias */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-montserrat text-2xl font-black text-dark-bg uppercase tracking-tight">
                    Mais Notícias
                  </h2>
                  <div className="flex-1 border-b border-border" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
                  {allNews
                    .filter(n => n !== heroNews && !categories.some(c => n.category === c.id))
                    .slice(0, 3)
                    .map((news, i) => (
                      <NewsCard key={i} {...news} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar fixa à direita: 320px no desktop */}
          <aside className="w-full md:w-[320px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-8">
              <Sidebar />
            </div>
          </aside>

        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <VideoGallery />
        </div>
      </main>

      <Footer />
    </div>
  );
}
