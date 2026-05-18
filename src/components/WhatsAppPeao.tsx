"use client";

import React from "react";

const CowboyCharacter = () => (
  <svg viewBox="0 0 100 150" className="w-full h-full drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="plaid" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="#FFFFFF" />
        <rect x="0" y="0" width="3" height="3" fill="#D94B4B" />
        <rect x="3" y="3" width="3" height="3" fill="#D94B4B" />
      </pattern>
      <filter id="shadow">
        <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* Sombra no chão */}
    <ellipse cx="50" cy="144" rx="18" ry="3" fill="rgba(0,0,0,0.12)" />

    {/* ===== PERNAS ===== */}
    {/* Perna esquerda */}
    <path d="M42 108 L38 134 L44 134 L46 108" fill="#3A6BCC" />
    {/* Perna direita */}
    <path d="M58 108 L62 134 L56 134 L54 108" fill="#3A6BCC" />
    {/* Joelhos */}
    <ellipse cx="43" cy="116" rx="4" ry="3" fill="#2E5FA7" />
    <ellipse cx="57" cy="116" rx="4" ry="3" fill="#2E5FA7" />

    {/* ===== BOTAS ===== */}
    <path d="M37 133 L33 140 L47 140 L44 133 Z" fill="#6B3F1F" />
    <path d="M63 133 L67 140 L53 140 L56 133 Z" fill="#6B3F1F" />
    <path d="M33 140 Q30 140 30 139 L32 138" fill="#5A3518" />
    <path d="M67 140 Q70 140 70 139 L68 138" fill="#5A3518" />
    {/* Solas */}
    <rect x="32" y="139" width="16" height="2" rx="1" fill="#4A2B18" />
    <rect x="52" y="139" width="16" height="2" rx="1" fill="#4A2B18" />
    {/* Cano das botas */}
    <rect x="38" y="130" width="6" height="4" rx="1" fill="#7A4A28" />
    <rect x="56" y="130" width="6" height="4" rx="1" fill="#7A4A28" />

    {/* ===== ESPORAS ===== */}
    <circle cx="35" cy="139" r="2" fill="#D4A843" stroke="#B8860B" strokeWidth="0.5" />
    <line x1="33" y1="139" x2="37" y2="139" stroke="#B8860B" strokeWidth="0.8" />
    <line x1="35" y1="140.5" x2="35" y2="142" stroke="#B8860B" strokeWidth="0.8" />
    <circle cx="65" cy="139" r="2" fill="#D4A843" stroke="#B8860B" strokeWidth="0.5" />
    <line x1="63" y1="139" x2="67" y2="139" stroke="#B8860B" strokeWidth="0.8" />
    <line x1="65" y1="140.5" x2="65" y2="142" stroke="#B8860B" strokeWidth="0.8" />

    {/* ===== CORPO (CAMISA + COLETE) ===== */}
    {/* Camisa xadrez - tronco */}
    <path d="M39 68 L46 68 L48 90 Q50 102 50 108 L42 108 L40 102 L36 90 Q35 78 39 68 Z" fill="url(#plaid)" />
    <path d="M61 68 L54 68 L52 90 Q50 102 50 108 L58 108 L60 102 L64 90 Q65 78 61 68 Z" fill="url(#plaid)" />
    {/* Gola da camisa */}
    <path d="M44 68 L50 74 L56 68" fill="url(#plaid)" stroke="#B33B3B" strokeWidth="0.8" />

    {/* Colete de couro */}
    <path d="M37 66 L46 66 L48 86 Q50 96 50 100 L44 100 L40 94 L36 84 Q35 74 37 66 Z" fill="#4E311F" />
    <path d="M63 66 L54 66 L52 86 Q50 96 50 100 L56 100 L60 94 L64 84 Q65 74 63 66 Z" fill="#4E311F" />
    {/* Borda do colete */}
    <path d="M37 66 L46 66 L48 86 Q50 96 50 100" stroke="#3A2315" strokeWidth="1.2" fill="none" />
    <path d="M63 66 L54 66 L52 86 Q50 96 50 100" stroke="#3A2315" strokeWidth="1.2" fill="none" />
    {/* Costuras */}
    <path d="M40 70 Q42 80 42 86" stroke="#6B4530" strokeWidth="0.6" fill="none" strokeDasharray="1 1" />
    <path d="M60 70 Q58 80 58 86" stroke="#6B4530" strokeWidth="0.6" fill="none" strokeDasharray="1 1" />
    {/* Bolsos */}
    <rect x="42" y="78" width="6" height="5" rx="1" stroke="#3A2315" strokeWidth="0.6" fill="none" />
    <rect x="52" y="78" width="6" height="5" rx="1" stroke="#3A2315" strokeWidth="0.6" fill="none" />

    {/* ===== ESTRELA DO XERIFE ===== */}
    <polygon points="50,86 51,88.5 53.5,88.5 51.5,90 52.3,92.5 50,91 47.7,92.5 48.5,90 46.5,88.5 49,88.5" fill="#F2C230" stroke="#D4A820" strokeWidth="0.3" />

    {/* ===== BRAÇOS ===== */}
    {/* Braço esquerdo (acenando) */}
    <path d="M39 72 Q28 66 22 56 Q20 52 24 52 Q28 56 32 62 Q36 68 40 74" fill="url(#plaid)" />
    <path d="M22 56 L24 52" stroke="#B33B3B" strokeWidth="1" />
    {/* Mão esquerda */}
    <circle cx="23" cy="53" r="3.5" fill="#F2C29B" />

    {/* Braço direito (na cintura) */}
    <path d="M61 72 Q70 70 74 75 Q76 80 72 82 Q66 78 62 76" fill="url(#plaid)" />
    <path d="M74 75 L72 82" stroke="#B33B3B" strokeWidth="1" />
    {/* Mão direita */}
    <circle cx="73" cy="81" r="3.5" fill="#F2C29B" />

    {/* ===== CINTOS ===== */}
    <rect x="42" y="104" width="16" height="4" rx="1.5" fill="#4A2B18" />
    <rect x="48" y="103" width="4" height="6" rx="1" fill="#B0B0B0" stroke="#909090" strokeWidth="0.5" />
    {/* Coldre */}
    <path d="M58 104 L62 104 L64 116 L60 116 Z" fill="#5C3317" />
    <path d="M58 104 L62 104 L64 116 L60 116 Z" stroke="#3E2200" strokeWidth="0.5" fill="none" />
    {/* Revólver */}
    <path d="M60 107 L61.5 107 L62 110 L59.5 110 Z" fill="#333" />
    <rect x="62" y="107" width="3" height="1.5" rx="0.3" fill="#555" />
    <circle cx="61" cy="108.5" r="1" fill="#444" />
    {/* Correia */}
    <path d="M56 102 L66 102" stroke="#4A2B18" strokeWidth="2" />

    {/* ===== LENÇO VERMELHO ===== */}
    <path d="M38 60 L62 60 L56 72 L50 78 L44 72 Z" fill="#C62828" />
    <path d="M38 60 Q34 63 30 62 Q34 58 38 60" fill="#C62828" />
    <path d="M62 60 Q66 63 70 62 Q66 58 62 60" fill="#C62828" />
    <circle cx="50" cy="67" r="4" fill="#9E2020" />

    {/* ===== CABEÇA (proporção infantil - grande) ===== */}
    {/* Cabelo */}
    <path d="M33 24 Q34 14 38 12 Q42 10 46 12 Q50 10 54 12 Q58 10 62 12 Q66 14 67 24" fill="#5A3825" />
    <path d="M33 24 Q32 20 33 26" fill="#5A3825" />
    <path d="M67 24 Q68 20 67 26" fill="#5A3825" />
    {/* Topete bagunçado */}
    <path d="M40 14 Q44 8 50 10 Q56 8 60 14" fill="#6B4530" />
    <path d="M44 12 Q48 7 52 10" fill="#7A5A3A" />
    {/* Laterais */}
    <path d="M31 28 Q28 34 30 40" stroke="#5A3825" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M69 28 Q72 34 70 40" stroke="#5A3825" strokeWidth="3.5" fill="none" strokeLinecap="round" />

    {/* Rosto */}
    <ellipse cx="50" cy="38" rx="19" ry="18" fill="#F2C29B" />

    {/* Olhos grandes */}
    <ellipse cx="43" cy="34" rx="4" ry="4.5" fill="white" />
    <ellipse cx="43" cy="35" rx="2.8" ry="3.2" fill="#4A2E1F" />
    <ellipse cx="57" cy="34" rx="4" ry="4.5" fill="white" />
    <ellipse cx="57" cy="35" rx="2.8" ry="3.2" fill="#4A2E1F" />
    {/* Brilho */}
    <circle cx="44.5" cy="33" r="1.5" fill="white" opacity={0.9} />
    <circle cx="58.5" cy="33" r="1.5" fill="white" opacity={0.9} />
    <circle cx="42.5" cy="35.5" r="0.8" fill="#2C1810" />
    <circle cx="56.5" cy="35.5" r="0.8" fill="#2C1810" />

    {/* Sobrancelhas */}
    <path d="M37 28 Q41 26 46 27" stroke="#3A2418" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M54 27 Q59 26 63 28" stroke="#3A2418" strokeWidth="1.5" fill="none" strokeLinecap="round" />

    {/* Nariz */}
    <path d="M48 39 Q50 41 52 39" stroke="#D4A882" strokeWidth="1.2" fill="none" strokeLinecap="round" />

    {/* Sorriso grande */}
    <path d="M41 43 Q45 50 50 50 Q55 50 59 43" stroke="#2C1810" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="48" y="44" width="2" height="2" rx="0.3" fill="white" />
    <rect x="50.5" y="44" width="2" height="2" rx="0.3" fill="white" />

    {/* Bochechas + sardas */}
    <ellipse cx="38" cy="42" rx="4" ry="2.5" fill="#FFB6C1" opacity={0.5} />
    <ellipse cx="62" cy="42" rx="4" ry="2.5" fill="#FFB6C1" opacity={0.5} />
    <circle cx="39" cy="38" r="0.7" fill="#C4956A" opacity={0.6} />
    <circle cx="41" cy="40" r="0.7" fill="#C4956A" opacity={0.6} />
    <circle cx="61" cy="38" r="0.7" fill="#C4956A" opacity={0.6} />
    <circle cx="59" cy="40" r="0.7" fill="#C4956A" opacity={0.6} />

    {/* ===== CHAPÉU ===== */}
    {/* Aba */}
    <ellipse cx="50" cy="13" rx="26" ry="6" fill="#5A3518" />
    <ellipse cx="50" cy="12" rx="24" ry="5" fill="#6B3F1F" />
    {/* Copa */}
    <path d="M32 11 Q32 -4 50 -2 Q68 -4 68 11" fill="#5A3518" />
    <path d="M34 10 Q34 1 50 2 Q66 1 66 10" fill="#7A4A28" />
    {/* Vinco */}
    <path d="M40 2 Q48 5 50 2 Q52 5 60 2" stroke="#5A3518" strokeWidth="0.8" fill="none" opacity={0.5} />
    {/* Fivela */}
    <rect x="46" y="0" width="8" height="4" rx="0.8" fill="#D4A843" />

    {/* Orelhas */}
    <ellipse cx="31" cy="38" rx="2.5" ry="3" fill="#F2C29B" />
    <ellipse cx="69" cy="38" rx="2.5" ry="3" fill="#F2C29B" />
  </svg>
);

