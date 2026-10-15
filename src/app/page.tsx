import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Ticker from "@/components/Ticker";

import Player from "@/components/Player";
import HeroWave from "@/components/HeroWave";
import BannerAniversario from "@/components/BannerAniversario";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import VideoGallery from "@/components/VideoGallery";
import DeezerSection from "@/components/DeezerSection";
import EspnSection from "@/components/EspnSection";

import HoroscopoCarousel from "@/components/HoroscopoSection";
import EnqueteSection from "@/components/EnqueteSection";
import { NewsArticleSchema } from "@/components/JsonLd";
import { getNews } from "@/lib/news";
import { getAllHoroscopos } from "@/lib/horoscopo";

export const revalidate = 600;

export default async function Home() {
  const [allNews, horoscopos] = await Promise.all([getNews(), getAllHoroscopos()]);

  // Hero = primeira notícia Regional (rádio regional)
  const heroNews = allNews.find(n => n.category === "Regional") || allNews[0];

  const categories = [
    { id: "Regional", label: "Regional", color: "var(--color-cat-regional)" },
    { id: "Brasil", label: "Brasil", color: "var(--color-cat-brasil)" },
    { id: "Esportes", label: "Esportes", color: "var(--color-cat-esportes)" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <TopBar />
      <Player />
      <Header activeCategory="regional" />
      <Ticker newsTitles={allNews.slice(0, 10).map(n => n.title)} />

      {/* Faixa de frequência 104.7 */}
      <section className="bg-papel-jornal border-b border-frequencia-100">
        <div className="container py-3">
          <HeroWave />
        </div>
      </section>

      <main className="container py-8 flex-1">
        {/* Manchete principal + chamadas secundárias, estilo G1 */}
        <div className="w-full mb-12 border-b border-border pb-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          <div>
            {heroNews && <Hero news={heroNews} />}
            {heroNews && <NewsArticleSchema news={heroNews} />}
          </div>
          <div className="flex flex-col divide-y divide-border lg:border-l lg:border-border lg:pl-6">
            {allNews
              .filter(n => n !== heroNews)
              .slice(0, 4)
              .map((news) => (
                <NewsCard key={`chamada-${news.source}-${news.pubDate}-${news.title}`} {...news} compact />
              ))
            }
          </div>
        </div>

        {/* Banner 70 Anos */}
        <div className="w-full mb-12">
          <BannerAniversario />
        </div>



        {/* Layout: News (Left) + Sidebar (Right) */}
        <div className="flex flex-col md:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Coluna Principal: Categorias em 3 colunas */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-16">
              {/* Regional */}
              <div key="Regional">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight" style={{ color: "var(--color-cat-regional)" }}>
                    Regional
                  </h2>
                  <div className="flex-1 border-b border-border" />
                  <a href="/busca?q=Regional" className="text-[11px] font-bold tracking-wider hover:opacity-70 transition-all uppercase whitespace-nowrap" style={{ color: "var(--color-cat-regional)" }}>
                    Ver todas →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-x-6 gap-y-6">
                  {(() => {
                    const items = allNews.filter(n => n.category === "Regional" && n !== heroNews).slice(0, 4);
                    const [destaque, ...resto] = items;
                    return (
                      <>
                        {destaque && <NewsCard key={`${destaque.source}-${destaque.pubDate}-${destaque.title}`} {...destaque} />}
                        <div className="flex flex-col divide-y divide-border">
                          {resto.map((news) => (
                            <NewsCard key={`${news.source}-${news.pubDate}-${news.title}`} {...news} compact />
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
                {allNews.filter(n => n.category === "Regional" && n !== heroNews).slice(0, 4).map(n => (
                  <NewsArticleSchema key={`schema-${n.source}-${n.pubDate}-${n.title}`} news={n} />
                ))}
              </div>

              {/* Horóscopo */}
              <HoroscopoCarousel signos={horoscopos} />

              {/* Brasil */}
              <div key="Brasil">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight" style={{ color: "var(--color-cat-brasil)" }}>
                    Brasil
                  </h2>
                  <div className="flex-1 border-b border-border" />
                  <a href="/busca?q=Brasil" className="text-[11px] font-bold tracking-wider hover:opacity-70 transition-all uppercase whitespace-nowrap" style={{ color: "var(--color-cat-brasil)" }}>
                    Ver todas →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-x-6 gap-y-6">
                  {(() => {
                    const items = allNews.filter(n => n.category === "Brasil" && n !== heroNews).slice(0, 4);
                    const [destaque, ...resto] = items;
                    return (
                      <>
                        {destaque && <NewsCard key={`${destaque.source}-${destaque.pubDate}-${destaque.title}`} {...destaque} />}
                        <div className="flex flex-col divide-y divide-border">
                          {resto.map((news) => (
                            <NewsCard key={`${news.source}-${news.pubDate}-${news.title}`} {...news} compact />
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
                {allNews.filter(n => n.category === "Brasil" && n !== heroNews).slice(0, 4).map(n => (
                  <NewsArticleSchema key={`schema-${n.source}-${n.pubDate}-${n.title}`} news={n} />
                ))}
              </div>

              <EspnSection />

              {/* Esportes */}
              <div key="Esportes">
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-montserrat text-2xl font-black uppercase tracking-tight" style={{ color: "var(--color-cat-esportes)" }}>
                    Esportes
                  </h2>
                  <div className="flex-1 border-b border-border" />
                  <a href="/busca?q=Esportes" className="text-[11px] font-bold tracking-wider hover:opacity-70 transition-all uppercase whitespace-nowrap" style={{ color: "var(--color-cat-esportes)" }}>
                    Ver todas →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-x-6 gap-y-6">
                  {(() => {
                    const items = allNews.filter(n => n.category === "Esportes" && n !== heroNews).slice(0, 4);
                    const [destaque, ...resto] = items;
                    return (
                      <>
                        {destaque && <NewsCard key={`${destaque.source}-${destaque.pubDate}-${destaque.title}`} {...destaque} />}
                        <div className="flex flex-col divide-y divide-border">
                          {resto.map((news) => (
                            <NewsCard key={`${news.source}-${news.pubDate}-${news.title}`} {...news} compact />
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <DeezerSection />

              {/* Mais Notícias */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-montserrat text-2xl font-black text-dark-bg uppercase tracking-tight">
                    Mais Notícias
                  </h2>
                  <div className="flex-1 border-b border-border" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-x-6 gap-y-6">
                  {(() => {
                    const items = allNews.filter(n => n !== heroNews && !categories.some(c => n.category === c.id)).slice(0, 4);
                    const [destaque, ...resto] = items;
                    return (
                      <>
                        {destaque && <NewsCard key={`${destaque.source}-${destaque.pubDate}-${destaque.title}`} {...destaque} />}
                        <div className="flex flex-col divide-y divide-border">
                          {resto.map((news) => (
                            <NewsCard key={`${news.source}-${news.pubDate}-${news.title}`} {...news} compact />
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              <EnqueteSection />
            </div>
          </div>

          {/* Sidebar fixa à direita: 320px no desktop */}
          <aside className="w-full md:w-[320px] shrink-0">
            <div className="sticky top-24 flex flex-col gap-8">
              <Sidebar topNews={allNews.slice(0, 5).map(n => ({ title: n.title, link: n.link }))} />
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
