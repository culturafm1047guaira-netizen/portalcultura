"use client";

import React from "react";

const CowboySVG = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="plaid" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#FFFFFF" />
        <rect x="0" y="0" width="4" height="4" fill="#D94B4B" />
        <rect x="4" y="4" width="4" height="4" fill="#D94B4B" />
        <line x1="0" y1="0" x2="8" y2="0" stroke="#B33B3B" strokeWidth="0.5" />
        <line x1="0" y1="4" x2="8" y2="4" stroke="#B33B3B" strokeWidth="0.5" />
        <line x1="0" y1="0" x2="0" y2="8" stroke="#B33B3B" strokeWidth="0.5" />
        <line x1="4" y1="0" x2="4" y2="8" stroke="#B33B3B" strokeWidth="0.5" />
      </pattern>
    </defs>

    {/* ========== CHAPÉU ========== */}
    <ellipse cx="60" cy="26" rx="38" ry="9" fill="#5A3518" />
    <ellipse cx="60" cy="25" rx="36" ry="7" fill="#6B3F1F" />
    <path d="M40 24 Q40 4 60 6 Q80 4 80 24" fill="#5A3518" />
    <path d="M42 22 Q42 10 60 11 Q78 10 78 22" fill="#7A4A28" />
    <path d="M46 14 Q54 18 60 14 Q66 18 74 14" stroke="#5A3518" strokeWidth="1" fill="none" opacity={0.5} />
    <rect x="55" y="12" width="10" height="5" rx="1" fill="#D4A843" />

    {/* ========== CABELO ========== */}
    <path d="M42 36 Q44 28 48 27 Q52 26 56 28 Q60 26 64 28 Q68 26 72 27 Q76 28 78 36" fill="#5A3825" />
    <path d="M44 34 Q46 30 50 30 Q54 30 56 33" fill="#6B4530" />
    <path d="M64 33 Q66 30 70 30 Q74 30 76 34" fill="#6B4530" />
    <path d="M39 38 Q36 44 39 50" stroke="#5A3825" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M81 38 Q84 44 81 50" stroke="#5A3825" strokeWidth="4" fill="none" strokeLinecap="round" />

    {/* ========== ROSTO ========== */}
    <ellipse cx="60" cy="52" rx="20" ry="19" fill="#F2C29B" />

    {/* Olhos grandes castanhos #4A2E1F */}
    <ellipse cx="51" cy="47" rx="4.5" ry="5" fill="white" />
    <ellipse cx="51" cy="48" rx="3" ry="3.5" fill="#4A2E1F" />
    <ellipse cx="69" cy="47" rx="4.5" ry="5" fill="white" />
    <ellipse cx="69" cy="48" rx="3" ry="3.5" fill="#4A2E1F" />
    <circle cx="52.5" cy="46" r="1.5" fill="white" opacity={0.9} />
    <circle cx="70.5" cy="46" r="1.5" fill="white" opacity={0.9} />
    <circle cx="50.5" cy="48.5" r="1" fill="#2C1810" />
    <circle cx="68.5" cy="48.5" r="1" fill="#2C1810" />

    {/* Sobrancelhas #3A2418 */}
    <path d="M44 41 Q48 38 54 40" stroke="#3A2418" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M66 40 Q72 38 76 41" stroke="#3A2418" strokeWidth="1.8" fill="none" strokeLinecap="round" />

    {/* Nariz pequeno arredondado */}
    <path d="M58 52 Q60 54 62 52" stroke="#D4A882" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Sorriso feliz */}
    <path d="M49 56 Q54 64 60 64 Q66 64 71 56" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="57" y="57" width="2.5" height="2.5" rx="0.5" fill="white" />
    <rect x="60.5" y="57" width="2.5" height="2.5" rx="0.5" fill="white" />

    {/* Bochechas coradas + sardas */}
    <ellipse cx="46" cy="56" rx="4.5" ry="3" fill="#FFB6C1" opacity={0.5} />
    <ellipse cx="74" cy="56" rx="4.5" ry="3" fill="#FFB6C1" opacity={0.5} />
    <circle cx="47" cy="51" r="0.8" fill="#C4956A" opacity={0.6} />
    <circle cx="49" cy="53" r="0.8" fill="#C4956A" opacity={0.6} />
    <circle cx="73" cy="51" r="0.8" fill="#C4956A" opacity={0.6} />
    <circle cx="71" cy="53" r="0.8" fill="#C4956A" opacity={0.6} />

    {/* ========== PESCOÇO ========== */}
    <rect x="54" y="66" width="12" height="7" rx="3" fill="#F2C29B" />

    {/* ========== LENÇO VERMELHO #C62828 ========== */}
    <path d="M40 70 L80 70 L73 84 L60 92 L47 84 Z" fill="#C62828" />
    <path d="M40 70 Q35 74 30 72 Q35 67 40 70" fill="#C62828" />
    <path d="M80 70 Q85 74 90 72 Q85 67 80 70" fill="#C62828" />
    <circle cx="60" cy="77" r="5" fill="#9E2020" />
    <path d="M57 75 Q60 79 63 75" stroke="#7A1818" strokeWidth="1" fill="none" />

    {/* ========== CAMISA XADREZ MANGA LONGA ========== */}
    {/* Corpo */}
    <path d="M44 76 L50 76 L52 94 Q54 104 60 106 Q66 104 68 94 L70 76 L76 76 L72 108 Q66 114 60 116 Q54 114 48 108 Z" fill="url(#plaid)" />
    {/* Mangas longas - braço esquerdo */}
    <path d="M44 78 Q36 82 30 88 L26 94 Q24 98 28 100 L32 96 Q36 90 46 86 Z" fill="url(#plaid)" />
    {/* Mangas longas - braço direito */}
    <path d="M76 78 Q84 82 90 88 L94 94 Q96 98 92 100 L88 96 Q84 90 74 86 Z" fill="url(#plaid)" />
    {/* Punhos */}
    <path d="M26 94 L28 100" stroke="#B33B3B" strokeWidth="1.5" />
    <path d="M94 94 L92 100" stroke="#B33B3B" strokeWidth="1.5" />
    {/* Mãos */}
    <ellipse cx="27" cy="98" rx="3" ry="3" fill="#F2C29B" />
    <ellipse cx="93" cy="98" rx="3" ry="3" fill="#F2C29B" />

    {/* ========== COLETE DE COURO #4E311F ========== */}
    <path d="M41 72 L49 72 L51 90 Q53 98 60 100 Q67 98 69 90 L71 72 L79 72 L76 104 Q68 110 60 112 Q52 110 44 104 Z" fill="#4E311F" />
    <path d="M41 72 L49 72 L51 90 Q53 98 60 100 Q67 98 69 90 L71 72 L79 72" stroke="#3A2315" strokeWidth="1.5" fill="none" />
    <line x1="60" y1="74" x2="60" y2="88" stroke="#3A2315" strokeWidth="1.5" />
    <path d="M46 76 Q48 84 48 90" stroke="#6B4530" strokeWidth="0.8" fill="none" strokeDasharray="1.5 1.5" />
    <path d="M74 76 Q72 84 72 90" stroke="#6B4530" strokeWidth="0.8" fill="none" strokeDasharray="1.5 1.5" />
    <circle cx="60" cy="78" r="2" fill="#6B3F1F" />
    <circle cx="60" cy="84" r="2" fill="#6B3F1F" />
    <rect x="47" y="80" width="8" height="7" rx="1" stroke="#3A2315" strokeWidth="0.8" fill="none" />
    <rect x="65" y="80" width="8" height="7" rx="1" stroke="#3A2315" strokeWidth="0.8" fill="none" />

    {/* ========== ESTRELA DO XERIFE #F2C230 ========== */}
    <polygon points="60,88 61.5,91.5 65.5,91.5 62.5,94 63.5,98 60,95.5 56.5,98 57.5,94 54.5,91.5 58.5,91.5" fill="#F2C230" stroke="#D4A820" strokeWidth="0.5" />

    {/* ========== CINTO ========== */}
    <rect x="48" y="98" width="24" height="5" rx="2" fill="#4A2B18" />
    {/* Fivela prata #B0B0B0 */}
    <rect x="57" y="96" width="6" height="9" rx="1.5" fill="#B0B0B0" stroke="#909090" strokeWidth="0.8" />

    {/* ========== CALÇAS JEANS #2E5FA7 ========== */}
    <path d="M50 102 L48 116 L56 116 L56 104 Z" fill="#2E5FA7" />
    <path d="M70 102 L72 116 L64 116 L64 104 Z" fill="#2E5FA7" />
    <line x1="52" y1="104" x2="50" y2="114" stroke="#1E4F97" strokeWidth="0.6" />
    <line x1="68" y1="104" x2="70" y2="114" stroke="#1E4F97" strokeWidth="0.6" />
    <rect x="50" y="105" width="5" height="4" rx="1" stroke="#1E4F97" strokeWidth="0.5" fill="none" />
    <rect x="65" y="105" width="5" height="4" rx="1" stroke="#1E4F97" strokeWidth="0.5" fill="none" />

    {/* ========== COLDRE COM REVÓLVER ========== */}
    <path d="M72 98 L76 98 L78 112 L74 112 Z" fill="#5C3317" />
    <path d="M72 98 L76 98 L78 112 L74 112 Z" stroke="#3E2200" strokeWidth="0.8" fill="none" />
    <path d="M74 102 L76 102 L77 106 L74 106 Z" fill="#333333" />
    <rect x="76" y="102" width="4" height="2" rx="0.5" fill="#555555" />
    <circle cx="77" cy="104" r="1.5" fill="#444444" />
    <path d="M70 96 L80 96" stroke="#4A2B18" strokeWidth="2.5" />

    {/* ========== BOTAS ========== */}
    <path d="M48 115 L44 120 L58 120 L56 115 Z" fill="#6B3F1F" />
    <path d="M44 120 Q42 120 42 119 L44 118" fill="#5A3518" />
    <path d="M72 115 L76 120 L62 120 L64 115 Z" fill="#6B3F1F" />
    <path d="M76 120 Q78 120 78 119 L76 118" fill="#5A3518" />
    <rect x="47" y="112" width="8" height="4" rx="1" fill="#7A4A28" />
    <rect x="65" y="112" width="8" height="4" rx="1" fill="#7A4A28" />
    <path d="M48 114 L54 114" stroke="#9B5B2A" strokeWidth="0.8" />
    <path d="M66 114 L72 114" stroke="#9B5B2A" strokeWidth="0.8" />

    {/* ========== ESPORAS ========== */}
    <circle cx="46" cy="119" r="2.5" fill="#D4A843" stroke="#B8860B" strokeWidth="0.5" />
    <line x1="44" y1="119" x2="48" y2="119" stroke="#B8860B" strokeWidth="1" />
    <line x1="46" y1="121" x2="46" y2="122" stroke="#B8860B" strokeWidth="0.8" />
    <circle cx="74" cy="119" r="2.5" fill="#D4A843" stroke="#B8860B" strokeWidth="0.5" />
    <line x1="72" y1="119" x2="76" y2="119" stroke="#B8860B" strokeWidth="1" />
    <line x1="74" y1="121" x2="74" y2="122" stroke="#B8860B" strokeWidth="0.8" />
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

      {/* Avatar */}
      <div
        className="relative order-2 w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#d88b4a] to-[#f5d2a2] shadow-[0_0_24px_rgba(216,139,74,0.5)] flex items-center justify-center border-[3px] border-[#c07a3a] group-hover:animate-none p-1"
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
