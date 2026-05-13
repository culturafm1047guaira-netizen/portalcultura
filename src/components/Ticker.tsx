"use client";

import React from "react";

interface TickerProps {
  newsTitles?: string[];
}

const Ticker = ({ newsTitles = [] }: TickerProps) => {
  const displayTitles = newsTitles.length > 0 
    ? newsTitles 
    : ["Carregando as últimas notícias do portal Rádio Cultura FM 104.7...", "Confira a grade de programação completa em nosso site."];

  return (
    <div className="bg-primary flex items-center h-9 overflow-hidden" role="log" aria-label="Últimas notícias" aria-live="polite">
      <div className="bg-primary-dark text-white text-[10px] font-bold tracking-widest uppercase px-4 h-full flex items-center whitespace-nowrap shrink-0">
        Últimas
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="flex gap-14 whitespace-nowrap animate-[ticker-scroll_60s_linear_infinite] text-[12px] text-white/90 px-4 hover:[animation-play-state:paused]">
          {displayTitles.concat(displayTitles).map((title, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="text-white/40">•</span> {title}
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
