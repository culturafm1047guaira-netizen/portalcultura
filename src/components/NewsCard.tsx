"use client";
import React, { useState } from "react";
import Image from "next/image";

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
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400 font-bold uppercase text-[10px] tracking-widest text-center px-2">
      <svg className="w-6 h-6 mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
      <span>{source}</span>
    </div>
  );

  if (compact) {
    return (
      <a href={link} target="_blank" rel="noopener" className="group flex gap-4 py-4 border-editorial">
        <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-gray-100 rounded-sm">
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
            <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Há {formattedDate} • {source}</span>
            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + link)}`, "_blank");
                }}
                className="text-gray-400 hover:text-[#25D366] transition-colors"
                title="Compartilhar no WhatsApp"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, "_blank");
                }}
                className="text-gray-400 hover:text-[#1877F2] transition-colors"
                title="Compartilhar no Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener" className="group flex flex-col h-full pb-6">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 mb-3 rounded-sm">
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
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{source}</span>
          <div className="flex items-center gap-3 ml-auto">
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + link)}`, "_blank");
              }}
              className="text-gray-400 hover:text-[#25D366] transition-all duration-300"
              title="Compartilhar no WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, "_blank");
              }}
              className="text-gray-400 hover:text-[#1877F2] transition-all duration-300"
              title="Compartilhar no Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
