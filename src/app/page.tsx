import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import Ticker from "@/components/Ticker";

import Player from "@/components/Player";
import BannerAniversario from "@/components/BannerAniversario";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import Sidebar from "@/components/Sidebar";
import VideoGallery from "@/components/VideoGallery";
import DeezerSection from "@/components/DeezerSection";
import EspnSection from "@/components/EspnSection";
import EditoriaSection from "@/components/EditoriaSection";

import HoroscopoCarousel from "@/components/HoroscopoSection";
import EnqueteSection from "@/components/EnqueteSection";
import { NewsArticleSchema } from "@/components/JsonLd";
import { getNews } from "@/lib/news";
import { getAllHoroscopos } from "@/lib/horoscopo";
import { getCategoryByKey } from "@/lib/categories";

export const revalidate = 600;

// Editorias exibidas na home, em ordem. As demais categorias (Economia, Educação,
// Saúde, Justiça) aparecem em "Mais Notícias" e nas respectivas /categoria/[slug].
const HOME_CATEGORY_KEYS = ["regional", "brasil", "esportes"] as const;

export default async function Home() {
  const [allNews, horoscopos] = await Promise.all([getNews(), getAllHoroscopos()]);

  // Hero: prioriza matéria própria marcada como urgente ("AO VIVO"); senão a
  // primeira notícia Regional (rádio regional); senão a mais recente de todas.
  const heroNews =
    allNews.find(n => n.isOwn && n.isBreaking) ||
    allNews.find(n => n.category === "Regional") ||
    allNews[0];

  const homeCategories = HOME_CATEGORY_KEYS.map(getCategoryByKey).filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
      <TopBar />
      <Player />
      <Header activeCategory="regional" />
      <Ticker news={allNews.slice(0, 10)} />

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
        <div className="flex flex-col md:flex-row gap-8 xl:gap-12 md:items-start">
          
          {/* Coluna Principal: Categorias em 3 colunas */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-16">
              {/* Regional */}
              <EditoriaSection
                title="Regional"
                color="var(--color-cat-regional)"
                href="/categoria/regional"
                items={allNews.filter(n => n.category === "Regional" && n !== heroNews)}
              />

              {/* Horóscopo */}
              <HoroscopoCarousel signos={horoscopos} />

              {/* Brasil */}
              <EditoriaSection
                title="Brasil"
                color="var(--color-cat-brasil)"
                href="/categoria/brasil"
                items={allNews.filter(n => n.category === "Brasil" && n !== heroNews)}
              />

              <EspnSection />

              {/* Esportes */}
              <EditoriaSection
                title="Esportes"
                color="var(--color-cat-esportes)"
                href="/categoria/esportes"
                items={allNews.filter(n => n.category === "Esportes" && n !== heroNews)}
              />

              <DeezerSection />

              {/* Mais Notícias: categorias não destacadas acima (Economia, Educação, Saúde, Justiça, agregados) */}
              <EditoriaSection
                title="Mais Notícias"
                color="var(--color-sintonia-azul)"
                href="/busca"
                items={allNews.filter(n => n !== heroNews && !homeCategories.some(c => n.category === c.newsCategory))}
              />

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
