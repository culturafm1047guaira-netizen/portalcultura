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
    <article className="group mb-8">
      <a href={news.link} target="_blank" rel="noopener" className="block">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-gray-100 mb-4 rounded-sm">
          {news.image ? (
            <Image 
              src={news.image} 
              alt={news.title}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-xl">
              {news.source}
            </div>
          )}
        </div>
        
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>
              {news.category}
            </span>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-[11px] text-gray-500 font-semibold uppercase">{news.source}</span>
          </div>
          
          <h1 className="font-montserrat text-[clamp(24px,5vw,40px)] font-black text-text leading-[1.1] group-hover:text-primary transition-colors tracking-tight">
            {news.title}
          </h1>
          
          {news.excerpt && (
            <p className="text-[15px] md:text-base text-text-muted leading-relaxed mt-1 line-clamp-2 md:line-clamp-3">
              {news.excerpt}
            </p>
          )}
          
          <time className="text-[11px] text-gray-400 mt-2">
            {new Date(news.pubDate).toLocaleString("pt-BR", { 
              day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </time>
        </div>
      </a>
    </article>
  );
};

export default Hero;
