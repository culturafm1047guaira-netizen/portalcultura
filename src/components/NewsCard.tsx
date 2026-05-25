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
    <a href={link} target="_blank" rel="noopener noreferrer" className="group flex flex-col h-full pb-6">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-700 mb-3 rounded-sm">
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
      <div className="flex flex-col flex-1">
        <span className="text-[10px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: catColor }}>
          {category}
        </span>
        <h3 className="font-montserrat text-lg font-bold leading-tight text-text group-hover:text-primary transition-colors line-clamp-3">
          {title}
        </h3>
        <p className="text-[13px] text-text-muted line-clamp-2 leading-relaxed mt-2">
          {excerpt}
        </p>
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50 dark:border-slate-700">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{source}</span>
          <ShareButtons title={title} link={link} className="flex items-center gap-3 ml-auto" iconClassName="w-4 h-4 fill-current" />
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
