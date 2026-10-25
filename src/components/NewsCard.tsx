"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ShareButtons from "./ShareButtons";
import { categoryColor } from "@/lib/categories";
import type { NewsItem } from "@/lib/news";

interface NewsCardProps extends Pick<NewsItem, "title" | "excerpt" | "image" | "link" | "source" | "category" | "pubDate" | "slug" | "isOwn" | "isBreaking"> {
  compact?: boolean;
}

const NewsCard = ({ title, excerpt, image, link, source, category, pubDate, slug, isOwn, isBreaking, compact = false }: NewsCardProps) => {
  const [imgError, setImgError] = useState(false);

  const formattedDate = new Date(pubDate).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const catColor = categoryColor(category);
  // Matéria própria abre na própria página (/noticia/[slug]); agregado RSS abre na fonte original
  const href = isOwn && slug ? `/noticia/${slug}` : link;
  const linkProps = isOwn && slug ? {} : { target: "_blank", rel: "noopener noreferrer" };

  const imgPlaceholder = (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 text-gray-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest text-center px-2">
      <svg className="w-6 h-6 mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
      <span>{source}</span>
    </div>
  );

  const breakingBadge = isBreaking && (
    <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white bg-[var(--color-vermelho-vivo)] px-1.5 py-0.5 rounded-sm shrink-0">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Urgente
    </span>
  );

  if (compact) {
    return (
      <Link href={href} {...linkProps} className="group flex gap-4 py-4 border-editorial min-w-0">
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
        <div className="flex flex-col flex-1 min-w-0">
          {breakingBadge}
          <h3 className="font-montserrat text-[14px] font-extrabold leading-snug transition-colors line-clamp-3" style={{ color: catColor }}>
            {title}
          </h3>
          <div className="flex items-center gap-3 mt-auto pt-2 min-w-0">
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium whitespace-nowrap uppercase tracking-wide truncate">{category} • Há {formattedDate} • {source}</span>
            <ShareButtons title={title} link={link} />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} {...linkProps} className="group flex h-full flex-col min-w-0">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-slate-700">
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
        <div className="absolute inset-x-0 bottom-0 px-3 py-2.5" style={{ backgroundColor: catColor }}>
          <span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/80 mb-0.5">
            {category}
            {breakingBadge}
          </span>
          <h3 className="font-montserrat text-[0.95rem] font-extrabold leading-tight text-white line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-3 min-w-0">
        <p className="text-[13px] text-text-muted line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-3 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-400 truncate">{source}</span>
          <ShareButtons title={title} link={link} className="ml-auto flex items-center gap-3 shrink-0" iconClassName="w-4 h-4 fill-current" />
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
