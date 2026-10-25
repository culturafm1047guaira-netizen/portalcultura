"use client";

import React from "react";
import type { NewsItem } from "@/lib/news";

type TickerEntry = Pick<NewsItem, "title" | "isBreaking">;

interface TickerProps {
  news?: TickerEntry[];
}

const FALLBACK_ENTRIES: TickerEntry[] = [
  { title: "Carregando as últimas notícias do portal Rádio Cultura FM 104.7..." },
  { title: "Confira a grade de programação completa em nosso site." },
];

const Ticker = ({ news = [] }: TickerProps) => {
  const displayEntries = news.length > 0 ? news : FALLBACK_ENTRIES;
  const hasBreaking = displayEntries.some((n) => n.isBreaking);

  return (
    <div className="bg-primary flex items-center h-9 overflow-hidden" role="log" aria-label="Últimas notícias" aria-live="polite">
      <div
        className={`text-white text-[10px] font-bold tracking-widest uppercase px-4 h-full flex items-center whitespace-nowrap shrink-0 ${hasBreaking ? "" : "bg-primary-dark"}`}
        style={hasBreaking ? { backgroundColor: "var(--color-vermelho-vivo)" } : undefined}
      >
        {hasBreaking ? "Ao vivo" : "Últimas"}
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-14 whitespace-nowrap animate-[ticker-scroll_60s_linear_infinite] text-[12px] text-white px-4 hover:[animation-play-state:paused]">
          {displayEntries.concat(displayEntries).map((entry, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-white">•</span>
              {entry.isBreaking && (
                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white px-1.5 py-0.5 rounded-sm shrink-0" style={{ backgroundColor: "var(--color-vermelho-vivo)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Urgente
                </span>
              )}
              {entry.title}
            </span>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Ticker;
