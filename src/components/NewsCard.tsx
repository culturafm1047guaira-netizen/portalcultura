"use client";
import React, { useState } from "react";
import Image from "next/image";
import ShareButtons from "./ShareButtons";

interface NewsCardProps {
  title: string;
  excerpt: string;
  image?: string | null;
  link: string;
  source: string;
  category: string;
  pubDate: string;
  compact?: boolean;
}

const NewsCard = ({ title, excerpt, image, link, source, category, pubDate, compact = false }: NewsCardProps) => {
  const [imgError, setImgError] = useState(false);
  
  const formattedDate = new Date(pubDate).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Decide cor da categoria
  let catColor = "var(--color-primary)";
  const lowerCat = category.toLowerCase();
  if (lowerCat.includes("brasil")) catColor = "var(--color-cat-brasil)";
  if (lowerCat.includes("esporte")) catColor = "var(--color-cat-esportes)";
  if (lowerCat.includes("regi")) catColor = "var(--color-cat-regional)";
  if (lowerCat.includes("facebook")) catColor = "#1877F2";

  const imgPlaceholder = (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 text-gray-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest text-center px-2">
      <svg className="w-6 h-6 mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
      <span>{source}</span>
    </div>
  );

  if (compact) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="group flex gap-4 py-4 border-editorial">
        <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-gray-100 dark:bg-slate-700 rounded-sm">
          {image && !imgError ? (
            <Image 
              src={image} 
              alt={title} 
              fill 
              style={{ objectFit: "cover" }} 
              className="transition-transform duration-[700ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-110" 
              onError={() => setImgError(true)}
            />
          ) : imgPlaceholder}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: catColor }}>
            {category}
          </span>
          <h3 className="font-montserrat text-[14px] font-bold leading-snug text-text group-hover:text-primary transition-colors line-clamp-3">
            {title}
          </h3>
          <div className="flex items-center gap-3 mt-auto pt-2">
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium whitespace-nowrap">Há {formattedDate} • {source}</span>
            <ShareButtons title={title} link={link} />
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col rounded-[24px] border border-border/70 bg-white p-3 shadow-[0_16px_50px_-30px_rgba(2,6,23,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_60px_-30px_rgba(11,79,122,0.7)] dark:border-slate-700/50 dark:bg-slate-800">
      <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-gray-100 dark:bg-slate-700">
        {image && !imgError ? (
          <Image 
            src={image} 
            alt={title} 
            fill 
            style={{ objectFit: "cover" }} 
            className="transition-transform duration-[700ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" 
            onError={() => setImgError(true)}
          />
        ) : imgPlaceholder}
      </div>
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <span className="mb-2 inline-flex w-fit rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.28em]" style={{ color: catColor, backgroundColor: 'color-mix(in srgb, currentColor 14%, transparent)' }}>
          {category}
        </span>
        <h3 className="font-montserrat text-[1.02rem] font-extrabold leading-tight text-text transition-colors duration-300 group-hover:text-primary line-clamp-3">
          {title}
        </h3>
        <p className="mt-2 text-[13px] text-text-muted line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-4 dark:border-slate-700">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400">{source}</span>
          <ShareButtons title={title} link={link} className="ml-auto flex items-center gap-3" iconClassName="w-4 h-4 fill-current" />
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