const WhatsAppPeao = () => {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=551733311155"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-6 z-50 flex items-end gap-2 cursor-pointer group"
      style={{ animation: "peao-bounce 2s ease-in-out infinite" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animation = "none" }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.animation = "peao-bounce 2s ease-in-out infinite" }}
    >
      {/* Speech bubble */}
      <div className="relative bg-white dark:bg-slate-800 border-2 border-[#D94B4B] rounded-2xl px-4 py-2.5 shadow-lg mb-6 order-1">
        <div className="absolute right-[-10px] bottom-[18px] w-0 h-0 border-8 border-y-8 border-l-8 border-transparent border-l-[#D94B4B] dark:border-l-slate-800" />
        <p className="text-[14px] font-bold text-dark-bg dark:text-white whitespace-nowrap">
          🎵 Peça sua música
        </p>
        <p className="text-[11px] text-gray-500 dark:text-gray-400">
          Clique e fale conosco!
        </p>
      </div>

      {/* Character */}
      <div
        className="relative order-2 w-[72px] h-[108px]"
        style={{ animation: "peao-wiggle 4s ease-in-out infinite" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animation = "none" }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.animation = "peao-wiggle 4s ease-in-out infinite" }}
      >
        <CowboyCharacter />
      </div>
    </a>
  );
};

export default WhatsAppPeao;
