"use client";

import React from "react";

const WhatsAppPeao = () => {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=551733311155"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 cursor-pointer group"
      style={{ animation: "peao-bounce 2s ease-in-out infinite" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animation = "none" }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.animation = "peao-bounce 2s ease-in-out infinite" }}
    >
      {/* Speech bubble */}
      <div className="relative bg-white dark:bg-slate-800 border-2 border-yellow-500 rounded-xl px-4 py-2.5 shadow-lg order-1">
        <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-0 h-0 border-8 border-y-8 border-l-8 border-transparent border-l-yellow-500 dark:border-l-slate-800" />
        <p className="text-[13px] font-bold text-dark-bg dark:text-white whitespace-nowrap">
          🎵 Peça sua música
        </p>
        <p className="text-[10px] text-gray-500 dark:text-gray-400">
          Clique e fale conosco!
        </p>
      </div>

      {/* Avatar */}
      <div
        className="relative order-2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center justify-center border-2 border-yellow-300 group-hover:animate-none"
        style={{ animation: "peao-wiggle 4s ease-in-out infinite" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animation = "none" }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.animation = "peao-wiggle 4s ease-in-out infinite" }}
      >
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-xl select-none" role="img" aria-label="Chapéu">
          🤠
        </span>
        <span className="text-3xl select-none mt-1" role="img" aria-label="Rosto">
          😎
        </span>
      </div>
    </a>
  );
};

export default WhatsAppPeao;
