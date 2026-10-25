import React from "react";
import NewsCard from "./NewsCard";
import { NewsArticleSchema } from "./JsonLd";
import type { NewsItem } from "@/lib/news";

interface EditoriaSectionProps {
  title: string;
  color: string;
  href: string;
  items: NewsItem[];
  /** Quantas chamadas (além do destaque) mostrar. Default 3 (1 destaque + 3 compactas = 4 no total, como antes). */
  limit?: number;
}

/**
 * Bloco editorial horizontal (destaque + lista compacta) reutilizado em todas
 * as editorias da home e nas páginas /categoria/[slug]. Substitui os blocos
 * quase idênticos que antes estavam hardcoded em page.tsx para cada categoria.
 */
export default function EditoriaSection({ title, color, href, items, limit = 3 }: EditoriaSectionProps) {
  if (items.length === 0) return null;

  const [destaque, ...resto] = items.slice(0, limit + 1);

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-6">
        <h2 className="section-heading font-montserrat text-2xl font-black uppercase tracking-tight" style={{ color }}>
          {title}
        </h2>
        <a href={href} className="text-[11px] font-bold tracking-wider hover:opacity-70 transition-all uppercase whitespace-nowrap" style={{ color }}>
          Ver todas →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-x-6 gap-y-6">
        {destaque && <NewsCard key={`${destaque.source}-${destaque.pubDate}-${destaque.title}`} {...destaque} />}
        <div className="flex flex-col divide-y divide-border min-w-0">
          {resto.map((news) => (
            <NewsCard key={`${news.source}-${news.pubDate}-${news.title}`} {...news} compact />
          ))}
        </div>
      </div>
      {items.map((n) => (
        <NewsArticleSchema key={`schema-${n.source}-${n.pubDate}-${n.title}`} news={n} />
      ))}
    </div>
  );
}
