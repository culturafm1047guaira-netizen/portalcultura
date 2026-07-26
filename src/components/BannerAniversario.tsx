import React from "react";

export default function BannerAniversario() {
  return (
    <div className="relative w-full overflow-hidden rounded-sm border-2 border-[#E88D2A] bg-gradient-to-br from-[#0B4F7A] via-[#0B4F7A] to-[#093a58]">
      <div className="relative flex flex-col items-center justify-center px-6 py-10 md:py-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E88D2A]/40 bg-[#E88D2A]/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E88D2A] mb-4">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#E88D2A] animate-pulse" />
          Vem aí
        </span>

        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-tight text-white uppercase mb-2">
          <span className="text-[#E88D2A]">70</span> anos
        </h2>

        <p className="font-body text-[clamp(1rem,2.5vw,1.5rem)] font-semibold text-white/90 leading-tight mb-1">
          Rádio Cultura de Guaíra
        </p>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-px w-8 bg-[#E88D2A]/60" />
          <span className="font-body text-sm font-bold tracking-[0.25em] text-[#E88D2A] uppercase">
            19 de novembro
          </span>
          <div className="h-px w-8 bg-[#E88D2A]/60" />
        </div>

        <p className="mt-4 font-body text-xs font-medium text-white/60 tracking-wider uppercase">
          Fiquem ligados em nossa programação para mais informações
        </p>
      </div>
    </div>
  );
}
