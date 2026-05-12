import React from "react";
import Image from "next/image";

interface HeroProps {
  news: {
    title: string;
    excerpt: string;
    image?: string | null;
    link: string;
    source: string;
    category: string;
    pubDate: string;
  };
}

const Hero = ({ news }: HeroProps) => {
  return (
    <article className="bg-card-bg border border-border rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] mb-6 min-h-[380px] group">
      <div className="relative min-h-[240px] bg-dark-bg overflow-hidden flex items-center justify-center">
        {news.image ? (
          <Image 
            src={news.image} 
            alt={news.title}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-700 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="text-white/10 text-[11px] uppercase tracking-widest text-center px-4">
            {news.title}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-bg/30 to-dark-bg/70" />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-primary text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-lg">
            {news.category}
          </span>
        </div>
      </div>
      
      <div className="p-7 lg:p-9 flex flex-col justify-center gap-4">
        <div className="text-[10px] font-bold text-primary tracking-[0.14em] uppercase">
          Destaque
        </div>
        <h1 className="font-montserrat text-[clamp(20px,4vw,28px)] font-extrabold text-dark-bg leading-tight">
          {news.title}
        </h1>
        <p className="text-[14px] text-text-muted leading-relaxed line-clamp-3">
          {news.excerpt}
        </p>
        <div className="flex flex-col gap-1 text-[10px] text-gray-400 italic">
          <span className="text-red-700 font-bold uppercase not-italic">{news.source}</span>
          <time>{new Date(news.pubDate).toLocaleDateString("pt-BR", { day: '2-digit', month: 'long', year: 'numeric' })}</time>
        </div>
        <a 
          href={news.link} 
          target="_blank" 
          rel="noopener"
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-dark-bg text-white rounded font-bold text-[12px] tracking-wider transition-all hover:bg-[#1a3a5c] hover:translate-x-1"
        >
          Ler notícia completa →
        </a>
      </div>
    </article>
  );
};

export default Hero;
