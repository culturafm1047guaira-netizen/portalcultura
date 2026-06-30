"use client";
import React from "react";
import Image from "next/image";
import ShareButtons from "./ShareButtons";

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
      <a href={news.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-100 to-slate-200 p-2 shadow-[0_20px_60px_-40px_rgba(11,79,122,0.9)] dark:from-slate-800 dark:to-slate-900">
          <div className="relative h-full w-full overflow-hidden rounded-[22px]">
            {news.image ? (
              <Image 
                src={news.image} 
                alt={news.title}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-300 font-bold uppercase tracking-widest text-xl dark:from-slate-700 dark:to-slate-800 dark:text-slate-500">
                <svg className="w-16 h-16 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                {news.source}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary-soft px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.3em] text-primary dark:text-sky-200 dark:bg-slate-800" style={{ color: 'var(--color-primary)' }}>
              {news.category}
            </span>
            <span className="text-gray-300 text-xs dark:text-slate-600">•</span>
            <span className="text-[11px] text-gray-500 font-semibold uppercase dark:text-slate-400">{news.source}</span>
          </div>
          
          <h1 className="font-montserrat text-[clamp(28px,5vw,44px)] font-black text-text leading-[1.08] tracking-[-0.03em] transition-colors duration-300 group-hover:text-primary">
            {news.title}
          </h1>
          
          {news.excerpt && (
            <p className="text-[15px] md:text-base text-text-muted leading-relaxed mt-1 line-clamp-2 md:line-clamp-3">
              {news.excerpt}
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-4">
            <time className="text-[11px] text-gray-400 font-semibold uppercase tracking-[0.2em] dark:text-slate-400">
              {new Date(news.pubDate).toLocaleString("pt-BR", { 
                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </time>
            <ShareButtons 
              title={news.title} 
              link={news.link} 
              className="flex items-center gap-3"
              buttonBaseClassName="flex items-center gap-2 bg-gray-50 text-gray-500 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 border border-gray-100 hover:border-primary hover:text-primary dark:bg-slate-800 dark:border-slate-700 dark:hover:border-sky-300 dark:hover:text-sky-200"
              iconClassName="w-4 h-4 fill-current"
              showLabels={true}
            />
          </div>
        </div>
      </a>
    </article>
  );
};

export default Hero;
