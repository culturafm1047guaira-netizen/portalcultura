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

export const revalidate = 600; // Revalidate every 10 minutes

export default async function Home() {
  const allNews = await getNews();
  const heroNews = allNews[0];
  const gridNews = allNews.slice(1, 13);

  const categories = [
    { id: "Regional", label: "📍 Regional" },
    { id: "Brasil", label: "🇧🇷 Brasil" },
    { id: "Esportes", label: "⚽ Esportes" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <BreakingNews />
      <Header />
      <Ticker />

      <main className="container py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-8 items-start">
          <div className="flex flex-col">
            {heroNews && <Hero news={heroNews} />}

            <div className="flex items-center gap-3 mb-4 pb-2.5 border-b-[3px] border-esportes-accent">
              <h2 className="font-montserrat text-lg font-extrabold text-dark-bg uppercase tracking-wider">
                Últimas Notícias
              </h2>
              <div className="flex-1 h-px bg-border" />
              <a href="#" className="text-esportes-accent text-[11px] font-bold tracking-wider hover:opacity-70 transition-all uppercase whitespace-nowrap">
                Ver todas →
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
              {gridNews.map((news, i) => (
                <NewsCard key={i} {...news} />
              ))}
            </div>

            {categories.map((cat) => (
              <React.Fragment key={cat.id}>
                <div className="flex items-center gap-3 mb-4 pb-2.5 border-b-[3px] border-primary">
                  <h2 className="font-montserrat text-lg font-extrabold text-dark-bg uppercase tracking-wider">
                    {cat.label}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-10">
                  {allNews
                    .filter(n => n.category === cat.id)
                    .slice(0, 3)
                    .map((news, i) => (
                      <NewsCard key={i} {...news} />
                    ))
                  }
                </div>
              </React.Fragment>
            ))}
          </div>

          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
}
