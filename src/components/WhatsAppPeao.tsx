"use client";

import React from "react";

const CowboySVG = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chapéu de cowboy - aba */}
    <ellipse cx="60" cy="28" rx="36" ry="8" fill="#8B4513" />
    {/* Chapéu - copa */}
    <path d="M41 26 Q41 6 60 8 Q79 6 79 26" fill="#A0522D" />
    <path d="M43 24 Q43 12 60 13 Q77 12 77 24" fill="#C4873B" />
    {/* Fivela do chapéu */}
    <rect x="56" y="13" width="8" height="5" rx="1" fill="#D4A843" />

    {/* Cabelo nas laterais */}
    <path d="M38 36 Q36 42 38 48" stroke="#4A2800" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M82 36 Q84 42 82 48" stroke="#4A2800" strokeWidth="3" fill="none" strokeLinecap="round" />

    {/* Rosto */}
    <ellipse cx="60" cy="52" rx="19" ry="18" fill="#F5D0A9" />

    {/* Olhos */}
    <ellipse cx="52" cy="48" rx="3" ry="3.5" fill="#2C1810" />
    <ellipse cx="68" cy="48" rx="3" ry="3.5" fill="#2C1810" />
    {/* Brilho nos olhos */}
    <circle cx="53.5" cy="46.5" r="1.2" fill="white" opacity={0.8} />
    <circle cx="69.5" cy="46.5" r="1.2" fill="white" opacity={0.8} />

    {/* Sobrancelhas */}
    <path d="M47 42 Q51 40 55 42" stroke="#4A2800" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M65 42 Q69 40 73 42" stroke="#4A2800" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Sorriso */}
    <path d="M51 56 Q56 62 60 62 Q64 62 69 56" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round" />

    {/* Bochechas coradas */}
    <ellipse cx="47" cy="56" rx="4" ry="2.5" fill="#FFB6C1" opacity={0.6} />
    <ellipse cx="73" cy="56" rx="4" ry="2.5" fill="#FFB6C1" opacity={0.6} />

    {/* Pescoço */}
    <rect x="55" y="66" width="10" height="6" rx="3" fill="#F5D0A9" />

    {/* Lenço vermelho no pescoço */}
    <path d="M42 70 L78 70 L72 82 L60 90 L48 82 Z" fill="#CC0000" />
    <path d="M42 70 Q38 75 32 72 Q38 68 42 70" fill="#CC0000" />
    <path d="M78 70 Q82 75 88 72 Q82 68 78 70" fill="#CC0000" />
    {/* Nó do lenço */}
    <circle cx="60" cy="76" r="4" fill="#990000" />

    {/* Colete */}
    <path d="M43 76 L50 76 L52 92 Q54 100 60 102 Q66 100 68 92 L70 76 L77 76 L74 106 Q68 112 60 114 Q52 112 46 106 Z" fill="#D4A843" />
    {/* Linha do colete */}
    <line x1="60" y1="78" x2="60" y2="90" stroke="#B8860B" strokeWidth="1.5" />
    {/* Botões do colete */}
    <circle cx="60" cy="80" r="1.5" fill="#B8860B" />
    <circle cx="60" cy="86" r="1.5" fill="#B8860B" />

    {/* Camisa (braços) */}
    <path d="M43 78 Q34 84 28 94 L32 98 Q38 88 46 84 Z" fill="#FFFFFF" />
    <path d="M77 78 Q86 84 92 94 L88 98 Q82 88 74 84 Z" fill="#FFFFFF" />

    {/* Calças */}
    <path d="M50 100 L48 114 L56 114 L56 102 Z" fill="#4A7FB5" />
    <path d="M70 100 L72 114 L64 114 L64 102 Z" fill="#4A7FB5" />

    {/* Cintos */}
    <rect x="48" y="98" width="24" height="4" rx="1.5" fill="#8B4513" />
    <rect x="58" y="97" width="4" height="6" rx="1" fill="#D4A843" />

    {/* Botas */}
    <path d="M47 114 L44 118 L56 118 L56 114 Z" fill="#5C3317" />
    <path d="M73 114 L76 118 L64 118 L64 114 Z" fill="#5C3317" />
    {/* Salto das botas */}
    <rect x="43" y="116" width="4" height="4" rx="1" fill="#3E2200" />
    <rect x="73" y="116" width="4" height="4" rx="1" fill="#3E2200" />

    {/* Estrela do xerife no peito */}
    <polygon points="60,92 61,95 64,95 62,97 63,100 60,98 57,100 58,97 56,95 59,95" fill="#FFD700" />
  </svg>
);

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

      {/* Avatar - Menino Cowboy */}
      <div
        className="relative order-2 w-[76px] h-[76px] rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 shadow-[0_0_24px_rgba(234,179,8,0.45)] flex items-center justify-center border-[3px] border-yellow-300 group-hover:animate-none p-1.5"
        style={{ animation: "peao-wiggle 4s ease-in-out infinite" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animation = "none" }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.animation = "peao-wiggle 4s ease-in-out infinite" }}
      >
        <div className="w-full h-full rounded-full bg-white overflow-hidden">
          <CowboySVG />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppPeao;
