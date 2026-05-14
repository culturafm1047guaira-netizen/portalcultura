"use client";

import React, { useState } from "react";

interface BreakingNewsProps {
  newsTitle?: string;
}

const BreakingNews = ({ newsTitle }: BreakingNewsProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || !newsTitle) return null;

  return (
    <div className="bg-primary text-white py-2.5 text-[13px] font-semibold shadow-inner" role="alert" aria-live="polite">
      <div className="container flex items-center gap-4">
        <span className="bg-white text-primary px-2.5 py-0.5 rounded font-black text-[10px] uppercase tracking-wider shrink-0 animate-flash-red">
          Urgente
        </span>
        <span className="flex-1 truncate">
          {newsTitle}
        </span>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white text-lg p-1"
          aria-label="Fechar alerta"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default BreakingNews;
